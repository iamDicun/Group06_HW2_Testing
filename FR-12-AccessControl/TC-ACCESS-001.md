# TC-ACCESS-001: Truy cập API Admin với token admin hợp lệ

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Tài khoản Admin (`admin@eshop.com` / `Admin123!`) đã được đăng ký và hoạt động bình thường trong hệ thống.

## Test Data
| Field | Value |
|-------|-------|
| Method | GET |
| Endpoint | /api/admin/dashboard |
| Header: Authorization | Bearer <valid_admin_jwt_token> |

## Test Steps
1. Gửi yêu cầu đăng nhập bằng phương thức `POST /api/auth/login` với dữ liệu:
   - Email: `admin@eshop.com`
   - Mật khẩu: `Admin123!`
2. Nhận phản hồi thành công và sao chép mã JWT Token từ kết quả trả về.
3. Gửi yêu cầu `GET /api/admin/dashboard` kèm theo header `Authorization: Bearer <mã JWT Token vừa sao chép>`.

## Expected Result
- HTTP Status Code trả về là `200 OK`.
- Response chứa đầy đủ thông tin thống kê của hệ thống (Doanh thu, tổng số đơn hàng) theo đặc tả của Dashboard Admin.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK cùng dữ liệu thống kê của hệ thống như mô tả.

## Status
PASSED

## Related Bugs
None

## Notes
Kiểm tra độ chính xác của JWT Token giải mã được role = 'admin'.
