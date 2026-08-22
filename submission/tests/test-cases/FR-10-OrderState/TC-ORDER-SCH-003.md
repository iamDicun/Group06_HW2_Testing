# TC-ORDER-SCH-003: Schema Validation cho PUT /api/orders/:id/cancel (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-003
**Endpoint**: PUT /api/orders/1/cancel

## Mục tiêu
Kiểm tra schema response: Schema Validation cho PUT /api/orders/:id/cancel (200 OK)

## Tiền điều kiện
- Hệ thống có dữ liệu tương ứng

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
- JSON object có key `message` (string: "Order canceled successfully")


## Ưu tiên
Medium
