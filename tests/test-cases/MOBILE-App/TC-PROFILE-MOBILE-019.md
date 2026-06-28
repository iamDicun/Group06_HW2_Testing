# TC-PROFILE-MOBILE-019: Tự động co giãn màn hình (KeyboardAvoidingView) khi mở bàn phím ảo

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / UI/UX / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động hoặc trình giả lập có màn hình nhỏ.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Thao tác | Focus vào ô nhập Địa chỉ ở cuối màn hình |

## Test Steps
1. Chạm vào ô nhập Địa chỉ giao hàng để kích hoạt bàn phím ảo mở ra.
2. Quan sát sự thay đổi bố cục màn hình (viewport).

## Expected Result
- Giao diện tự động đẩy nội dung lên phía trên hoặc thu nhỏ chiều cao viewport một cách mượt mà (sử dụng KeyboardAvoidingView).
- Giao diện không bị méo hoặc vỡ bố cục.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo layout co giãn thích ứng với chiều cao bàn phím ảo.
