# TC-PROFILE-MOBILE-011: Kết nối API Backend thành công qua dải mạng LAN cùng subnet

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động thật và máy chủ Backend (chạy trên PC) đang kết nối chung một mạng Wi-Fi (cùng một dải subnet, ví dụ 192.168.1.X).
- Firewall trên PC chạy Backend đã được tắt hoặc mở port 3000.

## Test Data
| Field | Value |
|---|---|
| base_url | "http://192.168.1.5:3000" (IP LAN của PC chạy Backend) |

## Test Steps
1. Khởi động ứng dụng di động đã cấu hình trỏ API tới base_url trên.
2. Thực hiện cập nhật thông tin cá nhân.
3. Nhấn "Lưu thay đổi".
4. Kiểm tra xem request có gửi thành công tới server PC hay không.

## Expected Result
- Ứng dụng gửi request thành công, nhận phản hồi HTTP 200 OK.
- Hiển thị toast thông báo cập nhật thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đây là cấu hình bắt buộc khi kiểm thử ứng dụng di động thật kết nối cục bộ.
