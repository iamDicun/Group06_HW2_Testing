# TC-IMPORT-SCH-003: Schema Validation khi chưa xác thực (401 Unauthorized)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-003
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Đối chiếu schema response: Schema Validation khi chưa xác thực (401 Unauthorized)

## Tiền điều kiện
- Admin có quyền thực thi API

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
      "name": "SP",
      "price": 1000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `401 Unauthorized`
- **Response Schema/Body**:
- JSON object có key `error` (string: "Unauthorized")


## Ưu tiên
Medium
