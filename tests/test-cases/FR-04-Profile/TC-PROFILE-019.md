# TC-PROFILE-019: Truy cập API cập nhật profile không có Authorization header (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / API Security / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Không có token xác thực.

## Test Data
| Field | Value |
|---|---|
| API Method & Route | PUT /api/users/me |
| Payload | {"name": "Nguyen Van A"} |

## Test Steps
1. Gửi request PUT /api/users/me mà không kèm theo Header Authorization.

## Expected Result
- API từ chối xử lý request.
- Trả về mã lỗi HTTP 401 Unauthorized.

## Actual Result (filled after execution)
- API trả về "Unauthorized" (401).

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử xác thực cơ bản cho API cập nhật hồ sơ cá nhân.
