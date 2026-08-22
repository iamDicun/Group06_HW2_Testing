# TC-ORDER-SEC-007: Auth Bypass - Gọi hủy đơn hàng không có token

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-001
**Endpoint**: PUT /api/orders/1/cancel

## Mục tiêu
Kiểm tra an ninh bảo mật: Auth Bypass - Gọi hủy đơn hàng không có token

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/1/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Từ chối khi thiếu header Authorization
- **Xử lý An ninh/Bảo mật**: Từ chối khi thiếu header Authorization

## Ưu tiên
High
