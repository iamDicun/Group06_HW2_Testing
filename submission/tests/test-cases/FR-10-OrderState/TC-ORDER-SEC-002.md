# TC-ORDER-SEC-002: SQL Injection trong body status khi Admin update

**Kỹ thuật thiết kế**: Security Testing (SEC-01)
**Tham chiếu test condition**: SEC-01-002
**Endpoint**: PUT /api/admin/orders/1/status

## Mục tiêu
Kiểm tra an ninh bảo mật: SQL Injection trong body status khi Admin update

## Tiền điều kiện
- Hệ thống đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/admin/orders/1/status`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body (JSON)**:
```json
{
  "status": "confirmed'; DROP TABLE orders; --"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- Response tuân thủ an toàn bảo mật: Không drop table, sanitize enum hợp lệ
- **Xử lý An ninh/Bảo mật**: Không drop table, sanitize enum hợp lệ

## Ưu tiên
High
