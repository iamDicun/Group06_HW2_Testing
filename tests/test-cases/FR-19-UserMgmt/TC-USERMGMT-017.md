# TC-USERMGMT-017: Kiểm tra lấy danh sách người dùng khi tài khoản thực hiện có vai trò không hợp lệ hoặc không xác định (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Hệ thống có danh sách người dùng tồn tại.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | Bearer <token_with_invalid_role_guest> |

## Test Steps
1. Gửi request GET /api/admin/users với token chứa vai trò 'guest'.
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
- Kiểm thử phân quyền với vai trò không xác định đối với API GET (P3 - Invalid/Unknown Role).
