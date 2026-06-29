# TC-PROFILE-MOBILE-012: Cập nhật Địa chỉ giao hàng rỗng

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
| Địa chỉ giao hàng | "" |

## Test Steps
1. Xóa toàn bộ nội dung trong ô nhập Địa chỉ giao hàng (để trống).
2. Nhập Họ tên và Số điện thoại hợp lệ.
3. Nhấn nút "Lưu thay đổi".
4. Kiểm tra thông báo lỗi hiển thị ở Client.

## Expected Result
- Hệ thống báo lỗi tại Client và không gửi request lên Server.
- Hiển thị lỗi cảnh báo: "Địa chỉ giao hàng không được để trống".

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên dưới không hợp lệ (độ dài = 0).
