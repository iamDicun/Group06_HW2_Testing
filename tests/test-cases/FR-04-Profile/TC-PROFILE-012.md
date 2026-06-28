# TC-PROFILE-012: Cập nhật Số điện thoại để trống (Domain Testing)

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
| phone | "" (Rỗng) |

## Test Steps
1. Xóa nội dung trong trường Số điện thoại
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi yêu cầu nhập Số điện thoại.

## Actual Result (filled after execution)
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
PASSED

## Related Bugs
None

## Notes
- Trường số điện thoại là bắt buộc.
