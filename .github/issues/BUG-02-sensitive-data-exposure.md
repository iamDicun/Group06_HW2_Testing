---
title: "[BUG][FR-04]: Sensitive Data Exposure Leaking Plaintext Passwords and Reset Tokens via GET /api/users/me"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-PROFILE-SEC-013` (và `TC-PROFILE-SEC-014`)

### Requirement Related
`FR-04` (Personal Profile Management) & `SEC-07` (Sensitive Data Exposure)

### Severity
Critical

### Priority
P0

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/users/me`
- **Test Account**: `user@test.com` (Student ID: `23127391`)

### Steps to Reproduce
1. Đăng nhập hệ thống qua `POST /api/login` với tài khoản hợp lệ (`user@test.com` / `123456`) để lấy JWT Bearer token.
2. Gửi HTTP Request `GET /api/users/me` kèm Header `Authorization: Bearer <user_token>`.
3. Kiểm tra JSON response payload trả về từ server.

### Expected Result
- Theo chuẩn an ninh OWASP API Security Top 10 và đặc tả FR-04, API chỉ được phép trả về các thông tin công khai/cơ bản của người dùng (`id`, `name`, `email`, `role`, `shipping_address`, `phone`).
- **Tuyệt đối KHÔNG được để lộ các trường nhạy cảm** như `password`, hash mật khẩu, hoặc `reset_token`.

### Actual Result
- Response JSON trả về nguyên vẹn toàn bộ các cột trong bảng `users`, bao gồm trường `password` (ở dạng plaintext `123456`) và trường `reset_token`.
- Bất kỳ ai chặn bắt hoặc xem response đều có thể trích xuất mật khẩu của tài khoản.

### Evidence

#### 1. Request & Response Log
```http
GET /api/users/me HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-Student-Id: 23127391
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 2,
  "name": "User Test",
  "email": "user@test.com",
  "password": "user123",
  "role": "user",
  "shipping_address": "123 Main Street",
  "phone": "0912345678",
  "reset_token": null
}
```

#### 2. Lỗ hổng trong mã nguồn Backend (`application/backend/server.js:113-115`)
```javascript
app.get("/api/users/me", authenticateToken, (req, res) => {
  // LỖ HỔNG: Sử dụng SELECT * lấy toàn bộ dữ liệu bao gồm password và reset_token trả về client
  db.get("SELECT * FROM users WHERE id = ?", [req.user.id], (err, user) => {
    res.json(user);
  });
});
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-PROFILE-SEC-013: Response does not leak password field
  AssertionError: expected { Object (id, name, email, password, ...) } to not have property 'password'
```

#### 4. Khuyến nghị khắc phục
- Sửa câu lệnh SQL thành:
  ```javascript
  db.get("SELECT id, name, email, role, shipping_address, phone FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
  ```
