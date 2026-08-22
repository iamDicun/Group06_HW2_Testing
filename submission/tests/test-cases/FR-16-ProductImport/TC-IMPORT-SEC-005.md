# TC-IMPORT-SEC-005: Role Escalation - User thường gọi API Import của Admin

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Role Escalation - User thường gọi API Import của Admin

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "Hacked Product",
      "price": 1000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Chặn truy cập đối với tài khoản không phải Admin
- **Xử lý An ninh/Bảo mật**: Chặn truy cập đối với tài khoản không phải Admin

## Ưu tiên
High
