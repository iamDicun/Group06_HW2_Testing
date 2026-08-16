import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
<<<<<<< HEAD
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ==========================================
// DATA-DRIVEN: đọc data.csv - xem giải thích chi tiết trong load-test.js
// ==========================================
const csvData = new SharedArray('stress-test-users', function () {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
=======

// ==========================================
// THAM SỐ - khớp với test-plan.md
// ==========================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const NUM_USERS = 150; // xem test-plan.md mục 4 - đủ giảm trùng lặp account ở 800 VU

>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
const errorRate = new Rate('errors');

// ==========================================
// CẤU HÌNH SCENARIOS
<<<<<<< HEAD
// main_workflow: luồng chính, tham số lấy từ CSV
// lockout_probe: nhóm VU riêng, dùng account RIÊNG (không lấy từ CSV, vì bản
//   chất là cố ý đăng nhập SAI - không phải credential thật cần data-driven)
=======
// main_workflow: luồng chính Login -> Search -> Detail -> Cart -> Checkout
// lockout_probe: nhóm VU riêng, TÁCH BIỆT khỏi luồng chính, cố ý đăng nhập
//   sai 3 lần liên tiếp (theo đúng đặc tả FR-02 trong README) để tạo bằng
//   chứng quan sát hành vi lockout dưới tải - theo yêu cầu đề bài.
//   Dùng account riêng (KHÔNG trùng với account của main_workflow) để không
//   ảnh hưởng đến luồng chính đang được đo hiệu năng.
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
// ==========================================
export const options = {
  scenarios: {
    main_workflow: {
      executor: 'ramping-vus',
      exec: 'mainWorkflow',
      startVUs: 0,
      stages: [
<<<<<<< HEAD
        { duration: '2m', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '2m', target: 300 },
        { duration: '3m', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '3m', target: 500 },
        { duration: '2m', target: 800 },
        { duration: '3m', target: 800 },
        { duration: '3m', target: 0 },
=======
        { duration: '2m', target: 100 },  // Bậc 1: ramp-up 2 phút
        { duration: '3m', target: 100 },  // Bậc 1: giữ 3 phút
        { duration: '2m', target: 300 },  // Bậc 2: ramp-up
        { duration: '3m', target: 300 },  // Bậc 2: giữ
        { duration: '2m', target: 500 },  // Bậc 3: ramp-up
        { duration: '3m', target: 500 },  // Bậc 3: giữ
        { duration: '2m', target: 800 },  // Bậc 4: ramp-up
        { duration: '3m', target: 800 },  // Bậc 4: giữ
        { duration: '3m', target: 0 },    // Ramp-down cuối
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      ],
    },
    lockout_probe: {
      executor: 'per-vu-iterations',
      exec: 'lockoutProbe',
<<<<<<< HEAD
      vus: 3,
      iterations: 1,
      startTime: '3m30s',
=======
      vus: 3,             // 3 VU độc lập, không tính vào tải chính
      iterations: 1,       // mỗi VU chỉ chạy đúng 1 lần kịch bản 3-lần-sai
      startTime: '3m30s',  // bắt đầu khi tải chính đang ở bậc 100 VU giữ ổn định
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      maxDuration: '30s',
    },
  },
  thresholds: {
<<<<<<< HEAD
=======
    // Ngưỡng rộng có chủ đích - mục tiêu là quan sát, không chặn test dừng sớm (xem test-plan.md)
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    'http_req_failed{scenario:main_workflow}': ['rate<0.10'],
  },
};

export function setup() {
  const users = [];
<<<<<<< HEAD

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
=======
  const ts = Date.now();

  for (let i = 0; i < NUM_USERS; i++) {
    const email = `k6stress_${ts}_${i}@test.com`;
    const password = 'Test@1234';

    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `StressUser${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (res.status === 200) users.push({ email, password });
  }

  if (users.length === 0) {
    throw new Error('Setup thất bại: không tạo được user nào.');
  }

  // Tài khoản RIÊNG cho lockout probe - tách biệt khỏi pool user của main_workflow,
  // để 3 lần đăng nhập sai không vô tình khóa nhầm account đang được luồng chính dùng.
  const probeAccounts = [];
  for (let i = 0; i < 3; i++) {
    const email = `k6lockoutprobe_${ts}_${i}@test.com`;
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    const password = 'Test@1234';
    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `LockoutProbe${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
<<<<<<< HEAD
    if (res.status !== 200) {
      console.warn(`[Setup] Đăng ký probe ${email} trả về ${res.status} - có thể đã tồn tại.`);
    }
    probeAccounts.push({ email, password });
  }

  console.log(`[Stress Test] Setup xong: ${users.length} user (data.csv) + ${probeAccounts.length} probe account.`);
=======
    if (res.status === 200) probeAccounts.push({ email, password });
  }

  console.log(`[Stress Test] Setup xong: ${users.length}/${NUM_USERS} user + ${probeAccounts.length} probe account.`);
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  return { users, probeAccounts };
}

// ==========================================
<<<<<<< HEAD
// LUỒNG CHÍNH: tham số lấy từ CSV
// ==========================================
export function mainWorkflow(data) {
  const row = data.users[__VU % data.users.length];
=======
// LUỒNG CHÍNH: Login -> Search -> Detail -> Add to Cart -> Checkout
// ==========================================
export function mainWorkflow(data) {
  const account = data.users[__VU % data.users.length];
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  let token = null;

  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
<<<<<<< HEAD
      JSON.stringify({ email: row.email, password: row.password }),
=======
      JSON.stringify({ email: account.email, password: account.password }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
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

<<<<<<< HEAD
  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=${row.searchKeyword}`);
    const ok = check(res, { 'search 200': (r) => r.status === 200 });
    errorRate.add(!ok);
=======
  let firstProductId = 1;
  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=ao`);
    const ok = check(res, { 'search 200': (r) => r.status === 200 });
    errorRate.add(!ok);
    if (ok) {
      const products = res.json();
      if (Array.isArray(products) && products.length > 0) firstProductId = products[0].id;
    }
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  });

  sleep(0.3);

  group('3. Product Detail (read-heavy)', function () {
<<<<<<< HEAD
    const res = http.get(`${BASE_URL}/api/products/${row.productId}`);
=======
    const res = http.get(`${BASE_URL}/api/products/${firstProductId}`);
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    const ok = check(res, { 'product detail 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);

  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
<<<<<<< HEAD
      JSON.stringify({ product_id: row.productId, quantity: row.quantity, price: row.unitPrice }),
=======
      JSON.stringify({ product_id: firstProductId, quantity: 1, price: 100000 }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'add to cart 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);

  group('5. Checkout (transactional)', function () {
<<<<<<< HEAD
    const totalAmount = row.quantity * row.unitPrice;
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: totalAmount, shipping_address: row.shippingAddress }),
=======
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: 100000, shipping_address: '123 Test Street' }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    const ok = check(res, { 'checkout 200': (r) => r.status === 200 });
    errorRate.add(!ok);
  });

  sleep(0.3);
}

// ==========================================
<<<<<<< HEAD
// LOCKOUT PROBE - xem giải thích trong test-plan.md mục 5b
=======
// LOCKOUT PROBE: cố ý đăng nhập sai 3 lần liên tiếp theo đặc tả FR-02,
// sau đó thử lại bằng password ĐÚNG để xác nhận tài khoản có bị khóa không.
// Chạy độc lập, không tính vào metric hiệu năng của luồng chính.
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
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
<<<<<<< HEAD
      console.log(`[Lockout Probe][VU ${__VU}] Lần sai #${attempt}: HTTP ${res.status} - ${res.body}`);
      check(res, {
        [`lần ${attempt}: không login thành công`]: (r) => r.status !== 200,
      });
      sleep(1);
    }

=======

      // In ra console để làm bằng chứng - chụp lại phần output này cho báo cáo
      console.log(
        `[Lockout Probe][VU ${__VU}] Lần sai #${attempt}: HTTP ${res.status} - ${res.body}`,
      );

      check(res, {
        [`lần ${attempt}: không login thành công (đúng vì cố ý sai password)`]: (r) => r.status !== 200,
      });

      sleep(1);
    }

    // Thử lại với password ĐÚNG - đây là bước xác nhận quan trọng: nếu hệ thống
    // đúng theo README, đến đây tài khoản mới bị khóa. Nếu đúng theo code thật
    // (bug đã lập issue riêng), tài khoản đã bị khóa từ sau lần sai thứ 2.
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    const finalRes = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: probeAccount.email, password: probeAccount.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
<<<<<<< HEAD
    console.log(`[Lockout Probe][VU ${__VU}] Thử lại password ĐÚNG: HTTP ${finalRes.status} - ${finalRes.body}`);
    check(finalRes, {
      'ghi nhận trạng thái cuối (200/403)': (r) => r.status === 200 || r.status === 403,
=======

    console.log(
      `[Lockout Probe][VU ${__VU}] Thử lại password ĐÚNG sau 3 lần sai: ` +
      `HTTP ${finalRes.status} - ${finalRes.body}`,
    );

    check(finalRes, {
      'ghi nhận trạng thái cuối (200 = chưa khóa, 403 = đã khóa)': (r) =>
        r.status === 200 || r.status === 403,
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    });
  });
}

export function teardown(data) {
  console.log(
<<<<<<< HEAD
    `[Stress Test] Hoàn tất với ${data.users.length} user (data.csv) + ` +
=======
    `[Stress Test] Hoàn tất với ${data.users.length} user chính + ` +
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    `${data.probeAccounts.length} probe account. ` +
    `QUAN TRỌNG: dừng server, chạy "node database.js" để reset DB, rồi khởi ` +
    `động lại server trước khi chạy kịch bản kế tiếp (xem shared/reset-procedure.md).`,
  );
}
