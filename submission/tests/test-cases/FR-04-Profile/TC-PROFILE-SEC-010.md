# TC-PROFILE-SEC-010: Stored XSS trong trường name

**Kỹ thuật thiết kế**: Security Testing (SEC-05)
**Tham chiếu test condition**: SEC-05-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Stored XSS trong trường name

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
  "name": "<script>alert('XSS')</script>",
  "phone": "0912345678",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Chuỗi được encode/escape, không thực thi mã JavaScript
- **Xử lý An ninh/Bảo mật**: Chuỗi được encode/escape, không thực thi mã JavaScript

## Ưu tiên
High
