# TC-PROFILE-006: Cập nhật Số điện thoại hợp lệ 10 chữ số bắt đầu bằng 0 (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Positive / Boundary Value Analysis

## Priority
High

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| phone | 0912345678 |

## Test Steps
1. Nhập Số điện thoại: "0912345678" (10 chữ số)
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lưu thông tin thành công.
- Hiển thị thông báo cập nhật hồ sơ thành công.

## Actual Result (filled after execution)
- Không cho cập nhật và báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
FAILED

## Related Bugs
BUG-PROFILE-001

## Notes
- Biên dưới hợp lệ cho số điện thoại (10 chữ số).
