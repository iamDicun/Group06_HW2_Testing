# TC-ORDERSTATE-012: Cập nhật trạng thái đơn hàng thành công từ shipping sang delivered (Domain Testing)

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
| status (Request Body) | "delivered" |

## Test Steps
1. Gửi request PUT /api/admin/orders/3/status với body {"status": "delivered"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Trạng thái đơn hàng trong DB được chuyển thành "delivered" thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Luồng nghiệp vụ hợp lệ: shipping -> delivered (do Admin thực hiện).
