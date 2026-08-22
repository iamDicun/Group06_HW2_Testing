# TC-PROFILE-SEC-006: Role Escalation - Regular User gửi field role=admin để tự thăng quyền

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Role Escalation - Regular User gửi field role=admin để tự thăng quyền

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
  "name": "User Test",
  "phone": "0912345678",
  "shipping_address": "HCM",
  "role": "admin"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/403/200`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Bỏ qua field role hoặc từ chối; DB vẫn giữ nguyên role=user
- **Xử lý An ninh/Bảo mật**: Bỏ qua field role hoặc từ chối; DB vẫn giữ nguyên role=user

## Ưu tiên
High
