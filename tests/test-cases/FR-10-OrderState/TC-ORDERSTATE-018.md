# TC-ORDERSTATE-018: Cập nhật trạng thái từ trạng thái kết thúc delivered sang canceled không hợp lệ (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 4 tồn tại trong CSDL với trạng thái hiện tại là "delivered".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 4 |
| status (Request Body) | "canceled" |

## Test Steps
1. Gửi request PUT /api/admin/orders/4/status với body {"status": "canceled"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "delivered".
- Phản hồi báo lỗi: Đơn hàng đã ở trạng thái kết thúc delivered, không thể thay đổi trạng thái.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'delivered'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử quy tắc: Delivered là trạng thái cuối (final), không thể cập nhật tiếp.
