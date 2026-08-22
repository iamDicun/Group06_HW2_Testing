# TC-IMPORT-ST-003: Rollback nguyên tử khi SP số 2 thiếu trường name

**Kỹ thuật thiết kế**: State Transition & Transactional Integrity Testing
**Tham chiếu test condition**: ST-003
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): Rollback nguyên tử khi SP số 2 thiếu trường name

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
      "price": 200000,
      "category_id": 1
    },
    {
      "name": "SP Hop Le 3",
      "price": 300000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200 Error`
- **Response Schema/Body**:
- All-or-Nothing Rollback: Toàn bộ lô import bị hủy, CSDL giữ nguyên vẹn


## Ưu tiên
High
