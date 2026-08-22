# TC-IMPORT-SEC-002: SQL Injection trong description

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: SQL Injection trong description

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
      "description": "Mo ta' OR '1'='1",
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Lưu an toàn dạng text, không làm sai lệch truy vấn
- **Xử lý An ninh/Bảo mật**: Lưu an toàn dạng text, không làm sai lệch truy vấn

## Ưu tiên
High
