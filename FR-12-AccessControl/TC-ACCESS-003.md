# TC-ACCESS-003: Truy cập API Admin với token user (không phải admin)

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Tài khoản User test (`test@eshop.com` / `Test1234!`) đã được đăng ký và hoạt động bình thường trong hệ thống.

## Test Data
| Field | Value |
|-------|-------|
| Method | GET |
| Endpoint | /api/admin/dashboard |
| Header: Authorization | Bearer <valid_user_jwt_token> |

## Test Steps
1. Gửi yêu cầu đăng nhập bằng phương thức `POST /api/auth/login` với dữ liệu:
   - Email: `test@eshop.com`
   - Mật khẩu: `Test1234!`
2. Nhận phản hồi thành công và sao chép mã JWT Token của user thông thường.
3. Gửi yêu cầu `GET /api/admin/dashboard` kèm theo header `Authorization: Bearer <mã JWT Token user vừa sao chép>`.

## Expected Result
- HTTP Status Code trả về là `403 Forbidden`.
- Phản hồi từ chối quyền truy cập với thông báo lỗi thích hợp.
- Dữ liệu dashboard không được trả về.

## Actual Result (filled after execution)
[What actually happened]

## Status
Not Run

## Related Bugs
None

## Notes
Kiểm tra xem hệ thống có trả về lỗi 403 khi tài khoản hợp lệ nhưng không đủ quyền hay không.
