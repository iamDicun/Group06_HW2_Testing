# TC-PROFILE-SEC-009: Auth Bypass - Gọi PUT /api/users/me với JWT Token giả mạo

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-002
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: Auth Bypass - Gọi PUT /api/users/me với JWT Token giả mạo

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer forged.jwt.token`
- **Body (JSON)**:
```json
{
  "name": "Hacker"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Chặn truy cập khi JWT Signature sai
- **Xử lý An ninh/Bảo mật**: Chặn truy cập khi JWT Signature sai

## Ưu tiên
High
