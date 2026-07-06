# TC-COUPON-11: View coupon list — Có items (EP)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Admin đã đăng nhập
- DB có 4 coupon mẫu (SAVE10, BIGBUY, VIP100, EXPIRED)

## Test Data
Không có

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Quan sát bảng danh sách coupon

## Expected Result
- Hiển thị form "Tạo mã giảm giá mới"
- Bảng danh sách hiển thị 4 coupon: SAVE10, BIGBUY, VIP100, EXPIRED
- Các cột: Mã, Loại, Giá trị, Đơn tối thiểu, Hết hạn, Giới hạn/người, Hành động
- Cột Hành động có nút Xóa
- EXPIRED hiển thị "Hết hạn" màu đỏ

## Actual Result (filled after execution)
Hiển thị đúng form, bảng, 4 coupon mẫu. EXPIRED hiển thị "Hết hạn" màu đỏ.

## Status
Passed

## Related Bugs
None

## Notes
EP partition: danh sách có items.
