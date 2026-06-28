# TC-PROFILE-MOBILE-017: Chặn gửi request và cảnh báo khi thiết bị ngắt kết nối mạng (Offline)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động bật chế độ máy bay (Airplane mode) hoặc tắt hoàn toàn Wi-Fi/Dữ liệu di động.

## Test Data
| Field | Value |
|---|---|
| Trạng thái mạng | Offline |

## Test Steps
1. Ngắt kết nối mạng trên thiết bị di động.
2. Chỉnh sửa thông tin Họ tên hoặc SĐT.
3. Nhấn nút "Lưu thay đổi".

## Expected Result
- Ứng dụng phát hiện trạng thái ngoại tuyến ngay lập tức nhờ NetInfo.
- Ứng dụng chặn không gửi request lên server để tránh treo tải.
- Hiển thị toast cảnh báo: "Không có kết nối mạng. Vui lòng kiểm tra lại".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử khả năng phản hồi Offline Mode của ứng dụng di động.
