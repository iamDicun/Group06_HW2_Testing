# TC-PROFILE-009: Cập nhật Số điện thoại quá dài 12 chữ số (Domain Testing)

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
| phone | 091234567890 |

## Test Steps
1. Nhập Số điện thoại: "091234567890" (12 chữ số)
2. Nhấn nút "Lưu" hoặc "Cập nhật"

## Expected Result
- Hệ thống chặn không cho lưu hoặc tự động cắt ngắn chuỗi về 11 chữ số (hoặc báo lỗi số điện thoại quá dài).

## Actual Result (filled after execution)
- Không cho cập nhật và báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

## Status
PASSED

## Related Bugs
None

## Notes
- Biên trên không hợp lệ (12 chữ số).
