# TC-IMPORT-SEC-001: SQL Injection trong trường name sản phẩm

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: SQL Injection trong trường name sản phẩm

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
      "name": "iPhone 16', 1000, '', '', 1); DROP TABLE products; --",
      "price": 100000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không làm drop table hoặc hỏng cấu trúc SQL
- **Xử lý An ninh/Bảo mật**: Không làm drop table hoặc hỏng cấu trúc SQL

## Ưu tiên
High
