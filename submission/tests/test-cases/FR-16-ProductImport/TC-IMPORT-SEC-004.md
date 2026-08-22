# TC-IMPORT-SEC-004: IDOR - Thử ghi đè thông tin sản phẩm hoặc danh mục trái phép

**Kỹ thuật thiết kế**: Security Testing (SEC-02)
**Tham chiếu test condition**: SEC-02-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra an ninh bảo mật import: IDOR - Thử ghi đè thông tin sản phẩm hoặc danh mục trái phép

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
      "id": 1,
      "name": "Overwrite Attempt",
      "price": 100000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Chỉ thực hiện thêm mới theo logic import
- **Xử lý An ninh/Bảo mật**: Chỉ thực hiện thêm mới theo logic import

## Ưu tiên
High
