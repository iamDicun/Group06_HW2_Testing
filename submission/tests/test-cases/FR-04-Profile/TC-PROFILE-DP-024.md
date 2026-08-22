# TC-PROFILE-DP-024: Token Bearer hợp lệ của User

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-024
**Endpoint**: GET {{base_url}}/api/users/me

## Mục tiêu
Kiểm tra hành vi endpoint khi truyền Token Bearer hợp lệ của User

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Authorization`: `Bearer {{user_token}}`
  - `X-Student-Id`: `{{student_id}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Trả về JSON thành công


## Ưu tiên
Medium
