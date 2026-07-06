# TC-ORDERSTATE-017: Cập nhật trạng thái đi ngược không hợp lệ từ shipping sang confirmed (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 3 tồn tại trong CSDL với trạng thái hiện tại là "shipping".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 3 |
| status (Request Body) | "confirmed" |

## Test Steps
1. Gửi request PUT /api/admin/orders/3/status với body {"status": "confirmed"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "shipping".
- Phản hồi báo lỗi không cho phép đi ngược trạng thái từ shipping về confirmed.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'shipping'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử quy tắc chuyển đổi trạng thái: không cho phép quay lại confirmed từ shipping.
