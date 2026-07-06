#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_usecase_testcases.py — Thiết kế & sinh test case theo Use Case Testing.

Đầu vào: 1 file JSON mô tả use case (actor, luồng chính, luồng thay thế, luồng
ngoại lệ). Đầu ra: bảng test case + thẻ chi tiết từng test case, mỗi luồng
(basic flow / alternate flow / exception flow) tương ứng ít nhất một test case
— Markdown tiếng Việt.

Cách dùng:
    python3 gen_usecase_testcases.py usecase.json
    python3 gen_usecase_testcases.py usecase.json --prefix TC --json out.json

Schema usecase.json:
{
  "title": "Tên use case",
  "actors": ["Khách hàng"],
  "preconditions": ["Khách đã đăng nhập"],
  "postconditions": {
    "success": ["Đơn hàng được tạo"],
    "failure": ["Không có gì thay đổi trong hệ thống"]
  },
  "main_flow": [
    {"id": "1", "text": "Khách chọn sản phẩm"},
    {"id": "2", "text": "Khách nhấn 'Thanh toán'"},
    {"id": "3", "text": "Hệ thống kiểm tra tồn kho"},
    {"id": "4", "text": "Hệ thống tạo đơn hàng"}
  ],
  "alternate_flows": [
    {
      "id": "AF1", "name": "Áp dụng mã giảm giá",
      "branch_at": "2",
      "steps": [{"text": "Khách nhập mã giảm giá"}, {"text": "Hệ thống áp dụng giảm giá"}],
      "rejoin_at": "3"
    }
  ],
  "exception_flows": [
    {
      "id": "EF1", "name": "Hết hàng",
      "branch_at": "3",
      "steps": [{"text": "Hệ thống phát hiện hết hàng"}],
      "result": "Hệ thống báo lỗi 'Hết hàng' và kết thúc use case"
    }
  ]
}
- "branch_at" tham chiếu tới "id" của một bước trong main_flow: luồng thay thế/
  ngoại lệ tách ra SAU bước đó.
- "rejoin_at" (chỉ dùng cho alternate_flows, tùy chọn): id bước main_flow mà
  luồng thay thế quay lại tiếp tục. Không có -> luồng thay thế tự kết thúc.
- exception_flows luôn kết thúc use case (không rejoin), dùng "result" để nêu
  kết quả/postcondition thất bại.
"""

import argparse
import json
import signal
import sys

try:
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)
except (AttributeError, ValueError):
    pass


def load_spec(path):
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    for key in ("main_flow",):
        if key not in spec:
            sys.exit(f"[LỖI] spec thiếu trường: '{key}'")
    return spec


def step_index(main_flow, step_id):
    for i, s in enumerate(main_flow):
        if s["id"] == step_id:
            return i
    sys.exit(f"[LỖI] không tìm thấy bước main_flow có id='{step_id}'")


def steps_upto(main_flow, step_id):
    return main_flow[: step_index(main_flow, step_id) + 1]


def steps_from(main_flow, step_id):
    return main_flow[step_index(main_flow, step_id):]


def render_step_texts(steps):
    return [s["text"] for s in steps]


def build_main_case(spec, prefix, counter):
    counter[0] += 1
    tcid = f"{prefix}{counter[0]:03d}"
    success = spec.get("postconditions", {}).get("success", ["(chưa nêu postcondition thành công)"])
    return {
        "id": tcid,
        "kind": "Luồng chính (Basic Flow / Happy Path)",
        "flow_id": "Basic Flow",
        "title": spec.get("title", "Luồng chính") + " — thành công",
        "steps": render_step_texts(spec["main_flow"]),
        "expected": success,
        "priority": "Cao",
    }


def build_alternate_case(spec, af, prefix, counter):
    main_flow = spec["main_flow"]
    counter[0] += 1
    tcid = f"{prefix}{counter[0]:03d}"
    steps = render_step_texts(steps_upto(main_flow, af["branch_at"]))
    steps.append(f"[Rẽ nhánh — {af.get('name', af['id'])}]")
    steps.extend(render_step_texts(af.get("steps", [])))
    rejoin = af.get("rejoin_at")
    if rejoin:
        rejoin_from = steps_from(main_flow, rejoin)
        steps.append(f"[Quay lại luồng chính tại bước {rejoin}]")
        steps.extend(render_step_texts(rejoin_from))
        success = spec.get("postconditions", {}).get(
            "success", ["(chưa nêu postcondition thành công)"])
        expected = list(success)
    else:
        expected = af.get("expected", ["(luồng thay thế tự kết thúc — cần nêu rõ kết quả)"])
        if isinstance(expected, str):
            expected = [expected]
    return {
        "id": tcid,
        "kind": "Luồng thay thế (Alternate Flow)",
        "flow_id": af["id"],
        "title": f"{spec.get('title', '')} — {af.get('name', af['id'])}".strip(" —"),
        "steps": steps,
        "expected": expected,
        "priority": "Trung bình",
    }


def build_exception_case(spec, ef, prefix, counter):
    main_flow = spec["main_flow"]
    counter[0] += 1
    tcid = f"{prefix}{counter[0]:03d}"
    steps = render_step_texts(steps_upto(main_flow, ef["branch_at"]))
    steps.append(f"[Rẽ nhánh ngoại lệ — {ef.get('name', ef['id'])}]")
    steps.extend(render_step_texts(ef.get("steps", [])))
    result = ef.get("result") or spec.get("postconditions", {}).get(
        "failure", ["(chưa nêu postcondition thất bại)"])
    if isinstance(result, str):
        result = [result]
    return {
        "id": tcid,
        "kind": "Luồng ngoại lệ (Exception Flow)",
        "flow_id": ef["id"],
        "title": f"{spec.get('title', '')} — {ef.get('name', ef['id'])}".strip(" —"),
        "steps": steps,
        "expected": result,
        "priority": "Cao",
    }


def render_cases(title, cases):
    if not cases:
        return []
    lines = [f"## {title} ({len(cases)} test case)", ""]
    header = ["Mã TC", "Tiêu đề", "Luồng", "Ưu tiên"]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for tc in cases:
        lines.append("| " + " | ".join([
            tc["id"], tc["title"].replace("|", "/"), tc["flow_id"], tc["priority"],
        ]) + " |")
    lines.append("")
    for tc in cases:
        lines.append(f"### {tc['id']} — {tc['title']}")
        lines.append(f"- **Loại luồng:** {tc['kind']}")
        lines.append(f"- **Ưu tiên:** {tc['priority']}")
        lines.append("- **Các bước:**")
        for i, s in enumerate(tc["steps"], 1):
            lines.append(f"  {i}. {s}")
        lines.append("- **Kết quả mong đợi / Postcondition:**")
        for e in tc["expected"]:
            lines.append(f"  - {e}")
        lines.append("")
    return lines


def render_header(spec):
    lines = [f"# Test case Use Case: {spec.get('title', '(không tên)')}", ""]
    if spec.get("actors"):
        lines.append("- **Actor:** " + ", ".join(spec["actors"]))
    if spec.get("preconditions"):
        lines.append("- **Tiền điều kiện (precondition) chung:**")
        for p in spec["preconditions"]:
            lines.append(f"  - {p}")
    post = spec.get("postconditions", {})
    if post.get("success"):
        lines.append("- **Postcondition thành công:** " + "; ".join(post["success"]))
    if post.get("failure"):
        lines.append("- **Postcondition thất bại:** " + "; ".join(post["failure"]))
    lines.append("")
    lines.append("## Luồng chính (Basic Flow) — nguồn tham chiếu")
    lines.append("")
    for s in spec["main_flow"]:
        lines.append(f"{s['id']}. {s['text']}")
    lines.append("")
    return lines


def main():
    ap = argparse.ArgumentParser(description="Sinh test case theo Use Case Testing")
    ap.add_argument("spec", help="file spec JSON use case")
    ap.add_argument("--prefix", default="TC", help="tiền tố mã test case (mặc định TC)")
    ap.add_argument("--json", metavar="FILE", help="ghi cấu trúc test case ra JSON")
    args = ap.parse_args()

    spec = load_spec(args.spec)
    counter = [0]

    main_case = build_main_case(spec, args.prefix, counter)
    alt_cases = [build_alternate_case(spec, af, args.prefix, counter)
                 for af in spec.get("alternate_flows", [])]
    exc_cases = [build_exception_case(spec, ef, args.prefix, counter)
                 for ef in spec.get("exception_flows", [])]

    out = []
    out.extend(render_header(spec))
    total = 1 + len(alt_cases) + len(exc_cases)
    out.append(f"_Tổng cộng **{total}** test case: 1 luồng chính, "
               f"{len(alt_cases)} luồng thay thế, {len(exc_cases)} luồng ngoại lệ._")
    out.append("")
    out.extend(render_cases("Test case — Luồng chính", [main_case]))
    out.extend(render_cases("Test case — Luồng thay thế", alt_cases))
    out.extend(render_cases("Test case — Luồng ngoại lệ", exc_cases))
    print("\n".join(out))

    if not spec.get("alternate_flows") and not spec.get("exception_flows"):
        print("\n> ⚠️ Use case này chưa khai báo luồng thay thế/ngoại lệ nào — "
              "chỉ có test case happy path. Hãy rà lại đặc tả xem có luồng rẽ "
              "nhánh nào (điều kiện đặc biệt, lỗi, dữ liệu không hợp lệ) bị bỏ sót.",
              file=sys.stderr)

    if args.json:
        all_cases = [main_case] + alt_cases + exc_cases
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump({"title": spec.get("title", ""), "testcases": all_cases},
                      f, ensure_ascii=False, indent=2)
        print(f"[đã ghi test case JSON: {args.json}]", file=sys.stderr)


if __name__ == "__main__":
    main()