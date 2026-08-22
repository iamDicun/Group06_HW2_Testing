# TC-IMPORT-SEC-008: Auth Bypass - Gọi API với Token chữ ký giả mạo

**Kỹ thuật thiết kế**: Security Testing (SEC-04)
**Tham chiếu test condition**: SEC-04-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Auth Bypass - Gọi API với Token chữ ký giả mạo

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer forged.admin.token`
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
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Chặn truy cập khi JWT Signature sai
- **Xử lý An ninh/Bảo mật**: Chặn truy cập khi JWT Signature sai

## Ưu tiên
High
