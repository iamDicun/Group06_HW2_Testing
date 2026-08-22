# TC-IMPORT-DP-026: Header Authorization của User thường (Không có quyền admin)

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-026
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Header Authorization của User thường (Không có quyền admin)

## Tiền điều kiện
- Admin đã đăng nhập với Bearer token

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "Sample",
      "price": 10000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- Bị từ chối với lỗi phù hợp


## Ưu tiên
Medium
