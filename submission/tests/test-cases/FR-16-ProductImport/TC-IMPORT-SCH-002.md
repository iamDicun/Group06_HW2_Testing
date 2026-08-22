# TC-IMPORT-SCH-002: Schema Validation khi Body rỗng (400 Bad Request)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-002
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Đối chiếu schema response: Schema Validation khi Body rỗng (400 Bad Request)

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
{}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- JSON object có key `error` (string: "Không có dữ liệu để import")


## Ưu tiên
Medium
