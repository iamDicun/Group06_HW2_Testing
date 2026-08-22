# TC-IMPORT-ST-004: Rollback nguyên tử khi category_id không tồn tại (9999)

**Kỹ thuật thiết kế**: State Transition & Transactional Integrity Testing
**Tham chiếu test condition**: ST-004
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): Rollback nguyên tử khi category_id không tồn tại (9999)

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
      "name": "SP Hop Le 1",
      "price": 100000,
      "category_id": 1
    },
    {
      "name": "SP Sai Category",
      "price": 200000,
      "category_id": 9999
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200 Error`
- **Response Schema/Body**:
- Rollback toàn bộ lô import do vi phạm ràng buộc


## Ưu tiên
High
