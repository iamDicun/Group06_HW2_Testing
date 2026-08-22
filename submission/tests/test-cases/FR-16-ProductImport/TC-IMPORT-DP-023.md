# TC-IMPORT-DP-023: imageUrl hợp lệ

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-023
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: imageUrl hợp lệ

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
      "price": 100000,
      "imageUrl": "https://placehold.co/300.png"
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
