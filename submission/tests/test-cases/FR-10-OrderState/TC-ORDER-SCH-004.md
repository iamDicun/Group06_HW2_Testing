# TC-ORDER-SCH-004: Schema Validation khi chuyển trạng thái sai (400 Bad Request)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-004
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra schema response: Schema Validation khi chuyển trạng thái sai (400 Bad Request)

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
  "status": "unknown"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- JSON object có key `error` (string)


## Ưu tiên
Medium
