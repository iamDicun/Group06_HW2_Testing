# TC-ORDER-ST-015: Chuyển đổi từ Final State canceled -> pending

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-015
**Endpoint**: PUT /api/admin/orders/{{order_id}}/status

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'canceled' sang 'pending' (Invalid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'canceled'
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
  "status": "pending"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối (400 Bad Request), trạng thái đơn hàng giữ nguyên 'canceled'


## Ưu tiên
High
