# TC-PROFILE-025: Kết nối API thành công qua dải mạng LAN cùng subnet hoặc URL Ngrok (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Network / Positive / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động thật và máy chủ Backend chạy trên PC đang kết nối chung một mạng Wi-Fi (cùng subnet).
- Hoặc ứng dụng di động kết nối qua URL Ngrok công khai.

## Test Data
| Field | Value |
|---|---|
| base_url | IP LAN của PC (ví dụ: http://192.168.1.5:3000) hoặc URL Ngrok (ví dụ: https://xxxx.ngrok-free.app) |

## Test Steps
1. Cấu hình ứng dụng di động kết nối tới base_url hợp lệ.
2. Thực hiện cập nhật thông tin hồ sơ (name, phone, address).
3. Nhấn "Lưu thay đổi".

## Expected Result
- Yêu cầu API được gửi đi thành công.
- Hệ thống phản hồi thành công và thông tin hồ sơ được cập nhật trên cơ sở dữ liệu.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử cấu hình kết nối mạng LAN thực tế cho Mobile App.
