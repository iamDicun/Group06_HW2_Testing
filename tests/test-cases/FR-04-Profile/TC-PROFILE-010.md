# TC-PROFILE-010: Cập nhật Số điện thoại không bắt đầu bằng số 0 (Domain Testing)

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
| phone | 1912345678 |

## Test Steps
1. Nhập Số điện thoại: "1912345678" (bắt đầu bằng 1)
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi yêu cầu số điện thoại phải bắt đầu bằng số 0.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Phân hoạch không hợp lệ về định dạng số điện thoại.
