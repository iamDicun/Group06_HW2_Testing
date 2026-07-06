# TC-USERMGMT-014: Kiểm tra lấy danh sách người dùng với Authorization Header sai định dạng (Domain Testing)

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
| Authorization Header | "Token <valid_admin_token>" |

## Test Steps
1. Gửi request GET /api/admin/users với header Authorization sai định dạng.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.

## Actual Result (filled after execution)

- API trả về mã phản hồi HTTP 200 OK thay vì 401 (không phân biệt định dạng Token thiếu Bearer).

## Status
FAILED

## Related Bugs
BUG-USERMGMT-002

## Notes
- Kiểm thử định dạng sai token xác thực đối với API GET (P3 - Invalid Format).
