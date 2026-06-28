# TC-USERMGMT-008: Kiểm tra xóa người dùng với Authorization Header chứa Token hết hạn hoặc không hợp lệ (Domain Testing)

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
| Authorization Header | Bearer <expired_or_corrupted_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/2 với header Authorization chứa token đã hết hạn hoặc bị lỗi chữ ký.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.
- Tài khoản người dùng ID = 2 không bị xóa.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 403 Forbidden thay vì 401 Unauthorized.

## Status
FAILED

## Related Bugs
BUG-USERMGMT-003

## Notes
- Kiểm thử token hết hạn hoặc sai chữ ký (P4 - Expired / Corrupted).
