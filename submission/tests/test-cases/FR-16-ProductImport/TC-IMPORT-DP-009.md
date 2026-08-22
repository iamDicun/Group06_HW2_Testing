# TC-IMPORT-DP-009: Tên sản phẩm là chuỗi rỗng

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-009
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Tên sản phẩm là chuỗi rỗng

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
      "name": "",
      "price": 100000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200 Error`
- **Response Schema/Body**:
- Bị từ chối với lỗi phù hợp


## Ưu tiên
Medium
