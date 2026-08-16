import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
<<<<<<< HEAD
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ==========================================
// DATA-DRIVEN: đọc data.csv 1 lần lúc init, dùng chung cho mọi VU (SharedArray
// tránh mỗi VU tự load riêng 1 bản, tiết kiệm bộ nhớ khi VU cao).
// Mỗi dòng CSV = toàn bộ tham số cho 1 "hành trình người dùng":
// credentials (name/email/password) + product search keyword + order payload
// (quantity/unit_price/shipping_address) - theo đúng yêu cầu đề bài về
// data-driven workflow.
// ==========================================
const csvData = new SharedArray('load-test-users', function () {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});
=======
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa

// ==========================================
// THAM SỐ - khớp với test-plan.md
// ==========================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
<<<<<<< HEAD
=======
const NUM_USERS = 50; // = VU tối đa, xem test-plan.md mục 4
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa

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
<<<<<<< HEAD
// SETUP - đăng ký tất cả tài khoản từ CSV.
// Dùng email CỐ ĐỊNH (không timestamp) vì đây là dữ liệu data-driven tĩnh,
// version-control được. Nếu tài khoản đã tồn tại từ lần chạy trước (chưa
// reset DB), vẫn tiếp tục dùng credential đó - bước Login ở luồng chính sẽ
// tự xử lý nếu đăng nhập thất bại.
// ==========================================
export function setup() {
  const users = [];

  csvData.forEach((row) => {
    if (!row.email) return; // bỏ qua dòng rỗng cuối file nếu có

    const res = http.post(
      `${BASE_URL}/api/register`,
      JSON.stringify({ name: row.name, email: row.email, password: row.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (res.status !== 200) {
      console.warn(
        `[Setup] Đăng ký ${row.email} trả về ${res.status} - có thể tài khoản ` +
        `đã tồn tại từ lần chạy trước (DB chưa reset). Vẫn tiếp tục dùng credential này.`,
      );
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
    throw new Error('Setup thất bại: data.csv rỗng hoặc không đọc được. Kiểm tra file data.csv cùng thư mục.');
  }

  console.log(`[Load Test] Setup xong: ${users.length} user từ data.csv.`);
=======
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
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  return { users };
}

// ==========================================
// WORKFLOW: Login -> Search -> Detail -> Add to Cart -> Checkout
<<<<<<< HEAD
// Toàn bộ tham số lấy từ dòng CSV tương ứng với VU hiện tại.
// ==========================================
export default function (data) {
  const row = data.users[__VU % data.users.length];
  let token = null;

  // --- Bước 1: Login (Auth-heavy) - credentials từ CSV ---
  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: row.email, password: row.password }),
=======
// ==========================================
export default function (data) {
  const account = data.users[__VU % data.users.length];
  let token = null;

  // --- Bước 1: Login (Auth-heavy) ---
  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: account.email, password: account.password }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
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

<<<<<<< HEAD
  // --- Bước 2: Product Search (Read-heavy) - từ khóa từ CSV ---
  // Chỉ nhằm mục đích tạo tải lên endpoint search (read-heavy), không dùng
  // kết quả để lấy ID - Bước 3 dùng product_id trực tiếp từ CSV (xem lý do
  // ở test-plan.md mục 4c: ID sản phẩm cố định 1-5 sau mỗi lần seed DB).
  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=${row.searchKeyword}`);
    check(res, { 'search trả về 200': (r) => r.status === 200 });
=======
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
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  });

  sleep(2); // think-time: đọc kết quả search trước khi chọn sản phẩm

<<<<<<< HEAD
  // --- Bước 3: Product Detail (Read-heavy) - product_id từ CSV ---
  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${row.productId}`);
=======
  // --- Bước 3: Product Detail (Read-heavy) ---
  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${firstProductId}`);
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
    check(res, { 'product detail trả về 200': (r) => r.status === 200 });
  });

  sleep(3); // think-time: đọc mô tả/giá sản phẩm trước khi quyết định mua

<<<<<<< HEAD
  // --- Bước 4: Add to Cart (Transactional) - product_id/quantity/price từ CSV ---
  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: row.productId, quantity: row.quantity, price: row.unitPrice }),
=======
  // --- Bước 4: Add to Cart (Transactional) ---
  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: firstProductId, quantity: 1, price: 100000 }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'add to cart trả về 200': (r) => r.status === 200 });
  });

  sleep(1); // think-time: chuyển tiếp nhanh sang checkout

<<<<<<< HEAD
  // --- Bước 5: Checkout (Transactional) - order payload từ CSV ---
  group('5. Checkout (transactional)', function () {
    const totalAmount = row.quantity * row.unitPrice;
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: totalAmount, shipping_address: row.shippingAddress }),
=======
  // --- Bước 5: Checkout (Transactional) ---
  group('5. Checkout (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: 100000, shipping_address: '123 Test Street' }),
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'checkout trả về 200': (r) => r.status === 200 });
  });

  sleep(1);
}

export function teardown(data) {
  console.log(
<<<<<<< HEAD
    `[Load Test] Hoàn tất với ${data.users.length} user (từ data.csv). ` +
    `Nhắc: dừng server, chạy "node database.js", khởi động lại server trước ` +
    `khi chạy kịch bản kế tiếp (xem shared/reset-procedure.md).`,
=======
    `[Load Test] Hoàn tất với ${data.users.length} user. ` +
    `Nhắc: bảng "orders" và "userCarts" (RAM) không tự dọn - ` +
    `restart server + dọn dữ liệu trước khi chạy Stress/Spike test tiếp theo.`,
>>>>>>> 1f01d7892aea1147446c4e8bc7ad51c108100bfa
  );
}
