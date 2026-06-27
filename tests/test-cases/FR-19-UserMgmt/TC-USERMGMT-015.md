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


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử token không hợp lệ đối với API GET (P4 - Expired / Corrupted).
