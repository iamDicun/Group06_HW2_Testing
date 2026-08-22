# TC-PROFILE-ST-004: Cập nhật khi Token hết hạn - Từ chối và không đổi DB

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-004
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra chuyển đổi trạng thái hồ sơ người dùng: Cập nhật khi Token hết hạn - Từ chối và không đổi DB

## Tiền điều kiện
- Token của user đã hết hạn

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Authorization`: `Bearer {{user_token}}`
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "name": "New Name",
  "phone": "0912345678",
  "shipping_address": "New Addr"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `401/403`
- **Response Schema/Body**:
- Bị từ chối, dữ liệu trong CSDL giữ nguyên trạng thái trước đó


## Ưu tiên
High
