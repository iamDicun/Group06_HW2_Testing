# TC-USERMGMT-013: Kiểm tra lấy danh sách người dùng khi không truyền Authorization Header (Domain Testing)

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
| Authorization Header | Không truyền |

## Test Steps
1. Gửi request GET /api/admin/users không kèm header Authorization.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 401 Unauthorized.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử thiếu token xác thực đối với API GET (P2 - Missing Token).
