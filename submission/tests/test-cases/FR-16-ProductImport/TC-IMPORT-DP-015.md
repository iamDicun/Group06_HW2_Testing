# TC-IMPORT-DP-015: Biên dưới giá sản phẩm: 1 ₫

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-015
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Biên dưới giá sản phẩm: 1 ₫

## Tiền điều kiện
- Admin đã đăng nhập với Bearer token

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
      "price": 1,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Import xử lý thành công hoặc báo cáo kết quả tương ứng


## Ưu tiên
Medium
