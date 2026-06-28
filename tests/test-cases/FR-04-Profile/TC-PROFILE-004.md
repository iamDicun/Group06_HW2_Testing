# TC-PROFILE-004: Cập nhật Họ Tên quá dài 256 ký tự (Domain Testing)

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
| name | Chuỗi gồm 256 ký tự "A" |

## Test Steps
1. Nhập Họ Tên có độ dài đúng 256 ký tự
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu hoặc báo lỗi độ dài vượt quá giới hạn.

## Actual Result (filled after execution)


## Status
BLOCKED

## Related Bugs
BUG-PROFILE-001

## Notes
- Kiểm thử giá trị biên trên không hợp lệ (độ dài = 256).
