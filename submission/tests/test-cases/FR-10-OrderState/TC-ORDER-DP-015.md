# TC-ORDER-DP-015: Checkout với total_amount dương hợp lệ

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-015
**Endpoint**: POST /api/checkout

## Mục tiêu
Kiểm tra domain partition: Checkout với total_amount dương hợp lệ

## Tiền điều kiện
- User/Admin đã xác thực với vai trò user

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
  "total_amount": 200000,
  "shipping_address": "123 Le Loi"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Xử lý thành công


## Ưu tiên
Medium
