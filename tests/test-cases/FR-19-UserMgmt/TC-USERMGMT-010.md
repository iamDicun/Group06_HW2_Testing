# TC-USERMGMT-010: Kiểm tra xóa người dùng khi tài khoản thực hiện có vai trò không hợp lệ hoặc không xác định (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Tài khoản người dùng (ID = 2) tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 2 |
| Authorization Header | Bearer <token_with_invalid_role_guest> |

## Test Steps
1. Gửi request DELETE /api/admin/users/2 với header Authorization chứa token có role = 'guest'.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 403 Forbidden.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử vai trò không hợp lệ ngoài hệ thống (P3 - Invalid/Unknown Role).
