# TC-PROFILE-MOBILE-014: Cập nhật Địa chỉ giao hàng quá dài 501 ký tự

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
| Địa chỉ giao hàng | Chuỗi ký tự có độ dài đúng 501 ký tự |

## Test Steps
1. Nhập Địa chỉ giao hàng có độ dài đúng 501 ký tự vào ô nhập Địa chỉ giao hàng (hoặc dán từ clipboard).
2. Nhấn nút "Lưu thay đổi".
3. Kiểm tra thông báo lỗi hiển thị ở Client.

## Expected Result
- Hệ thống báo lỗi tại Client và không gửi request lên Server.
- Hiển thị lỗi cảnh báo: "Địa chỉ không được vượt quá 500 ký tự".

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên ngoài trên (độ dài = 501).
