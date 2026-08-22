# TC-ORDER-SCH-005: Schema Validation khi không tìm thấy đơn hàng (404 Not Found)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-005
**Endpoint**: PUT /api/orders/999999/cancel

## Mục tiêu
Kiểm tra schema response: Schema Validation khi không tìm thấy đơn hàng (404 Not Found)

## Tiền điều kiện
- Hệ thống có dữ liệu tương ứng

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
- JSON object có key `error` (string)


## Ưu tiên
Medium
