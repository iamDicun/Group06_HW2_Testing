# TC-COUPON-05: Create coupon — Discount value (EP + BVA)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Equivalence Partitioning + Boundary Value Analysis

## Priority
High

## Preconditions
- Admin đã đăng nhập
- Đang ở tab Quản lý Mã Giảm Giá

## Test Data

| Sub-test | Kỹ thuật | Biên | code | type | discount_value | Expected |
|----------|----------|------|------|------|---------------|----------|
| 1 | EP | Hợp lệ | DISCT10 | percent | 10 | ✅ Pass |
| 2 | BVA | 0 (min-1) | ZEROVAL | percent | 0 | ❌ Error |
| 3 | EP | Âm | NEGVAL | percent | -10 | ❌ Error |
| 4 | BVA | 1 (min) | BVA1DIS | percent | 1 | ✅ Pass |

Các trường khác (min_order_amount, expired_at, max_uses_per_user) dùng giá trị hợp lệ mặc định: 0, 2027-12-31, 1.

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập thông tin theo từng sub-test
4. Click **Tạo mã**
5. Ghi nhận kết quả
6. Xóa coupon sau mỗi sub-test (nếu tạo thành công)

## Expected Result

| Sub-test | Expected |
|----------|----------|
| 1 | HTTP 200, coupon hiển thị |
| 2 | HTTP 4xx, không tạo được coupon |
| 3 | HTTP 4xx, không tạo được coupon |
| 4 | HTTP 200, coupon hiển thị |

## Actual Result (filled after execution)

| Sub-test | Actual | Status |
|----------|--------|--------|
| 1 | HTTP 200, DISCT10 hiển thị | ✅ Pass |
| 2 | HTTP 200, ZEROVAL được tạo | ❌ Fail |
| 3 | HTTP 200, NEGVAL được tạo | ❌ Fail |
| 4 | HTTP 200, BVA1DIS hiển thị | ✅ Pass |

## Status
Failed

## Related Bugs
BUG-12 (sub-test 2, 3), BUG-11 (sub-test 1, 4)

## Notes
BVA biên dưới: 0 (invalid), 1 (min valid). Server không có validation.
