# Result analysis reference

Analysis turns raw k6 output into defensible statements. The bar is *evidence*, not narrative.

---

## Read the whole picture, not one metric

Evaluate together:

```
Latency distribution  (avg, p50, p90, p95, p99, max — the shape matters more than any single point)
Throughput            (req/s, iterations/s — does it rise, plateau, or fall as VUs increase?)
Error rate            (http_req_failed) AND per-check failure rates
Checks                (business assertions, not just status)
Iterations            (completed vs started; dropped iterations signal saturation)
HTTP request count    (volume actually generated)
VU behavior           (were target VUs actually reached and sustained?)
Threshold results     (which passed/failed, and were they SLA or provisional?)
```

Correlate with system-side signals **when you can get them** — they turn hypotheses into
confirmations:

```
CPU   memory   database utilization / slow queries   connection pool saturation
event loop lag (single-threaded runtimes)   network   GC pauses   disk I/O
```

k6 numbers alone rarely prove *where* a bottleneck is; they show *that* one exists.

---

## Classify every failure before concluding

A failed request is not automatically an application-performance problem. Bucket each one:

**Infrastructure / transport**
```
timeout   connection refused / reset   DNS failure   TLS error   5xx from a crash/overload
```
These often *do* relate to capacity — but could also be the load generator, network, or a
dependency.

**Business errors (frequently valid behavior)**
```
invalid coupon   insufficient stock   checkout rejected   authorization failure   validation 4xx
```
A correct 400/403/409 under load may mean the app is working *as designed*. Don't count expected
rejections as performance failures. This is why checks must validate the body/state, not just 200.

**Test-data errors (your fault, not the app's)**
```
invalid credentials   missing/duplicate record   dataset exhausted mid-run   stale fixture
```
Fix the data and re-run; don't attribute these to the system under test.

If you can't yet tell which bucket a failure is in, say so — that's an open question, not a
conclusion.

---

## Breaking-point analysis

Do **not** emit false precision like "the system breaks at 100 VUs." Instead identify:

- where latency **starts** degrading (percentiles rising above baseline),
- where error rate becomes **significant** (and of which class),
- where throughput **plateaus or drops** despite more VUs,
- where timeouts/dropped iterations appear,
- where thresholds cross,
- whether degradation is **gradual** (soft limit) or **sudden** (hard cliff).

If the stage granularity can't resolve the exact boundary, report a **range** and say so:

```
Within the provisional latency target through ~50 VUs.
Significant degradation observed between 50 and 100 VUs.
Exact breaking point not resolvable at current stage resolution — needs finer stages to confirm.
```

---

## Database & component attribution

The target may use SQLite, PostgreSQL, MySQL, MongoDB, Redis, or anything else — inspect config
to know which, but **do not assume the DB is the bottleneck.** k6 measures the client's view of
the system; it cannot, by itself, prove a database (or pool, or GC, or dependency) is the cause.
Claim a specific component only with corroborating evidence (server metrics, slow-query logs,
pool-exhaustion counters, saturation graphs that line up in time with the k6 degradation).

---

## Environment validity & claim strength

State the environment and its confounders so readers know how far results generalize:

```
laptop CPU limits   local vs real network   Docker/cloud resource caps   load-generator saturation
cold starts   caching (warm vs cold)   rate limiting   external API dependencies   test-data exhaustion
```

Tag every finding by strength:

```
OBSERVED    p95 rose from 120ms to 780ms between 50 and 100 VUs.            (raw data)
HYPOTHESIS  likely connection-pool contention given the sharp p99 knee.    (plausible, unproven)
CONFIRMED   pool saturation — server showed 100/100 connections in use     (evidence corroborates)
            at the same timestamps.
```

A good report is mostly OBSERVED, clearly flags HYPOTHESIS, and only writes CONFIRMED when the
evidence is actually there.
