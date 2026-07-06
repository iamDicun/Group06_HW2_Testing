# TC-ORDERSTATE-019: Cập nhật trạng thái từ trạng thái kết thúc canceled sang pending không hợp lệ (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 5 tồn tại trong CSDL với trạng thái hiện tại là "canceled".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 5 |
| status (Request Body) | "pending" |

## Test Steps
1. Gửi request PUT /api/admin/orders/5/status với body {"status": "pending"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "canceled".
- Phản hồi báo lỗi: Đơn hàng đã bị hủy (canceled), không thể kích hoạt lại hoặc chuyển đổi trạng thái.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'canceled'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử quy tắc: Canceled là trạng thái cuối (final), không thể cập nhật tiếp.
