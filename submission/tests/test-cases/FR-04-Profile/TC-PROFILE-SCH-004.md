# TC-PROFILE-SCH-004: Schema Validation cho PUT /api/users/me khi dữ liệu lỗi (400 Bad Request)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-004
**Endpoint**: PUT /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Schema Validation cho PUT /api/users/me khi dữ liệu lỗi (400 Bad Request)

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
  "name": "",
  "phone": "123"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Response chứa key `error` (string)


## Ưu tiên
Medium
