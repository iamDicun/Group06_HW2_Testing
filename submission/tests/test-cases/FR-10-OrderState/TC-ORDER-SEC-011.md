# TC-ORDER-SEC-011: Sensitive Data Exposure - Kiểm tra dữ liệu lộ trong GET /api/admin/orders

**Kỹ thuật thiết kế**: Security Testing (SEC-07)
**Tham chiếu test condition**: SEC-07-001
**Endpoint**: GET /api/admin/orders

## Mục tiêu
Kiểm tra an ninh bảo mật: Sensitive Data Exposure - Kiểm tra dữ liệu lộ trong GET /api/admin/orders

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/admin/orders`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không làm lộ mật khẩu, reset_token của user liên kết trong đơn
- **Xử lý An ninh/Bảo mật**: Không làm lộ mật khẩu, reset_token của user liên kết trong đơn

## Ưu tiên
High
