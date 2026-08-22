# TC-ORDER-DP-003: Path param :id là số âm

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-003
**Endpoint**: PUT /api/admin/orders/-1/status

## Mục tiêu
Kiểm tra domain partition: Path param :id là số âm

## Tiền điều kiện
- User/Admin đã xác thực với vai trò admin

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/-1/status`
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
