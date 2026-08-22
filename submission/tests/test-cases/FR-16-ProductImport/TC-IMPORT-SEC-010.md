# TC-IMPORT-SEC-010: Stored XSS trong trường description

**Kỹ thuật thiết kế**: Security Testing (SEC-05)
**Tham chiếu test condition**: SEC-05-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Stored XSS trong trường description

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
      "name": "SP XSS",
      "price": 100000,
      "description": "<svg/onload=alert('XSS_Desc')>",
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Mô tả được sanitize an toàn
- **Xử lý An ninh/Bảo mật**: Mô tả được sanitize an toàn

## Ưu tiên
High
