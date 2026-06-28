# TC-MOBILE-001: Kích hoạt bàn phím số khi nhập Số điện thoại

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
2. Quan sát kiểu bàn phím ảo hiển thị trên màn hình.

## Expected Result
- Bàn phím ảo tự động hiển thị là bàn phím số chuyên dụng (loại phone-pad hoặc numeric).
- Bàn phím không hiển thị các phím chữ cái thông thường.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử cấu hình keyboardType của TextInput trên React Native.
