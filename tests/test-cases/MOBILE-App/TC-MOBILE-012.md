# TC-MOBILE-012: Kết nối API Backend thành công qua URL Tunnel Ngrok

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
High

## Preconditions
- Máy chủ PC chạy backend đang chạy ngrok tunnel (ví dụ: ngrok http 3000) tạo ra URL công khai.
- Thiết bị di động kết nối Internet.

## Test Data
| Field | Value |
|---|---|
| base_url | "https://xxxx.ngrok-free.app" |

## Test Steps
1. Khởi động ứng dụng di động trỏ tới URL ngrok.
2. Thực hiện cập nhật thông tin hồ sơ và nhấn "Lưu thay đổi".

## Expected Result
- Yêu cầu API đi qua ngrok tunnel tới backend và cập nhật dữ liệu thành công.
- Ứng dụng nhận phản hồi thành công và hiển thị thông báo lưu thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Giải pháp kết nối khi thiết bị di động và máy chủ PC không chung lớp mạng.
