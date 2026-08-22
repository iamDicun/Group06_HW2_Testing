# TC-PROFILE-SEC-013: Sensitive Data Exposure - Kiểm tra rò rỉ trường password trong GET /api/users/me

**Kỹ thuật thiết kế**: Security Testing (SEC-07)
**Tham chiếu test condition**: SEC-07-001
**Endpoint**: GET /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Sensitive Data Exposure - Kiểm tra rò rỉ trường password trong GET /api/users/me

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Response KHÔNG được chứa trường password / hash mật khẩu
- **Xử lý An ninh/Bảo mật**: Response KHÔNG được chứa trường password / hash mật khẩu

## Ưu tiên
High
