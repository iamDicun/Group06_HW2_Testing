# TC-PROFILE-028: Xử lý timeout 10 giây khi kết nối mạng chập chờn trên Mobile App (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / Network / Negative / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Sử dụng công cụ giả lập mạng yếu (Network Link Conditioner hoặc Charles Proxy) để làm trễ phản hồi từ máy chủ Backend trên 10 giây.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Độ trễ mạng | >= 10.000 ms (10 giây) |

## Test Steps
1. Thiết lập độ trễ phản hồi từ máy chủ Backend là 10.000 ms.
2. Thực hiện cập nhật hồ sơ và nhấn "Lưu thay đổi".
3. Chờ đợi phản hồi.

## Expected Result
- Ứng dụng hiển thị chỉ báo đang tải (loading indicator).
- Đúng thời điểm biên 10 giây (10.000 ms), ứng dụng tự động hủy request (timeout) và ẩn chỉ báo đang tải.
- Hiển thị thông báo lỗi: "Kết nối máy chủ thất bại. Vui lòng thử lại sau".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử biên thời gian phản hồi (timeout) để tránh infinite loading.
