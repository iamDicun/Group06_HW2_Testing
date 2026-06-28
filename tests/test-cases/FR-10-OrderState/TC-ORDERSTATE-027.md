# TC-ORDERSTATE-027: Admin cố gắng hủy đơn hàng của người khác ở trạng thái shipping không thành công (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 16 tồn tại trong CSDL thuộc về User ID = 99.
- Trạng thái hiện tại của đơn hàng là "shipping".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 16 |
| role (Token Claim) | "admin" |
| order_user_id (DB) | 99 |

## Test Steps
1. Gửi request PUT /api/orders/16/cancel với header Authorization chứa token của Admin.
2. Kiểm tra phản hồi từ API và trạng thái trong CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng ID = 16 trong CSDL vẫn giữ nguyên là "shipping".
- Phản hồi chứa thông báo lỗi không cho phép hủy đơn hàng đang giao (kể cả Admin).

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 404 (nhận được: {"error": "Order not found"}).
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'shipping'.
- Điểm không khớp: Admin không được hủy đơn shipping của người khác.

## Status
FAILED

## Related Bugs
BUG-ORDERSTATE-004

## Notes
- Ràng buộc trạng thái: Trạng thái shipping chặn cả Admin hủy đơn tại API hủy chung.
