// smoke.js — validate the workflow before any heavy run.
// 1 VU, a few iterations: proves reachability, auth, correlation, checks, and data all work.
// Run FIRST. If this fails, fix it before load/stress/spike.
//
//   TARGET_URL=http://localhost:PORT TEST_NAME=<id>_Smoke_<date> \
//     k6 run performance/scripts/<id>_Smoke_<date>.js
//
// Fill every `// FILL:` marker from discovery. Do not hardcode credentials/tokens/ids.

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { SharedArray } from 'k6/data';
import { handleSummary } from './html-report.js';
export { handleSummary };

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080'; // FILL: default non-prod base URL

// Load credentials/data from CSV once (SharedArray parses a single time, shared across VUs).
// scripts/validate_csv.py should have validated this file already.
const users = new SharedArray('users', function () {
  const raw = open('../data/FILL-users.csv'); // FILL: path to your data file
  return parseCsv(raw); // returns array of objects keyed by header
});

export const options = {
  vus: 1,
  iterations: Number(__ENV.ITERATIONS || 3),
  thresholds: {
    // Smoke is a correctness gate: everything should pass at 1 VU.
    checks: ['rate>0.99'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const user = users[(__ITER) % users.length];
  let auth = {}; // will hold correlated auth state

  group('auth', function () {
    // FILL: real login path, field names, and how THIS api returns auth (body/cookie/header).
    const res = http.post(
      `${BASE_URL}/FILL-login`,
      JSON.stringify({ username: user.username, password: user.password }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    const ok = check(res, {
      'login status ok': (r) => r.status === 200, // FILL: expected status
      'auth value present': (r) => !!r.json('FILL-token-field'), // FILL: adapt to cookie/apikey
    });
    if (!ok) {
      fail(`login failed (status ${res.status}) — check target, creds, and path before proceeding`);
    }
    const token = res.json('FILL-token-field');
    auth = { headers: { Authorization: `Bearer ${token}` } }; // FILL: adapt auth scheme
  });

  group('workflow', function () {
    // FILL: reproduce ONE pass of the discovered journey, correlating dynamic ids.
    const res = http.get(`${BASE_URL}/FILL-first-protected-endpoint`, auth);
    check(res, {
      'workflow status ok': (r) => r.status === 200, // FILL: expected status
      'workflow body valid': (r) => r.json('FILL-expected-field') !== undefined, // body, not just 200
    });
  });

  sleep(1);
}

// Minimal, dependency-free CSV parser (header row required). Handles simple quoted fields.
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
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
