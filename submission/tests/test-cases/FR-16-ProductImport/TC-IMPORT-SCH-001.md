# TC-IMPORT-SCH-001: Schema Validation khi Import thành công (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-001
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Đối chiếu schema response: Schema Validation khi Import thành công (200 OK)

## Tiền điều kiện
- Admin có quyền thực thi API

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
      "name": "SP Test Schema",
      "price": 100000,
      "category_id": 1
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- JSON object có `message` (string), `inserted` (number), `errors` (array)


## Ưu tiên
Medium
