# TC-USERMGMT-012: Kiểm tra lấy danh sách người dùng thành công khi dùng Token Admin hợp lệ (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và có token xác thực hợp lệ.
- Hệ thống có danh sách người dùng tồn tại.

## Test Data
| Field | Value |
|---|---|
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request GET /api/admin/users với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Phản hồi trả về chứa danh sách người dùng với các thông tin chi tiết (ngoại trừ mật khẩu).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử happy path cho API lấy danh sách người dùng.
