import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';

// ==========================================
// THAM SỐ - khớp với test-plan.md
// ==========================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const NUM_USERS = 50; // = VU tối đa, xem test-plan.md mục 4

const loginFailRate = new Rate('login_fail_rate');

export const options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp-up: 2 phút, 0 -> 50 VU
    { duration: '5m', target: 50 },  // Giữ tải đỉnh: 5 phút ở 50 VU
    { duration: '2m', target: 0 },   // Ramp-down: 2 phút, 50 -> 0 VU
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.01'],
    login_fail_rate: ['rate<0.01'],
  },
};

// ==========================================
// SETUP - tạo NUM_USERS user riêng biệt
// Lý do: tránh đụng độ userCarts (RAM, theo user_id) và tránh
// kích hoạt lockout chéo giữa các VU dùng chung account (xem test-plan.md)
// ==========================================
export function setup() {
  const users = [];
  const ts = Date.now();

  for (let i = 0; i < NUM_USERS; i++) {
    const email = `k6load_${ts}_${i}@test.com`;
    const password = 'Test@1234';

    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: `LoadUser${i}`, email, password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (res.status === 200) users.push({ email, password });
  }

  if (users.length === 0) {
    throw new Error('Setup thất bại: không tạo được user nào. Kiểm tra BASE_URL và /api/register.');
  }

  console.log(`[Load Test] Setup xong: ${users.length}/${NUM_USERS} user.`);
  return { users };
}

// ==========================================
// WORKFLOW: Login -> Search -> Detail -> Add to Cart -> Checkout
// ==========================================
export default function (data) {
  const account = data.users[__VU % data.users.length];
  let token = null;

  // --- Bước 1: Login (Auth-heavy) ---
  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: account.email, password: account.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    const ok = check(res, {
      'login trả về 200': (r) => r.status === 200,
      'login trả về token': (r) => !!r.json('token'),
    });
    loginFailRate.add(!ok);
    if (ok) token = res.json('token');
  });

  if (!token) {
    sleep(1);
    return; // login fail thì không tiếp tục chuỗi, tránh lỗi dây chuyền
  }

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // --- Bước 2: Product Search (Read-heavy) ---
  let firstProductId = 1; // fallback nếu không lấy được id thật
  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=ao`);
    const ok = check(res, { 'search trả về 200': (r) => r.status === 200 });
    if (ok) {
      const products = res.json();
      if (Array.isArray(products) && products.length > 0) {
        firstProductId = products[0].id;
      }
    }
  });

  sleep(2); // think-time: đọc kết quả search trước khi chọn sản phẩm

  // --- Bước 3: Product Detail (Read-heavy) ---
  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${firstProductId}`);
    check(res, { 'product detail trả về 200': (r) => r.status === 200 });
  });

  sleep(3); // think-time: đọc mô tả/giá sản phẩm trước khi quyết định mua

  // --- Bước 4: Add to Cart (Transactional) ---
  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: firstProductId, quantity: 1, price: 100000 }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'add to cart trả về 200': (r) => r.status === 200 });
  });

  sleep(1); // think-time: chuyển tiếp nhanh sang checkout

  // --- Bước 5: Checkout (Transactional) ---
  group('5. Checkout (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: 100000, shipping_address: '123 Test Street' }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'checkout trả về 200': (r) => r.status === 200 });
  });

  sleep(1);
}

export function teardown(data) {
  console.log(
    `[Load Test] Hoàn tất với ${data.users.length} user. ` +
    `Nhắc: bảng "orders" và "userCarts" (RAM) không tự dọn - ` +
    `restart server + dọn dữ liệu trước khi chạy Stress/Spike test tiếp theo.`,
  );
}
