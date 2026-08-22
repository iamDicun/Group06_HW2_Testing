# TC-PROFILE-SEC-003: SQL Injection trong trường phone

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-003
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: SQL Injection trong trường phone

## Tiền điều kiện
- Server backend đang hoạt động

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
  "name": "Test",
  "phone": "' UNION SELECT id, email, password FROM users --",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Validate SĐT từ chối chuỗi chứa payload SQLi
- **Xử lý An ninh/Bảo mật**: Validate SĐT từ chối chuỗi chứa payload SQLi

## Ưu tiên
High
