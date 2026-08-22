# TC-ORDER-DP-019: Authorization token hợp lệ của Admin

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-019
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra domain partition: Authorization token hợp lệ của Admin

## Tiền điều kiện
- User/Admin đã xác thực với vai trò admin

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
- Xử lý thành công


## Ưu tiên
Medium
