// spike.js — behavior under a SUDDEN surge, and whether the system RECOVERS afterward.
// The recovery tail matters as much as the spike: watch latency/errors return (or not) to baseline.
// Targets/durations are DEFAULTS — confirm with the user; tune to the environment.
//
//   TARGET_URL=http://localhost:PORT TEST_NAME=<id>_Spike_<date> \
//     k6 run --out json=performance/results/<id>_Spike_<date>.json \
//     performance/scripts/<id>_Spike_<date>.js
//
// SAFETY: never run against production without explicit authorization (see scenario-design.md).

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { SharedArray } from 'k6/data';
import { handleSummary } from './html-report.js';
export { handleSummary };

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080'; // FILL: default non-prod base URL

const users = new SharedArray('users', function () {
  return parseCsv(open('../data/FILL-users.csv')); // FILL
});

export const options = {
  stages: [
    { duration: '30s', target: Number(__ENV.BASELINE_VUS || 5) },  // steady baseline
    { duration: '10s', target: Number(__ENV.SPIKE_VUS || 80) },    // sudden surge
    { duration: '1m', target: Number(__ENV.SPIKE_VUS || 80) },     // hold the surge
    { duration: '10s', target: Number(__ENV.BASELINE_VUS || 5) },  // drop back
    { duration: '1m', target: Number(__ENV.BASELINE_VUS || 5) },   // recovery window — observe!
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: [`p(95)<${__ENV.P95_MS || 1000}`], // PROVISIONAL unless SLA provided
    http_req_failed: [`rate<${__ENV.MAX_ERR || 0.1}`],
  },
};

export default function () {
  const user = users[(__VU + __ITER) % users.length];
  const auth = login(user);

  group('workflow', function () {
    const res = http.get(`${BASE_URL}/FILL-main-endpoint`, auth); // FILL: representative journey
    check(res, {
      'status ok': (r) => r.status === 200,
      'body valid': (r) => r.json('FILL-expected-field') !== undefined,
    });
  });

  sleep(1);
}

function login(user) {
  const res = http.post(
    `${BASE_URL}/FILL-login`,
    JSON.stringify({ username: user.username, password: user.password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (!check(res, { 'login ok': (r) => r.status === 200 })) return { headers: {} };
  const token = res.json('FILL-token-field');
  return { headers: { Authorization: `Bearer ${token}` } }; // FILL: adapt scheme
}

// --- CSV helpers (dependency-free) ---
function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/);
  const headers = splitLine(rows.shift());
  return rows.filter((l) => l.length).map((line) => {
    const cells = splitLine(line);
    const obj = {}; headers.forEach((h, i) => (obj[h.trim()] = (cells[i] ?? '').trim())); return obj;
  });
}
function splitLine(line) {
  const out = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur); return out;
}
