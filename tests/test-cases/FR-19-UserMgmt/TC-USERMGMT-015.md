# TC-USERMGMT-015: Kiểm tra lấy danh sách người dùng với Authorization Header chứa Token hết hạn hoặc không hợp lệ (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Hệ thống có danh sách người dùng tồn tại.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | Bearer <expired_or_corrupted_token> |

## Test Steps
1. Gửi request GET /api/admin/users với token đã hết hạn hoặc sai chữ ký.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 403 Forbidden thay vì 401 Unauthorized.

## Status
FAILED

## Related Bugs
BUG-USERMGMT-003

## Notes
- Kiểm thử token không hợp lệ đối với API GET (P4 - Expired / Corrupted).
