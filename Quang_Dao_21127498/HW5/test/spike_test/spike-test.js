import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// ==========================================
// THAM SỐ - khớp với test-plan.md
// ==========================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const NUM_USERS = 100; // xem test-plan.md mục 4

const errorRate = new Rate('errors');
const postSpikeDuration = new Trend('post_spike_duration', true);

// Mốc thời gian (giây) mà tại đó target đã rơi về baseline (10 VU) - dùng để
// tách metric "phục hồi" khỏi metric lúc đang ở đỉnh spike.
// 30s (baseline) + 30s (baseline) + 15s (ramp-up spike) + 60s (giữ đỉnh) + 15s (rơi) = 150s
const RECOVERY_PHASE_START_SEC = 150;

// ==========================================
// CẤU HÌNH SCENARIOS - xem giải thích trong stress-test.js
// lockout_probe bắt đầu ngay lúc đỉnh spike đang giữ (giây thứ 90) - đây là
// thời điểm thực tế nhất để quan sát hành vi lockout khi hệ thống đang chịu
// áp lực cao nhất.
// ==========================================
export const options = {
  scenarios: {
    main_workflow: {
      executor: 'ramping-vus',
      exec: 'mainWorkflow',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },   // Baseline ổn định
        { duration: '30s', target: 10 },
        { duration: '15s', target: 400 },  // SPIKE
        { duration: '1m', target: 400 },   // Giữ đỉnh
        { duration: '15s', target: 10 },   // Rơi đột ngột
        { duration: '3m', target: 10 },    // Quan sát phục hồi
      ],
    },
    lockout_probe: {
      executor: 'per-vu-iterations',
      exec: 'lockoutProbe',
      vus: 3,
      iterations: 1,
      startTime: '1m30s', // ngay lúc đỉnh spike (400 VU) đang giữ ổn định
      maxDuration: '30s',
    },
  },
  thresholds: {
    'http_req_failed{scenario:main_workflow}': ['rate<0.15'],
  },
};

export function setup() {
  const users = [];
  const ts = Date.now();

  for (let i = 0; i < NUM_USERS; i++) {
    const email = `k6spike_${ts}_${i}@test.com`;
    const password = 'Test@1234';

    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `SpikeUser${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (res.status === 200) users.push({ email, password });
  }

  if (users.length === 0) {
    throw new Error('Setup thất bại: không tạo được user nào.');
  }

  const probeAccounts = [];
  for (let i = 0; i < 3; i++) {
    const email = `k6lockoutprobe_spike_${ts}_${i}@test.com`;
    const password = 'Test@1234';
    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `LockoutProbeSpike${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    if (res.status === 200) probeAccounts.push({ email, password });
  }

  console.log(`[Spike Test] Setup xong: ${users.length}/${NUM_USERS} user + ${probeAccounts.length} probe account.`);
  return { users, probeAccounts, testStartTime: Date.now() };
}

// ==========================================
// LUỒNG CHÍNH: Login -> Search -> Detail -> Add to Cart -> Checkout
// ==========================================
export function mainWorkflow(data) {
  const account = data.users[__VU % data.users.length];
  const elapsedSec = (Date.now() - data.testStartTime) / 1000;
  const isRecoveryPhase = elapsedSec > RECOVERY_PHASE_START_SEC;

  let token = null;

  group('1. Login (auth-heavy)', function () {
    const start = Date.now();
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: account.email, password: account.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    const ok = check(res, { 'login 200': (r) => r.status === 200 });
    errorRate.add(!ok);
    if (isRecoveryPhase) postSpikeDuration.add(Date.now() - start);
    if (ok) token = res.json('token');
  });

  if (!token) {
    sleep(0.5);
    return;
  }

  let firstProductId = 1;
  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=ao`);
    const ok = check(res, { 'search 200': (r) => r.status === 200 });
    errorRate.add(!ok);
    if (ok) {
      const products = res.json();
      if (Array.isArray(products) && products.length > 0) firstProductId = products[0].id;
    }
  });

  sleep(0.5);

  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${firstProductId}`);
    const ok = check(res, { 'product detail 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.5);

  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: firstProductId, quantity: 1, price: 100000 }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'add to cart 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.5);

  group('5. Checkout (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: 100000, shipping_address: '123 Test Street' }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'checkout 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.5);
}

// ==========================================
// LOCKOUT PROBE - xem giải thích chi tiết trong stress-test.js
// ==========================================
export function lockoutProbe(data) {
  const probeAccount = data.probeAccounts[__VU % data.probeAccounts.length];

  group('LOCKOUT PROBE - 3 lần đăng nhập sai theo FR-02 (giữa đỉnh spike)', function () {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = http.post(
        `${BASE_URL}/api/login`,
        JSON.stringify({ email: probeAccount.email, password: `WrongPassword${attempt}!` }),
        { headers: { 'Content-Type': 'application/json' } },
      );

      console.log(
        `[Lockout Probe][VU ${__VU}] Lần sai #${attempt}: HTTP ${res.status} - ${res.body}`,
      );

      check(res, {
        [`lần ${attempt}: không login thành công (đúng vì cố ý sai password)`]: (r) => r.status !== 200,
      });

      sleep(1);
    }

    const finalRes = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: probeAccount.email, password: probeAccount.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(
      `[Lockout Probe][VU ${__VU}] Thử lại password ĐÚNG sau 3 lần sai: ` +
      `HTTP ${finalRes.status} - ${finalRes.body}`,
    );

    check(finalRes, {
      'ghi nhận trạng thái cuối (200 = chưa khóa, 403 = đã khóa)': (r) =>
        r.status === 200 || r.status === 403,
    });
  });
}

export function teardown(data) {
  console.log(
    `[Spike Test] Hoàn tất với ${data.users.length} user chính + ` +
    `${data.probeAccounts.length} probe account. ` +
    `QUAN TRỌNG: dừng server, chạy "node database.js" để reset DB, rồi khởi ` +
    `động lại server trước khi chạy kịch bản kế tiếp (xem shared/reset-procedure.md).`,
  );
}
