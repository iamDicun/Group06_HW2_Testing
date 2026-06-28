# TC-PROFILE-017: Cố tình thay đổi địa chỉ email trong payload gửi lên API (Domain Testing)

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
- Có địa chỉ email hiện tại của tài khoản (ví dụ: "user@example.com").

## Test Data
| Field | Value |
|---|---|
| API Method & Route | PUT /api/users/me |
| Payload | {"name": "Nguyen Van A", "phone": "0912345678", "email": "hacker@example.com"} |

## Test Steps
1. Sử dụng công cụ kiểm thử API (Postman/cURL) để gửi request PUT /api/users/me với JWT token hợp lệ.
2. Đưa trường "email": "hacker@example.com" vào payload (khác với email cũ).
3. Gửi request.

## Expected Result
- API từ chối cập nhật email.
- API trả về mã lỗi HTTP 400 Bad Request hoặc bỏ qua trường email và chỉ cập nhật name/phone/address.

## Actual Result (filled after execution)
- API trả về "Profile Updated" nhưng bỏ qua trường email và chỉ cập nhật name/phone.

## Status
PASSED

## Related Bugs
None

## Notes
- Email là thuộc tính bất biến để đảm bảo tính toàn vẹn hệ thống.
