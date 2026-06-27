# TC-PROFILE-023: Kiểm tra validate Số điện thoại chứa chữ cái khi paste từ clipboard trên Mobile App (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / UI/UX / Negative / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Người dùng đã copy một chuỗi chứa chữ cái (ví dụ: "0912abc345") vào clipboard.
- Người dùng đang ở màn hình Hồ sơ cá nhân trên Mobile App.

## Test Data
| Field | Value |
|---|---|
| Giá trị paste | 0912abc345 |

## Test Steps
1. Nhấn giữ vào ô nhập Số điện thoại và chọn "Paste" (Dán) chuỗi đã sao chép từ clipboard.
2. Nhấn nút "Lưu thay đổi".

## Expected Result
- Hệ thống hiển thị lỗi cảnh báo định dạng Số điện thoại không hợp lệ ngay tại Client (hoặc tự động lọc bỏ các ký tự chữ cái khi paste).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử trường hợp bypass bàn phím số bằng Clipboard trên thiết bị di động.
