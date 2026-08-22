# TC-IMPORT-ST-002: Rollback nguyên tử khi SP số 2 có giá âm (-100000)

**Kỹ thuật thiết kế**: State Transition & Transactional Integrity Testing
**Tham chiếu test condition**: ST-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): Rollback nguyên tử khi SP số 2 có giá âm (-100000)

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
      "name": "SP Loi 2",
      "price": -100000,
      "category_id": 1
    },
    {
      "name": "SP Hop Le 3",
      "price": 200000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400/200 Error`
- **Response Schema/Body**:
- All-or-Nothing Rollback: CSDL KHÔNG được chèn bất kỳ sản phẩm nào trong lô này


## Ưu tiên
High
