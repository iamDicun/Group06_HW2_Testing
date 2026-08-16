import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// ==========================================
// DATA-DRIVEN: đọc data.csv - xem giải thích chi tiết trong load-test.js
// ==========================================
const csvData = new SharedArray('endurance-test-users', function () {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// ==========================================
// !!! CẦN ĐIỀN SAU KHI CÓ KẾT QUẢ STRESS TEST THẬT !!!
// Xem test-plan.md mục 2: chọn bậc VU cao nhất mà Stress Test vẫn ổn định
// (error rate và p95 chưa suy giảm rõ rệt). KHÔNG chọn tùy ý.
// Nếu ENDURANCE_VU vượt quá số dòng của data.csv (hiện 100 dòng), cần sinh
// lại CSV nhiều dòng hơn trước khi chạy.
// ==========================================
const ENDURANCE_VU = __ENV.ENDURANCE_VU ? parseInt(__ENV.ENDURANCE_VU, 10) : 100; // <-- placeholder

export const options = {
  stages: [
    { duration: '1m', target: ENDURANCE_VU },   // Ramp-up ngắn
    { duration: '12m', target: ENDURANCE_VU },  // Giữ tải ổn định - phần dữ liệu quan trọng nhất
    { duration: '1m', target: 0 },              // Ramp-down
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
  },
};

export function setup() {
  if (csvData.length < ENDURANCE_VU) {
    console.warn(
      `[Endurance Test] CẢNH BÁO: data.csv chỉ có ${csvData.length} dòng, ` +
      `ít hơn ENDURANCE_VU=${ENDURANCE_VU}. Nhiều VU sẽ dùng chung 1 account ` +
      `(qua phép chia lấy dư __VU % length) - cần sinh thêm dòng CSV nếu muốn ` +
      `mỗi VU có account hoàn toàn riêng.`,
    );
  }

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

  console.log(`[Endurance Test] Setup xong: ${users.length} user (data.csv), chạy ở ${ENDURANCE_VU} VU cố định.`);
  return { users, testStartTime: Date.now() };
}

// ==========================================
// WORKFLOW: Login -> Search -> Detail -> Add to Cart -> Checkout
// Think-time giống Load Test - mô phỏng hành vi thật, vì mục tiêu là đo độ
// bền chịu tải thực tế theo thời gian, không phải dồn ép như Stress Test.
// ==========================================
export default function (data) {
  const row = data.users[__VU % data.users.length];
  let token = null;

  group('1. Login (auth-heavy)', function () {
    const res = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({ email: row.email, password: row.password }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    const ok = check(res, { 'login 200': (r) => r.status === 200 });
    if (ok) token = res.json('token');
  });

  if (!token) {
    sleep(1);
    return;
  }

  group('2. Product Search (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products?search=${row.searchKeyword}`);
    check(res, { 'search 200': (r) => r.status === 200 });
  });

  sleep(2);

  group('3. Product Detail (read-heavy)', function () {
    const res = http.get(`${BASE_URL}/api/products/${row.productId}`);
    check(res, { 'product detail 200': (r) => r.status === 200 });
  });

  sleep(3);

  group('4. Add to Cart (transactional)', function () {
    const res = http.post(
      `${BASE_URL}/api/cart`,
      JSON.stringify({ product_id: row.productId, quantity: row.quantity, price: row.unitPrice }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'add to cart 200': (r) => r.status === 200 });
  });

  sleep(1);

  group('5. Checkout (transactional)', function () {
    const totalAmount = row.quantity * row.unitPrice;
    const res = http.post(
      `${BASE_URL}/api/checkout`,
      JSON.stringify({ total_amount: totalAmount, shipping_address: row.shippingAddress }),
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    check(res, { 'checkout 200': (r) => r.status === 200 });
  });

  sleep(1);
}

export function teardown(data) {
  console.log(
    `[Endurance Test] Hoàn tất với ${data.users.length} user ở ${ENDURANCE_VU} VU cố định. ` +
    `Tính "maximum stable RPS" và "memory ceiling" theo hướng dẫn ở test-plan.md mục 5, ` +
    `dùng raw JSON log + file CSV resource log (PowerShell monitor) thu thập song song lúc chạy.`,
  );
}
