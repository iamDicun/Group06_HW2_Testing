# TC-PROFILE-024: Kiểm tra TextInput Địa chỉ hỗ trợ nhập nhiều dòng (multiline) trên Mobile App (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / UI/UX / Positive / Equivalence Partitioning

## Priority
Low

## Preconditions
- Thiết bị di động hoặc trình giả lập đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân trên Mobile App.

## Test Data
| Field | Value |
|---|---|
| Địa chỉ | Dòng 1: 123 Đường Lê Lợi\nDòng 2: Phường Bến Thành\nDòng 3: Quận 1, TP. HCM |

## Test Steps
1. Nhấn chạm vào trường nhập Địa chỉ giao hàng.
2. Nhập dòng thứ nhất, sau đó nhấn phím "Enter" hoặc "Return" trên bàn phím ảo.
3. Nhập tiếp dòng thứ hai và dòng thứ ba.

## Expected Result
- Con trỏ tự động xuống dòng mới sau khi nhấn Enter.
- Trường nhập hiển thị nội dung trên nhiều dòng và cho phép cuộn để xem lại toàn bộ địa chỉ.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Đảm bảo thuộc tính multiline={true} được cấu hình đúng trên TextInput địa chỉ.
