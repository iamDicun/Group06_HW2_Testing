# TC-PROFILE-026: Kết nối API thất bại khi dùng Localhost IP trên thiết bị di động thật (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Network / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Kiểm thử trên thiết bị di động thật (không phải máy ảo/trình giả lập).

## Test Data
| Field | Value |
|---|---|
| base_url | http://localhost:3000 hoặc http://127.0.0.1:3000 |

## Test Steps
1. Cấu hình ứng dụng di động trỏ tới base_url là localhost.
2. Thực hiện hành động cập nhật hồ sơ và nhấn "Lưu thay đổi".

## Expected Result
- Thiết bị di động không thể kết nối tới máy chủ.
- Ứng dụng hiển thị thông báo lỗi kết nối hoặc không tìm thấy máy chủ thay vì bị crash.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Localhost trên thiết bị thật sẽ trỏ về chính nó và không thể kết nối tới máy chủ Backend chạy trên PC.
