# TC-PROFILE-MOBILE-007: Cập nhật hồ sơ với Số điện thoại để trống

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Số điện thoại | "" |

## Test Steps
1. Xóa toàn bộ nội dung trong ô nhập Số điện thoại (để trống).
2. Nhấn nút "Lưu thay đổi".
3. Quan sát thông báo lỗi hiển thị.

## Expected Result
- Hệ thống báo lỗi tại Client và không gửi request lên Server.
- Hiển thị lỗi cảnh báo: "Số điện thoại không được để trống".

## Actual Result (filled after execution)
- Bị lỗi không cho cập nhật và thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
PASSED

## Related Bugs


## Notes
- Giả định Số điện thoại là trường bắt buộc (mandatory).
