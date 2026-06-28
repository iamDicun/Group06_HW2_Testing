# TC-PROFILE-005: Cập nhật Họ Tên chứa thẻ HTML hoặc Script để kiểm tra XSS (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| name | <script>alert('XSS')</script> |

## Test Steps
1. Nhập Họ Tên chứa mã độc script: "<script>alert('XSS')</script>"
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lọc sạch (sanitize) mã HTML/Script trước khi lưu hoặc báo lỗi dữ liệu không hợp lệ.
- Khi hiển thị lại, chuỗi không được thực thi như một đoạn mã (không hiện alert script).

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử bảo mật (XSS) lồng ghép trong kiểm thử miền.
