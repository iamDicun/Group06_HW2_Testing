# TC-PROFILE-MOBILE-018: Hủy request và báo lỗi khi phản hồi từ server trễ vượt quá biên 10 giây

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Network / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Sử dụng Charles Proxy hoặc Network Link Conditioner để cấu hình độ trễ mạng từ PC Backend là 10.000 ms (10 giây).
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Độ trễ phản hồi | >= 10.000 ms (10 giây) |

## Test Steps
1. Kích hoạt độ trễ mạng >= 10 giây.
2. Nhấn nút "Lưu thay đổi".
3. Bắt đầu bấm giờ quan sát hành vi của ứng dụng di động.

## Expected Result
- Ứng dụng hiển thị loading indicator (quay vòng tròn).
- Đúng mốc thời gian biên 10 giây (10.000 ms), ứng dụng tự động hủy yêu cầu (timeout).
- Chỉ báo loading biến mất, hiển thị thông báo lỗi: "Kết nối máy chủ thất bại. Vui lòng thử lại sau".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đây là biên thời gian phản hồi (Timeout Boundary) để tránh ứng dụng bị infinite loading.
