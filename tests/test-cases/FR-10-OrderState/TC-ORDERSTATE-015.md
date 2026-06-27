# TC-ORDERSTATE-015: Cập nhật trạng thái nhảy bước không hợp lệ từ pending sang shipping (Domain Testing)

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
| status (Request Body) | "shipping" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "shipping"} và token Admin.
2. Kiểm tra phản hồi và CSDL.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Trạng thái đơn hàng trong DB vẫn giữ nguyên là "pending".
- Nội dung phản hồi chứa thông báo lỗi không cho phép chuyển đổi trạng thái nhảy bước từ pending sang shipping.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử quy tắc chuyển đổi trạng thái: không thể bỏ qua confirmed.
