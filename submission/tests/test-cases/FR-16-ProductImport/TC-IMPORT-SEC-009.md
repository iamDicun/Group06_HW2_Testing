# TC-IMPORT-SEC-009: Stored XSS trong trường name sản phẩm

**Kỹ thuật thiết kế**: Security Testing (SEC-05)
**Tham chiếu test condition**: SEC-05-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Stored XSS trong trường name sản phẩm

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
      "name": "<script>alert('XSS_Product')</script>",
      "price": 100000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Tên được sanitize/escape khi hiển thị trên giao diện
- **Xử lý An ninh/Bảo mật**: Tên được sanitize/escape khi hiển thị trên giao diện

## Ưu tiên
High
