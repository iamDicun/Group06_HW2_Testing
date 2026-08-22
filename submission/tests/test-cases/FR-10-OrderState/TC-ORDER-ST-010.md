# TC-ORDER-ST-010: Chuyển lùi trạng thái shipping -> confirmed

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-010
**Endpoint**: PUT /api/admin/orders/{{order_id}}/status

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'shipping' sang 'confirmed' (Invalid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'shipping'
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
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối (400 Bad Request), trạng thái đơn hàng giữ nguyên 'shipping'


## Ưu tiên
High
