// 23127033_Spike_20260816.js — k6 Spike Test Script
// Student ID: 23127033
// Workflow: Login -> Profile -> Search Product -> Apply Coupon -> Add to Cart -> Checkout

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { SharedArray } from 'k6/data';

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';
const REPORT_DIR = __ENV.REPORT_DIR || '23127033-HW5/reports/html_reports';
const RESULTS_DIR = __ENV.RESULTS_DIR || '23127033-HW5/reports/raw_logs';
const TEST_NAME = __ENV.TEST_NAME || '23127033_Spike_20260816';

const users = new SharedArray('users', function () {
  return parseCsv(open('../data/test_users.csv'));
});

const keywords = new SharedArray('keywords', function () {
  return parseCsv(open('../data/test_search_keywords.csv'));
});

export const options = {
  stages: [
    { duration: '10s', target: 5 },   // Normal low load
    { duration: '10s', target: 80 },  // SPIKE up to 80 VUs
    { duration: '30s', target: 80 },  // Hold spike
    { duration: '10s', target: 5 },   // Drop back down
    { duration: '20s', target: 0 },   // Recovery
  ],
  thresholds: {
    http_req_failed: ['rate<0.20'],
  },
};

export default function () {
  const user = users[(__VU + __ITER) % users.length];
  const kw = keywords[(__VU + __ITER) % keywords.length];

  let token = '';
  let authHeaders = {};

  // 1. Auth-heavy: Login
  group('01_Auth_Login', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: user.email, password: user.password }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    const ok = check(res, {
      'login status 200': (r) => r.status === 200,
    });
    if (ok) {
      token = res.json('token');
      authHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  if (!token) return;

  // 2. Auth-heavy: Get Profile
  group('02_Auth_Profile', function () {
    http.get(`${BASE_URL}/api/users/me`, authHeaders);
  });

  // 3. Read-heavy: Search Products
  let selectedProductId = 1;
  let productPrice = 100;

  group('03_Read_Search', function () {
    const res = http.get(`${BASE_URL}/api/products?search=${kw.searchTerm}`);
    if (res.status === 200) {
      const items = res.json();
      if (Array.isArray(items) && items.length > 0) {
        selectedProductId = items[0].id;
        productPrice = parseFloat(items[0].price) || 100;
      }
    }
  });

  // 4. Transactional: Apply Coupon
  group('04_Transaction_ApplyCoupon', function () {
    const payload = JSON.stringify({
      code: kw.couponCode,
      total_amount: productPrice * 2,
    });
    http.post(`${BASE_URL}/api/apply-coupon`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  // 5. Transactional: Add to Cart
  group('05_Transaction_AddToCart', function () {
    const payload = JSON.stringify({
      id: selectedProductId,
      quantity: 2,
    });
    http.post(`${BASE_URL}/api/cart`, payload, authHeaders);
  });

  // 6. Transactional: Checkout
  group('06_Transaction_Checkout', function () {
    const payload = JSON.stringify({
      total_amount: productPrice * 2 * 0.9,
      shipping_address: '123 Spike Test St',
    });
    http.post(`${BASE_URL}/api/checkout`, payload, authHeaders);
  });

  sleep(0.3);
}

export function handleSummary(data) {
  const summaryText = textReport(data);
  const htmlContent = htmlReport(data);
  const out = {};
  out['stdout'] = summaryText;
  out[`${REPORT_DIR}/${TEST_NAME}.html`] = htmlContent;
  out[`${RESULTS_DIR}/${TEST_NAME}.summary.json`] = JSON.stringify(data, null, 2);
  return out;
}

function textReport(data) {
  const reqs = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const rps = data.metrics.http_reqs ? data.metrics.http_reqs.values.rate.toFixed(2) : '0';
  const p95 = data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(95)'].toFixed(2) : '0';
  const failed = data.metrics.http_req_failed ? (data.metrics.http_req_failed.values.rate * 100).toFixed(2) : '0';
  return `\n=== K6 SPIKE TEST SUMMARY: ${TEST_NAME} ===\nRequests: ${reqs} (${rps} req/s)\np95 Latency: ${p95} ms\nError Rate: ${failed}%\n=========================================\n`;
}

function htmlReport(data) {
  const reqs = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const rps = data.metrics.http_reqs ? data.metrics.http_reqs.values.rate.toFixed(2) : '0';
  const p95 = data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(95)'].toFixed(2) : '0';
  const p90 = data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(90)'].toFixed(2) : '0';
  const avg = data.metrics.http_req_duration ? data.metrics.http_req_duration.values.avg.toFixed(2) : '0';
  const failed = data.metrics.http_req_failed ? (data.metrics.http_req_failed.values.rate * 100).toFixed(2) : '0';

  return `<!doctype html><html><head><meta charset="utf-8"><title>${TEST_NAME} Report</title>
<style>body{font-family:sans-serif;margin:2rem;} h1{color:#333;} table{border-collapse:collapse;width:100%;margin-top:1rem;} th,td{border:1px solid #ccc;padding:8px;text-align:left;} th{background:#f4f4f4;}</style></head>
<body><h1>Performance Report: ${TEST_NAME}</h1>
<p>Generated at: ${new Date().toISOString()}</p>
<table>
<tr><th>Total Requests</th><td>${reqs}</td></tr>
<tr><th>Throughput (RPS)</th><td>${rps} req/s</td></tr>
<tr><th>Avg Latency</th><td>${avg} ms</td></tr>
<tr><th>p90 Latency</th><td>${p90} ms</td></tr>
<tr><th>p95 Latency</th><td>${p95} ms</td></tr>
<tr><th>Error Rate</th><td>${failed}%</td></tr>
</table></body></html>`;
}

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
