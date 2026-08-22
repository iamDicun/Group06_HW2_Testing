# TC-PROFILE-SCH-005: Schema Validation cho PUT /api/users/me khi token sai (403 Forbidden)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-005
**Endpoint**: PUT /api/users/me

## Mục tiêu
Đối chiếu cấu trúc response JSON với API Spec: Schema Validation cho PUT /api/users/me khi token sai (403 Forbidden)

## Tiền điều kiện
- User có phiên làm việc tương ứng

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer invalid.token`
- **Body (JSON)**:
```json
{
  "name": "A"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response chứa key `error` (string)


## Ưu tiên
Medium
