# TC-PROFILE-MOBILE-011: Cập nhật Họ Tên chứa thẻ HTML hoặc Script để kiểm tra XSS

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Người dùng đã đăng nhập thành công vào Mobile App.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Họ tên | "<script>alert('XSS')</script>" |

## Test Steps
1. Nhập hoặc dán chuỗi "<script>alert('XSS')</script>" vào ô nhập Họ tên.
2. Nhập Số điện thoại và Địa chỉ hợp lệ.
3. Nhấn nút "Lưu thay đổi".
4. Kiểm tra thông báo hiển thị trên ứng dụng và thông tin trong CSDL.

## Expected Result
- Hệ thống thực hiện mã hóa HTML (sanitize) trước khi hiển thị/lưu hoặc chặn không cho lưu và báo lỗi.
- Không có hộp thoại cảnh báo (alert) nào tự động bật lên trên màn hình.

## Actual Result (filled after execution)


## Status
Blocked

## Related Bugs
BUG-PROFILE-MOBILE-001

## Notes
- Kiểm tra tính an toàn thông tin (XSS injection).
