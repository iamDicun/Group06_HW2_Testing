# TC-USERMGMT-004: Kiểm tra xóa người dùng khi ID là số nguyên âm (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / Functional / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | -1 |
| Authorization Header | Bearer <valid_admin_token> |

## Test Steps
1. Gửi request DELETE /api/admin/users/-1 với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử giá trị biên dưới không hợp lệ của ID (P4 - Negative ID).
