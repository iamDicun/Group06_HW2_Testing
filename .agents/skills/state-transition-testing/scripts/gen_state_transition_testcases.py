#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_state_transition_testcases.py — Thiết kế & sinh test case theo State Transition
Testing (kiểm thử chuyển trạng thái).

Đầu vào: 1 file JSON mô tả máy trạng thái (state machine). Đầu ra: bảng chuyển
trạng thái + test case theo các mức độ phủ (0-switch, 1-switch, N-switch, và
chuyển tiếp không hợp lệ) — Markdown tiếng Việt.

Cách dùng:
    python3 gen_state_transition_testcases.py spec.json
    python3 gen_state_transition_testcases.py spec.json --n-switch 2
    python3 gen_state_transition_testcases.py spec.json --skip-invalid
    python3 gen_state_transition_testcases.py spec.json --prefix TC --json out.json

Schema spec.json:
{
  "title": "Tên máy trạng thái",
  "initial_state": "S1",
  "states":  [{"id": "S1", "name": "Chưa đăng nhập"}, ...],
  "events":  [{"id": "E1", "name": "Đăng nhập thành công"}, ...],
  "transitions": [
    {"from": "S1", "event": "E1", "to": "S2", "guard": "mật khẩu đúng", "action": "tạo phiên"}
  ]
}
- "guard" và "action" là tùy chọn.
- Sự kiện xảy ra ở một trạng thái mà KHÔNG có transition tương ứng trong danh
  sách "transitions" được xem là tổ hợp (trạng thái, sự kiện) KHÔNG HỢP LỆ.
"""

import argparse
import json
import signal
import sys
from collections import deque

try:
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)
except (AttributeError, ValueError):
    pass


def load_spec(path):
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    for key in ("states", "events", "transitions", "initial_state"):
        if key not in spec:
            sys.exit(f"[LỖI] spec thiếu trường: '{key}'")
    return spec


def name_of(items, iid):
    for it in items:
        if it["id"] == iid:
            return it.get("name", iid)
    return iid


def state_name(spec, sid):
    return name_of(spec["states"], sid)


def event_name(spec, eid):
    return name_of(spec["events"], eid)


def transition_label(spec, t):
    parts = [f"sự kiện **{event_name(spec, t['event'])}**"]
    if t.get("guard"):
        parts.append(f"(điều kiện: {t['guard']})")
    return " ".join(parts)


def build_graph(spec):
    """state_id -> list of transitions xuất phát từ đó."""
    graph = {s["id"]: [] for s in spec["states"]}
    for t in spec["transitions"]:
        if t["from"] not in graph:
            sys.exit(f"[LỖI] transition tham chiếu trạng thái nguồn không tồn tại: {t['from']}")
        if t["to"] not in graph and t["to"] not in [s["id"] for s in spec["states"]]:
            sys.exit(f"[LỖI] transition tham chiếu trạng thái đích không tồn tại: {t['to']}")
        graph[t["from"]].append(t)
    return graph


def shortest_paths_from_initial(spec, graph):
    """BFS: state_id -> đường đi ngắn nhất (list transitions) từ initial_state tới đó."""
    init = spec["initial_state"]
    paths = {init: []}
    q = deque([init])
    while q:
        cur = q.popleft()
        for t in graph.get(cur, []):
            nxt = t["to"]
            if nxt not in paths:
                paths[nxt] = paths[cur] + [t]
                q.append(nxt)
    return paths


def path_to_steps(spec, path):
    """Mô tả các bước thiết lập tiền điều kiện để đi tới 1 trạng thái."""
    if not path:
        return ["Hệ thống ở trạng thái khởi tạo (initial state)."]
    steps = []
    for t in path:
        steps.append(
            f"Từ trạng thái **{state_name(spec, t['from'])}**, kích hoạt "
            f"{transition_label(spec, t)} → hệ thống chuyển sang "
            f"**{state_name(spec, t['to'])}**."
        )
    return steps


def find_unreachable(spec, paths):
    return [s["id"] for s in spec["states"] if s["id"] not in paths]


# ---------------------------------------------------------------------------
# Sinh test case theo từng mức độ phủ
# ---------------------------------------------------------------------------

def gen_0switch(spec, paths, prefix, counter):
    """Phủ trạng thái: mỗi state ≥ 1 test case xác nhận hệ thống tới được đó."""
    cases = []
    for s in spec["states"]:
        sid = s["id"]
        if sid not in paths:
            continue
        counter[0] += 1
        tcid = f"{prefix}{counter[0]:03d}"
        cases.append({
            "id": tcid,
            "kind": "0-switch (phủ trạng thái)",
            "title": f"Đạt tới trạng thái {state_name(spec, sid)}",
            "setup_steps": path_to_steps(spec, paths[sid]),
            "action_step": "Quan sát trạng thái hiện tại của hệ thống.",
            "expected": f"Hệ thống đang ở trạng thái **{state_name(spec, sid)}**.",
            "priority": "Trung bình",
        })
    return cases


def gen_1switch(spec, paths, prefix, counter):
    """Phủ chuyển tiếp: mỗi transition hợp lệ ≥ 1 test case."""
    cases = []
    for t in spec["transitions"]:
        if t["from"] not in paths:
            continue  # không tới được trạng thái nguồn -> không thể test transition này
        counter[0] += 1
        tcid = f"{prefix}{counter[0]:03d}"
        setup = path_to_steps(spec, paths[t["from"]])
        expected = f"Hệ thống chuyển sang trạng thái **{state_name(spec, t['to'])}**."
        if t.get("action"):
            expected += f" Hệ thống thực hiện: {t['action']}."
        cases.append({
            "id": tcid,
            "kind": "1-switch (phủ chuyển tiếp)",
            "title": (f"{state_name(spec, t['from'])} --[{event_name(spec, t['event'])}]--> "
                      f"{state_name(spec, t['to'])}"),
            "setup_steps": setup,
            "action_step": f"Kích hoạt {transition_label(spec, t)}.",
            "expected": expected,
            "priority": "Cao",
        })
    return cases


def gen_invalid(spec, paths, prefix, counter):
    """Với mỗi trạng thái, các sự kiện KHÔNG có transition định nghĩa -> test âm."""
    cases = []
    valid_events_at = {}
    for t in spec["transitions"]:
        valid_events_at.setdefault(t["from"], set()).add(t["event"])

    for s in spec["states"]:
        sid = s["id"]
        if sid not in paths:
            continue
        defined = valid_events_at.get(sid, set())
        for e in spec["events"]:
            if e["id"] in defined:
                continue
            counter[0] += 1
            tcid = f"{prefix}{counter[0]:03d}"
            cases.append({
                "id": tcid,
                "kind": "Chuyển tiếp không hợp lệ",
                "title": (f"{state_name(spec, sid)} nhận sự kiện KHÔNG hợp lệ "
                          f"{event_name(spec, e['id'])}"),
                "setup_steps": path_to_steps(spec, paths[sid]),
                "action_step": f"Kích hoạt sự kiện **{event_name(spec, e['id'])}**.",
                "expected": ("Hệ thống PHẢI từ chối / báo lỗi và giữ nguyên trạng thái "
                             f"**{state_name(spec, sid)}** (không có transition nào định "
                             "nghĩa cho tổ hợp này — cần xác nhận đây là hành vi mong muốn)."),
                "priority": "Cao",
            })
    return cases


def gen_nswitch(spec, graph, paths, n, prefix, counter):
    """N-switch coverage: liệt kê các chuỗi n transition liên tiếp hợp lệ, xuất phát
    từ initial_state. Đây là dạng phủ chuỗi sự kiện (path coverage) sâu hơn 1-switch."""
    init = spec["initial_state"]
    sequences = []

    def dfs(state_id, path):
        if len(path) == n:
            sequences.append(list(path))
            return
        for t in graph.get(state_id, []):
            # tránh lặp vô hạn: giới hạn số lần một transition xuất hiện lại trong 1 chuỗi
            if path.count(t) >= 2:
                continue
            dfs(t["to"], path + [t])

    dfs(init, [])

    cases = []
    for seq in sequences:
        counter[0] += 1
        tcid = f"{prefix}{counter[0]:03d}"
        title = " → ".join(
            f"{state_name(spec, t['from'])}-[{event_name(spec, t['event'])}]" for t in seq
        ) + f" → {state_name(spec, seq[-1]['to'])}"
        steps = [f"Kích hoạt {transition_label(spec, t)} (đang ở {state_name(spec, t['from'])})."
                 for t in seq]
        cases.append({
            "id": tcid,
            "kind": f"{n}-switch (chuỗi {n} chuyển tiếp)",
            "title": title,
            "setup_steps": ["Hệ thống ở trạng thái khởi tạo (initial state)."],
            "action_step": " Sau đó ".join(steps),
            "expected": f"Sau chuỗi trên, hệ thống dừng ở trạng thái **{state_name(spec, seq[-1]['to'])}**.",
            "priority": "Trung bình",
        })
    return cases


# ---------------------------------------------------------------------------
# Trình bày
# ---------------------------------------------------------------------------

def render_transition_table(spec):
    lines = ["## Bảng chuyển trạng thái (State Transition Table)", ""]
    header = ["Từ trạng thái", "Sự kiện", "Điều kiện (guard)", "Đến trạng thái", "Hành động"]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for t in spec["transitions"]:
        lines.append("| " + " | ".join([
            state_name(spec, t["from"]),
            event_name(spec, t["event"]),
            t.get("guard", "—"),
            state_name(spec, t["to"]),
            t.get("action", "—"),
        ]) + " |")
    lines.append("")
    return lines


def render_cases(title, cases):
    if not cases:
        return []
    lines = [f"## {title} ({len(cases)} test case)", ""]
    header = ["Mã TC", "Tiêu đề", "Kết quả mong đợi", "Ưu tiên"]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for tc in cases:
        lines.append("| " + " | ".join([
            tc["id"], tc["title"].replace("|", "/"),
            tc["expected"].replace("|", "/"), tc["priority"],
        ]) + " |")
    lines.append("")
    for tc in cases:
        lines.append(f"### {tc['id']} — {tc['title']}")
        lines.append(f"- **Loại phủ:** {tc['kind']}")
        lines.append(f"- **Ưu tiên:** {tc['priority']}")
        lines.append("- **Tiền điều kiện / thiết lập:**")
        for s in tc["setup_steps"]:
            lines.append(f"  - {s}")
        lines.append(f"- **Bước thực hiện:** {tc['action_step']}")
        lines.append(f"- **Kết quả mong đợi:** {tc['expected']}")
        lines.append("")
    return lines


def render_markdown(spec, groups, unreachable):
    lines = [f"# Test case chuyển trạng thái: {spec.get('title', '(không tên)')}", ""]
    total = sum(len(g[1]) for g in groups)
    lines.append(f"_Tổng cộng **{total}** test case, xuất phát từ trạng thái khởi tạo "
                 f"**{state_name(spec, spec['initial_state'])}**._")
    lines.append("")
    if unreachable:
        lines.append("> ⚠️ **Trạng thái KHÔNG thể tới được** từ initial_state qua các "
                     "transition đã khai báo: " +
                     ", ".join(state_name(spec, s) for s in unreachable) +
                     ". Đây có thể là lỗ hổng đặc tả (thiếu transition) — cần xác nhận.")
        lines.append("")
    lines.extend(render_transition_table(spec))
    for title, cases in groups:
        lines.extend(render_cases(title, cases))
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description="Sinh test case theo State Transition Testing")
    ap.add_argument("spec", help="file spec JSON máy trạng thái")
    ap.add_argument("--n-switch", type=int, default=0, metavar="N",
                    help="thêm phủ chuỗi N chuyển tiếp liên tiếp (N-switch coverage), N>=2")
    ap.add_argument("--skip-invalid", action="store_true",
                    help="bỏ qua sinh test case cho tổ hợp (trạng thái, sự kiện) không hợp lệ")
    ap.add_argument("--prefix", default="TC", help="tiền tố mã test case (mặc định TC)")
    ap.add_argument("--json", metavar="FILE", help="ghi cấu trúc test case ra JSON")
    args = ap.parse_args()

    spec = load_spec(args.spec)
    graph = build_graph(spec)
    paths = shortest_paths_from_initial(spec, graph)
    unreachable = find_unreachable(spec, paths)

    counter = [0]
    groups = []
    groups.append(("Test case 0-switch — Phủ trạng thái", gen_0switch(spec, paths, args.prefix, counter)))
    groups.append(("Test case 1-switch — Phủ chuyển tiếp hợp lệ", gen_1switch(spec, paths, args.prefix, counter)))
    if not args.skip_invalid:
        groups.append(("Test case chuyển tiếp KHÔNG hợp lệ", gen_invalid(spec, paths, args.prefix, counter)))
    if args.n_switch and args.n_switch >= 2:
        groups.append((f"Test case {args.n_switch}-switch — Phủ chuỗi chuyển tiếp",
                        gen_nswitch(spec, graph, paths, args.n_switch, args.prefix, counter)))

    print(render_markdown(spec, groups, unreachable))

    if unreachable:
        print(f"\n> ⚠️ Có {len(unreachable)} trạng thái không tới được từ initial_state.",
              file=sys.stderr)

    if args.json:
        all_cases = [tc for _, cases in groups for tc in cases]
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump({"title": spec.get("title", ""), "testcases": all_cases},
                      f, ensure_ascii=False, indent=2)
        print(f"[đã ghi test case JSON: {args.json}]", file=sys.stderr)


if __name__ == "__main__":
    main()