# TC-PROFILE-SEC-001: SQL Injection trong trường name

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: SQL Injection trong trường name

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
  "name": "' OR '1'='1",
  "phone": "0912345678",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Không thực thi câu lệnh SQLi, không lộ lỗi SQL syntax 500
- **Xử lý An ninh/Bảo mật**: Không thực thi câu lệnh SQLi, không lộ lỗi SQL syntax 500

## Ưu tiên
High
