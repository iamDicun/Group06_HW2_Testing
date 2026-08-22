# TC-ORDER-ST-008: User cố hủy đơn khi đang shipping (Bị cấm)

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-008
**Endpoint**: PUT /api/orders/{{order_id}}/cancel

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'shipping' sang 'canceled' (Invalid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'shipping'
- Tài khoản thực hiện có quyền user

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/{{order_id}}/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối (400 Bad Request), trạng thái đơn hàng giữ nguyên 'shipping'


## Ưu tiên
High
