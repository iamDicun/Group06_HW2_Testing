# TC-USERMGMT-001: Kiểm tra xóa người dùng thành công khi ID hợp lệ, tồn tại và không phải tài khoản hiện tại (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và có token xác thực hợp lệ.
- Tài khoản người dùng (ID = 2) tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 2 |
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/2 với header Authorization chứa token của Admin (ID = 1).
2. Kiểm tra phản hồi trả về từ API.
3. Kiểm tra sự tồn tại của tài khoản ID = 2 trong cơ sở dữ liệu.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Tài khoản người dùng ID = 2 đã bị xóa khỏi cơ sở dữ liệu.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 200 OK.
- Tài khoản người dùng ID = 2 đã được xác minh bị xóa khỏi CSDL.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử trường hợp happy path cho việc xóa người dùng hợp lệ.
