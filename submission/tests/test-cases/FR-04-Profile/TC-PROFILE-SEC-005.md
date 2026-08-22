# TC-PROFILE-SEC-005: IDOR - Đọc thông tin user khác qua GET /api/users/me

**Kỹ thuật thiết kế**: Security Testing (SEC-02)
**Tham chiếu test condition**: SEC-02-002
**Endpoint**: GET /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: IDOR - Đọc thông tin user khác qua GET /api/users/me

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
- Response tuân thủ chính sách bảo mật: Chỉ trả thông tin của chính user trong token
- **Xử lý An ninh/Bảo mật**: Chỉ trả thông tin của chính user trong token

## Ưu tiên
High
