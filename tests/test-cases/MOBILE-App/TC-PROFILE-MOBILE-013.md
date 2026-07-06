# TC-PROFILE-MOBILE-013: Cập nhật Địa chỉ giao hàng có độ dài đúng 500 ký tự

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
| Địa chỉ giao hàng | Chuỗi ký tự có độ dài đúng 500 ký tự |

## Test Steps
1. Nhập Địa chỉ giao hàng có độ dài đúng 500 ký tự vào ô nhập Địa chỉ giao hàng.
2. Nhập Họ tên và Số điện thoại hợp lệ.
3. Nhấn nút "Lưu thay đổi".
4. Kiểm tra thông báo hiển thị trên ứng dụng và thông tin trong CSDL.

## Expected Result
- Hệ thống thực hiện cập nhật thành công mà không báo lỗi.
- Hiển thị thông báo cập nhật hồ sơ thành công.
- Dữ liệu Địa chỉ mới được cập nhật chính xác trong CSDL.

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên trên hợp lệ (độ dài = 500).
