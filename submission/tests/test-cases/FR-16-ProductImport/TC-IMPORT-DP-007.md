# TC-IMPORT-DP-007: Tên sản phẩm chữ cái và số chuẩn

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-007
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Tên sản phẩm chữ cái và số chuẩn

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
      "name": "iPhone 16 Pro Max",
      "price": 35000000,
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
