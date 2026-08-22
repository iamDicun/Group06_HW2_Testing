# TC-ORDER-DP-004: Path param :id là chuỗi ký tự

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-004
**Endpoint**: PUT /api/admin/orders/abc/status

## Mục tiêu
Kiểm tra domain partition: Path param :id là chuỗi ký tự

## Tiền điều kiện
- User/Admin đã xác thực với vai trò admin

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/abc/status`
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
