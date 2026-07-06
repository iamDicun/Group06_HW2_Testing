# TC-COUPON-07: Create coupon — Max uses per user (EP + BVA)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Boundary Value Analysis + Equivalence Partitioning

## Priority
Medium

## Preconditions
- Admin đã đăng nhập
- Đang ở tab Quản lý Mã Giảm Giá

## Test Data

| Sub-test | Kỹ thuật | Biên | code | max_uses_per_user | Expected |
|----------|----------|------|------|-------------------|----------|
| 1 | BVA | 0 (min-1) | MAX0USE | 0 | ❌ Error |
| 2 | BVA | 1 (min) | MAX1USE | 1 | ✅ Pass |
| 3 | BVA | 2 (min+1) | MAX2USE | 2 | ✅ Pass |
| 4 | EP | Âm | MAXNEG | -5 | ❌ Error |

Các trường khác dùng giá trị hợp lệ mặc định: type=percent, discount_value=10, min_order_amount=0, expired_at=2027-12-31.

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
| 2 | HTTP 200, MAX1USE hiển thị |
| 3 | HTTP 200, MAX2USE hiển thị |
| 4 | HTTP 4xx, không tạo được coupon |

## Actual Result (filled after execution)

| Sub-test | Actual | Status |
|----------|--------|--------|
| 1 | HTTP 200, MAX0USE được tạo | ❌ Fail |
| 2 | HTTP 200, MAX1USE hiển thị | ✅ Pass |
| 3 | HTTP 200, MAX2USE hiển thị | ✅ Pass |
| 4 | HTTP 200, MAXNEG được tạo | ❌ Fail |

## Status
Failed

## Related Bugs
BUG-12 (sub-test 1, 4), BUG-11 (sub-test 2, 3)

## Notes
BVA biên dưới: 0 (invalid), 1 (min valid).
