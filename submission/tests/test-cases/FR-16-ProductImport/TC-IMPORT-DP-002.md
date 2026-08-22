# TC-IMPORT-DP-002: Import mảng nhiều sản phẩm hợp lệ

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Import mảng nhiều sản phẩm hợp lệ

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
      "name": "SP A",
      "price": 10000
    },
    {
      "name": "SP B",
      "price": 20000
    },
    {
      "name": "SP C",
      "price": 30000
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
