# TC-PROFILE-ST-002: Cập nhật đè dữ liệu mới lên hồ sơ đã tồn tại

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-002
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra chuyển đổi trạng thái hồ sơ người dùng: Cập nhật đè dữ liệu mới lên hồ sơ đã tồn tại

## Tiền điều kiện
- User đã có hồ sơ thông tin trước đó

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
  "name": "Nguyen Van B",
  "phone": "0987654321",
  "shipping_address": "456 Nguyen Hue, Q1, TP.HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Cập nhật thành công, GET lại trả đúng thông tin mới


## Ưu tiên
Medium
