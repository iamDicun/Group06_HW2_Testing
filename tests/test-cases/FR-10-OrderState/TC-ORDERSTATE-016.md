# TC-ORDERSTATE-016: Cập nhật trạng thái đi ngược không hợp lệ từ confirmed sang pending (Domain Testing)

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
| status (Request Body) | "pending" |

## Test Steps
1. Gửi request PUT /api/admin/orders/2/status với body {"status": "pending"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "confirmed".
- Phản hồi báo lỗi không cho phép đi ngược trạng thái.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'confirmed'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử quy tắc chuyển đổi trạng thái: không cho phép quay lại pending từ confirmed.
