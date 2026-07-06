# TC-PROFILE-013: Cập nhật Địa chỉ giao hàng rỗng (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Negative / Boundary Value Analysis

## Priority
High

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| shipping_address | "" (Rỗng) |

## Test Steps
1. Xóa nội dung trong trường Địa chỉ giao hàng
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi yêu cầu nhập Địa chỉ giao hàng.

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử giá trị biên dưới (độ dài = 0) của Địa chỉ.
