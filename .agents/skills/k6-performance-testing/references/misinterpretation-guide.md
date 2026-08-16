# AI misinterpretation guide (mandatory self-check)

Run every performance conclusion through this list before writing the final report. These are the
reasoning errors LLMs make most often when reading k6 output. For each, the pattern is:
**tempting-but-wrong claim → what the data actually supports.**

---

### 1. Tested ceiling ≠ measured capacity
- ❌ "Errors appeared at 100 VUs, so the system supports only 99 users."
- ✅ The test reached 100 concurrent VUs and observed failures at that level. That's the highest
  point *tested*, not a measured capacity limit. VUs are not real users, and the boundary needs
  finer stages plus failure classification to locate.

### 2. Percentiles are distributions, not per-request values
- ❌ "p95 = 500ms, so every request takes 500ms."
- ✅ Roughly 95% of observed requests were at or below 500ms; 5% were slower (check p99/max for
  the tail). It says nothing about the median or the fastest requests.

### 3. Zero transport failures ≠ healthy
- ❌ "http_req_failed = 0%, so the system is healthy."
- ✅ No transport-level failures says nothing about latency, throughput, business correctness, or
  whether a bottleneck is forming. Check latency percentiles, checks, and throughput too.

### 4. HTTP 200 ≠ business success
- ❌ "Status 200, so the operation succeeded."
- ✅ A 200 can still carry an error body, an empty result, or a no-op. Validate the response body
  and expected state with `check`, not just the status code.

### 5. More VUs ≠ more throughput
- ❌ "Add VUs and throughput keeps going up."
- ✅ Beyond saturation, throughput plateaus or *drops* while latency and errors climb. Rising VUs
  with flat/falling req/s is the signature of saturation, not headroom.

### 6. Test failure ≠ application broken
- ❌ "The stress test failed, so the application is broken."
- ✅ First rule out: environment capacity, DB limits, connection pools, external dependencies,
  rate limiting, **load-generator saturation**, and test-data problems. Only after those are
  excluded is the application itself implicated.

### 7. Local numbers ≠ production numbers
- ❌ "It does 2000 req/s on my laptop, so prod will too."
- ✅ Laptop CPU, local network, Docker caps, cold starts, and caching all skew results. Results
  are valid *for the environment they ran in*; generalize only with matching conditions.

### 8. Correlation in time ≠ proven cause
- ❌ "Latency rose, so the database is the bottleneck."
- ✅ Co-occurring latency and a suspected component is a hypothesis. Confirm with server-side
  evidence (metrics/logs that line up in time) before calling it a confirmed bottleneck.

### 9. Averages hide the tail
- ❌ "Average latency is 90ms, so users are fine."
- ✅ A low average can hide a brutal p99/max. Users feel the tail. Report the distribution.

### 10. Thresholds are only as authoritative as their source
- ❌ "It missed p95<500ms, so it fails the SLA."
- ✅ Only if 500ms *is* the SLA. If you chose it as a provisional baseline, say the result is
  relative to that baseline — don't launder a guess into a requirement.

---

## Before you finalize, confirm:
- [ ] No claim states a capacity number the stages can't actually resolve.
- [ ] Percentiles are described as distributions, not per-request times.
- [ ] "Healthy"/"passing" claims rest on latency + errors + checks + throughput together.
- [ ] Business success is backed by body/state checks, not status alone.
- [ ] Any bottleneck named as CONFIRMED has corroborating server-side evidence.
- [ ] Environment confounders are stated.
- [ ] Every conclusion is tagged OBSERVED / HYPOTHESIS / CONFIRMED.
