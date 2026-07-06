#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
dtable.py — Engine phân tích Decision Table.

Đầu vào: 1 file JSON đặc tả requirement đã được bóc tách thành điều kiện / hành động / logic.
Đầu ra: bảng đầy đủ, bảng rút gọn, đánh giá rủi ro rút gọn, và (tùy chọn) bảng pairwise.

Cách dùng:
    python dtable.py spec.json                 # in bảng đầy đủ + rút gọn + rủi ro (Markdown)
    python dtable.py spec.json --pairwise       # in thêm bảng pairwise
    python dtable.py spec.json --emit-dt dt.json # ghi decision table dạng JSON (bàn giao cho skill sinh test case)
    python dtable.py spec.json --json data.json  # ghi toàn bộ cấu trúc đã tính ra JSON

Schema spec.json:
{
  "title": "Tên requirement",
  "conditions": [
    {"id": "C1", "name": "Mô tả điều kiện", "values": ["T", "F"], "interaction_risk": false}
  ],
  "actions": [
    {"id": "A1", "name": "Mô tả hành động"}
  ],
  "logic": [
    {"when": {"C1": "T", "C2": "T"}, "then": ["A1"]},
    {"when": {"C1": "F"},            "then": ["A3"]},
    {"when": {},                     "then": ["A2"]}   // catch-all/mặc định
  ]
}
- values: tập giá trị rời rạc của điều kiện (nhị phân T/F hoặc đa trị).
- interaction_risk (tùy chọn): đánh dấu điều kiện nghi có tương tác/biên dễ lỗi.
- logic: áp dụng theo THỨ TỰ, rule khớp đầu tiên thắng; "when": {} khớp mọi tổ hợp.
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
from collections import defaultdict

DC = "—"  # ký hiệu don't-care


def load_spec(path):
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    for key in ("conditions", "actions", "logic"):
        if key not in spec:
            sys.exit(f"[LỖI] spec thiếu trường bắt buộc: '{key}'")
    for c in spec["conditions"]:
        if not c.get("values"):
            sys.exit(f"[LỖI] điều kiện {c.get('id')} không có 'values'")
    return spec


def cond_ids(spec):
    return [c["id"] for c in spec["conditions"]]


def values_map(spec):
    return {c["id"]: list(c["values"]) for c in spec["conditions"]}


def match_logic(combo, logic):
    """Trả về tuple actions cho 1 tổ hợp đầy đủ; None nếu không rule nào khớp (gap)."""
    for entry in logic:
        when = entry.get("when", {})
        if all(combo.get(k) == v for k, v in when.items()):
            return tuple(entry.get("then", []))
    return None


def build_full(spec):
    """Sinh bảng đầy đủ: mọi tổ hợp giá trị điều kiện -> actions."""
    cids = cond_ids(spec)
    vmap = values_map(spec)
    rules, gaps = [], []
    for prod in itertools.product(*[vmap[c] for c in cids]):
        combo = dict(zip(cids, prod))
        actions = match_logic(combo, spec["logic"])
        if actions is None:
            gaps.append(combo)
            actions = tuple()
        r = dict(combo)
        r["__actions__"] = actions
        rules.append(r)
    return rules, gaps


def _dedupe(rules, cids):
    seen, out = set(), []
    for r in rules:
        key = tuple(r[c] for c in cids) + (r["__actions__"],)
        if key not in seen:
            seen.add(key)
            out.append(r)
    return out


def _subsumed_by(a, b, cids):
    """b bao trùm a nếu cùng actions và mỗi điều kiện b là '—' hoặc bằng a; b tổng quát hơn."""
    if a["__actions__"] != b["__actions__"]:
        return False
    more_general = False
    for c in cids:
        if b[c] == DC and a[c] != DC:
            more_general = True
        elif b[c] != a[c]:
            return False
    return more_general


def _remove_subsumed(rules, cids):
    keep = []
    for i, a in enumerate(rules):
        if any(j != i and _subsumed_by(a, b, cids) for j, b in enumerate(rules)):
            continue
        keep.append(a)
    return keep


def collapse(full_rules, spec):
    """Gộp các rule cùng tập action khi một điều kiện đã phủ hết mọi giá trị -> '—'."""
    cids = cond_ids(spec)
    vmap = values_map(spec)
    groups = defaultdict(list)
    for r in full_rules:
        groups[r["__actions__"]].append({c: r[c] for c in cids})

    collapsed = []
    for actions, grp in groups.items():
        rules = [dict(r) for r in grp]
        changed = True
        while changed:
            changed = False
            for cid in cids:
                buckets = defaultdict(list)
                for idx, r in enumerate(rules):
                    key = tuple((c, r[c]) for c in cids if c != cid)
                    buckets[key].append(idx)
                for _key, idxs in buckets.items():
                    by_val = {}
                    for i in idxs:
                        by_val.setdefault(rules[i][cid], i)
                    if set(by_val.keys()) == set(vmap[cid]):
                        base = dict(rules[by_val[vmap[cid][0]]])
                        base[cid] = DC
                        consumed = set(by_val.values())
                        rules = [r for k, r in enumerate(rules) if k not in consumed]
                        rules.append(base)
                        changed = True
                        break
                if changed:
                    break
        for r in rules:
            rr = dict(r)
            rr["__actions__"] = actions
            collapsed.append(rr)

    collapsed = _dedupe(collapsed, cids)
    collapsed = _remove_subsumed(collapsed, cids)
    return collapsed


def expand_rule(rule, spec):
    """Khai triển 1 rule (có thể chứa '—') thành các tổ hợp đầy đủ."""
    cids = cond_ids(spec)
    vmap = values_map(spec)
    choices = [[rule[c]] if rule[c] != DC else vmap[c] for c in cids]
    out = []
    for prod in itertools.product(*choices):
        out.append(dict(zip(cids, prod)))
    return out


def verify(collapsed, full_rules, spec):
    """Kiểm tra bảng rút gọn tái tạo đúng ánh xạ của bảng đầy đủ."""
    cids = cond_ids(spec)
    full_map = {tuple(r[c] for c in cids): r["__actions__"] for r in full_rules}
    for r in collapsed:
        for combo in expand_rule(r, spec):
            key = tuple(combo[c] for c in cids)
            if full_map.get(key) != r["__actions__"]:
                return False, key
    return True, None


def risk(full_rules, collapsed, spec, gaps):
    cids = cond_ids(spec)
    vmap = values_map(spec)
    risky_conds = {c["id"] for c in spec["conditions"] if c.get("interaction_risk")}

    full_n = len(full_rules)
    red_n = len(collapsed)
    total_cells = red_n * len(cids)
    dc_cells = sum(1 for r in collapsed for c in cids if r[c] == DC)
    dc_density = (dc_cells / total_cells) if total_cells else 0.0
    collapse_ratio = (full_n / red_n) if red_n else 0.0

    rule_risks = []
    masked_risky = []
    for i, r in enumerate(collapsed):
        dc_conds = [c for c in cids if r[c] == DC]
        span = 1
        for c in dc_conds:
            span *= len(vmap[c])
        share = (span / full_n) if full_n else 0.0
        flagged = [c for c in dc_conds if c in risky_conds]
        if flagged:
            masked_risky.extend(flagged)
        rule_risks.append({
            "rule_index": i,
            "dont_care_conditions": dc_conds,
            "represents_combinations": span,
            "share_of_full": round(share, 3),
            "flagged_interaction_conditions": flagged,
        })

    max_share = max((rr["share_of_full"] for rr in rule_risks), default=0.0)
    level = "THẤP"
    reasons = []
    if dc_density >= 0.5 or max_share >= 0.25:
        level = "CAO"
    elif dc_density >= 0.25 or max_share >= 0.125:
        level = "TRUNG BÌNH"
    if masked_risky:
        level = "CAO"
        reasons.append(
            "Điều kiện nghi có tương tác/biên đã bị che bằng '—': "
            + ", ".join(sorted(set(masked_risky)))
        )
    if gaps:
        reasons.append(
            f"Có {len(gaps)} tổ hợp KHÔNG được logic nào phủ (requirement có lỗ hổng/chưa rõ)."
        )
    if dc_density >= 0.5:
        reasons.append("Mật độ '—' ≥ 50%: bảng rút gọn ngầm định rất nhiều, dễ bỏ sót lỗi tương tác.")
    if max_share >= 0.25:
        reasons.append("Có rule đại diện cho ≥ 25% bảng đầy đủ: một dòng test gánh quá nhiều tổ hợp.")
    if not reasons:
        reasons.append("Mức rút gọn ở ngưỡng an toàn; vẫn nên rà các '—' nằm trên điều kiện quan trọng.")

    return {
        "full_count": full_n,
        "reduced_count": red_n,
        "masked_combinations": full_n - red_n,
        "collapse_ratio": round(collapse_ratio, 2),
        "dont_care_cells": dc_cells,
        "dont_care_density": round(dc_density, 3),
        "max_rule_share": round(max_share, 3),
        "level": level,
        "reasons": reasons,
        "per_rule": rule_risks,
        "gaps_count": len(gaps),
    }


def pairwise(spec):
    """Sinh tập all-pairs (mọi cặp giá trị của 2 điều kiện bất kỳ xuất hiện ≥ 1 lần) bằng greedy."""
    cids = cond_ids(spec)
    vmap = values_map(spec)
    if len(cids) < 2:
        return [dict(zip(cids, prod)) for prod in itertools.product(*[vmap[c] for c in cids])]

    uncovered = set()
    for a, b in itertools.combinations(cids, 2):
        for va in vmap[a]:
            for vb in vmap[b]:
                uncovered.add((a, va, b, vb))

    tests = []
    guard = 0
    while uncovered and guard < 100000:
        guard += 1
        best = None
        # khởi tạo greedy: chọn lần lượt giá trị cho từng điều kiện tối đa hoá số cặp mới phủ
        candidate = {}
        for cid in cids:
            best_val, best_gain = None, -1
            for v in vmap[cid]:
                gain = 0
                for ocid, oval in candidate.items():
                    pair = _norm_pair(ocid, oval, cid, v)
                    if pair in uncovered:
                        gain += 1
                if gain > best_gain:
                    best_gain, best_val = gain, v
            candidate[cid] = best_val
        # cập nhật các cặp đã phủ
        newly = set()
        for a, b in itertools.combinations(cids, 2):
            newly.add(_norm_pair(a, candidate[a], b, candidate[b]))
        if not (newly & uncovered):
            # không tiến triển -> ép phủ 1 cặp còn thiếu
            a, va, b, vb = next(iter(uncovered))
            candidate[a], candidate[b] = va, vb
            newly = set()
            for x, y in itertools.combinations(cids, 2):
                newly.add(_norm_pair(x, candidate[x], y, candidate[y]))
        uncovered -= newly
        tests.append(candidate)

    # gán outcome cho mỗi test
    for t in tests:
        t["__actions__"] = match_logic(t, spec["logic"]) or tuple()
    return tests


def _norm_pair(a, va, b, vb):
    if a <= b:
        return (a, va, b, vb)
    return (b, vb, a, va)


# ----------------------------- Render Markdown -----------------------------

def _name(spec, key, _id):
    for item in spec[key]:
        if item["id"] == _id:
            return item["name"]
    return _id


def render_table(rules, spec, title):
    cids = cond_ids(spec)
    aids = [a["id"] for a in spec["actions"]]
    lines = [f"### {title}", ""]
    header = ["#"] + cids + aids
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for i, r in enumerate(rules, 1):
        row = [str(i)]
        row += [str(r[c]) for c in cids]
        acts = set(r["__actions__"])
        row += ["✔" if a in acts else "" for a in aids]
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")
    lines.append("**Chú giải điều kiện:** " + "; ".join(f"{c} = {_name(spec,'conditions',c)}" for c in cids))
    lines.append("")
    lines.append("**Chú giải hành động:** " + "; ".join(f"{a} = {_name(spec,'actions',a)}" for a in aids))
    lines.append("")
    return "\n".join(lines)


def render_risk(rk, spec):
    cids_names = {c["id"]: c["name"] for c in spec["conditions"]}
    out = ["### Đánh giá rủi ro rút gọn quá mức (over-reduction)", ""]
    out.append(f"- Số rule bảng đầy đủ: **{rk['full_count']}** → bảng rút gọn: **{rk['reduced_count']}** "
               f"(ẩn đi {rk['masked_combinations']} tổ hợp).")
    out.append(f"- Tỉ lệ rút gọn (collapse ratio): **{rk['collapse_ratio']}×**.")
    out.append(f"- Mật độ ô '—' (don't-care density): **{rk['dont_care_density']*100:.0f}%** "
               f"({rk['dont_care_cells']} ô).")
    out.append(f"- Rule gánh nhiều nhất: **{rk['max_rule_share']*100:.0f}%** bảng đầy đủ.")
    if rk["gaps_count"]:
        out.append(f"- ⚠️ Lỗ hổng phủ: **{rk['gaps_count']}** tổ hợp chưa có logic xử lý.")
    out.append("")
    out.append(f"**Mức rủi ro tổng thể: {rk['level']}**")
    out.append("")
    out.append("**Lý do / cảnh báo:**")
    for r in rk["reasons"]:
        out.append(f"- {r}")
    out.append("")
    # liệt kê rule rủi ro cao
    hot = [pr for pr in rk["per_rule"] if pr["flagged_interaction_conditions"] or pr["share_of_full"] >= 0.25]
    if hot:
        out.append("**Rule cần soi kỹ (nên cân nhắc mở rộng lại):**")
        for pr in hot:
            dc = ", ".join(cids_names.get(c, c) for c in pr["dont_care_conditions"]) or "(không)"
            out.append(f"- Rule #{pr['rule_index']+1}: '—' tại [{dc}], đại diện {pr['represents_combinations']} tổ hợp "
                       f"({pr['share_of_full']*100:.0f}%)."
                       + (f" Cờ tương tác: {', '.join(pr['flagged_interaction_conditions'])}." if pr["flagged_interaction_conditions"] else ""))
        out.append("")
    return "\n".join(out)


def render_pairwise(tests, spec):
    cids = cond_ids(spec)
    aids = [a["id"] for a in spec["actions"]]
    lines = ["### Bảng Pairwise (all-pairs) — mở rộng lại có kiểm soát", ""]
    lines.append(f"_Phủ mọi cặp giá trị của 2 điều kiện bất kỳ chỉ với **{len(tests)}** dòng "
                 f"(so với {1}× bảng đầy đủ)._")
    lines.append("")
    header = ["#"] + cids + aids
    lines.append("| " + " | ".join(header) + " |")
    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
    for i, t in enumerate(tests, 1):
        row = [str(i)] + [str(t[c]) for c in cids]
        acts = set(t["__actions__"])
        row += ["✔" if a in acts else "" for a in aids]
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")
    return "\n".join(lines)


def decision_table_json(rules, spec):
    """Xuất decision table dạng JSON để bàn giao cho skill sinh test case."""
    return {
        "title": spec.get("title", ""),
        "conditions": spec["conditions"],
        "actions": spec["actions"],
        "rules": [
            {
                "id": f"R{i}",
                "conditions": {c["id"]: r[c["id"]] for c in spec["conditions"]},
                "actions": list(r["__actions__"]),
            }
            for i, r in enumerate(rules, 1)
        ],
    }


def main():
    ap = argparse.ArgumentParser(description="Engine phân tích Decision Table")
    ap.add_argument("spec", help="file spec JSON")
    ap.add_argument("--pairwise", action="store_true", help="in thêm bảng pairwise")
    ap.add_argument("--full-only", action="store_true", help="chỉ in bảng đầy đủ")
    ap.add_argument("--emit-dt", metavar="FILE", help="ghi decision table (bảng rút gọn) ra JSON cho skill sinh test case")
    ap.add_argument("--emit-dt-full", action="store_true", help="dùng bảng đầy đủ khi --emit-dt")
    ap.add_argument("--json", metavar="FILE", help="ghi toàn bộ cấu trúc đã tính ra JSON")
    args = ap.parse_args()

    spec = load_spec(args.spec)
    full_rules, gaps = build_full(spec)
    collapsed = collapse(full_rules, spec)
    ok, bad = verify(collapsed, full_rules, spec)

    rk = risk(full_rules, collapsed, spec, gaps)

    title = spec.get("title", "Decision Table")
    blocks = [f"# Phân tích Decision Table: {title}", ""]
    blocks.append(render_table(full_rules, spec, "1) Bảng đầy đủ (Full Decision Table)"))
    if gaps:
        blocks.append(f"> ⚠️ Có {len(gaps)} tổ hợp không khớp logic nào (hiển thị không có hành động). "
                      "Cần làm rõ requirement.\n")
    if not args.full_only:
        blocks.append(render_table(collapsed, spec, "2) Bảng rút gọn (Collapsed Decision Table)"))
        if not ok:
            blocks.append(f"> ❌ CẢNH BÁO: bảng rút gọn KHÔNG tái tạo đúng tổ hợp {bad}. "
                          "Không dùng bảng rút gọn này.\n")
        blocks.append(render_risk(rk, spec))
    if args.pairwise:
        blocks.append(render_pairwise(pairwise(spec), spec))

    print("\n".join(blocks))

    if args.emit_dt:
        src = full_rules if args.emit_dt_full else collapsed
        with open(args.emit_dt, "w", encoding="utf-8") as f:
            json.dump(decision_table_json(src, spec), f, ensure_ascii=False, indent=2)
        print(f"\n[đã ghi decision table JSON: {args.emit_dt}]", file=sys.stderr)

    if args.json:
        payload = {
            "title": title,
            "full": [{**{c: r[c] for c in cond_ids(spec)}, "actions": list(r["__actions__"])} for r in full_rules],
            "collapsed": [{**{c: r[c] for c in cond_ids(spec)}, "actions": list(r["__actions__"])} for r in collapsed],
            "risk": rk,
            "gaps": gaps,
            "verified": ok,
        }
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        print(f"[đã ghi cấu trúc JSON: {args.json}]", file=sys.stderr)


if __name__ == "__main__":
    main()