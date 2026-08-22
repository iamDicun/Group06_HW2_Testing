# TC-ORDER-DP-005: Path param :id là số thực

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-005
**Endpoint**: PUT /api/admin/orders/1.5/status

## Mục tiêu
Kiểm tra domain partition: Path param :id là số thực

## Tiền điều kiện
- User/Admin đã xác thực với vai trò admin

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/1.5/status`
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
- **HTTP Status Code**: `400/404`
- **Response Schema/Body**:
- Bị từ chối với mã lỗi và message phù hợp


## Ưu tiên
Medium
