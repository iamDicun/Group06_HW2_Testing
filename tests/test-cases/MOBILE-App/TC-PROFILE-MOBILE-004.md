# TC-PROFILE-MOBILE-004: Chặn nhập số điện thoại vượt quá 11 chữ số ở Client

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / UI/UX / Boundary Value Analysis

## Priority
High

## Preconditions
- Thiết bị di động hoặc trình giả lập đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Thao tác nhập | Nhập 12 chữ số (ví dụ: "091234567890") |

## Test Steps
1. Chạm vào ô nhập Số điện thoại.
2. Cố gắng gõ hoặc dán chuỗi gồm 12 chữ số: "091234567890".

## Expected Result
- Ô nhập Số điện thoại chỉ hiển thị tối đa 11 chữ số ("09123456789").
- Ký tự thứ 12 không thể hiển thị trong ô nhập (bị TextInput chặn cứng qua thuộc tính maxLength={11}).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử thuộc tính maxLength={11} để chặn cứng biên trên ngay từ Client.
