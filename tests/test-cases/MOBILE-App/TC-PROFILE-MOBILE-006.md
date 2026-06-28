# TC-PROFILE-MOBILE-006: Validate Số điện thoại chứa ký tự chữ cái khi paste từ clipboard

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Người dùng đã sao chép chuỗi "0912abc345" vào clipboard của thiết bị di động.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Chuỗi dán | "0912abc345" |

## Test Steps
1. Nhấn giữ vào ô nhập Số điện thoại và chọn "Dán" (Paste) chuỗi "0912abc345".
2. Nhấn nút "Lưu thay đổi".
3. Quan sát hành vi hiển thị lỗi của trường nhập liệu.

## Expected Result
- Hệ thống báo lỗi định dạng Số điện thoại không hợp lệ ngay tại Client (hoặc tự động lọc sạch các ký tự chữ cái `a, b, c` khi paste, chỉ giữ lại số).
- Không gửi yêu cầu cập nhật không hợp lệ lên API Server.

## Actual Result (filled after execution)
Bị chặn (Blocked) do không thể đăng nhập hoặc kết nối tới hệ thống trên thiết bị di động (ứng dụng không tải được dữ liệu và báo lỗi kết nối mạng).

## Status
BLOCKED

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Ngăn chặn việc bypass bàn phím số bằng tính năng dán từ clipboard.
