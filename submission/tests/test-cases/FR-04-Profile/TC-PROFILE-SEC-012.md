# TC-PROFILE-SEC-012: Rate Limiting - Gửi 50 request cập nhật liên tục

**Kỹ thuật thiết kế**: Security Testing (SEC-06)
**Tham chiếu test condition**: SEC-06-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Rate Limiting - Gửi 50 request cập nhật liên tục

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "name": "Rapid Update"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `429/200`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Hệ thống giới hạn tần suất request (Rate Limiting) hoặc xử lý ổn định không crash
- **Xử lý An ninh/Bảo mật**: Hệ thống giới hạn tần suất request (Rate Limiting) hoặc xử lý ổn định không crash

## Ưu tiên
High
