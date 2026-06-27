# TC-USERMGMT-019: Kiểm tra hiển thị nút Xóa trên giao diện Web Admin đối với các tài khoản khác (Domain Testing)

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
- Hệ thống hiển thị dòng thông tin của người dùng khác (ID = 2).

## Test Data
None

## Test Steps
1. Quan sát dòng hiển thị thông tin của người dùng ID = 2 trên bảng danh sách.
2. Kiểm tra sự xuất hiện, màu sắc của nút "Xóa".
3. Nhấp vào nút "Xóa".

## Expected Result
- Nút "Xóa" được hiển thị rõ ràng và có thể tương tác (clickable).
- Nút "Xóa" có màu đỏ làm nổi bật hành động nguy hiểm.
- Nhấp vào nút "Xóa" sẽ mở hộp thoại xác nhận (confirmation dialog).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử hiển thị giao diện đối với dòng người dùng khác (P1 - Other user).
