# TC-ORDER-SEC-005: Role Escalation - Regular User gọi API Admin update order status

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-001
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra an ninh bảo mật: Role Escalation - Regular User gọi API Admin update order status

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/1/status`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "status": "delivered"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Yêu cầu role admin, user thường bị từ chối
- **Xử lý An ninh/Bảo mật**: Yêu cầu role admin, user thường bị từ chối

## Ưu tiên
High
