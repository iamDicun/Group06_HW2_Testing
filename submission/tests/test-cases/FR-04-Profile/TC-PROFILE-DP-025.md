# TC-PROFILE-DP-025: Thiếu header Authorization

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-025
**Endpoint**: GET {{base_url}}/api/users/me

## Mục tiêu
Kiểm tra hành vi endpoint khi truyền Thiếu header Authorization

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `X-Student-Id`: `{{student_id}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Trả về JSON chứa field `error`


## Ưu tiên
Medium
