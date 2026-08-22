# TC-ORDER-SEC-004: IDOR - User A xem chi tiết đơn hàng của User B

**Kỹ thuật thiết kế**: Security Testing (SEC-02)
**Tham chiếu test condition**: SEC-02-002
**Endpoint**: GET /api/orders/2

## Mục tiêu
Kiểm tra an ninh bảo mật: IDOR - User A xem chi tiết đơn hàng của User B

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/orders/2`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `403/404`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không xem được dữ liệu đơn hàng người khác
- **Xử lý An ninh/Bảo mật**: Không xem được dữ liệu đơn hàng người khác

## Ưu tiên
High
