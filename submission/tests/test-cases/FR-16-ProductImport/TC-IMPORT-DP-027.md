# TC-IMPORT-DP-027: Không truyền Header Authorization

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-027
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra domain partition import: Không truyền Header Authorization

## Tiền điều kiện
- Admin đã đăng nhập với Bearer token

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
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
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- Bị từ chối với lỗi phù hợp


## Ưu tiên
Medium
