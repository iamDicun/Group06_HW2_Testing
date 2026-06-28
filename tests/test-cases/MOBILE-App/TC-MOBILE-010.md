# TC-MOBILE-010: Nhập địa chỉ nhiều dòng (multiline) và cuộn xem địa chỉ dài

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân (Mobile)

## Module / Test Type / Technique
Profile / UI/UX / Equivalence Partitioning

## Priority
Low

## Preconditions
- Thiết bị di động hoặc trình giả lập đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân.

## Test Data
| Field | Value |
|---|---|
| Địa chỉ | "123 Đường Lê Lợi\nPhường Bến Thành\nQuận 1, TP. HCM" |

## Test Steps
1. Chạm vào ô nhập Địa chỉ giao hàng.
2. Nhập "123 Đường Lê Lợi", nhấn phím Enter (hoặc Return) trên bàn phím ảo.
3. Nhập "Phường Bến Thành", nhấn phím Enter.
4. Nhập "Quận 1, TP. HCM".
5. Kiểm tra việc cuộn để xem lại toàn bộ nội dung.

## Expected Result
- Ô nhập Địa chỉ cho phép người dùng xuống dòng sau khi nhấn phím Enter.
- Màn hình hiển thị địa chỉ thành 3 dòng rõ ràng.
- Cho phép người dùng kéo cuộn (scroll) trong ô nhập để xem lại nội dung địa chỉ dài.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo thuộc tính multiline={true} của TextInput địa chỉ được thiết lập đúng.
