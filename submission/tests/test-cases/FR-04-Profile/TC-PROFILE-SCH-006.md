# TC-PROFILE-SCH-006: Kiểm tra tính toàn vẹn kiểu dữ liệu phone (string)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-006
**Endpoint**: GET /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Kiểm tra tính toàn vẹn kiểu dữ liệu phone (string)

## Tiền điều kiện
- User có phiên làm việc tương ứng

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Kiểm tra trường phone luôn ở dạng string để không mất số 0 ở đầu


## Ưu tiên
Medium
