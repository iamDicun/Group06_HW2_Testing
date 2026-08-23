import json
from collections import defaultdict

stats = defaultdict(lambda: {"values": [], "count": 0, "fails": 0})

with open("stress-test-raw.json", "r", encoding="utf-8") as f:
    for line in f:
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            continue
        if record.get("type") != "Point":
            continue
        metric = record.get("metric")
        if metric not in ("http_req_duration", "http_req_waiting", "http_reqs"):
            continue
        tags = record["data"].get("tags", {})
        name = tags.get("name", "unknown")  # endpoint/URL tag
        value = record["data"].get("value")
        key = f"{metric}::{name}"
        stats[key]["values"].append(value)
        stats[key]["count"] += 1
        if tags.get("expected_response") == "false":
            stats[key]["fails"] += 1

# Tính percentile thủ công (hoặc dùng numpy)
import statistics

summary = {}
for key, d in stats.items():
    vals = sorted(d["values"])
    n = len(vals)
    if n == 0:
        continue
    def pct(p):
        idx = int(n * p)
        return vals[min(idx, n - 1)]
    summary[key] = {
        "count": n,
        "avg": round(statistics.mean(vals), 2),
        "min": round(min(vals), 2),
        "max": round(max(vals), 2),
        "p50": round(pct(0.50), 2),
        "p90": round(pct(0.90), 2),
        "p95": round(pct(0.95), 2),
        "p99": round(pct(0.99), 2),
        "fail_count": d["fails"],
        "fail_rate_pct": round(d["fails"] / n * 100, 2),
    }

with open("stress-test-summary.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)