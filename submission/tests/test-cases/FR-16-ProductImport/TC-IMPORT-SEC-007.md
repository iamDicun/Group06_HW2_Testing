# TC-IMPORT-SEC-007: Auth Bypass - Gọi POST /api/admin/import-products không có token

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Auth Bypass - Gọi POST /api/admin/import-products không có token

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "SP 1",
      "price": 10000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Chặn truy cập khi thiếu Authorization header
- **Xử lý An ninh/Bảo mật**: Chặn truy cập khi thiếu Authorization header

## Ưu tiên
High
