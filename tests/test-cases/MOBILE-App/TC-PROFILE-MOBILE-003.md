# TC-PROFILE-MOBILE-003: Cập nhật hồ sơ với Số điện thoại quá ngắn 9 chữ số

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
| Số điện thoại | "091234567" (Độ dài = 9) |

## Test Steps
1. Nhập Số điện thoại "091234567" vào ô nhập Số điện thoại.
2. Nhấn nút "Lưu thay đổi".
3. Kiểm tra thông báo lỗi hiển thị ở Client.

## Expected Result
- Nút cập nhật hoặc ô nhập hiển thị thông báo lỗi ngay lập tức ở phía Client.
- Request cập nhật không được gửi lên server.
- Hiển thị thông báo lỗi: "Số điện thoại phải từ 10 đến 11 chữ số".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đây là biên ngoài dưới (9 chữ số).
