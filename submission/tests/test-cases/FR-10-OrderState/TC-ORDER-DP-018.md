# TC-ORDER-DP-018: Checkout với địa chỉ rỗng

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-018
**Endpoint**: POST /api/checkout

## Mục tiêu
Kiểm tra domain partition: Checkout với địa chỉ rỗng

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
  "shipping_address": ""
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Bị từ chối với mã lỗi và message phù hợp


## Ưu tiên
Medium
