# TC-USERMGMT-020: Kiểm tra ẩn hoặc vô hiệu hóa nút Xóa trên giao diện Web Admin đối với tài khoản Admin hiện tại (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / UI/UX / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và truy cập trang quản lý người dùng trên Web Admin.

## Test Data
None

## Test Steps
1. Quan sát dòng hiển thị thông tin của chính mình (Admin ID = 1) trên bảng danh sách.
2. Kiểm tra sự xuất hiện hoặc trạng thái tương tác của nút "Xóa".

## Expected Result
- Nút "Xóa" trên dòng thông tin của chính Admin hiện tại (ID = 1) bị ẩn hoàn toàn hoặc bị vô hiệu hóa (disabled, không thể tương tác).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử hiển thị giao diện đối với dòng của admin hiện tại để chặn lỗi self-deletion từ giao diện (P2 - Current admin).
