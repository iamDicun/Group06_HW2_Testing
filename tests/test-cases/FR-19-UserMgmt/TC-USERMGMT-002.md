# TC-USERMGMT-002: Kiểm tra xóa người dùng khi ID hợp lệ nhưng không tồn tại trong CSDL (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và có token xác thực hợp lệ.
- Tài khoản người dùng ID = 999999 không tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 999999 |
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/999999 với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 404 Not Found.
- Thông báo lỗi chỉ ra người dùng không tồn tại.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử trường hợp ID hợp lệ nhưng không tồn tại (P2 - Non-existent ID).
