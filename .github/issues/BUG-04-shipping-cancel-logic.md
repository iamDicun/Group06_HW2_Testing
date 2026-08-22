---
title: "[BUG][FR-10]: Broken Cancellation Logic Permitting Regular Users to Cancel In-Transit (Shipping) Orders"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-ORDER-ST-008`

### Requirement Related
`FR-10` (Order State Machine & Cancellation Rules)

### Severity
Major

### Priority
P1

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/orders/:id/cancel`
- **Test Account**: `user@test.com` (Role: `user`, Student ID: `22127001`)

### Steps to Reproduce
1. Chuẩn bị một đơn hàng thuộc sở hữu của `user@test.com` đang ở trạng thái `shipping` (hàng đang được bên vận chuyển giao).
2. Đăng nhập với tài khoản `user@test.com` để lấy Bearer token.
3. Gửi HTTP Request `PUT /api/orders/<order_id>/cancel` kèm Header `Authorization: Bearer <user_token>`.
4. Kiểm tra HTTP Status Code và Response Body.
5. Gửi `GET /api/orders/<order_id>` để xác nhận trạng thái đơn hàng.

### Expected Result
- Theo đặc tả FR-10: Khách hàng chỉ được phép tự hủy đơn khi đơn hàng đang ở trạng thái `pending` hoặc `confirmed`.
- Khi đơn hàng đã chuyển sang `shipping` (đã đóng gói và bàn giao đơn vị vận chuyển), **khách hàng KHÔNG được phép tự hủy**.
- Backend phải từ chối yêu cầu hủy với mã lỗi `400 Bad Request` và thông báo `"Cannot cancel order in shipping state"`. Trạng thái đơn hàng phải giữ nguyên là `shipping`.

### Actual Result
- Backend xử lý thành công yêu cầu hủy đơn và chuyển trạng thái đơn hàng từ `shipping` sang `canceled`.
- Server phản hồi `200 OK` với body `{"message": "Order canceled successfully"}`.
- Gây rủi ro thất thoát hàng hóa khi shipper vẫn đang giao hàng nhưng đơn đã bị hủy trên hệ thống.

### Evidence

#### 1. Request & Response Log
```http
PUT /api/orders/3/cancel HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-Student-Id: 22127001
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Order canceled successfully"
}
```

#### 2. Lỗi logic trong mã nguồn Backend (`application/backend/server.js:328-331`)
```javascript
app.put("/api/orders/:id/cancel", authenticateToken, (req, res) => {
  db.get(
    "SELECT * FROM orders WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err, order) => {
      if (!order) return res.status(404).json({ error: "Order not found" });

      // LỖ HỔNG LOGIC: Chỉ chặn 'delivered' và 'canceled', bỏ sót kiểm tra trạng thái 'shipping'
      // Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')
      if (order.status === "delivered" || order.status === "canceled") {
        return res.status(400).json({ error: "Cannot cancel this order." });
      }

      db.run(
        "UPDATE orders SET status = ? WHERE id = ?",
        ["canceled", req.params.id],
        function (err) {
          res.json({ message: "Order canceled successfully" });
        },
      );
    },
  );
});
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-ORDER-ST-008: Reject user cancel when order is in shipping state
  AssertionError: expected response to have status code 400 but got 200
```

#### 4. Khuyến nghị khắc phục
- Sửa điều kiện kiểm tra hợp lệ tại `server.js:329` thành:
  ```javascript
  if (order.status !== "pending" && order.status !== "confirmed") {
    return res.status(400).json({ error: "Cannot cancel order unless it is pending or confirmed." });
  }
  ```
