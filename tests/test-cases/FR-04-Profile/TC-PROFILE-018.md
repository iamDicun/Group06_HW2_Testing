# TC-PROFILE-018: Cố tình thay đổi vai trò (role) lên admin trong payload gửi lên API (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / API Security / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng có vai trò là "user" đã đăng nhập và lấy được JWT Token hợp lệ.

## Test Data
| Field | Value |
|---|---|
| API Method & Route | PUT /api/users/me |
| Payload | {"name": "Nguyen Van A", "role": "admin"} |

## Test Steps
1. Sử dụng công cụ kiểm thử API để gửi request PUT /api/users/me với JWT token hợp lệ của user thường.
2. Đưa trường "role": "admin" vào payload.
3. Gửi request.

## Expected Result
- API từ chối cập nhật vai trò (role).
- API trả về mã lỗi HTTP 400 Bad Request / 403 Forbidden hoặc bỏ qua trường role (vai trò vẫn giữ nguyên là "user").

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Ngăn chặn leo thang đặc quyền (Privilege Escalation) từ Client.
