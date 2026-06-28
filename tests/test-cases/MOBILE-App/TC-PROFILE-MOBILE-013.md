# TC-PROFILE-MOBILE-013: Kết nối API thất bại khi cấu hình Localhost IP trên thiết bị thật

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động thật (không dùng máy ảo/giả lập) đang chạy app EShop.

## Test Data
| Field | Value |
|---|---|
| base_url | "http://localhost:3000" hoặc "http://127.0.0.1:3000" |

## Test Steps
1. Cấu hình app di động kết nối tới base_url là localhost.
2. Nhấn nút "Lưu thay đổi" khi cập nhật thông tin.

## Expected Result
- Ứng dụng không thể kết nối tới server PC (do localhost trỏ về chính thiết bị di động).
- Ứng dụng hiển thị thông báo lỗi kết nối máy chủ rõ ràng cho người dùng, tuyệt đối không bị crash ứng dụng.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Localhost trên thiết bị thật sẽ trỏ về chính nó và không thể kết nối tới máy chủ Backend chạy trên PC.
