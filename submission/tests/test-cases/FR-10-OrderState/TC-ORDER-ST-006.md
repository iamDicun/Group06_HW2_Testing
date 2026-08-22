# TC-ORDER-ST-006: Admin hủy đơn confirmed -> canceled

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-006
**Endpoint**: PUT /api/admin/orders/{{order_id}}/status

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'confirmed' sang 'canceled' (Valid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'confirmed'
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
  "status": "canceled"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Chuyển trạng thái thành công sang 'canceled'


## Ưu tiên
High
