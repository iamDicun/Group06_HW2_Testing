---
title: "[BUG][FR-04]: Privilege Escalation via Mass Assignment on User Profile Update"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-PROFILE-SEC-006`

### Requirement Related
`FR-04` (Personal Profile Management)

### Severity
Critical

### Priority
P0

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/users/me`
- **Test Account**: `user@test.com` (Role: `user`, Student ID: `23127391`)

### Steps to Reproduce
1. Đăng nhập với tài khoản User thông thường (`user@test.com` / `123456`) qua `POST /api/login` để lấy JWT Bearer token.
2. Gửi HTTP Request `PUT /api/users/me` với Header `Authorization: Bearer <user_token>` và kèm trường `role: "admin"` trong body:
   ```json
   {
     "name": "User Attacker",
     "phone": "0912345678",
     "shipping_address": "123 Street, HCM",
     "role": "admin"
   }
   ```
3. Kiểm tra HTTP Status Code và Response Body trả về.
4. Gửi `GET /api/users/me` hoặc dùng token truy cập các endpoint quản trị `/api/admin/*`.

### Expected Result
- Theo đặc tả FR-04, người dùng thông thường **tuyệt đối không được phép tự thay đổi quyền hạn** (`role`).
- Backend phải bỏ qua trường `role` (whitelist input validation) hoặc trả về mã lỗi `400 Bad Request` / `403 Forbidden`.
- Giá trị `role` của tài khoản trong CSDL SQLite phải giữ nguyên là `user`.

### Actual Result
- Backend chấp nhận trường `role` và trực tiếp thực thi câu truy vấn cập nhật trường `role = 'admin'` vào CSDL.
- Server phản hồi `200 OK` với body `{"message": "Profile updated"}`.
- Tài khoản người dùng thường đã tự nâng cấp thành công lên quyền Quản trị viên (`admin`) và có thể truy cập toàn bộ tài nguyên quản trị.

### Evidence

#### 1. Request & Response Log
```http
PUT /api/users/me HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
X-Student-Id: 23127391

{
  "name": "User Attacker",
  "phone": "0912345678",
  "shipping_address": "123 Street, HCM",
  "role": "admin"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Profile updated"
}
```

#### 2. Lỗ hổng trong mã nguồn Backend (`application/backend/server.js:124-127`)
```javascript
app.put("/api/users/me", authenticateToken, (req, res) => {
  const { name, shipping_address, phone, role } = req.body;

  let query = "UPDATE users SET name = ?, shipping_address = ?, phone = ?";
  let params = [name, shipping_address, phone];

  // LỖ HỔNG BẢO MẬT: Chấp nhận field 'role' từ client gửi lên mà không kiểm tra quyền admin
  if (role) {
    query += ", role = ?";
    params.push(role);
  }
  query += " WHERE id = ?";
  params.push(req.user.id);
  ...
```

#### 3. Khuyến nghị khắc phục
- Loại bỏ hoàn toàn việc trích xuất và cập nhật trường `role` trong endpoint `PUT /api/users/me`.
- Áp dụng kỹ thuật Whitelist DTO (Data Transfer Object) chỉ cho phép cập nhật 3 trường: `name`, `phone`, `shipping_address`.
