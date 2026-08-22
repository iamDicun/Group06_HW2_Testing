# TC-ORDER-SEC-003: IDOR - User A hủy đơn hàng của User B

**Kỹ thuật thiết kế**: Security Testing (SEC-02)
**Tham chiếu test condition**: SEC-02-001
**Endpoint**: PUT /api/orders/2/cancel

## Mục tiêu
Kiểm tra an ninh bảo mật: IDOR - User A hủy đơn hàng của User B

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/2/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `404/403`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Chỉ hủy được đơn thuộc quyền sở hữu của User A
- **Xử lý An ninh/Bảo mật**: Chỉ hủy được đơn thuộc quyền sở hữu của User A

## Ưu tiên
High
