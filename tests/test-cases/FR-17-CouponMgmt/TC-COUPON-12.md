# TC-COUPON-12: View coupon list — Rỗng (EP)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Admin đã đăng nhập
- DB không có coupon nào (đã xóa hết)

## Test Data
Không có

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Quan sát bảng danh sách coupon

## Expected Result
- Bảng danh sách trống, không có hàng nào
- Form tạo coupon vẫn hiển thị

## Actual Result (filled after execution)
Bảng trống, không có hàng. Form tạo coupon hiển thị.

## Status
Passed

## Related Bugs
None

## Notes
EP partition: danh sách rỗng.
