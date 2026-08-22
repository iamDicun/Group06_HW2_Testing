# TC-ORDER-ST-012: Chuyển đổi từ Final State delivered -> shipping

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-012
**Endpoint**: PUT /api/admin/orders/{{order_id}}/status

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'delivered' sang 'shipping' (Invalid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'delivered'
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
  "status": "shipping"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối (400 Bad Request), trạng thái đơn hàng giữ nguyên 'delivered'


## Ưu tiên
High
