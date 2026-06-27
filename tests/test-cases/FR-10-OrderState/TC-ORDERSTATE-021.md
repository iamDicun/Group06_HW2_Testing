# TC-ORDERSTATE-021: Người dùng hủy đơn hàng của chính mình ở trạng thái pending thành công (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 10 tồn tại trong CSDL và thuộc sở hữu của người dùng có ID = 42.
- Trạng thái hiện tại của đơn hàng là "pending".
- Người dùng ID = 42 đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 10 |
| token_user_id (Token Claim) | 42 |
| order_user_id (DB) | 42 |

## Test Steps
1. Gửi request PUT /api/orders/10/cancel với header Authorization chứa token của User ID = 42.
2. Kiểm tra phản hồi từ API và trạng thái trong CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Nội dung phản hồi xác nhận hủy đơn hàng thành công.
- Trạng thái đơn hàng ID = 10 trong CSDL chuyển thành "canceled".

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Luồng hủy đơn hàng hợp lệ: User tự hủy đơn hàng của mình khi đang pending.
