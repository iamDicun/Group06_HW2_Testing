# TC-PROFILE-015: Cập nhật Địa chỉ giao hàng quá dài 501 ký tự (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Functional / Negative / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang quản lý hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| shipping_address | Chuỗi gồm 501 ký tự "B" |

## Test Steps
1. Nhập Địa chỉ giao hàng có độ dài đúng 501 ký tự
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu hoặc báo lỗi độ dài vượt quá giới hạn.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử giá trị biên trên không hợp lệ (độ dài = 501) của Địa chỉ.
