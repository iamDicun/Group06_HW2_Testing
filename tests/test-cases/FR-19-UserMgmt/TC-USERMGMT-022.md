# TC-USERMGMT-022: Kiểm tra bảo mật cấu trúc dữ liệu phản hồi của API lấy danh sách người dùng (Không chứa trường password) (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Security / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request GET /api/admin/users với token Admin hợp lệ.
2. Nhận kết quả phản hồi của API và phân tích chi tiết JSON payload trả về cho từng tài khoản người dùng trong danh sách.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Danh sách người dùng trả về không chứa bất kỳ trường nào liên quan đến mật khẩu như password, password_hash, pass (dù là rỗng, đã mã hóa hay dưới bất kỳ định dạng nào).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử an toàn thông tin (Security Testing / Data Exposure).
