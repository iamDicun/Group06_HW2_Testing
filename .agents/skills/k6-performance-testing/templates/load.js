// load.js — behavior under expected, sustained, normal traffic.
// Stages (ramp-up → hold → ramp-down) are DEFAULTS; override via __ENV and confirm with the user.
//
//   TARGET_URL=http://localhost:PORT TEST_NAME=<id>_Load_<date> \
//     k6 run --out json=performance/results/<id>_Load_<date>.json \
//     performance/scripts/<id>_Load_<date>.js
//
// Fill every `// FILL:` marker from discovery. Correlate dynamic values; never hardcode them.

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { SharedArray } from 'k6/data';
import { handleSummary } from './html-report.js';
export { handleSummary };

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080'; // FILL: default non-prod base URL

const users = new SharedArray('users', function () {
  return parseCsv(open('../data/FILL-users.csv')); // FILL: data path (validate_csv.py first)
});

export const options = {
  stages: [
    { duration: __ENV.RAMP_UP || '30s', target: Number(__ENV.LOAD_VUS || 10) },   // ramp to N
    { duration: __ENV.HOLD || '2m', target: Number(__ENV.LOAD_VUS || 10) },        // sustain N
    { duration: __ENV.RAMP_DOWN || '30s', target: 0 },                             // ramp down
  ],
  thresholds: {
    // Label origin in the report: SLA if the repo/user gave one, else PROVISIONAL baseline.
    http_req_duration: [`p(95)<${__ENV.P95_MS || 500}`], // PROVISIONAL unless SLA provided
    http_req_failed: [`rate<${__ENV.MAX_ERR || 0.01}`],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const user = users[(__VU + __ITER) % users.length];
  const auth = login(user);

  group('workflow', function () {
    // FILL: reproduce the discovered end-to-end journey. Example shape (REPLACE with real steps):
    //   1) list/search   2) read a detail (correlate id)   3) act (create/update)   4) verify
    const listRes = http.get(`${BASE_URL}/FILL-list-endpoint`, auth);
    check(listRes, {
      'list ok': (r) => r.status === 200,
      'list has items': (r) => Array.isArray(r.json('FILL-items-field')),
    });

    const id = listRes.json('FILL-items-field.0.FILL-id-field'); // correlate, don't hardcode
    if (id !== undefined) {
      const detail = http.get(`${BASE_URL}/FILL-detail-endpoint/${id}`, auth);
      check(detail, { 'detail ok': (r) => r.status === 200 });
    }
  });

  sleep(1); // model think-time; tune to realistic pacing
}

function login(user) {
  // FILL: real login. Adapt to the discovered auth scheme (JWT/cookie/apikey/session/none).
  const res = http.post(
    `${BASE_URL}/FILL-login`,
    JSON.stringify({ username: user.username, password: user.password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  const ok = check(res, { 'login ok': (r) => r.status === 200 });
  if (!ok) fail(`login failed (status ${res.status})`);
  const token = res.json('FILL-token-field');
  return { headers: { Authorization: `Bearer ${token}` } }; // FILL: adapt scheme
}

// --- CSV helpers (dependency-free) ---
function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/);
  const headers = splitLine(rows.shift());
  return rows.filter((l) => l.length).map((line) => {
    const cells = splitLine(line);
    const obj = {};
    headers.forEach((h, i) => (obj[h.trim()] = (cells[i] ?? '').trim()));
    return obj;
  });
}
function splitLine(line) {
  const out = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur); return out;
}
