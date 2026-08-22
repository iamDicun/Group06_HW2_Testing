# TC-PROFILE-SCH-001: Schema Validation cho GET /api/users/me (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-001
**Endpoint**: GET /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Schema Validation cho GET /api/users/me (200 OK)

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
- Response chứa đúng các key: id (int), name (string), email (string), role (string), shipping_address (string|null), phone (string|null)


## Ưu tiên
Medium
