# TC-PROFILE-MOBILE-002: Ngăn chặn cấu hình bàn phím chữ mặc định cho Số điện thoại

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / UI/UX / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động hoặc trình giả lập đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân trên Mobile App.

## Test Data
| Field | Value |
|---|---|
| Thao tác | Chạm vào trường nhập Số điện thoại |

## Test Steps
1. Nhấp chọn vào trường nhập Số điện thoại.
2. Kiểm tra xem bàn phím mặc định (default/email-address/ascii-capable) có bị hiển thị hay không.

## Expected Result
- Bàn phím chữ cái thông thường không được hiển thị.
- TextInput không sử dụng cấu hình bàn phím mặc định (default).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo thuộc tính keyboardType không bị bỏ trống hoặc set sai loại.
