# TC-ORDER-ST-002: User hủy đơn pending -> canceled

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-002
**Endpoint**: PUT /api/orders/{{order_id}}/cancel

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'pending' sang 'canceled' (Valid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'pending'
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
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Chuyển trạng thái thành công sang 'canceled'


## Ưu tiên
High
