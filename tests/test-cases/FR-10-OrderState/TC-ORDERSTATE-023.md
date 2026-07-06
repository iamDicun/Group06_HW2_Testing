# TC-ORDERSTATE-023: Người dùng cố gắng hủy đơn hàng của chính mình ở trạng thái shipping (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 12 tồn tại trong CSDL và thuộc sở hữu của người dùng có ID = 42.
- Trạng thái hiện tại của đơn hàng là "shipping".
- Người dùng ID = 42 đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 12 |
| token_user_id (Token Claim) | 42 |
| order_user_id (DB) | 42 |

## Test Steps
1. Gửi request PUT /api/orders/12/cancel với header Authorization chứa token của User ID = 42.
2. Kiểm tra phản hồi từ API và trạng thái trong CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng ID = 12 trong CSDL vẫn giữ nguyên là "shipping".
- Phản hồi chứa thông báo lỗi không cho phép hủy đơn hàng đang giao.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 200 (nhận được: {"message": "Order canceled successfully"}).
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'canceled'.
- Điểm không khớp: User không được hủy đơn shipping của chính mình.

## Status
FAILED

## Related Bugs
BUG-ORDERSTATE-002

## Notes
- Kiểm thử biên chặn: User không thể hủy đơn hàng khi đã ở trạng thái shipping.
