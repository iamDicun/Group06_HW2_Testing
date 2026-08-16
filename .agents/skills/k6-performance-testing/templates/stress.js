// stress.js — step load up in stages to find where degradation BEGINS.
// Multiple stages let you read the trend; a single giant jump can't locate a boundary.
// Stage targets are DEFAULTS — confirm with the user and tune to the environment's capacity.
//
//   TARGET_URL=http://localhost:PORT TEST_NAME=<id>_Stress_<date> \
//     k6 run --out json=performance/results/<id>_Stress_<date>.json \
//     performance/scripts/<id>_Stress_<date>.js
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
  // Step up so you can see WHERE latency/errors/throughput turn — not just that they turned.
  stages: [
    { duration: '1m', target: Number(__ENV.S1 || 10) },
    { duration: '1m', target: Number(__ENV.S2 || 50) },
    { duration: '1m', target: Number(__ENV.S3 || 100) },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    // Do NOT abort on breach here — you WANT to observe degradation past the threshold.
    http_req_duration: [`p(95)<${__ENV.P95_MS || 800}`], // PROVISIONAL unless SLA provided
    http_req_failed: [`rate<${__ENV.MAX_ERR || 0.05}`],
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
  // Under stress, login itself may fail from saturation — classify that separately from
  // test-data or business errors when analyzing (see references/result-analysis.md).
  if (!check(res, { 'login ok': (r) => r.status === 200 })) {
    return { headers: {} }; // let the run continue so failures are captured, not aborted
  }
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
