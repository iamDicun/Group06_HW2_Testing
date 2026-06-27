# TC-PROFILE-027: Cập nhật hồ sơ khi thiết bị ở trạng thái ngoại tuyến (Offline mode) (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Network / Negative / Equivalence Partitioning

## Priority
High

## Preconditions
- Thiết bị di động bị ngắt kết nối mạng hoàn toàn (đã bật Chế độ máy bay hoặc tắt cả Wi-Fi và Dữ liệu di động).

## Test Data
| Field | Value |
|---|---|
| Trạng thái mạng | Offline |

## Test Steps
1. Ngắt kết nối mạng của thiết bị di động.
2. Thay đổi thông tin hồ sơ trong ứng dụng.
3. Nhấn nút "Lưu thay đổi".

## Expected Result
- Ứng dụng phát hiện trạng thái Offline (thông qua thư viện NetInfo).
- Chặn không cho gửi request lên server.
- Hiển thị thông báo/toast cảnh báo: "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo trải nghiệm người dùng mượt mà ngay cả khi không có mạng.
