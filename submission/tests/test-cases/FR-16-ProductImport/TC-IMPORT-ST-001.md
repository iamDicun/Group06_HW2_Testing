# TC-IMPORT-ST-001: Import danh sách 3 sản phẩm hợp lệ toàn bộ

**Kỹ thuật thiết kế**: State Transition & Transactional Integrity Testing
**Tham chiếu test condition**: ST-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): Import danh sách 3 sản phẩm hợp lệ toàn bộ

## Tiền điều kiện
- Admin có quyền quản trị

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Authorization`: `Bearer {{admin_token}}`
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "name": "SP Import 1",
      "price": 100000,
      "category_id": 1
    },
    {
      "name": "SP Import 2",
      "price": 200000,
      "category_id": 2
    },
    {
      "name": "SP Import 3",
      "price": 300000,
      "category_id": 3
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- CSDL tăng chính xác 3 sản phẩm mới


## Ưu tiên
High
