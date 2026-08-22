# TC-IMPORT-SCH-004: Schema Validation khi không có quyền Admin (403 Forbidden)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-004
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Đối chiếu schema response: Schema Validation khi không có quyền Admin (403 Forbidden)

## Tiền điều kiện
- Admin có quyền thực thi API

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
      "name": "SP",
      "price": 1000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `403 Forbidden`
- **Response Schema/Body**:
- JSON object có key `error` (string)


## Ưu tiên
Medium
