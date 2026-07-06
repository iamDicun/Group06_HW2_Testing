# TC-COUPON-06: Create coupon — Min order amount (BVA)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Admin đã đăng nhập
- Đang ở tab Quản lý Mã Giảm Giá

## Test Data

| Sub-test | Biên | code | min_order_amount | Expected |
|----------|------|------|-----------------|----------|
| 1 | min-1 | BVA01NEG | -1 | ❌ Error |
| 2 | min | BVA02ZER | 0 | ✅ Pass |
| 3 | min+1 | BVA03ONE | 1 | ✅ Pass |

Các trường khác dùng giá trị hợp lệ mặc định: type=percent, discount_value=10, expired_at=2027-12-31, max_uses_per_user=1.

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
| 1 | HTTP 4xx, không tạo được coupon |
| 2 | HTTP 200, BVA02ZER hiển thị |
| 3 | HTTP 200, BVA03ONE hiển thị |

## Actual Result (filled after execution)

| Sub-test | Actual | Status |
|----------|--------|--------|
| 1 | HTTP 200, BVA01NEG được tạo | ❌ Fail |
| 2 | HTTP 200, BVA02ZER hiển thị | ✅ Pass |
| 3 | HTTP 200, BVA03ONE hiển thị | ✅ Pass |

## Status
Failed

## Related Bugs
BUG-12 (sub-test 1), BUG-11 (sub-test 2, 3)

## Notes
BVA biên dưới: -1 (invalid), 0 (min valid).
