import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

const BASE_URL = 'http://localhost:3000';

// Chạy 1 lần trước khi test bắt đầu — tạo N user riêng biệt
export function setup() {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const email = `loadtest_${i}_${Date.now()}@test.com`;
    http.post(`${BASE_URL}/api/register`, JSON.stringify({
      name: `LoadUser${i}`,
      email,
      password: 'Test@123',
    }), { headers: { 'Content-Type': 'application/json' } });
    users.push(email);
  }
  return { users };
}

// Mỗi VU login bằng 1 account riêng dựa theo __VU (chỉ số VU)
export default function (data) {
  const email = data.users[__VU % data.users.length];
  const loginRes = http.post(`${BASE_URL}/api/login`, JSON.stringify({
    email,
    password: 'Test@123',
  }), { headers: { 'Content-Type': 'application/json' } });

  check(loginRes, { 'login OK': (r) => r.status === 200 });

  const token = loginRes.json('token');

  const cartRes = http.get(`${BASE_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(cartRes, { 'cart OK': (r) => r.status === 200 });
}