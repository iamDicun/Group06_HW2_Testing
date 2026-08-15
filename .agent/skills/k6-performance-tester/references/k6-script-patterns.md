# K6 Script Patterns — Reference

Khung code tham khảo cho Giai đoạn 3 của skill k6-performance-tester. Điều chỉnh tên biến, endpoint, payload theo hệ thống thực tế của người dùng.

## Cấu trúc file dùng chung: k6-[MODULE]-workflow.js

```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const BASE_URL = __ENV.BASE_URL || 'https://staging.example.com';

// Think-time theo nhóm endpoint — KHONG dung gia tri co dinh
function thinkAuth() { sleep(randomIntBetween(1, 2)); }
function thinkRead() { sleep(randomIntBetween(2, 5)); }
function thinkTransactional() { sleep(randomIntBetween(3, 8)); }

export function runWorkflow() {
  let token;

  group('auth', function () {
    const res = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
      username: __ENV.TEST_USER || 'perf_user',
      password: __ENV.TEST_PASS || 'perf_pass',
    }), { headers: { 'Content-Type': 'application/json' } });

    check(res, {
      'login status 200': (r) => r.status === 200,
      'login returns token': (r) => !!r.json('token'),
    });
    token = res.json('token');
    thinkAuth();
  });

  const authHeaders = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };

  group('read', function () {
    const search = http.get(`${BASE_URL}/api/documents?query=contract`, authHeaders);
    check(search, { 'search status 200': (r) => r.status === 200 });
    thinkRead();

    const docId = search.json('items.0.id');
    const detail = http.get(`${BASE_URL}/api/documents/${docId}`, authHeaders);
    check(detail, { 'detail status 200': (r) => r.status === 200 });
    thinkRead();
  });

  group('transactional', function () {
    const envelope = http.post(`${BASE_URL}/api/envelopes`, JSON.stringify({
      documentId: 'doc-id-placeholder',
      signers: [{ email: 'signer@example.com' }],
    }), authHeaders);
    check(envelope, { 'create envelope status 201': (r) => r.status === 201 });
    thinkTransactional();

    const envelopeId = envelope.json('id');
    const sign = http.post(`${BASE_URL}/api/envelopes/${envelopeId}/sign`, JSON.stringify({
      signatureData: 'base64-placeholder',
    }), authHeaders);
    check(sign, { 'sign status 200': (r) => r.status === 200 });
    thinkTransactional();

    const complete = http.post(`${BASE_URL}/api/envelopes/${envelopeId}/complete`, null, authHeaders);
    check(complete, { 'complete status 200': (r) => r.status === 200 });
    thinkTransactional();
  });

  group('auth', function () {
    const logout = http.post(`${BASE_URL}/api/auth/logout`, null, authHeaders);
    check(logout, { 'logout status 200': (r) => r.status === 200 });
    thinkAuth();
  });
}
```

## k6-[MODULE]-load.js

```javascript
import { runWorkflow } from './k6-[MODULE]-workflow.js';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // ramp-up den normal load
    { duration: '5m', target: 50 },   // giu on dinh o normal load
    { duration: '2m', target: 60 },   // ramp-up nhe len peak (~1.2x)
    { duration: '5m', target: 60 },   // giu o peak
    { duration: '2m', target: 0 },    // ramp-down
  ],
  thresholds: {
    'group_duration{group:::auth}': ['p(95)<500'],
    'group_duration{group:::read}': ['p(95)<800'],
    'group_duration{group:::transactional}': ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  runWorkflow();
}
```

## k6-[MODULE]-stress.js

```javascript
import { runWorkflow } from './k6-[MODULE]-workflow.js';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // baseline
    { duration: '3m', target: 100 },  // step 1 (~2x)
    { duration: '3m', target: 150 },  // step 2 (~3x)
    { duration: '3m', target: 200 },  // step 3 (~4x) - ky vong bat dau thay degrade
    { duration: '5m', target: 200 },  // giu de quan sat hanh vi khi vuot nguong
    { duration: '3m', target: 0 },    // ramp-down, quan sat recovery
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'], // noi long hon Load vi muc tieu la tim breaking point
  },
};

export default function () {
  runWorkflow();
}
```

## k6-[MODULE]-spike.js

```javascript
import { runWorkflow } from './k6-[MODULE]-workflow.js';

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // baseline
    { duration: '30s', target: 400 }, // spike dot ngot (~8x)
    { duration: '1m', target: 400 },  // giu dinh ngan
    { duration: '30s', target: 50 },  // giam dot ngot ve baseline
    { duration: '3m', target: 50 },   // giu o baseline de do thoi gian phuc hoi
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'], // noi long nhat vi trong tam la kha nang phuc hoi
  },
};

export default function () {
  runWorkflow();
}
```

## Ghi chú điều chỉnh tham số

- Các con số 50/100/150/200/400 VU chỉ là ví dụ minh họa cho hệ thống quy mô vừa. LUÔN thay bằng số liệu thực tế nếu người dùng cung cấp (concurrent user thực đo, log traffic).
- `group_duration{group:::auth}` là cách k6 tách metric theo group đã đặt tên trong workflow — dùng để so sánh performance riêng từng nhóm endpoint (auth/read/transactional) trong cùng một lần chạy.
- Với hệ thống có rate-limit ở tầng auth (ví dụ chống brute-force), cần trao đổi trước với team backend trước khi chạy Stress/Spike vào endpoint login thật, tránh tự khóa tài khoản test hoặc bị chặn IP.