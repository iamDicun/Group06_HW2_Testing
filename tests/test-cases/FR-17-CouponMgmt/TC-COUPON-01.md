# TC-COUPON-01: Create coupon — Code hợp lệ + type percent (EP)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Admin đã đăng nhập (admin@eshop.com / Admin123!)
- Có quyền truy cập tab Quản lý Mã Giảm Giá

## Test Data
| Field | Value |
|-------|-------|
| code | SPRING30 |
| type | percent |
| discount_value | 15 |
| min_order_amount | 200000 |
| expired_at | 2027-06-30 |
| max_uses_per_user | 3 |
| is_active | 1 |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Nhập đầy đủ thông tin theo Test Data
4. Click **Tạo mã**
5. Quan sát danh sách coupon

## Expected Result
HTTP 200. Coupon "SPRING30" xuất hiện trong bảng danh sách với đúng các giá trị đã nhập. Form reset về mặc định.

## Actual Result (filled after execution)
HTTP 200, SPRING30 hiển thị trong danh sách. Form reset.

## Status
Failed

## Related Bugs
BUG-11

## Notes
API POST /api/admin/coupons không kiểm tra admin role.
