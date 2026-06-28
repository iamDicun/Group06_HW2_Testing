# TC-MOBILE-016: Cập nhật hồ sơ thành công khi kết nối mạng trực tuyến ổn định

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động kết nối Wi-Fi/4G ổn định.
- PC chạy Backend hoạt động bình thường.

## Test Data
| Field | Value |
|---|---|
| Trạng thái mạng | Online (Ping < 500ms) |

## Test Steps
1. Đảm bảo kết nối mạng của thiết bị di động đang hoạt động tốt.
2. Thực hiện cập nhật thông tin cá nhân.
3. Nhấn "Lưu thay đổi".

## Expected Result
- Gửi yêu cầu cập nhật thành công.
- Ứng dụng nhận phản hồi 200 OK và hiển thị toast cập nhật thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử happy path trạng thái mạng.
