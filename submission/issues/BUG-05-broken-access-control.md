---
title: "[BUG][FR-10/FR-16]: Broken Access Control on Administrative Endpoints Due to Missing Role Authorization"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-ORDER-SEC-005` (và `TC-IMPORT-SEC-003`)

### Requirement Related
`FR-10` (Order State Management), `FR-16` (Product Import), `FR-12` (Role-Based Access Control) & `SEC-03` (Privilege Escalation)

### Severity
Critical

### Priority
P0

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/admin/*`
- **Test Account**: `user@test.com` (Role: `user`, Student ID: `23127391`)

### Steps to Reproduce
1. Đăng nhập với tài khoản User thông thường (`user@test.com` / `123456`) để lấy JWT Bearer token của User.
2. Gửi các request nhắm vào các endpoint dành riêng cho Admin bằng token của User thường:
   - `PUT /api/admin/orders/1/status` với body `{"status": "delivered"}`
   - `GET /api/admin/orders`
   - `POST /api/admin/import-products` với body `{"products": [...]}`
3. Kiểm tra HTTP Status Code và quyền truy cập thực tế.

### Expected Result
- Theo đặc tả bảo mật và RBAC, các API bắt đầu bằng tiền tố `/api/admin/*` **chỉ dành riêng cho người dùng có `role = 'admin'`**.
- Khi một Regular User (Role `user`) cố gắng truy cập, hệ thống bắt buộc phải từ chối với mã lỗi `403 Forbidden` (`{"error": "Forbidden: Admin privilege required"}`).

### Actual Result
- Middleware `authenticateToken` chỉ kiểm tra chữ ký hợp lệ của JWT token mà hoàn toàn **không kiểm tra `req.user.role === 'admin'`**.
- Người dùng thông thường có thể gọi thành công các API quản trị (`200 OK`), cập nhật trạng thái đơn hàng của người khác, xem danh sách toàn bộ đơn hàng của sàn, và import sản phẩm mới vào danh mục.

### Evidence

#### 1. Request & Response Log
```http
PUT /api/admin/orders/1/status HTTP/1.1
Host: localhost:3000
Authorization: Bearer <regular_user_token>
Content-Type: application/json
X-Student-Id: 23127391

{
  "status": "delivered"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Order status updated"
}
```

#### 2. Lỗ hổng trong mã nguồn Backend (`application/backend/server.js:100-110`)
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};
// KHÔNG HỀ CÓ middleware requireAdmin kiểm tra req.user.role === 'admin'
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-ORDER-SEC-005: Deny regular user from calling admin update order status
  AssertionError: expected response to have status code 403 but got 200
```

#### 4. Khuyến nghị khắc phục
- Bổ sung middleware `requireAdmin`:
  ```javascript
  const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: "Forbidden: Admin role required" });
    }
    next();
  };
  ```
- Gắn `requireAdmin` vào tất cả các route `/api/admin/*`, ví dụ:
  ```javascript
  app.put("/api/admin/orders/:id/status", authenticateToken, requireAdmin, (req, res) => { ... });
  app.post("/api/admin/import-products", authenticateToken, requireAdmin, (req, res) => { ... });
  app.get("/api/admin/orders", authenticateToken, requireAdmin, (req, res) => { ... });
  ```
