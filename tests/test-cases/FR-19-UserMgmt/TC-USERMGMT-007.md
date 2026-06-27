# TC-USERMGMT-007: Kiểm tra xóa người dùng với Authorization Header sai định dạng (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản người dùng (ID = 2) tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 2 |
| Authorization Header | "Token <valid_admin_token>" |

## Test Steps
1. Gửi request DELETE /api/admin/users/2 với header Authorization chứa token sai định dạng (thiếu Bearer).
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.
- Tài khoản người dùng ID = 2 không bị xóa.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử sai định dạng token xác thực (P3 - Invalid Format).
