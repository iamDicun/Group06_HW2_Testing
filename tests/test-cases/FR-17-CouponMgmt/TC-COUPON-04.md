# TC-COUPON-04: Create coupon — Code trùng lặp (EP)

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
- Coupon "SAVE10" đã tồn tại trong DB

## Test Data
| Field | Value |
|-------|-------|
| code | SAVE10 |
| type | percent |
| discount_value | 5 |
| min_order_amount | 0 |
| expired_at | 2027-12-31 |
| max_uses_per_user | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập code "SAVE10" (đã tồn tại)
4. Click **Tạo mã**

## Expected Result
Hệ thống kiểm tra trùng lặp và trả về lỗi HTTP 400/409 với thông báo "Mã giảm giá đã tồn tại". Coupon không được tạo.

## Actual Result (filled after execution)
HTTP 500: "SQLITE_CONSTRAINT: UNIQUE constraint failed: coupons.code". Hiển thị alert lỗi generic.

## Status
Failed

## Related Bugs
BUG-14

## Notes
Thiếu validation phía server kiểm tra duplicate code trước insert.
