# TC-PROFILE-020: Truy cập API cập nhật profile với Authorization token không hợp lệ (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / API Security / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Có token không hợp lệ (hết hạn, sai chữ ký, sai định dạng).

## Test Data
| Field | Value |
|---|---|
| API Method & Route | PUT /api/users/me |
| Header | Authorization: Bearer invalid_token_xyz |
| Payload | {"name": "Nguyen Van A"} |

## Test Steps
1. Gửi request PUT /api/users/me với Header Authorization chứa token không hợp lệ.

## Expected Result
- API từ chối xử lý request.
- Trả về mã lỗi HTTP 401 Unauthorized.

## Actual Result (filled after execution)
- API trả về "Forbidden" (403).

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử xác thực cơ bản với token không hợp lệ.
