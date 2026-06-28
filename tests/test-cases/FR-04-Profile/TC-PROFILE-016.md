# TC-PROFILE-016: Cập nhật Địa chỉ giao hàng chứa thẻ HTML hoặc Script để kiểm tra XSS (Domain Testing)

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
| shipping_address | <div style="color:red">Test XSS</div> |

## Test Steps
1. Nhập Địa chỉ giao hàng chứa mã độc HTML: "<div style="color:red">Test XSS</div>"
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lọc sạch (sanitize) mã HTML trước khi lưu hoặc hiển thị dưới dạng chuỗi văn bản thường chứ không render giao diện màu đỏ.

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử bảo mật (XSS) lồng ghép trong kiểm thử miền.
