# TC-PROFILE-DP-026: Token không có tiền tố Bearer

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-026
**Endpoint**: PUT {{base_url}}/api/users/me

## Mục tiêu
Kiểm tra hành vi endpoint khi truyền Token không có tiền tố Bearer

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Authorization`: `InvalidPrefix {{user_token}}`
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
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Trả về JSON chứa field `error`


## Ưu tiên
Medium
