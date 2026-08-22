# TC-PROFILE-DP-027: Token chữ ký không hợp lệ

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-027
**Endpoint**: PUT {{base_url}}/api/users/me

## Mục tiêu
Kiểm tra hành vi endpoint khi truyền Token chữ ký không hợp lệ

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Authorization`: `Bearer fake_jwt_token_tampered`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "name": "A",
  "phone": "0912345678",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Trả về JSON chứa field `error`


## Ưu tiên
Medium
