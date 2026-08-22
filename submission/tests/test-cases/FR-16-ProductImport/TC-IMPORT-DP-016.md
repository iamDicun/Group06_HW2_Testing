# TC-IMPORT-DP-016: Giá sản phẩm bằng 0 (Vi phạm price > 0)

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-016
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Giá sản phẩm bằng 0 (Vi phạm price > 0)

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
      "price": 0,
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
