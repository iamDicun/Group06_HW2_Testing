# TC-IMPORT-SEC-006: Role Escalation - Giả mạo quyền Admin trong body hoặc header

**Kỹ thuật thiết kế**: Security Testing (SEC-03)
**Tham chiếu test condition**: SEC-03-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Role Escalation - Giả mạo quyền Admin trong body hoặc header

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
  ],
  "isAdmin": true
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không thể bypass kiểm tra phân quyền
- **Xử lý An ninh/Bảo mật**: Không thể bypass kiểm tra phân quyền

## Ưu tiên
High
