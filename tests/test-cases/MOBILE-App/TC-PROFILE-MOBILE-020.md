# TC-PROFILE-MOBILE-020: Ngăn chặn bàn phím ảo che khuất các ô nhập liệu và nút Lưu

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / UI/UX / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Thao tác | Focus vào ô nhập Địa chỉ |

## Test Steps
1. Chạm vào ô nhập Địa chỉ để mở bàn phím ảo.
2. Kiểm tra xem ô nhập Địa chỉ đang nhập liệu và nút "Lưu thay đổi" có bị bàn phím đè lên hay không.
3. Thử cuộn trang (scroll) để xem nút Lưu thay đổi.

## Expected Result
- Bàn phím ảo không che khuất ô nhập Địa chỉ đang focus và nút "Lưu thay đổi".
- Người dùng vẫn có thể kéo cuộn toàn bộ màn hình để xem và nhấn nút "Lưu thay đổi" dễ dàng.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử lỗi UI phổ biến khi không sử dụng ScrollView kết hợp KeyboardAvoidingView.
