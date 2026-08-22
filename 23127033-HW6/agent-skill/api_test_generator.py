#!/usr/bin/env python3
"""
api_test_generator.py
======================
Reusable Agent Skill: api-test-generator

Doc tai lieu dac ta API (Markdown tu do hoac OpenAPI JSON/YAML) va tu dong sinh:
  1. Test Case Matrix (Markdown)
  2. Postman Collection v2.1 (JSON) kem Pre-request Script + Test Script Assertions
  3. Data-driven Testing matrix (JSON + CSV)

Thiet ke de TAI SU DUNG cho moi du an: khong hard-code ten field/domain cu the.
Toan bo logic sinh test case dua tren 4 Rule Engine doc lap, chay tren mot
Intermediate Spec Model (ISM) duoc trich xuat tu spec dau vao.

Usage:
    python api_test_generator.py --input api_specification.md --outdir ./output
    python api_test_generator.py --input openapi.json --outdir ./output --latency-threshold-ms 800

Author: HW06 - Kiem Thu Phan Mem - Bloom G9.5 Create
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


import uuid
from dataclasses import dataclass, field, asdict
from typing import Any, Optional


# =============================================================================
# 1. DATA MODELS (Intermediate Spec Model - ISM)
# =============================================================================

@dataclass
class FieldSpec:
    """Mo ta mot field trong request body / query / path / header."""
    name: str
    location: str = "body"          # body | query | path | header
    type: str = "string"            # string | number | integer | boolean | array | object
    required: bool = False
    min_length: Optional[int] = None
    max_length: Optional[int] = None
    min_value: Optional[float] = None
    max_value: Optional[float] = None
    pattern: Optional[str] = None
    enum: Optional[list] = None
    example: Any = None


@dataclass
class StateTransition:
    frm: str
    to: str
    valid: bool = True


@dataclass
class EndpointSpec:
    path: str
    method: str
    summary: str = ""
    requires_auth: bool = False
    required_role: Optional[str] = None
    owner_scoped: bool = False       # True neu resource gan voi 1 user cu the (phuc vu IDOR test)
    id_param: Optional[str] = None   # ten path param dai dien cho resource id (vd: orderId)
    fields: list[FieldSpec] = field(default_factory=list)
    expected_success_status: int = 200
    response_schema: Optional[dict] = None
    state_field: Optional[str] = None
    transitions: list[StateTransition] = field(default_factory=list)


@dataclass
class SpecModel:
    """Intermediate Spec Model (ISM) - dau ra cua Spec Parser."""
    title: str = "Untitled API"
    base_url: str = "{{baseUrl}}"
    auth_type: str = "bearer"        # bearer | apiKey | none
    endpoints: list[EndpointSpec] = field(default_factory=list)


@dataclass
class TestCase:
    tc_id: str
    category: str          # BND | SEC | STM | SCH
    test_type: str
    endpoint: str
    method: str
    input: dict
    expected_status: int
    expected_body: str
    rationale: str


# =============================================================================
# 2. SPEC PARSER
#    Ho tro 2 dinh dang: OpenAPI JSON/YAML don gian, va Markdown tu do theo
#    quy uoc bang (table) pho bien khi viet tai lieu API.
# =============================================================================

class SpecParser:
    """Boc tach Endpoint, Method, Request Body, Headers, Auth tu spec dau vao."""

    BOUNDARY_KEYWORDS = {"min_length", "max_length", "min_value", "max_value"}

    def parse(self, path: str) -> SpecModel:
        raw = self._read_file(path)
        if path.lower().endswith((".json",)):
            try:
                data = json.loads(raw)
                if self._looks_like_openapi(data):
                    return self._parse_openapi(data)
            except json.JSONDecodeError:
                pass
        if path.lower().endswith((".yaml", ".yml")):
            data = self._parse_yaml_lite(raw)
            if self._looks_like_openapi(data):
                return self._parse_openapi(data)
        # Fallback: Markdown tu do
        return self._parse_markdown(raw)

    # -------------------------------------------------------------------
    @staticmethod
    def _read_file(path: str) -> str:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()

    @staticmethod
    def _looks_like_openapi(data: Any) -> bool:
        return isinstance(data, dict) and ("openapi" in data or "swagger" in data)

    @staticmethod
    def _parse_yaml_lite(raw: str) -> dict:
        """Parser YAML toi gian (tranh phu thuoc PyYAML). Danh cho spec don gian."""
        try:
            import yaml  # neu co san thi dung
            return yaml.safe_load(raw)
        except ImportError:
            return {}

    # -------------------------------------------------------------------
    def _parse_openapi(self, data: dict) -> SpecModel:
        model = SpecModel(title=data.get("info", {}).get("title", "Untitled API"))
        security_schemes = (
            data.get("components", {}).get("securitySchemes", {})
            if "components" in data else {}
        )
        model.auth_type = "bearer" if security_schemes else "none"

        for path, methods in data.get("paths", {}).items():
            for method, op in methods.items():
                if method.lower() not in ("get", "post", "put", "patch", "delete"):
                    continue
                ep = EndpointSpec(
                    path=path,
                    method=method.upper(),
                    summary=op.get("summary", ""),
                    requires_auth=bool(op.get("security", security_schemes)),
                )
                # path params -> id_param (heuristic: chua "id")
                for p in op.get("parameters", []):
                    pname = p.get("name", "")
                    loc = p.get("in", "query")
                    schema = p.get("schema", {})
                    ep.fields.append(FieldSpec(
                        name=pname, location=loc,
                        type=schema.get("type", "string"),
                        required=p.get("required", False),
                        min_length=schema.get("minLength"),
                        max_length=schema.get("maxLength"),
                        min_value=schema.get("minimum"),
                        max_value=schema.get("maximum"),
                        pattern=schema.get("pattern"),
                        enum=schema.get("enum"),
                    ))
                    if loc == "path" and "id" in pname.lower():
                        ep.id_param = pname
                        ep.owner_scoped = True

                # request body
                body_schema = (
                    op.get("requestBody", {})
                    .get("content", {})
                    .get("application/json", {})
                    .get("schema", {})
                )
                required_fields = set(body_schema.get("required", []))
                for fname, fschema in body_schema.get("properties", {}).items():
                    ep.fields.append(FieldSpec(
                        name=fname, location="body",
                        type=fschema.get("type", "string"),
                        required=fname in required_fields,
                        min_length=fschema.get("minLength"),
                        max_length=fschema.get("maxLength"),
                        min_value=fschema.get("minimum"),
                        max_value=fschema.get("maximum"),
                        pattern=fschema.get("pattern"),
                        enum=fschema.get("enum"),
                    ))

                # expected success status
                for code in op.get("responses", {}):
                    if code.startswith(("2",)):
                        ep.expected_success_status = int(code)
                        break

                model.endpoints.append(ep)
        return model

    # -------------------------------------------------------------------
    def _parse_markdown(self, raw: str) -> SpecModel:
        model = SpecModel()
        title_match = re.search(r"^#\s+(.+)$", raw, re.MULTILINE)
        if title_match:
            model.title = title_match.group(1).strip()

        endpoint_pattern = re.compile(
            r"(?:^#{2,4}\s*(?:Endpoint:\s*)?|^\s*-\s*\*\*Endpoint:\*\*\s*`?|^\s*-\s*\*\*[^*]+:\*\*\s*`?)(GET|POST|PUT|PATCH|DELETE)\s+([^\s`]+)`?",
            re.MULTILINE | re.IGNORECASE,
        )
        matches = list(endpoint_pattern.finditer(raw))

        for i, m in enumerate(matches):
            method, path = m.group(1).upper(), m.group(2).strip()
            block_start = m.end()
            block_end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
            block = raw[block_start:block_end]

            ep = EndpointSpec(path=path, method=method)

            # Auth & Role detection
            auth_match = re.search(r"Auth:\s*([A-Za-z]+)", block, re.I)
            if (auth_match and auth_match.group(1).lower() != "none") or ("Auth Token" in block) or ("Authorization" in block) or ("/admin/" in path):
                ep.requires_auth = True
                model.auth_type = "bearer"

            role_match = re.search(r"Role:\s*([A-Za-z_\-]+)", block, re.I)
            if role_match:
                ep.required_role = role_match.group(1).strip()
            elif "/admin/" in path or "Dành cho Admin" in block or "quyền Admin" in block:
                ep.required_role = "admin"

            # Path param detection
            param_match = re.search(r"(?:\{(\w+)\}|:(\w+))", path)
            if param_match:
                pname = param_match.group(1) or param_match.group(2)
                ep.id_param = pname
                ep.owner_scoped = True

            # State Machine detection
            state_match = re.search(r"State field:\s*(\w+)", block, re.I)
            if state_match:
                ep.state_field = state_match.group(1)
            elif "trạng thái" in block.lower() or "state transition" in block.lower():
                ep.state_field = "status"

            trans_match = re.search(r"Transitions:\s*(.+)", block, re.I)
            if trans_match:
                for part in trans_match.group(1).split(","):
                    tm = re.match(r"\s*(\w+)\s*->\s*(\w+)\s*\((valid|invalid)\)", part)
                    if tm:
                        frm, to, validity = tm.groups()
                        ep.transitions.append(
                            StateTransition(frm=frm, to=to, valid=(validity == "valid"))
                        )
            elif "pending" in block.lower() and "confirmed" in block.lower():
                ep.transitions = [
                    StateTransition(frm="pending", to="confirmed", valid=True),
                    StateTransition(frm="confirmed", to="shipping", valid=True),
                    StateTransition(frm="shipping", to="delivered", valid=True),
                    StateTransition(frm="pending", to="canceled", valid=True),
                    StateTransition(frm="confirmed", to="canceled", valid=True),
                    StateTransition(frm="delivered", to="pending", valid=False),
                    StateTransition(frm="canceled", to="shipping", valid=False),
                ]

            status_match = re.search(r"(?:Success status:\s*(\d{3})|200 OK|201 Created)", block, re.I)
            if status_match:
                code_str = status_match.group(1) or ("201" if "201" in status_match.group(0) else "200")
                ep.expected_success_status = int(code_str)

            # Extract fields from Markdown table if present
            ep.fields = self._parse_field_table(block)

            # Extract fields from JSON code blocks if no table was found
            if not ep.fields:
                json_matches = re.findall(r"```(?:json)?\s*([\s\S]*?)```", block)
                for jm in json_matches:
                    try:
                        data = json.loads(jm.strip())
                        if isinstance(data, dict):
                            for k, v in data.items():
                                if not any(f.name == k for f in ep.fields):
                                    ftype = "string"
                                    if isinstance(v, bool):
                                        ftype = "boolean"
                                    elif isinstance(v, int):
                                        ftype = "integer"
                                    elif isinstance(v, (float, int)):
                                        ftype = "number"
                                    elif isinstance(v, list):
                                        ftype = "array"
                                    elif isinstance(v, dict):
                                        ftype = "object"
                                    
                                    min_val = 0 if ftype in ("number", "integer") else None
                                    pat = r"^.+@.+\..+$" if "email" in k.lower() else None
                                    min_len = 6 if "password" in k.lower() else 1
                                    
                                    ep.fields.append(FieldSpec(
                                        name=k, location="body", type=ftype,
                                        required=True, example=v, min_value=min_val,
                                        pattern=pat, min_length=min_len
                                    ))
                    except Exception:
                        pass

            # Inline JSON body (e.g. {"status": "confirmed"})
            if not ep.fields:
                inline_json = re.search(r"Body(?:\s*\(JSON\))?:\s*(`\{[^`]+\}`|\{[^}]+\})", block)
                if inline_json:
                    jtxt = inline_json.group(1).strip("`")
                    try:
                        data = json.loads(jtxt)
                        if isinstance(data, dict):
                            for k, v in data.items():
                                ep.fields.append(FieldSpec(
                                    name=k, location="body", type="string" if isinstance(v, str) else "number",
                                    required=True, example=v
                                ))
                    except Exception:
                        pass

            model.endpoints.append(ep)

        return model

    @staticmethod
    def _parse_field_table(block: str) -> list[FieldSpec]:
        """Doc bang Markdown field spec, bo qua dong header/separator."""
        fields_out: list[FieldSpec] = []
        table_lines = [
            ln.strip() for ln in block.splitlines()
            if ln.strip().startswith("|") and "---" not in ln
        ]
        if len(table_lines) < 2:
            return fields_out

        header_cells = [c.strip().lower() for c in table_lines[0].strip("|").split("|")]
        for line in table_lines[1:]:
            cells = [c.strip() for c in line.strip("|").split("|")]
            if len(cells) != len(header_cells):
                continue
            row = dict(zip(header_cells, cells))
            if not row.get("field"):
                continue

            def _num(key: str) -> Optional[float]:
                v = row.get(key, "")
                return float(v) if v not in ("", None) else None

            enum_raw = row.get("enum", "")
            fields_out.append(FieldSpec(
                name=row.get("field", ""),
                location=row.get("location", "body") or "body",
                type=row.get("type", "string") or "string",
                required=row.get("required", "false").lower() == "true",
                min_length=int(_num("min_length")) if _num("min_length") is not None else None,
                max_length=int(_num("max_length")) if _num("max_length") is not None else None,
                min_value=_num("min_value"),
                max_value=_num("max_value"),
                pattern=row.get("pattern") or None,
                enum=[e.strip() for e in enum_raw.split(";") if e.strip()] or None,
            ))
        return fields_out


# =============================================================================
# 3. RULE ENGINES
# =============================================================================

class BaseEngine:
    CATEGORY = "GEN"
    _counter = 0

    def next_id(self) -> str:
        BaseEngine._counter += 1
        return f"TC-{self.CATEGORY}-{BaseEngine._counter:03d}"


class BoundaryPartitionEngine(BaseEngine):
    """Sinh test cho tung field: hop le, chuoi rong, thieu field, gia tri am,
    bien do dai, ky tu dac biet, sai dinh dang."""

    CATEGORY = "BND"

    def generate(self, ep: EndpointSpec) -> list[TestCase]:
        cases: list[TestCase] = []
        if not ep.fields:
            return cases

        for f in ep.fields:
            base_input = self._valid_sample_payload(ep)

            # 1) Valid equivalence class
            cases.append(self._case(
                ep, "Valid equivalence partition",
                self._with_value(base_input, f, self._valid_value(f)),
                ep.expected_success_status, "OK",
                f"Gia tri hop le dien hinh cho field '{f.name}'",
            ))

            # 2) Missing / required field
            if f.required:
                cases.append(self._case(
                    ep, "Missing required field",
                    self._without_field(base_input, f),
                    400, "Validation error",
                    f"Field '{f.name}' la bat buoc nhung bi thieu",
                ))

            # 3) Empty string (chi ap dung cho string)
            if f.type == "string":
                cases.append(self._case(
                    ep, "Empty string boundary",
                    self._with_value(base_input, f, ""),
                    400, "Validation error",
                    f"Field '{f.name}' nhan chuoi rong",
                ))

            # 4) Negative number (neu la so va khong cho phep am theo constraint)
            if f.type in ("number", "integer"):
                cases.append(self._case(
                    ep, "Negative value boundary",
                    self._with_value(base_input, f, -1),
                    400, "Validation error",
                    f"Field '{f.name}' nhan gia tri am ngoai mien hop le",
                ))

            # 5) Boundary min/max length (string)
            if f.type == "string" and f.max_length is not None:
                cases.append(self._case(
                    ep, "Max length boundary (+1)",
                    self._with_value(base_input, f, "a" * (f.max_length + 1)),
                    400, "Validation error",
                    f"Field '{f.name}' vuot qua max_length={f.max_length} 1 don vi",
                ))
                cases.append(self._case(
                    ep, "Max length boundary (exact)",
                    self._with_value(base_input, f, "a" * f.max_length),
                    ep.expected_success_status, "OK",
                    f"Field '{f.name}' dung bang max_length={f.max_length}",
                ))
            if f.type == "string" and f.min_length is not None and f.min_length > 0:
                cases.append(self._case(
                    ep, "Min length boundary (-1)",
                    self._with_value(base_input, f, "a" * max(f.min_length - 1, 0)),
                    400, "Validation error",
                    f"Field '{f.name}' nho hon min_length={f.min_length}",
                ))

            # 6) Boundary min/max value (number)
            if f.type in ("number", "integer") and f.max_value is not None:
                cases.append(self._case(
                    ep, "Max value boundary (+1)",
                    self._with_value(base_input, f, f.max_value + 1),
                    400, "Validation error",
                    f"Field '{f.name}' vuot qua max_value={f.max_value}",
                ))
            if f.type in ("number", "integer") and f.min_value is not None:
                cases.append(self._case(
                    ep, "Min value boundary (-1)",
                    self._with_value(base_input, f, f.min_value - 1),
                    400, "Validation error",
                    f"Field '{f.name}' nho hon min_value={f.min_value}",
                ))

            # 7) Special characters / unicode
            if f.type == "string":
                cases.append(self._case(
                    ep, "Special characters",
                    self._with_value(base_input, f, "!@#$%^&*()_+ünïçödé漢字"),
                    ep.expected_success_status if not f.pattern else 400,
                    "OK or Validation error tuy pattern",
                    f"Field '{f.name}' nhan ky tu dac biet/unicode",
                ))

            # 8) Wrong type / format
            wrong_type_value = 12345 if f.type == "string" else "not-a-number"
            cases.append(self._case(
                ep, "Wrong data type",
                self._with_value(base_input, f, wrong_type_value),
                400, "Validation error",
                f"Field '{f.name}' nhan sai kieu du lieu (ky vong {f.type})",
            ))

            # 9) Pattern mismatch (vd email/regex)
            if f.pattern:
                cases.append(self._case(
                    ep, "Pattern / format mismatch",
                    self._with_value(base_input, f, "invalid_format_value"),
                    400, "Validation error",
                    f"Field '{f.name}' khong khop pattern '{f.pattern}'",
                ))

            # 10) Enum invalid value
            if f.enum:
                cases.append(self._case(
                    ep, "Invalid enum value",
                    self._with_value(base_input, f, "__INVALID_ENUM__"),
                    400, "Validation error",
                    f"Field '{f.name}' nhan gia tri ngoai enum {f.enum}",
                ))

        return cases

    # ---- helpers -----------------------------------------------------
    def _valid_sample_payload(self, ep: EndpointSpec) -> dict:
        payload = {}
        for f in ep.fields:
            if f.location == "body":
                payload[f.name] = self._valid_value(f)
        return payload

    @staticmethod
    def _valid_value(f: FieldSpec) -> Any:
        if f.example is not None:
            return f.example
        if f.enum:
            return f.enum[0]
        if f.type == "string":
            length = f.min_length or 5
            return ("x" * max(length, 1))[: (f.max_length or 10)]
        if f.type in ("number", "integer"):
            lo = f.min_value if f.min_value is not None else 1
            hi = f.max_value if f.max_value is not None else lo + 10
            return (lo + hi) / 2 if f.type == "number" else int((lo + hi) // 2)
        if f.type == "boolean":
            return True
        if f.type == "array":
            return []
        return {}

    @staticmethod
    def _with_value(base: dict, f: FieldSpec, value: Any) -> dict:
        new_payload = dict(base)
        if f.location == "body":
            new_payload[f.name] = value
        else:
            new_payload[f"__{f.location}__{f.name}"] = value
        return new_payload

    @staticmethod
    def _without_field(base: dict, f: FieldSpec) -> dict:
        new_payload = dict(base)
        new_payload.pop(f.name, None)
        return new_payload

    def _case(self, ep, test_type, payload, status, expected_body, rationale) -> TestCase:
        return TestCase(
            tc_id=self.next_id(), category=self.CATEGORY, test_type=test_type,
            endpoint=ep.path, method=ep.method, input=payload,
            expected_status=status, expected_body=expected_body, rationale=rationale,
        )


class SecurityRuleEngine(BaseEngine):
    """Sinh SEC-01..SEC-07 cho endpoint co yeu cau auth/role/owner-scoped."""

    CATEGORY = "SEC"

    SQLI_PAYLOAD = "' OR '1'='1'; DROP TABLE users;--"
    XSS_PAYLOAD = "<script>alert(document.cookie)</script>"

    def generate(self, ep: EndpointSpec) -> list[TestCase]:
        cases: list[TestCase] = []
        if not ep.requires_auth:
            return cases

        sample_payload = {f.name: "sample" for f in ep.fields if f.location == "body"}

        # SEC-01: Missing token
        cases.append(self._case(
            ep, "SEC-01 Missing token", {"headers": {}, "body": sample_payload},
            401, "Unauthorized",
            "Khong gui Authorization header -> phai tra ve 401",
        ))

        # SEC-02: Expired / invalid token
        cases.append(self._case(
            ep, "SEC-02 Expired/invalid token",
            {"headers": {"Authorization": "Bearer expired.invalid.token"}, "body": sample_payload},
            401, "Unauthorized",
            "Token het han hoac khong hop le -> phai tra ve 401",
        ))

        # SEC-03: Role escalation
        if ep.required_role:
            cases.append(self._case(
                ep, "SEC-03 Role escalation",
                {"headers": {"Authorization": "Bearer {{lowPrivToken}}"}, "body": sample_payload},
                403, "Forbidden",
                f"Token hop le nhung sai role (yeu cau '{ep.required_role}') -> phai tra ve 403",
            ))

        # SEC-04: SQL Injection
        for f in ep.fields:
            if f.type == "string" and f.location in ("body", "query"):
                cases.append(self._case(
                    ep, "SEC-04 SQL Injection",
                    {"headers": {"Authorization": "Bearer {{validToken}}"},
                     "body": {**sample_payload, f.name: self.SQLI_PAYLOAD}},
                    400, "Validation error hoac an toan (khong 500/leak du lieu)",
                    f"Field '{f.name}' nhan SQLi payload -> he thong phai chan/whitelist, khong duoc 500",
                ))
                break  # 1 dai dien la du, tranh no test qua muc

        # SEC-05: XSS
        for f in ep.fields:
            if f.type == "string" and f.location == "body":
                cases.append(self._case(
                    ep, "SEC-05 XSS Injection",
                    {"headers": {"Authorization": "Bearer {{validToken}}"},
                     "body": {**sample_payload, f.name: self.XSS_PAYLOAD}},
                    200, "Payload phai duoc escape/sanitize trong response, khong thuc thi script",
                    f"Field '{f.name}' nhan XSS payload -> kiem tra output encoding",
                ))
                break

        # SEC-06: IDOR
        if ep.owner_scoped and ep.id_param:
            cases.append(self._case(
                ep, "SEC-06 IDOR (truy cap resource cua user khac)",
                {"headers": {"Authorization": "Bearer {{userAToken}}"},
                 "path_param": {ep.id_param: "{{userB_resourceId}}"}},
                403, "Forbidden hoac 404 Not Found",
                f"User A dung token hop le nhung truy cap resource cua User B qua '{ep.id_param}'",
            ))

        # SEC-07: Mass assignment
        cases.append(self._case(
            ep, "SEC-07 Mass assignment",
            {"headers": {"Authorization": "Bearer {{validToken}}"},
             "body": {**sample_payload, "role": "admin", "isAdmin": True}},
            400, "Field khong duoc phep phai bi tu choi hoac bi bo qua (khong duoc nang quyen)",
            "Gui them field nhay cam khong duoc khai bao trong spec (mass assignment)",
        ))

        return cases

    def _case(self, ep, test_type, payload, status, expected_body, rationale) -> TestCase:
        return TestCase(
            tc_id=self.next_id(), category=self.CATEGORY, test_type=test_type,
            endpoint=ep.path, method=ep.method, input=payload,
            expected_status=status, expected_body=expected_body, rationale=rationale,
        )


class StateMachineEngine(BaseEngine):
    """Sinh test cho luong chuyen trang thai da buoc."""

    CATEGORY = "STM"

    def generate(self, ep: EndpointSpec) -> list[TestCase]:
        cases: list[TestCase] = []
        if not ep.state_field or not ep.transitions:
            return cases

        for t in ep.transitions:
            if t.valid:
                cases.append(self._case(
                    ep, f"Valid transition {t.frm} -> {t.to}",
                    {ep.state_field: t.to, "__precondition_state__": t.frm},
                    ep.expected_success_status, "OK, trang thai duoc cap nhat",
                    f"Chuyen trang thai hop le theo state machine: {t.frm} -> {t.to}",
                ))
            else:
                cases.append(self._case(
                    ep, f"Invalid transition {t.frm} -> {t.to}",
                    {ep.state_field: t.to, "__precondition_state__": t.frm},
                    409, "Conflict / Invalid state transition",
                    f"Chuyen trang thai vi pham quy tac: {t.frm} -> {t.to} khong duoc phep",
                ))
        return cases

    def _case(self, ep, test_type, payload, status, expected_body, rationale) -> TestCase:
        return TestCase(
            tc_id=self.next_id(), category=self.CATEGORY, test_type=test_type,
            endpoint=ep.path, method=ep.method, input=payload,
            expected_status=status, expected_body=expected_body, rationale=rationale,
        )


class SchemaHeaderLatencyEngine(BaseEngine):
    """Kiem tra Content-Type, JSON schema cua response, va nguong latency."""

    CATEGORY = "SCH"

    def __init__(self, latency_threshold_ms: int = 1000):
        self.latency_threshold_ms = latency_threshold_ms

    def generate(self, ep: EndpointSpec) -> list[TestCase]:
        return [
            self._case(
                ep, "Content-Type application/json",
                {}, ep.expected_success_status,
                "Header Content-Type phai la application/json",
                "Kiem tra hop dong header cho moi response thanh cong",
            ),
            self._case(
                ep, "Response JSON schema validation",
                {}, ep.expected_success_status,
                "Body phai khop schema da khai bao trong spec",
                "Dam bao cau truc du lieu tra ve dung hop dong API",
            ),
            self._case(
                ep, f"Latency below {self.latency_threshold_ms}ms",
                {}, ep.expected_success_status,
                f"Response time < {self.latency_threshold_ms}ms",
                "Kiem tra hieu nang co ban cua endpoint",
            ),
        ]

    def _case(self, ep, test_type, payload, status, expected_body, rationale) -> TestCase:
        return TestCase(
            tc_id=self.next_id(), category=self.CATEGORY, test_type=test_type,
            endpoint=ep.path, method=ep.method, input=payload,
            expected_status=status, expected_body=expected_body, rationale=rationale,
        )


# =============================================================================
# 4. TEST SYNTHESIZER
# =============================================================================

class TestSynthesizer:
    """Gop ket qua tu 4 engine, khu trung, chuan hoa tc_id."""

    def __init__(self, latency_threshold_ms: int = 1000):
        self.boundary_engine = BoundaryPartitionEngine()
        self.security_engine = SecurityRuleEngine()
        self.state_engine = StateMachineEngine()
        self.schema_engine = SchemaHeaderLatencyEngine(latency_threshold_ms)

    def synthesize(self, model: SpecModel) -> list[TestCase]:
        all_cases: list[TestCase] = []
        for ep in model.endpoints:
            all_cases.extend(self.boundary_engine.generate(ep))
            all_cases.extend(self.security_engine.generate(ep))
            all_cases.extend(self.state_engine.generate(ep))
            all_cases.extend(self.schema_engine.generate(ep))

        # khu trung: dua tren (endpoint, method, test_type, input) da giong het
        seen = set()
        unique_cases = []
        for c in all_cases:
            key = (c.endpoint, c.method, c.test_type, json.dumps(c.input, sort_keys=True))
            if key in seen:
                continue
            seen.add(key)
            unique_cases.append(c)
        return unique_cases


# =============================================================================
# 5. EXPORTERS
# =============================================================================

class MarkdownExporter:
    HEADER = "| tc_id | category | test_type | input | expected_status | expected_body | rationale |\n" \
             "|---|---|---|---|---|---|---|\n"

    def export(self, cases: list[TestCase], outfile: str) -> None:
        lines = [f"# Test Case Matrix\n\n", self.HEADER]
        for c in cases:
            input_str = json.dumps(c.input, ensure_ascii=False)
            input_str = input_str.replace("|", "\\|")
            lines.append(
                f"| {c.tc_id} | {c.category} | {c.test_type} | `{input_str}` | "
                f"{c.expected_status} | {c.expected_body} | {c.rationale} |\n"
            )
        with open(outfile, "w", encoding="utf-8") as f:
            f.writelines(lines)


class DataMatrixExporter:
    def export_json(self, cases: list[TestCase], outfile: str) -> None:
        data = [asdict(c) for c in cases]
        with open(outfile, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def export_csv(self, cases: list[TestCase], outfile: str) -> None:
        fieldnames = ["tc_id", "category", "test_type", "endpoint", "method",
                      "input", "expected_status", "expected_body", "rationale"]
        with open(outfile, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for c in cases:
                row = asdict(c)
                row["input"] = json.dumps(row["input"], ensure_ascii=False)
                writer.writerow(row)


class PostmanExporter:
    """Xuat Postman Collection v2.1 kem Pre-request Script va Test Script Assertions."""

    PRE_REQUEST_SCRIPT = """// Auto-generated Pre-request Script
// Tu dong set header X-Student-Id tu collection/environment variable
pm.request.headers.upsert({
    key: 'X-Student-Id',
    value: pm.variables.get('studentId') || pm.environment.get('studentId') || '{{studentId}}'
});
"""

    def _test_script(self, tc: TestCase, latency_threshold_ms: int) -> str:
        return f"""// Auto-generated Test Script Assertions - {tc.tc_id}
pm.test("[{tc.tc_id}] Status code is {tc.expected_status}", function () {{
    pm.response.to.have.status({tc.expected_status});
}});

pm.test("[{tc.tc_id}] Content-Type is application/json", function () {{
    if (pm.response.code !== 204) {{
        pm.response.to.have.header('Content-Type');
        pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
    }}
}});

pm.test("[{tc.tc_id}] Response time below {latency_threshold_ms}ms", function () {{
    pm.expect(pm.response.responseTime).to.be.below({latency_threshold_ms});
}});

pm.test("[{tc.tc_id}] Response body is valid JSON (if applicable)", function () {{
    if (pm.response.code !== 204 && pm.response.text().length > 0) {{
        pm.response.to.be.json;
    }}
}});

// Rationale: {tc.rationale}
// Expected body note: {tc.expected_body}
"""

    def export(self, cases: list[TestCase], model: SpecModel, outfile: str,
               latency_threshold_ms: int = 1000) -> None:
        items = []
        for tc in cases:
            url_path = tc.endpoint.strip("/").split("/")
            body_input = tc.input.get("body", tc.input) if isinstance(tc.input, dict) else tc.input
            headers = []
            auth_headers = tc.input.get("headers", {}) if isinstance(tc.input, dict) else {}
            for k, v in auth_headers.items():
                headers.append({"key": k, "value": str(v)})
            headers.append({"key": "Content-Type", "value": "application/json"})

            item = {
                "name": f"{tc.tc_id} - {tc.test_type}",
                "event": [
                    {
                        "listen": "prerequest",
                        "script": {"type": "text/javascript", "exec": self.PRE_REQUEST_SCRIPT.splitlines()},
                    },
                    {
                        "listen": "test",
                        "script": {
                            "type": "text/javascript",
                            "exec": self._test_script(tc, latency_threshold_ms).splitlines(),
                        },
                    },
                ],
                "request": {
                    "method": tc.method,
                    "header": headers,
                    "body": {
                        "mode": "raw",
                        "raw": json.dumps(body_input, ensure_ascii=False, indent=2),
                        "options": {"raw": {"language": "json"}},
                    },
                    "url": {
                        "raw": f"{model.base_url}/{'/'.join(url_path)}",
                        "host": [model.base_url],
                        "path": url_path,
                    },
                    "description": tc.rationale,
                },
                "response": [],
            }
            items.append(item)

        collection = {
            "info": {
                "_postman_id": str(uuid.uuid4()),
                "name": f"{model.title} - Auto Generated Test Suite",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
                "description": "Auto-generated by api-test-generator Agent Skill",
            },
            "item": items,
            "variable": [
                {"key": "baseUrl", "value": "https://api.example.com"},
                {"key": "studentId", "value": "SV000000"},
                {"key": "validToken", "value": ""},
                {"key": "lowPrivToken", "value": ""},
                {"key": "userAToken", "value": ""},
                {"key": "userB_resourceId", "value": ""},
            ],
        }

        with open(outfile, "w", encoding="utf-8") as f:
            json.dump(collection, f, ensure_ascii=False, indent=2)


# =============================================================================
# 6. CLI ORCHESTRATION
# =============================================================================

def run(input_path: str, outdir: str, latency_threshold_ms: int) -> None:
    os.makedirs(outdir, exist_ok=True)

    parser = SpecParser()
    model = parser.parse(input_path)

    if not model.endpoints:
        print(f"[CANH BAO] Khong tim thay endpoint nao trong '{input_path}'. "
              f"Kiem tra dinh dang spec (Markdown can co header dang '## POST /path').",
              file=sys.stderr)

    synthesizer = TestSynthesizer(latency_threshold_ms=latency_threshold_ms)
    cases = synthesizer.synthesize(model)

    md_path = os.path.join(outdir, "test_case_matrix.md")
    postman_path = os.path.join(outdir, "postman_collection.json")
    json_path = os.path.join(outdir, "data_matrix.json")
    csv_path = os.path.join(outdir, "data_matrix.csv")

    MarkdownExporter().export(cases, md_path)
    PostmanExporter().export(cases, model, postman_path, latency_threshold_ms)
    DataMatrixExporter().export_json(cases, json_path)
    DataMatrixExporter().export_csv(cases, csv_path)

    summary: dict[str, int] = {}
    for c in cases:
        summary[c.category] = summary.get(c.category, 0) + 1

    print(f"Da sinh tong cong {len(cases)} test case tu spec '{model.title}':")
    for cat, count in sorted(summary.items()):
        print(f"  - {cat}: {count} test case")
    print(f"\nDeliverables tai: {outdir}")
    print(f"  - {md_path}")
    print(f"  - {postman_path}")
    print(f"  - {json_path}")
    print(f"  - {csv_path}")


def main() -> None:
    ap = argparse.ArgumentParser(
        description="api-test-generator: sinh bo kiem thu API tu dac ta Markdown/OpenAPI."
    )
    ap.add_argument("--input", required=True, help="Duong dan file api_specification.md hoac openapi.json/yaml")
    ap.add_argument("--outdir", default="./output", help="Thu muc xuat ket qua")
    ap.add_argument("--latency-threshold-ms", type=int, default=1000,
                     help="Nguong response time (ms) cho assertion latency")
    args = ap.parse_args()

    run(args.input, args.outdir, args.latency_threshold_ms)


if __name__ == "__main__":
    main()
