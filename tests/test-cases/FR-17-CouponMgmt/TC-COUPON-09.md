# TC-COUPON-09: Create coupon — Expired at past (EP)

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

## Test Data
| Field | Value |
|-------|-------|
| code | PASTDUE |
| type | percent |
| discount_value | 10 |
| min_order_amount | 0 |
| expired_at | 2020-01-01 |
| max_uses_per_user | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập expired_at = 2020-01-01 (ngày quá khứ)
4. Click **Tạo mã**

## Expected Result
HTTP 200. Coupon "PASTDUE" được tạo thành công, hiển thị trạng thái "Hết hạn" (màu đỏ).

## Actual Result (filled after execution)
HTTP 200, PASTDUE hiển thị với trạng thái "Hết hạn".

## Status
Failed

## Related Bugs
BUG-11

## Notes
EP partition: ngày quá khứ (valid nhưng hết hạn).
