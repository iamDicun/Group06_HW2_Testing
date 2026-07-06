# TC-COUPON-08: Create coupon — Expired at future (EP)

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

## Test Data
| Field | Value |
|-------|-------|
| code | FUTUREC |
| type | percent |
| discount_value | 10 |
| min_order_amount | 0 |
| expired_at | 2028-01-01 |
| max_uses_per_user | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập expired_at = 2028-01-01 (ngày tương lai)
4. Click **Tạo mã**

## Expected Result
HTTP 200. Coupon "FUTUREC" được tạo thành công, hiển thị trạng thái còn hạn.

## Actual Result (filled after execution)
HTTP 200, FUTUREC hiển thị với trạng thái còn hạn.

## Status
Failed

## Related Bugs
BUG-11

## Notes
EP partition: ngày tương lai (valid).
