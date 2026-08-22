# TC-PROFILE-ST-003: Cập nhật thất bại do SĐT sai - Giữ nguyên trạng thái cũ

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-003
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra chuyển đổi trạng thái hồ sơ người dùng: Cập nhật thất bại do SĐT sai - Giữ nguyên trạng thái cũ

## Tiền điều kiện
- User có hồ sơ hợp lệ đang lưu trong DB

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
  "name": "Nguyen Van C",
  "phone": "12345",
  "shipping_address": "789 Vo Van Tan"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối, dữ liệu trong CSDL giữ nguyên trạng thái trước đó


## Ưu tiên
High
