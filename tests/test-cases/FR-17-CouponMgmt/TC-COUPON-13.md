# TC-COUPON-13: Delete coupon — Tồn tại (EP)

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
- Coupon "TODELETE" đã được tạo trước đó (id hợp lệ)

## Test Data
| Field | Value |
|-------|-------|
| Coupon code | TODELETE |
| Phương thức | Click nút Xóa trên UI |

## Test Steps
1. Đăng nhập admin
2. Vào tab **Quản lý Mã Giảm Giá**
3. Click nút **Xóa** trên coupon "TODELETE"
4. Quan sát danh sách

## Expected Result
- HTTP 200: {"message": "Coupon deleted"}
- Coupon "TODELETE" biến mất khỏi danh sách
- Có dialog xác nhận trước khi xóa

## Actual Result (filled after execution)
HTTP 200, TODELETE biến mất khỏi danh sách. **Không có dialog xác nhận** — xóa ngay lập tức.

## Status
Failed

## Related Bugs
BUG-11, BUG-13

## Notes
BUG-11: API không check admin role. BUG-13: Thiếu xác nhận trước xóa.
