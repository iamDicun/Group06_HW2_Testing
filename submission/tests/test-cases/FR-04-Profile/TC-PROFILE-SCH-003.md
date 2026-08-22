# TC-PROFILE-SCH-003: Schema Validation cho PUT /api/users/me (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-003
**Endpoint**: PUT /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Schema Validation cho PUT /api/users/me (200 OK)

## Tiền điều kiện
- User có phiên làm việc tương ứng

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "name": "A",
  "phone": "0912345678",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response chứa key `message` (string: "Profile updated")


## Ưu tiên
Medium
