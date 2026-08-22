# TC-ORDER-SCH-002: Schema Validation cho PUT /api/admin/orders/:id/status (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-002
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra schema response: Schema Validation cho PUT /api/admin/orders/:id/status (200 OK)

## Tiền điều kiện
- Hệ thống có dữ liệu tương ứng

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/1/status`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body (JSON)**:
```json
{
  "status": "confirmed"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- JSON object có key `message` (string: "Order status updated")


## Ưu tiên
Medium
