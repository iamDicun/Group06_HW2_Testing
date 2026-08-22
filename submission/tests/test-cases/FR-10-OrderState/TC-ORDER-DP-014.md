# TC-ORDER-DP-014: User cancel đơn hàng :id không tồn tại

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-014
**Endpoint**: PUT /api/orders/999999/cancel

## Mục tiêu
Kiểm tra domain partition: User cancel đơn hàng :id không tồn tại

## Tiền điều kiện
- User/Admin đã xác thực với vai trò user

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/999999/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `404 Not Found`
- **Response Schema/Body**:
- Bị từ chối với mã lỗi và message phù hợp


## Ưu tiên
Medium
