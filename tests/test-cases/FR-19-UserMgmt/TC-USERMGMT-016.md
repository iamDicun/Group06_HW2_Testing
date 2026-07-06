# TC-USERMGMT-016: Kiểm tra lấy danh sách người dùng khi tài khoản thực hiện có vai trò là User (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản người dùng (ID = 2, role = 'user') đã đăng nhập và có token xác thực.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | Bearer <user_token> |

## Test Steps
1. Gửi request GET /api/admin/users với token có vai trò user thường.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 403 Forbidden.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 200 OK thay vì 403.
- Danh sách người dùng được trả về đầy đủ cho tài khoản phân quyền thấp.

## Status
FAILED

## Related Bugs
BUG-USERMGMT-004

## Notes
- Kiểm thử phân quyền truy cập danh sách người dùng đối với vai trò user (P2 - User Role).
