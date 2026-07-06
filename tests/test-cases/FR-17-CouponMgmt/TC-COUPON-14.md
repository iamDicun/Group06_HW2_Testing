# TC-COUPON-14: Delete coupon — Không tồn tại (EP)

## Requirement ID
FR-17

## Feature
Quản lý Mã Giảm Giá (Coupon CRUD - Admin)

## Module / Test Type / Technique
Coupon Management / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Biết ID coupon không tồn tại (VD: id = 9999)

## Test Data
| Field | Value |
|-------|-------|
| API endpoint | DELETE /api/admin/coupons/9999 |

## Test Steps
1. Mở DevTools → Console
2. Gọi API: fetch('/api/admin/coupons/9999', { method: 'DELETE', headers: { Authorization: 'Bearer <token>' } })
3. Quan sát response

## Expected Result
HTTP 404. Response body: {"error": "Coupon not found"}

## Actual Result (filled after execution)
HTTP 404. Response: {"error": "Coupon not found"}

## Status
Passed

## Related Bugs
None

## Notes
EP partition: ID không tồn tại (invalid). Backend xử lý đúng.
