# TC-PROFILE-DP-018: Thiếu trường SĐT hoặc SĐT = null

**Kỹ thuật thiết kế**: Domain Partition / Boundary Value Analysis
**Tham chiếu test condition**: DP-018
**Endpoint**: PUT /api/users/me

## Mục tiêu
Kiểm tra cập nhật thông tin hồ sơ với điều kiện: Thiếu trường SĐT hoặc SĐT = null

## Tiền điều kiện
- User đã đăng nhập và có Bearer token hợp lệ

## Request
- **Method**: PUT
- **URL**: `{{base_url}}/api/users/me`
- **Headers**:
  - `Authorization`: `Bearer {{user_token}}`
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
- **Body (JSON)**:
```json
{
  "name": "Nguyen Van A",
  "shipping_address": "123 Le Loi, Q1, TP.HCM",
  "phone": null
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `400 Bad Request`
- **Response Schema/Body**:
- `{"error": "..."}` mô tả lý do dữ liệu không hợp lệ


## Ưu tiên
High
