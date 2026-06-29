# TC-PROFILE-MOBILE-010: Cập nhật Họ Tên quá dài 256 ký tự

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
| Họ tên | Chuỗi ký tự có độ dài đúng 256 ký tự |

## Test Steps
1. Nhập Họ tên có độ dài đúng 256 ký tự vào ô nhập Họ tên (hoặc dán từ clipboard).
2. Nhấn nút "Lưu thay đổi".
3. Kiểm tra thông báo lỗi hiển thị ở Client.

## Expected Result
- Hệ thống báo lỗi tại Client và không gửi request lên Server.
- Hiển thị lỗi cảnh báo: "Họ tên không được vượt quá 255 ký tự".

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên ngoài trên (độ dài = 256).
