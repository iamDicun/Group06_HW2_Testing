# TC-ORDER-ST-001: Admin chuyển pending -> confirmed

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-001
**Endpoint**: PUT /api/admin/orders/{{order_id}}/status

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'pending' sang 'confirmed' (Valid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'pending'
- Tài khoản thực hiện có quyền admin

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/{{order_id}}/status`
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
- Chuyển trạng thái thành công sang 'confirmed'


## Ưu tiên
High
