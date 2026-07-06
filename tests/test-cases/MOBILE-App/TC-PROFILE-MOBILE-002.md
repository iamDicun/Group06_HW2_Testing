# TC-PROFILE-MOBILE-002: Cập nhật hồ sơ với Số điện thoại hợp lệ 11 chữ số

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- Người dùng đã đăng nhập thành công vào Mobile App.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Số điện thoại | "01234567890" (Độ dài = 11) |

## Test Steps
1. Nhập Số điện thoại "01234567890" vào ô nhập Số điện thoại.
2. Nhấn nút "Lưu thay đổi".
3. Kiểm tra thông báo hiển thị trên ứng dụng và thông tin trong CSDL.

## Expected Result
- Hệ thống thực hiện cập nhật thành công mà không báo lỗi.
- Hiển thị thông báo (toast/alert) cập nhật hồ sơ thành công.
- Dữ liệu Số điện thoại mới được cập nhật chính xác trong CSDL.

## Actual Result (filled after execution)
- Bị lỗi không cho cập nhật và thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
FAILED

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên trên hợp lệ (11 chữ số).
