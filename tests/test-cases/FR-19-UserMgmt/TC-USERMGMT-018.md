# TC-USERMGMT-018: Kiểm tra chặn hành vi Admin tự xóa tài khoản của chính mình (Self-deletion) (Domain Testing)

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

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| Authorization Header | Bearer <valid_admin_token_id_1> |

## Test Steps
1. Gửi request DELETE /api/admin/users/1 với header Authorization chứa token của chính Admin (ID = 1).
2. Kiểm tra phản hồi trả về từ API.
3. Kiểm tra sự tồn tại của tài khoản ID = 1 trong cơ sở dữ liệu.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Phản hồi lỗi chỉ ra không được phép tự xóa tài khoản của mình.
- Tài khoản Admin ID = 1 vẫn tồn tại bình thường trong cơ sở dữ liệu.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử ràng buộc nghiệp vụ tự xóa tài khoản (P2 - Delete self).
