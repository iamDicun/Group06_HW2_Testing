# TC-USERMGMT-009: Kiểm tra xóa người dùng khi tài khoản thực hiện có vai trò là User (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản người dùng A (ID = 2, role = 'user') đã đăng nhập và có token xác thực.
- Tài khoản người dùng B (ID = 3, role = 'user') tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 3 |
| Authorization Header | Bearer <user_a_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/3 với header Authorization chứa token của Người dùng A (role = 'user').
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 403 Forbidden.
- Tài khoản người dùng B ID = 3 không bị xóa.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 200 OK thay vì 403.
- Tài khoản người dùng bị xóa khỏi CSDL thành công bởi token phân quyền thấp.

## Status
FAILED

## Related Bugs
BUG-USERMGMT-004

## Notes
- Kiểm thử phân quyền truy cập API Admin bằng vai trò user thường (P2 - User Role).
