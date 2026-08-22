# TC-ORDER-DP-017: Checkout với địa chỉ hợp lệ

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-017
**Endpoint**: POST /api/checkout

## Mục tiêu
Kiểm tra domain partition: Checkout với địa chỉ hợp lệ

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
  "total_amount": 100000,
  "shipping_address": "Số 10 Hai Ba Trung"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Xử lý thành công


## Ưu tiên
Medium
