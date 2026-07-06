# TC-PROFILE-011: Cập nhật Số điện thoại chứa ký tự không phải số (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| phone | 0912abc345 |

## Test Steps
1. Nhập Số điện thoại chứa chữ cái: "0912abc345"
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi yêu cầu số điện thoại chỉ được chứa ký tự số.

## Actual Result (filled after execution)
- Không cho cập nhật và báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
PASSED

## Related Bugs
None

## Notes
- Phân hoạch không hợp lệ về kiểu dữ liệu.
