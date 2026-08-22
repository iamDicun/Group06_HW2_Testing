# TC-PROFILE-SCH-002: Schema Validation cho GET /api/users/me (401 Unauthorized)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-002
**Endpoint**: GET /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Schema Validation cho GET /api/users/me (401 Unauthorized)

## Tiền điều kiện
- User có phiên làm việc tương ứng

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Response chứa key `error` (string)


## Ưu tiên
Medium
