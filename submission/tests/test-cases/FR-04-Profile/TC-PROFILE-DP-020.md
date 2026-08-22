# TC-PROFILE-DP-020: Địa chỉ có dấu phẩy, gạch chéo, số nhà

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-020
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra cập nhật thông tin hồ sơ với điều kiện: Địa chỉ có dấu phẩy, gạch chéo, số nhà

## Tiền điều kiện
- User đã đăng nhập và có Bearer token hợp lệ

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
  "shipping_address": "Số 45/12, Hẻm 3, Đường CMT8, P.10, Q.3, TP.HCM",
  "phone": "0912345678"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- `{"message": "Profile updated"}`


## Ưu tiên
Medium
