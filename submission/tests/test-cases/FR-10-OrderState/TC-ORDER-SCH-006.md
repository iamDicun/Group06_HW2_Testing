# TC-ORDER-SCH-006: Schema Validation cho GET /api/orders/my-orders (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-006
**Endpoint**: GET /api/orders/my-orders

## Mục tiêu
Kiểm tra schema response: Schema Validation cho GET /api/orders/my-orders (200 OK)

## Tiền điều kiện
- Hệ thống có dữ liệu tương ứng

## Request
- **Method**: GET
- **URL**: `{{base_url}}/api/orders/my-orders`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body**: None

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Mảng các objects với các trường `id`, `user_id`, `total_amount`, `status`, `shipping_address`, `created_at`


## Ưu tiên
Medium
