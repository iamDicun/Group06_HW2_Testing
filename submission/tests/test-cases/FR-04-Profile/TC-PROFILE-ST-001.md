# TC-PROFILE-ST-001: Cập nhật hồ sơ lần đầu từ tài khoản mới

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra chuyển đổi trạng thái hồ sơ người dùng: Cập nhật hồ sơ lần đầu từ tài khoản mới

## Tiền điều kiện
- User vừa đăng ký tài khoản mới

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
  "name": "Nguyen Van A",
  "phone": "0912345678",
  "shipping_address": "123 Le Loi, Q1, TP.HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Cập nhật thành công, GET lại trả đúng thông tin mới


## Ưu tiên
High
