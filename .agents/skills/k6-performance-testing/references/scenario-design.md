# Scenario design reference

All numbers here are **defaults you confirm with the user**, never fixed constants baked into
the skill. Tune them to the target's expected traffic and the environment's capacity.

---

## Test types

### Smoke / baseline (always run first)
Purpose: prove the workflow works at all before spending effort on load.
```
1 VU, 1–3 iterations
```
Passing means: reachable, auth works, correlation works, checks pass, expected statuses returned.

### Load
Purpose: behavior under expected, sustained, normal traffic.
```
ramp-up:   0 → N VUs over a short window (e.g. 5 VUs / 30s)
sustained: hold N VUs for a realistic period (e.g. 10 VUs / 2m)
ramp-down: → 0 VUs
```

### Stress
Purpose: step load up in stages to find where degradation *begins* and approximate a capacity
boundary. Use several stages so you can see the trend, not one giant jump.
```
e.g. 10 → 50 → 100 VUs, each held long enough to read stable metrics
```
Degradation observed here is not automatically an application limit — see `result-analysis.md`.

### Spike
Purpose: behavior under a sudden surge and whether the system recovers afterward.
```
e.g. steady 5 VUs → sudden 80 VUs → back down → observe recovery
```

Encode stages with k6 `stages` (ramping-vus) or `scenarios`. Keep them configurable via
`__ENV` variables so the same script can be re-run with different intensities.

---

## Correlation (dynamic values)

Read values from responses at runtime; never hardcode tokens/ids/cursors.

```javascript
// login, then reuse the token — do NOT paste a literal token
const loginRes = http.post(`${BASE_URL}/FILL-login-path`, JSON.stringify({
  // field names must match the real API; creds come from the data file
  username: user.username,
  password: user.password,
}), { headers: { 'Content-Type': 'application/json' } });

check(loginRes, { 'login ok': (r) => r.status === 200 });

// extract however THIS api returns it (body token / cookie / header) — example: JSON body
const token = loginRes.json('FILL-token-field');

const authHeaders = { headers: { Authorization: `Bearer ${token}` } }; // adapt scheme

// later requests correlate ids from earlier responses
const created = http.post(`${BASE_URL}/FILL-resource`, body, authHeaders);
const newId = created.json('FILL-id-field');
http.get(`${BASE_URL}/FILL-resource/${newId}`, authHeaders);
```

For cookie/session auth, k6's cookie jar carries cookies automatically within a VU; for API
keys, attach the header from data/env. Pick the mechanism you discovered — don't default to JWT.

---

## Thresholds

Include thresholds, but be honest about where they came from.

```javascript
thresholds: {
  http_req_duration: ['p(95)<500'], // provisional unless the repo/user gave an SLA
  http_req_failed:   ['rate<0.01'],
  checks:            ['rate>0.99'],
}
```

- If the repo or user provides an **official SLA/SLO**, label the threshold as such in the report.
- Otherwise label it **provisional/suggested** and state that pass/fail is *relative to that chosen
  baseline*, not to a formal requirement.
- Never present an invented number as an official system requirement.

---

## Execution safety

Before any heavy run, classify the target: `localhost | dev | test | staging | production`
(infer from the base URL/host, config, and what the user said).

- If it looks like **production** and the user has **not explicitly** authorized aggressive load
  testing, **STOP and ask for confirmation.** Do not auto-run stress/spike against production.
- Prefer a dedicated non-prod target. Warn about side effects: writes (checkout, signup) can
  mutate real data, trip rate limits, or page an on-call. Prefer idempotent/read paths or a
  disposable environment when possible.
- Make sure the **load generator itself** isn't the bottleneck (CPU/file-descriptor/network
  limits on the machine running k6). If the generator saturates, results describe the generator,
  not the target.

---

## Naming & layout

Default script name: `<identifier>_<Scenario>_<YYYYMMDD>.js`
- `identifier`: derive from repo/user; ask if required and unknown. Never hardcode.
- date: `date +%Y%m%d`. Never hardcode.

Default (adapt to existing repo conventions, don't clobber them):
```
performance/
├── data/      # csv / fixtures
├── scripts/   # generated k6 scripts
├── results/   # raw --out json/csv
└── reports/   # html + written analysis + DISCOVERY.md
```
