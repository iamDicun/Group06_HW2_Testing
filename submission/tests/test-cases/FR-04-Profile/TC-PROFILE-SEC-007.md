# TC-PROFILE-SEC-007: Role Escalation - Regular User gửi field isAdmin=true

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-002
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Role Escalation - Regular User gửi field isAdmin=true

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
  "isAdmin": true
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Không cấp quyền Admin trái phép
- **Xử lý An ninh/Bảo mật**: Không cấp quyền Admin trái phép

## Ưu tiên
High
