# TC-ORDER-SEC-001: SQL Injection trên :id khi User cancel đơn hàng

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-001
**Endpoint**: PUT /api/orders/1%20OR%201=1/cancel

## Mục tiêu
Kiểm tra an ninh bảo mật: SQL Injection trên :id khi User cancel đơn hàng

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/1%20OR%201=1/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `400/404`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không làm lộ cú pháp lỗi SQL, parameterized query an toàn
- **Xử lý An ninh/Bảo mật**: Không làm lộ cú pháp lỗi SQL, parameterized query an toàn

## Ưu tiên
High
