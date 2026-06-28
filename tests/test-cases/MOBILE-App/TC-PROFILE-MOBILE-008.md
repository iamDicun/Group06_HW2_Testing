# TC-PROFILE-MOBILE-008: Lỗi kết nối API khi cấu hình thiếu giao thức (http://) hoặc thiếu Port

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động đang chạy ứng dụng EShop.

## Test Data
| Field | Value |
|---|---|
| base_url | "192.168.1.5" (thiếu http:// và port) |

## Test Steps
1. Cấu hình base_url thiếu giao thức và port.
2. Nhấn nút "Lưu thay đổi".
3. Quan sát thông báo lỗi.

## Expected Result
- Ứng dụng phát hiện URL không đúng định dạng ngay lập tức hoặc báo lỗi kết nối thất bại.
- Ứng dụng không bị crash và hiển thị thông báo: "Cấu hình URL máy chủ không hợp lệ".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo tính toàn vẹn của chuỗi cấu hình URL.
