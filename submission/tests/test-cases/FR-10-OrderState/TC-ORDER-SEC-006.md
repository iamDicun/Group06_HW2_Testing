# TC-ORDER-SEC-006: Role Escalation - Regular User gọi API Admin xem toàn bộ đơn hàng

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-002
**Endpoint**: GET /api/admin/orders

## Mục tiêu
Kiểm tra an ninh bảo mật: Role Escalation - Regular User gọi API Admin xem toàn bộ đơn hàng

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/admin/orders`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: User thường bị từ chối truy cập danh sách quản trị
- **Xử lý An ninh/Bảo mật**: User thường bị từ chối truy cập danh sách quản trị

## Ưu tiên
High
