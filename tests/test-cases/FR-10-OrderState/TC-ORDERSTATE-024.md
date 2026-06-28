# TC-ORDERSTATE-024: Người dùng cố gắng hủy đơn hàng của người khác (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 13 tồn tại trong CSDL thuộc về User ID = 99.
- Trạng thái đơn hàng là "pending".
- Người dùng ID = 42 đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 13 |
| token_user_id (Token Claim) | 42 |
| order_user_id (DB) | 99 |

## Test Steps
1. Gửi request PUT /api/orders/13/cancel với header Authorization chứa token của User ID = 42.
2. Kiểm tra phản hồi từ API và trạng thái trong CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 403 Forbidden hoặc 400 Bad Request.
- Trạng thái đơn hàng ID = 13 trong CSDL vẫn giữ nguyên là "pending".
- Phản hồi chứa thông báo lỗi không có quyền hủy đơn hàng của người khác.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 404 (nhận được: {"error": "Order not found"}).
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'pending'.
- Điểm không khớp: Không cho phép user hủy đơn của người khác.

## Status
FAILED

## Related Bugs
BUG-ORDERSTATE-003

## Notes
- Kiểm thử quyền sở hữu đơn hàng (order_ownership): User không được phép hủy đơn hàng của người khác.
