# TC-ORDERSTATE-026: Admin hủy đơn hàng của người khác ở trạng thái confirmed thành công (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 15 tồn tại trong CSDL thuộc về User ID = 99.
- Trạng thái hiện tại của đơn hàng là "confirmed".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 15 |
| role (Token Claim) | "admin" |
| order_user_id (DB) | 99 |

## Test Steps
1. Gửi request PUT /api/orders/15/cancel với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi từ API và trạng thái trong CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Nội dung phản hồi xác nhận hủy đơn hàng thành công.
- Trạng thái đơn hàng ID = 15 trong CSDL chuyển thành "canceled" (Admin bypass quyền sở hữu thành công).

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 404 (nhận được: {"error": "Order not found"}).
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'confirmed'.
- Điểm không khớp: Admin hủy đơn confirmed của người khác thành công.

## Status
FAILED

## Related Bugs
BUG-ORDERSTATE-004

## Notes
- Quyền đặc quyền của Admin: Cho phép hủy đơn hàng của bất kỳ ai nếu chưa giao.
