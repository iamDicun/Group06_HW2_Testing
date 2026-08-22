# TC-IMPORT-SEC-012: Sensitive Data Exposure - Báo cáo lỗi không làm lộ chi tiết SQL

**Kỹ thuật thiết kế**: Security Testing (SEC-07)
**Tham chiếu test condition**: SEC-07-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: Sensitive Data Exposure - Báo cáo lỗi không làm lộ chi tiết SQL

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
      "name": "Test",
      "price": "invalid_price"
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Thông báo lỗi thân thiện, không làm lộ stack trace nội bộ của SQLite
- **Xử lý An ninh/Bảo mật**: Thông báo lỗi thân thiện, không làm lộ stack trace nội bộ của SQLite

## Ưu tiên
High
