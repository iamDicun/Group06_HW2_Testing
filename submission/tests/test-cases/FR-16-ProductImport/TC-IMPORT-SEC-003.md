# TC-IMPORT-SEC-003: SQL Injection trong imageUrl

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-003
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: SQL Injection trong imageUrl

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "SP Test",
      "price": 100000,
      "imageUrl": "http://test.com' UNION SELECT 1,2,3--",
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Sanitize an toàn
- **Xử lý An ninh/Bảo mật**: Sanitize an toàn

## Ưu tiên
High
