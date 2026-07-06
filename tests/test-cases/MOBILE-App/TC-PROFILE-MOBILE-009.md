# TC-PROFILE-MOBILE-009: Cập nhật Họ Tên có độ dài đúng 255 ký tự

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập thành công vào Mobile App.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Họ tên | Chuỗi ký tự có độ dài đúng 255 ký tự |

## Test Steps
1. Nhập Họ tên có độ dài đúng 255 ký tự vào ô nhập Họ tên.
2. Nhập Số điện thoại và Địa chỉ hợp lệ.
3. Nhấn nút "Lưu thay đổi".
4. Kiểm tra thông báo hiển thị trên ứng dụng và thông tin trong CSDL.

## Expected Result
- Hệ thống thực hiện cập nhật thành công mà không báo lỗi.
- Hiển thị thông báo cập nhật hồ sơ thành công.
- Dữ liệu Họ tên mới được cập nhật chính xác trong CSDL.

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên trên hợp lệ (độ dài = 255).
