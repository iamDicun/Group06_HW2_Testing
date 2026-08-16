import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ==========================================
// DATA-DRIVEN: đọc data.csv - xem giải thích chi tiết trong load-test.js
// ==========================================
const csvData = new SharedArray('stress-test-users', function () {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const errorRate = new Rate('errors');

// ==========================================
// CẤU HÌNH SCENARIOS
// main_workflow: luồng chính, tham số lấy từ CSV
// lockout_probe: nhóm VU riêng, dùng account RIÊNG (không lấy từ CSV, vì bản
//   chất là cố ý đăng nhập SAI - không phải credential thật cần data-driven)
// ==========================================
export const options = {
  scenarios: {
    main_workflow: {
      executor: 'ramping-vus',
      exec: 'mainWorkflow',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '2m', target: 300 },
        { duration: '3m', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '3m', target: 500 },
        { duration: '2m', target: 800 },
        { duration: '3m', target: 800 },
        { duration: '3m', target: 0 },
      ],
    },
    lockout_probe: {
      executor: 'per-vu-iterations',
      exec: 'lockoutProbe',
      vus: 3,
      iterations: 1,
      startTime: '3m30s',
      maxDuration: '30s',
    },
  },
  thresholds: {
    'http_req_failed{scenario:main_workflow}': ['rate<0.10'],
  },
};

export function setup() {
  const users = [];

  csvData.forEach((row) => {
    if (!row.email) return;

    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: row.name, email: row.email, password: row.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (res.status !== 200) {
      console.warn(`[Setup] Đăng ký ${row.email} trả về ${res.status} - có thể đã tồn tại từ lần chạy trước.`);
    }

    users.push({
      email: row.email,
      password: row.password,
      searchKeyword: row.search_keyword,
      productId: parseInt(row.product_id, 10) || 1,
      quantity: parseInt(row.quantity, 10) || 1,
      unitPrice: parseInt(row.unit_price, 10) || 100000,
      shippingAddress: row.shipping_address,
    });
  });

  if (users.length === 0) {
    throw new Error('Setup thất bại: data.csv rỗng hoặc không đọc được.');
  }

  // Tài khoản RIÊNG cho lockout probe - không lấy từ CSV (xem giải thích ở trên)
  const probeAccounts = [];
  for (let i = 0; i < 3; i++) {
    const email = `k6lockoutprobe_stress_${i}@test.com`;
    const password = 'Test@1234';
    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `LockoutProbe${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    if (res.status !== 200) {
      console.warn(`[Setup] Đăng ký probe ${email} trả về ${res.status} - có thể đã tồn tại.`);
    }
    probeAccounts.push({ email, password });
  }

  console.log(`[Stress Test] Setup xong: ${users.length} user (data.csv) + ${probeAccounts.length} probe account.`);
  return { users, probeAccounts };
}

// ==========================================
// LUỒNG CHÍNH: tham số lấy từ CSV
// ==========================================
export function mainWorkflow(data) {
  const row = data.users[__VU % data.users.length];
  let token = null;

  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: row.email, password: row.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    const ok = check(res, { 'login 200': (r) => r.status === 200 });
    errorRate.add(!ok);
    if (ok) token = res.json('token');
  });

  if (!token) {
    sleep(0.3);
    return;
  }

  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=${row.searchKeyword}`);
    const ok = check(res, { 'search 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);

  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${row.productId}`);
    const ok = check(res, { 'product detail 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);

  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: row.productId, quantity: row.quantity, price: row.unitPrice }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'add to cart 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);

  group('5. Checkout (transactional)', function () {
    const totalAmount = row.quantity * row.unitPrice;
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: totalAmount, shipping_address: row.shippingAddress }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'checkout 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);
}

// ==========================================
// LOCKOUT PROBE - xem giải thích trong test-plan.md mục 5b
// ==========================================
export function lockoutProbe(data) {
  const probeAccount = data.probeAccounts[__VU % data.probeAccounts.length];

  group('LOCKOUT PROBE - 3 lần đăng nhập sai theo FR-02', function () {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = http.post(
        `${BASE_URL}/api/login`,
        JSON.stringify({ email: probeAccount.email, password: `WrongPassword${attempt}!` }),
        { headers: { 'Content-Type': 'application/json' } },
      );
      console.log(`[Lockout Probe][VU ${__VU}] Lần sai #${attempt}: HTTP ${res.status} - ${res.body}`);
      check(res, {
        [`lần ${attempt}: không login thành công`]: (r) => r.status !== 200,
      });
      sleep(1);
    }

    const finalRes = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: probeAccount.email, password: probeAccount.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log(`[Lockout Probe][VU ${__VU}] Thử lại password ĐÚNG: HTTP ${finalRes.status} - ${finalRes.body}`);
    check(finalRes, {
      'ghi nhận trạng thái cuối (200/403)': (r) => r.status === 200 || r.status === 403,
    });
  });
}

export function teardown(data) {
  console.log(
    `[Stress Test] Hoàn tất với ${data.users.length} user (data.csv) + ` +
    `${data.probeAccounts.length} probe account. ` +
    `QUAN TRỌNG: dừng server, chạy "node database.js" để reset DB, rồi khởi ` +
    `động lại server trước khi chạy kịch bản kế tiếp (xem shared/reset-procedure.md).`,
  );
}
