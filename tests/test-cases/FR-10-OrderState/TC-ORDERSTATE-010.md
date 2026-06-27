# TC-ORDERSTATE-010: Cập nhật trạng thái đơn hàng thành công từ pending sang confirmed (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 1 tồn tại trong CSDL với trạng thái hiện tại là "pending".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| status (Request Body) | "confirmed" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "confirmed"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Trạng thái đơn hàng trong DB được chuyển thành "confirmed" thành công.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Luồng nghiệp vụ hợp lệ: pending -> confirmed (do Admin thực hiện).
