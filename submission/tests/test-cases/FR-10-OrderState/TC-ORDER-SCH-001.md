# TC-ORDER-SCH-001: Schema Validation cho POST /api/checkout (200 OK)

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-001
**Endpoint**: POST /api/checkout

## Mục tiêu
Kiểm tra schema response: Schema Validation cho POST /api/checkout (200 OK)

## Tiền điều kiện
- Hệ thống có dữ liệu tương ứng

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/checkout`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "total_amount": 100000,
  "shipping_address": "123 Le Loi"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- JSON object có key `message` (string), `orderId` (number)


## Ưu tiên
Medium
