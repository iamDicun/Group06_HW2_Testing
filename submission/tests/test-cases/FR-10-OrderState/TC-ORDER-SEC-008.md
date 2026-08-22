# TC-ORDER-SEC-008: Auth Bypass - Gọi Admin update status không có token

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-002
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra an ninh bảo mật: Auth Bypass - Gọi Admin update status không có token

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/1/status`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "status": "confirmed"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Từ chối khi thiếu JWT
- **Xử lý An ninh/Bảo mật**: Từ chối khi thiếu JWT

## Ưu tiên
High
