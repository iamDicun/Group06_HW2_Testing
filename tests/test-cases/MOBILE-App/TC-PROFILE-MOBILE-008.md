# TC-PROFILE-MOBILE-008: Cập nhật Họ Tên rỗng

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
| Họ tên | "" |

## Test Steps
1. Xóa toàn bộ nội dung trong ô nhập Họ tên (để trống).
2. Nhập Số điện thoại và Địa chỉ hợp lệ.
3. Nhấn nút "Lưu thay đổi".
4. Kiểm tra thông báo lỗi hiển thị ở Client.

## Expected Result
- Hệ thống báo lỗi tại Client và không gửi request lên Server.
- Hiển thị lỗi cảnh báo: "Họ tên không được để trống".

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Đây là biên dưới không hợp lệ (độ dài = 0).
