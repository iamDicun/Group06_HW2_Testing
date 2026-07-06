# TC-PROFILE-017: Cố tình thay đổi SDT không hợp lệ trong payload gửi lên API

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / API Security / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đã đăng nhập và lấy được JWT Token hợp lệ.


## Test Data
| Field | Value |
|---|---|
| API Method & Route | PUT /api/users/me |
| Payload | {"name": "Nguyen Van A", "phone": "1234567890"} |

## Test Steps
1. Sử dụng công cụ kiểm thử API (Postman/cURL) để gửi request PUT /api/users/me với JWT token hợp lệ.
2. Đưa trường "phone": "1234567890" vào payload .
3. Gửi request.

## Expected Result
- API từ chối cập nhật số điện thoại.
- API trả về mã lỗi HTTP 400 Bad Request hoặc bỏ qua trường số điện thoại và chỉ cập nhật name/phone/address.

## Actual Result (filled after execution)
- API trả về "Profile Updated" và cập nhật số điện thoại.

## Status
FAILED

## Related Bugs
BUG-PROFILE-003

## Notes
- Email là thuộc tính bất biến để đảm bảo tính toàn vẹn hệ thống.
