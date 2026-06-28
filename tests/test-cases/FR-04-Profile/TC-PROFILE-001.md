# TC-PROFILE-001: Cập nhật hồ sơ thành công với dữ liệu hợp lệ (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Positive / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| name | Nguyễn Văn A |
| phone | 0912345678 |
| shipping_address | 123 Đường Lê Lợi, Quận 1, TP. HCM |

## Test Steps
1. Nhập Họ Tên: "Nguyễn Văn A"
2. Nhập Số điện thoại: "0912345678"
3. Nhập Địa chỉ giao hàng: "123 Đường Lê Lợi, Quận 1, TP. HCM"
4. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lưu thông tin thành công.
- Hiển thị thông báo cập nhật hồ sơ thành công.
- Thông tin mới hiển thị chính xác trên màn hình.

## Actual Result (filled after execution)
- Không cho cập nhật và báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
FAILED

## Related Bugs
BUG-PROFILE-001

## Notes
- Đây là test case đường hợp lệ (happy path) cho tính năng cập nhật profile.
