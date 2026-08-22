# TC-PROFILE-SEC-004: IDOR - Thử cập nhật profile của user khác bằng cách gán id trong body

**Kỹ thuật thiết kế**: Security Testing (SEC-02)
**Tham chiếu test condition**: SEC-02-001
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra lỗ hổng bảo mật: IDOR - Thử cập nhật profile của user khác bằng cách gán id trong body

## Tiền điều kiện
- Server backend đang hoạt động

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{user_token}}`
- **Body (JSON)**:
```json
{
  "id": 1,
  "name": "Hacked Name",
  "phone": "0912345678",
  "shipping_address": "HCM"
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Response tuân thủ chính sách bảo mật: Chỉ cập nhật cho user tương ứng token (req.user.id), không ghi đè user 1
- **Xử lý An ninh/Bảo mật**: Chỉ cập nhật cho user tương ứng token (req.user.id), không ghi đè user 1

## Ưu tiên
High
