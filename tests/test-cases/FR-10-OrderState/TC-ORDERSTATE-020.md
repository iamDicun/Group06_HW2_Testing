# TC-ORDERSTATE-020: Cập nhật trạng thái từ shipping sang canceled bị chặn bởi Admin (Domain Testing)

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
| status (Request Body) | "canceled" |

## Test Steps
1. Gửi request PUT /api/admin/orders/3/status với body {"status": "canceled"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "shipping".
- Phản hồi báo lỗi: Đơn hàng đang được giao (shipping), không thể thực hiện hủy.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'shipping'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử quy tắc biên chặn: không cho phép Admin hủy đơn khi đang vận chuyển.
