# TC-COUPON-03: Create coupon — Code rỗng (EP)

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
- Đang ở tab Quản lý Mã Giảm Giá

## Test Data
| Field | Value |
|-------|-------|
| code | (rỗng) |
| type | percent |
| discount_value | 10 |
| min_order_amount | 0 |
| expired_at | 2027-12-31 |
| max_uses_per_user | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Để trống trường **code**
4. Click **Tạo mã**

## Expected Result
Trình duyệt chặn submit do thuộc tính `required` trên input code. Hiển thị thông báo "Please fill out this field". Không gọi API.

## Actual Result (filled after execution)
Trình duyệt chặn submit, hiển thị "Please fill out this field". Không gọi API.

## Status
Passed

## Related Bugs
None

## Notes
HTML5 validation hoạt động tốt.
