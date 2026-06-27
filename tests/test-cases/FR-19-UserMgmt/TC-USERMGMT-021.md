# TC-USERMGMT-021: Kiểm tra xuất hiện hộp thoại xác nhận khi thực hiện hành động Xóa trên Web Admin (Domain Testing)

## Requirement ID
FR-19

## Feature
Quản lý Người dùng

## Module / Test Type / Technique
UserMgmt / UI/UX / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Tài khoản Admin (ID = 1) đã đăng nhập và truy cập trang quản lý người dùng trên Web Admin.
- Có dòng thông tin người dùng khác (ID = 2) đang hiển thị nút "Xóa" màu đỏ.

## Test Data
None

## Test Steps
1. Click vào nút "Xóa" ở dòng của người dùng ID = 2.
2. Kiểm tra xem có xuất hiện hộp thoại xác nhận hay không.
3. Chọn "Hủy" trên hộp thoại và kiểm tra xem tài khoản có bị xóa hay không.
4. Click nút "Xóa" một lần nữa và chọn "Xác nhận" trên hộp thoại.

## Expected Result
- Một hộp thoại cảnh báo/xác nhận xóa xuất hiện yêu cầu admin xác nhận hành động.
- Khi chọn "Hủy", hộp thoại đóng lại và không có request DELETE nào được gửi đi, tài khoản ID = 2 không bị xóa.
- Khi chọn "Xác nhận", request DELETE được gửi đi và tài khoản ID = 2 được xóa thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử UI/UX phòng tránh việc click nhầm hành động nguy hiểm.
