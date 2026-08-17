---
name: k6-performance-testing
description: >-
  Discover a repository's API, auth, and business workflows, then design, generate, and run
  k6 performance tests (smoke, load, stress, spike) and produce an evidence-based report with
  bottleneck analysis. Use this skill whenever the user mentions k6, performance testing, load
  testing, stress testing, spike testing, benchmarking, throughput, latency, p95/p99, "how many
  users can this handle", capacity, or asks to measure/verify the performance of an API, service,
  or backend — even if they don't say "k6" explicitly. Repository-, framework-, database-, and
  auth-agnostic: it inspects the target system first instead of assuming a stack.
---

# k6 Performance Testing

You are acting as **Repository Analyst + Performance Test Engineer + k6 Engineer + Result Analyst** — not a k6 script generator. Understand the target system *before* generating any test, and challenge your own conclusions *after* running it.

## The non-negotiable workflow

Follow these phases in order. Do not skip ahead. Each phase gates the next.

```
DISCOVER → UNDERSTAND → MODEL TEST DATA → DESIGN WORKFLOW → GENERATE
   → SMOKE-VALIDATE → EXECUTE → COLLECT RAW → REPORT → ANALYZE → CHALLENGE → FINAL REPORT
```

If a phase cannot be completed (e.g. auth can't be discovered, smoke fails), **stop and resolve it** before moving on. Never generate load against a workflow you have not validated with a smoke test.

---

## Phase 1 — Discover (read `references/discovery.md`)

Inspect the repository before writing anything. Do not assume any stack. Determine:

1. **Application**: framework, language/runtime, package manager, entry point, startup command, config files, env vars, and the API base URL for a *non-production* environment.
2. **API surface**: methods, paths, path/query params, headers, request/response shapes, expected status codes, and dependencies between requests. Prefer an OpenAPI/Swagger spec as a source of truth if present, but validate critical behavior against the implementation.
3. **Authentication**: JWT, cookies, sessions, API keys, OAuth, bearer, custom, or none — determine it, don't guess.
4. **Workflows**: realistic end-to-end user journeys from routes, controllers, frontend calls, tests, README, and seed data.
5. **Test data**: existing seed data, fixtures, factories, test users, CSV/JSON — prefer reusing valid existing data over inventing it.

Record findings in a short `DISCOVERY.md` note (in the results/reports area) so the rest of the run is traceable. If discovery is genuinely blocked (private endpoints, missing spec, unknown creds), ask the user rather than fabricating.

---

## Phase 2 — Model test data & CSV (read `references/discovery.md` §Test data)

Derive the data the *discovered workflow* needs — do not assume filenames or schemas. If existing valid data covers it, use that. Otherwise generate CSV whose columns match the target API.

- Validate the data with `scripts/validate_csv.py <file.csv>` (checks headers, missing/duplicate/blank values). Data that the API can't actually consume is worse than no data.
- **Never hardcode credentials in the k6 script** when they can come from a data file.
- Load CSVs in k6 via `SharedArray` so they parse once, not once per VU.

---

## Phase 3 — Design the workflow & scenarios (read `references/scenario-design.md`)

Build the VU journey from the discovered workflow (e.g. login → correlate token → act → verify). **Correlate dynamic values** (tokens, ids, cursors) from prior responses; never hardcode them.

Pick scenario shapes from `references/scenario-design.md`. All VU counts, durations, and stages are **defaults you confirm with the user, not fixed constants**:
- **Smoke** — 1 VU, a few iterations. Reachability + auth + correlation + checks sanity.
- **Load** — expected sustained traffic (ramp-up → hold → ramp-down).
- **Stress** — step up in stages to find where degradation begins.
- **Spike** — sudden jump to high load, then recover.

---

## Phase 4 — Generate scripts (use `templates/`)

Copy the relevant template and fill the marked `// FILL:` sections. Templates already implement k6 best practices (`SharedArray`, `group`, `check`, `sleep`, `thresholds`, `handleSummary`).

- `templates/smoke.js`, `templates/load.js`, `templates/stress.js`, `templates/spike.js`
- `templates/html-report.js` — shared `handleSummary` producing HTML + JSON. Import it into each script.

**Naming** (configurable; default `<identifier>_<Scenario>_<YYYYMMDD>.js`): derive the identifier from the repo/user and the date from `date +%Y%m%d`. **Never** hardcode an identifier or date. If an identifier is required and none can be found, ask the user.

**Thresholds**: include them, but label their origin. If the repo/user supplies an official SLA/SLO, mark it as such. Otherwise mark thresholds **provisional** and state that conclusions are relative to that chosen baseline — never present an invented number as an official requirement.

Suggested layout (adapt to existing repo conventions, don't overwrite them):
```
performance/
├── data/      # CSV / fixtures
├── scripts/   # generated k6 scripts
├── results/   # raw json/csv output
└── reports/   # html + written analysis
```

---

## Phase 5 — Smoke-validate (quality gate)

Run the smoke script first:
```bash
k6 run performance/scripts/<id>_Smoke_<date>.js
```
It must confirm: app reachable, auth works, test data works, dynamic correlation works, checks pass, expected statuses returned. **If smoke fails, investigate and fix before running load/stress/spike.** Do not proceed on a broken workflow.

---

## Phase 6 — Execute safely (read `references/scenario-design.md` §Execution safety)

**Environment guard — check this before every heavy run.** Determine whether the target is localhost / dev / test / staging / production. If it looks like **production** and the user has not *explicitly* authorized aggressive testing, **STOP and ask.** Never auto-run stress/spike against production.

Always capture raw machine-readable output, not just the terminal summary:
```bash
k6 run --out json=performance/results/<id>_<Scenario>_<date>.json performance/scripts/<id>_<Scenario>_<date>.js
```

---

## Phase 7 — Report outputs

Produce all three levels:
- **A. stdout** — the native k6 end-of-test summary.
- **B. raw** — the `--out json=` file (and CSV where useful). This is the *primary* source for analysis, not the HTML.
- **C. HTML** — from `handleSummary` (`templates/html-report.js`). Include only metrics actually collected: test name, timestamp, target, scenario, duration, VUs, requests, throughput, error rate, p50/p90/p95/p99, checks, thresholds, pass/fail. **Do not fabricate metrics that weren't measured.**

---

## Phase 8 — Analyze (read `references/result-analysis.md`)

Evaluate the whole picture, never a single metric: latency distribution, throughput, error rate, checks, iterations, request count, VU behavior, threshold results — correlated with system signals (CPU, memory, DB, connection pool, event loop, network) when available.

**Classify every failure** before drawing conclusions:
- *Infrastructure/transport* (timeout, connection refused, DNS, 5xx),
- *Business* (rejected coupon, insufficient stock, authz failure — often a valid 4xx),
- *Test-data* (bad credentials, missing record, exhausted dataset).

Do not attribute every failed request to application performance.

---

## Phase 9 — Challenge your conclusions (read `references/misinterpretation-guide.md`) — MANDATORY

Before writing the final report, run your findings through the misinterpretation checklist. Common errors you must actively guard against:
- "Errors at 100 VUs" ⇒ "supports only 99 users" (**wrong** — that's the tested ceiling, not a measured capacity boundary).
- "p95 = 500ms" ⇒ "every request is 500ms" (**wrong** — ~95% are ≤500ms).
- "0% http_req_failed" ⇒ "system is healthy" (**wrong** — says nothing about latency, throughput, or business correctness).
- "HTTP 200" ⇒ "business operation succeeded" (**wrong** — validate the body/state).
- "more VUs ⇒ more throughput" (**wrong** — throughput plateaus/drops after saturation).
- "stress test failed ⇒ app is broken" (**wrong** — rule out env capacity, DB limits, pools, dependencies, rate limits, load-generator saturation, and test-data exhaustion first).

For breaking points, report a **range with resolution caveats**, not a false-precision number ("stable through ~50 VUs; degradation observed between 50–100 VUs; exact boundary not resolvable at current stage granularity").

---

## Phase 10 — Final report

Write an evidence-based report that always separates three claim strengths:

```
OBSERVED   — what the raw data shows
HYPOTHESIS — a plausible explanation not yet proven
CONFIRMED  — a bottleneck backed by corroborating evidence (e.g. matched server-side metrics)
```

State the environment and its confounders (laptop CPU, local network, Docker/cloud limits, load-generator saturation, cold starts, caching, rate limits, external deps, test-data exhaustion) so the reader knows how far the results generalize. Never claim a database (or any component) is the bottleneck on k6 numbers alone — require corroborating evidence.

---

## Quality gates (self-check before finishing)

- [ ] Nothing assumes a specific framework, DB, auth scheme, endpoint list, or business domain.
- [ ] No hardcoded identifier, date, credentials, or invented "official" thresholds.
- [ ] Dynamic values are correlated, not hardcoded.
- [ ] Smoke passed before any heavy run.
- [ ] Production guard was applied.
- [ ] Raw JSON captured; HTML/stdout derived from real metrics only.
- [ ] Failures classified (infra vs business vs test-data).
- [ ] Conclusions passed the misinterpretation checklist; claims tagged OBSERVED/HYPOTHESIS/CONFIRMED.
