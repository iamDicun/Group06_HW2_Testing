# TC-ORDER-DP-013: User cancel đơn hàng :id hợp lệ của chính mình

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-013
**Endpoint**: PUT /api/orders/1/cancel

## Mục tiêu
Kiểm tra domain partition: User cancel đơn hàng :id hợp lệ của chính mình

## Tiền điều kiện
- User/Admin đã xác thực với vai trò user

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/1/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Xử lý thành công


## Ưu tiên
Medium
