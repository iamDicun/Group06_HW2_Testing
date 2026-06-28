# TC-PROFILE-003: Cập nhật Họ Tên có độ dài đúng 255 ký tự (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Positive / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| name | Chuỗi gồm 255 ký tự "A" |

## Test Steps
1. Nhập Họ Tên có độ dài đúng 255 ký tự
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lưu thông tin thành công.
- Hiển thị thông báo cập nhật hồ sơ thành công.

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử giá trị biên trên hợp lệ (độ dài = 255).
