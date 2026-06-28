# TC-PROFILE-MOBILE-005: Cập nhật hồ sơ với Số điện thoại không bắt đầu bằng số 0

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Số điện thoại | "1912345678" |

## Test Steps
1. Nhập Số điện thoại "1912345678" vào ô nhập Số điện thoại.
2. Nhấn nút "Lưu thay đổi".
3. Quan sát thông báo lỗi.

## Expected Result
- Hệ thống báo lỗi ngay tại Client và không gửi request lên Server.
- Hiển thị thông báo: "Số điện thoại phải bắt đầu bằng số 0".

## Actual Result (filled after execution)
Bị chặn (Blocked) do không thể đăng nhập hoặc kết nối tới hệ thống trên thiết bị di động (ứng dụng không tải được dữ liệu và báo lỗi kết nối mạng).

## Status
BLOCKED

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Kiểm thử phân hoạch không hợp lệ về định dạng chữ số bắt đầu.
