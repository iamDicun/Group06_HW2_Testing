# TC-ORDER-ST-005: User hủy đơn confirmed -> canceled

**Kỹ thuật thiết kế**: State Transition Testing
**Tham chiếu test condition**: ST-005
**Endpoint**: PUT /api/orders/{{order_id}}/cancel

## Mục tiêu
Kiểm tra chuyển đổi trạng thái đơn hàng từ 'confirmed' sang 'canceled' (Valid)

## Tiền điều kiện
- Đơn hàng đang ở trạng thái 'confirmed'
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
