# TC-PROFILE-SEC-002: SQL Injection trong trường shipping_address

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-002
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: SQL Injection trong trường shipping_address

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
  "phone": "0912345678",
  "shipping_address": "'; DROP TABLE users; --"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Không làm drop table hoặc crash DB, sanitize an toàn
- **Xử lý An ninh/Bảo mật**: Không làm drop table hoặc crash DB, sanitize an toàn

## Ưu tiên
High
