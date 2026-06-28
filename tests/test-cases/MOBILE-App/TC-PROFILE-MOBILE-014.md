# TC-PROFILE-MOBILE-014: Kết nối API gặp lỗi timeout khi cấu hình IP khác dải mạng LAN

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động kết nối vào dải Wi-Fi khác với PC chạy Backend.

## Test Data
| Field | Value |
|---|---|
| base_url | "http://10.0.0.5:3000" (PC ở mạng khác) |

## Test Steps
1. Cấu hình app di động kết nối tới base_url trên.
2. Nhấn nút "Lưu thay đổi".
3. Đợi phản hồi từ ứng dụng.

## Expected Result
- Yêu cầu kết nối bị chặn hoặc không thể định tuyến.
- Sau khoảng thời gian chờ (timeout), ứng dụng hiển thị thông báo lỗi kết nối thất bại.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử biên khả năng định tuyến mạng con.
