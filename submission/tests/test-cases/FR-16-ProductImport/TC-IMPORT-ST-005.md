# TC-IMPORT-ST-005: Import lại thành công sau khi sửa toàn bộ dữ liệu lỗi

**Kỹ thuật thiết kế**: State Transition & Transactional Integrity Testing
**Tham chiếu test condition**: ST-005
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): Import lại thành công sau khi sửa toàn bộ dữ liệu lỗi

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
      "name": "SP Da Sua 1",
      "price": 100000,
      "category_id": 1
    },
    {
      "name": "SP Da Sua 2",
      "price": 200000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Import thành công trọn vẹn lô mới


## Ưu tiên
High
