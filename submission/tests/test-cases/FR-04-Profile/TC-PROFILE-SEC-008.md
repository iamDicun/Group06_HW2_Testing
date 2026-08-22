# TC-PROFILE-SEC-008: Auth Bypass - Gọi GET /api/users/me không có Token

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-001
**Endpoint**: GET /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Auth Bypass - Gọi GET /api/users/me không có Token

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Chặn truy cập khi thiếu JWT Token
- **Xử lý An ninh/Bảo mật**: Chặn truy cập khi thiếu JWT Token

## Ưu tiên
High
