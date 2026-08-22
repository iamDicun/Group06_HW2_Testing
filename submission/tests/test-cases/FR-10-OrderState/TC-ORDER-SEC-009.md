# TC-ORDER-SEC-009: Stored XSS trong shipping_address khi tạo đơn checkout

**Kỹ thuật thiết kế**: Security Testing (SEC-05)
**Tham chiếu test condition**: SEC-05-001
**Endpoint**: POST /api/checkout

## Mục tiêu
Kiểm tra an ninh bảo mật: Stored XSS trong shipping_address khi tạo đơn checkout

## Tiền điều kiện
- Hệ thống đang hoạt động

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
  "shipping_address": "<script>alert('OrderXSS')</script>"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Địa chỉ được lưu và hiển thị an toàn, không render script
- **Xử lý An ninh/Bảo mật**: Địa chỉ được lưu và hiển thị an toàn, không render script

## Ưu tiên
High
