# TC-PROFILE-008: Cập nhật Số điện thoại quá ngắn 9 chữ số (Domain Testing)

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
| phone | 091234567 |

## Test Steps
1. Nhập Số điện thoại: "091234567" (9 chữ số)
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi số điện thoại không hợp lệ (yêu cầu từ 10-11 chữ số).

## Actual Result (filled after execution)
- Không cho cập nhật và báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
PASSED

## Related Bugs
None

## Notes
- Biên dưới không hợp lệ (9 chữ số).
