# TC-PROFILE-014: Cập nhật Địa chỉ giao hàng có độ dài đúng 500 ký tự (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Positive / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| shipping_address | Chuỗi gồm 500 ký tự "B" |

## Test Steps
1. Nhập Địa chỉ giao hàng có độ dài đúng 500 ký tự
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống lưu thông tin thành công.
- Hiển thị thông báo cập nhật hồ sơ thành công.

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử giá trị biên trên hợp lệ (độ dài = 500) của Địa chỉ.
