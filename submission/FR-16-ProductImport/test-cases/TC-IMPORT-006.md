# TC-IMPORT-006: Chặn import khi không có quyền Admin

## Requirement ID
FR-16

## Feature
Import Sản phẩm từ CSV

## Module / Test Type / Technique
ProductImport / Security / Use Case Testing

## Priority
High

## Preconditions
- Người dùng đăng nhập bằng tài khoản người dùng thường (`role = 'user'`) để lấy token JWT.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | "Bearer normal_user_token..." |

## Test Steps
1. Gửi request `POST /api/admin/import-products` qua API với token của người dùng thường và body chứa danh sách sản phẩm.
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra cơ sở dữ liệu để xác nhận không có sản phẩm mới nào được thêm.

## Expected Result
- API trả về mã lỗi HTTP 403 Forbidden hoặc 401 Unauthorized.
- Response chứa thông báo lỗi phân quyền phù hợp.
- Cơ sở dữ liệu bảng `products` không được phép thay đổi.

## Actual Result (filled after execution)
- API trả về mã lỗi HTTP 403 Forbidden. Yêu cầu import bị chặn đúng kỳ vọng khi không có quyền Admin.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử bảo mật (Access Control) nhằm ngăn chặn người dùng không có đặc quyền thực hiện các thao tác quản trị viên.
