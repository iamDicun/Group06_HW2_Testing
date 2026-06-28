# TC-USERMGMT-005: Kiểm tra xóa người dùng khi ID sai kiểu dữ liệu (Domain Testing)

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

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | "abc" |
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/abc với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 200 OK thay vì 400.
- Nhận được JSON response: `{"message": "User deleted"}`.

## Status
FAILED

## Related Bugs
BUG-USERMGMT-001

## Notes
- Kiểm thử sai kiểu dữ liệu của ID (P5 - Wrong type).
