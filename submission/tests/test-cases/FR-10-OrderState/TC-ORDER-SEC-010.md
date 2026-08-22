# TC-ORDER-SEC-010: Concurrency / Race Condition - Gửi 2 request hủy đơn liên tiếp

**Kỹ thuật thiết kế**: Security Testing (SEC-06)
**Tham chiếu test condition**: SEC-06-001
**Endpoint**: PUT /api/orders/1/cancel

## Mục tiêu
Kiểm tra an ninh bảo mật: Concurrency / Race Condition - Gửi 2 request hủy đơn liên tiếp

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/orders/1/cancel`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200/400`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Request 1 hủy thành công, request 2 bị từ chối do đơn đã canceled
- **Xử lý An ninh/Bảo mật**: Request 1 hủy thành công, request 2 bị từ chối do đơn đã canceled

## Ưu tiên
High
