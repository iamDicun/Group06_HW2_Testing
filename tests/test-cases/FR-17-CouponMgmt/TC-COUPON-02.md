# TC-COUPON-02: Create coupon — Code hợp lệ + type fixed (EP)

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
- Có quyền truy cập tab Quản lý Mã Giảm Giá

## Test Data
| Field | Value |
|-------|-------|
| code | FIXED50K |
| type | fixed |
| discount_value | 50000 |
| min_order_amount | 100000 |
| expired_at | 2027-06-30 |
| max_uses_per_user | 2 |
| is_active | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập đầy đủ thông tin theo Test Data
4. Click **Tạo mã**
5. Quan sát danh sách coupon

## Expected Result
HTTP 200. Coupon "FIXED50K" xuất hiện trong bảng với loại "fixed", giá trị "50,000₫".

## Actual Result (filled after execution)
HTTP 200, FIXED50K hiển thị trong danh sách.

## Status
Failed

## Related Bugs
BUG-11

## Notes
API không kiểm tra admin role.
