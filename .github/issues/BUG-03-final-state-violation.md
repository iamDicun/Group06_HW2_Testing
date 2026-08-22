---
title: "[BUG][FR-10]: State Machine Violation Allowing Invalid Transition from Final State Canceled to Delivered"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-ORDER-ST-014`

### Requirement Related
`FR-10` (Order State Machine & Lifecycle)

### Severity
Critical

### Priority
P0

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/admin/orders/:id/status`
- **Test Account**: `admin@test.com` (Role: `admin`, Student ID: `23127391`)

### Steps to Reproduce
1. Chuẩn bị một đơn hàng `order_id = 1` đang ở trạng thái `canceled` (Final State).
2. Đăng nhập với tài khoản Admin (`admin@test.com` / `admin123`) để lấy Bearer token.
3. Gửi HTTP Request `PUT /api/admin/orders/1/status` với body:
   ```json
   {
     "status": "delivered"
   }
   ```
4. Kiểm tra HTTP Status Code và Response Body.
5. Gửi `GET /api/orders/1` để kiểm tra trạng thái đơn hàng trong CSDL.

### Expected Result
- Theo đặc tả FR-10 (Order State Machine): `delivered` và `canceled` là **2 trạng thái kết thúc (Final States)**, không thể đảo ngược hoặc chuyển đổi sang bất kỳ trạng thái nào khác.
- Khi một đơn hàng đã bị hủy (`canceled`), yêu cầu chuyển sang `delivered` là **bất hợp lệ (Invalid Transition)**.
- Backend phải từ chối request với mã lỗi `400 Bad Request` và thông báo lỗi rõ ràng. Trạng thái trong CSDL phải giữ nguyên là `canceled`.

### Actual Result
- Backend chấp nhận chuyển đổi từ `canceled` sang `delivered`.
- Server phản hồi `200 OK` với body `{"message": "Order status updated"}`.
- Đơn hàng đã hủy bị khôi phục và đánh dấu là giao thành công, gây sai lệch nghiêm trọng về số liệu doanh thu và kho vận.

### Evidence

#### 1. Request & Response Log
```http
PUT /api/admin/orders/1/status HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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

#### 2. Lỗi logic trong mã nguồn Backend (`application/backend/server.js:550-551`)
```javascript
app.put("/api/admin/orders/:id/status", authenticateToken, (req, res) => {
  const { status } = req.body;
  ...
  if (currentStatus === "pending" && (status === "confirmed" || status === "canceled"))
    isValidTransition = true;
  if (currentStatus === "confirmed" && (status === "shipping" || status === "canceled"))
    isValidTransition = true;
  if (currentStatus === "shipping" && status === "delivered")
    isValidTransition = true;

  // LỖ HỔNG LOGIC: Cho phép chuyển trái phép từ canceled sang delivered
  if (currentStatus === "canceled" && status === "delivered")
    isValidTransition = true;

  if (!isValidTransition) {
    return res.status(400).json({
      error: `Invalid state transition from ${currentStatus} to ${status}`,
    });
  }
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-ORDER-ST-014: Reject transition from canceled to delivered
  AssertionError: expected response to have status code 400 but got 200
```

#### 4. Khuyến nghị khắc phục
- Xóa bỏ hoàn toàn dòng kiểm tra `if (currentStatus === "canceled" && status === "delivered") isValidTransition = true;`.
- Đảm bảo một khi đơn hàng đạt `canceled` hoặc `delivered`, không có bất kỳ trạng thái tiếp theo nào được coi là hợp lệ.
