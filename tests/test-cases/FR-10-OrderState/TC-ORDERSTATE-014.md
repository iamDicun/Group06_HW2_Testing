# TC-ORDERSTATE-014: Cập nhật trạng thái đơn hàng thành công từ confirmed sang canceled (bởi Admin) (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 2 tồn tại trong CSDL với trạng thái hiện tại là "confirmed".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 2 |
| status (Request Body) | "canceled" |

## Test Steps
1. Gửi request PUT /api/admin/orders/2/status với body {"status": "canceled"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Trạng thái đơn hàng trong DB được chuyển thành "canceled" thành công.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 200.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'canceled'.
- Thông báo phản hồi: 'Order status updated'.

## Status
PASSED

## Related Bugs
None

## Notes
- Luồng nghiệp vụ hợp lệ: confirmed -> canceled (Admin hủy).
