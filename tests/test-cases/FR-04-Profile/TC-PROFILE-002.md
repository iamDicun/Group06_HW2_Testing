# TC-PROFILE-002: Cập nhật Họ Tên rỗng (Domain Testing)

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
| name | "" (Rỗng) |

## Test Steps
1. Xóa nội dung trong trường Họ Tên
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu.
- Hiển thị thông báo lỗi yêu cầu nhập Họ Tên tại trường Họ Tên hoặc dưới dạng alert.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử giá trị biên dưới (độ dài = 0).
