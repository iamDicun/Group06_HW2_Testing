#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_testcases.py — Sinh test case từ Decision Table.

Đầu vào: 1 file JSON decision table (định dạng do skill phân tích requirement xuất
ra, hoặc tự soạn). Đầu ra: bảng test case + thẻ chi tiết (Markdown tiếng Việt).

Cách dùng:
    python3 gen_testcases.py dt.json                 # bảng test case + thẻ chi tiết
    python3 gen_testcases.py dt.json --expand-dc      # khai triển mỗi '—' thành mọi giá trị
    python3 gen_testcases.py dt.json --prefix TC      # tiền tố mã test case (mặc định TC)
    python3 gen_testcases.py dt.json --json out.json  # ghi cấu trúc test case ra JSON

Schema dt.json:
{
  "title": "Tên",
  "conditions": [{"id": "C1", "name": "...", "values": ["T", "F"]}],
  "actions": [{"id": "A1", "name": "..."}],
  "rules": [
    {"id": "R1", "conditions": {"C1": "T", "C2": "—"}, "actions": ["A1"]}
  ]
}
- '—' (hoặc '-', '*') trong conditions = don't-care.
"""

import argparse
import signal
try:
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)
except (AttributeError, ValueError):
    pass
import itertools
import json
import sys

DC_TOKENS = {"—", "-", "*", "any", "ANY"}


def load_dt(path):
    with open(path, encoding="utf-8") as f:
        dt = json.load(f)
    for key in ("conditions", "actions", "rules"):
        if key not in dt:
            sys.exit(f"[LỖI] decision table thiếu trường: '{key}'")
    return dt


def cond_name(dt, cid):
    for c in dt["conditions"]:
        if c["id"] == cid:
            return c["name"]
    return cid


def cond_values(dt, cid):
    for c in dt["conditions"]:
        if c["id"] == cid:
            return list(c["values"])
    return []


def action_name(dt, aid):
    for a in dt["actions"]:
        if a["id"] == aid:
            return a["name"]
    return aid


def is_dc(v):
    return str(v) in DC_TOKENS


def rule_span(dt, rule):
    """Số tổ hợp đầy đủ mà 1 rule (có thể chứa '—') đại diện."""
    span = 1
    for c in dt["conditions"]:
        v = rule["conditions"].get(c["id"])
        if is_dc(v):
            span *= max(1, len(c["values"]))
    return span


def priority(dt, rule):
    span = rule_span(dt, rule)
    if not rule.get("actions"):
        return "Cao"  # rule không có hành động = lỗ hổng requirement, cần soi
    if span >= 2:
        return "Cao"  # gánh nhiều tổ hợp -> phải chắc
    return "Trung bình"


def representative(dt, rule):
    """Trả về dict điều kiện -> giá trị cụ thể (don't-care lấy giá trị đầu)."""
    rep = {}
    for c in dt["conditions"]:
        v = rule["conditions"].get(c["id"])
        rep[c["id"]] = c["values"][0] if is_dc(v) else v
    return rep


def expand_rule(dt, rule):
    """Khai triển '—' thành mọi giá trị -> danh sách tổ hợp cụ thể."""
    cids = [c["id"] for c in dt["conditions"]]
    choices = []
    for c in dt["conditions"]:
        v = rule["conditions"].get(c["id"])
        choices.append(list(c["values"]) if is_dc(v) else [v])
    out = []
    for prod in itertools.product(*choices):
        out.append(dict(zip(cids, prod)))
    return out


def build_testcases(dt, expand_dc=False, prefix="TC"):
    cases = []
    n = 0
    for rule in dt["rules"]:
        combos = expand_rule(dt, rule) if expand_dc else [None]
        for combo in combos:
            n += 1
            tcid = f"{prefix}{n:03d}"
            if combo is None:
                values = {c["id"]: rule["conditions"].get(c["id"]) for c in dt["conditions"]}
                rep = representative(dt, rule)
            else:
                values = dict(combo)
                rep = dict(combo)
            cases.append({
                "id": tcid,
                "rule": rule.get("id", ""),
                "values": values,        # có thể chứa '—' nếu không expand
                "concrete": rep,         # giá trị cụ thể để test thật
                "actions": list(rule.get("actions", [])),
                "priority": priority(dt, rule),
                "span": rule_span(dt, rule),
            })
    return cases


def title_for(dt, tc):
    parts = []
    for c in dt["conditions"]:
        v = tc["values"].get(c["id"])
        if is_dc(v):
            continue
        parts.append(f"{cond_name(dt, c['id'])}={v}")
    cond_txt = ", ".join(parts) if parts else "trường hợp mặc định"
    if tc["actions"]:
        act_txt = " + ".join(action_name(dt, a) for a in tc["actions"])
    else:
        act_txt = "KHÔNG xác định (cần làm rõ requirement)"
    return f"Khi {cond_txt} → {act_txt}"


def render_markdown(dt, cases):
    lines = [f"# Bộ test case: {dt.get('title','(không tên)')}", ""]
    lines.append(f"_Tổng cộng **{len(cases)}** test case, truy vết từ "
                 f"{len(dt['rules'])} rule của decision table._")
    lines.append("")

    # Bảng tổng hợp
    lines.append("## Bảng test case")
    lines.append("")
    header = ["Mã TC", "Tiêu đề", "Dữ liệu đầu vào", "Kết quả mong đợi", "Rule", "Ưu tiên"]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for tc in cases:
        data = "; ".join(
            f"{cond_name(dt, c['id'])} = {tc['values'].get(c['id'])}"
            for c in dt["conditions"]
        )
        if tc["actions"]:
            exp = "; ".join(action_name(dt, a) for a in tc["actions"])
        else:
            exp = "⚠️ chưa xác định"
        row = [tc["id"], title_for(dt, tc).replace("|", "/"), data.replace("|", "/"),
               exp.replace("|", "/"), tc["rule"], tc["priority"]]
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")

    # Thẻ chi tiết
    lines.append("## Chi tiết test case")
    lines.append("")
    for tc in cases:
        lines.append(f"### {tc['id']} — {title_for(dt, tc)}")
        lines.append(f"- **Truy vết:** Rule `{tc['rule']}`"
                     + (f" (đại diện {tc['span']} tổ hợp)" if tc["span"] > 1 else ""))
        lines.append(f"- **Ưu tiên:** {tc['priority']}")
        lines.append("- **Tiền điều kiện:** _(điền bối cảnh hệ thống trước khi test)_")
        lines.append("- **Dữ liệu / Input cụ thể:**")
        for c in dt["conditions"]:
            v = tc["values"].get(c["id"])
            note = ""
            if is_dc(v):
                note = (f" → chọn đại diện `{tc['concrete'][c['id']]}` "
                        f"(giá trị nào cũng cho cùng kết quả theo logic; "
                        f"cân nhắc pairwise nếu nghi ngờ)")
            lines.append(f"  - {cond_name(dt, c['id'])} (`{c['id']}`): `{v}`{note}")
        lines.append("- **Các bước thực hiện:** _(điền theo nghiệp vụ; thường: thiết lập input ở trên → kích hoạt chức năng → quan sát kết quả)_")
        if tc["actions"]:
            lines.append("- **Kết quả mong đợi:**")
            for a in tc["actions"]:
                lines.append(f"  - {action_name(dt, a)} (`{a}`)")
        else:
            lines.append("- **Kết quả mong đợi:** ⚠️ Rule này không có hành động — "
                         "requirement chưa định nghĩa. Cần xác nhận trước khi test.")
        lines.append("")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description="Sinh test case từ decision table")
    ap.add_argument("dt", help="file decision table JSON")
    ap.add_argument("--expand-dc", action="store_true",
                    help="khai triển mỗi '—' thành mọi giá trị (nhiều test case hơn, độ phủ cao hơn)")
    ap.add_argument("--prefix", default="TC", help="tiền tố mã test case (mặc định TC)")
    ap.add_argument("--json", metavar="FILE", help="ghi cấu trúc test case ra JSON")
    args = ap.parse_args()

    dt = load_dt(args.dt)
    cases = build_testcases(dt, expand_dc=args.expand_dc, prefix=args.prefix)
    print(render_markdown(dt, cases))

    gaps = [tc for tc in cases if not tc["actions"]]
    if gaps:
        print(f"\n> ⚠️ Có {len(gaps)} test case ứng với rule KHÔNG có hành động "
              "(lỗ hổng requirement). Cần làm rõ trước khi thực thi.", file=sys.stderr)

    if args.json:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump({"title": dt.get("title", ""), "testcases": cases},
                      f, ensure_ascii=False, indent=2)
        print(f"[đã ghi test case JSON: {args.json}]", file=sys.stderr)


if __name__ == "__main__":
    main()