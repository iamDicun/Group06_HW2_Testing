# TC-PROFILE-029: Kiểm tra co giãn giao diện (KeyboardAvoidingView) khi mở bàn phím ảo trên Mobile App (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / UI/UX / Positive / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Thiết bị di động có chiều cao màn hình nhỏ hoặc trung bình.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Thao tác | Focus vào TextInput ở vị trí thấp của màn hình (ví dụ: Địa chỉ) |

## Test Steps
1. Chạm vào trường nhập Địa chỉ giao hàng để kích hoạt bàn phím ảo.
2. Quan sát giao diện khi bàn phím ảo xuất hiện.

## Expected Result
- Giao diện tự động đẩy toàn bộ nội dung lên trên (hoặc co giãn viewport) nhờ KeyboardAvoidingView.
- Trường nhập Địa chỉ đang focus và nút "Lưu thay đổi" không bị bàn phím ảo che khuất.
- Người dùng vẫn có thể cuộn màn hình và bấm được nút lưu.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo giao diện responsive trên di động đối với các dòng máy màn hình nhỏ.
