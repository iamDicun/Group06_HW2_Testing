# TC-ORDERSTATE-001: Kiểm tra cập nhật trạng thái đơn hàng khi ID hợp lệ và tồn tại trong CSDL (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 1 tồn tại trong CSDL với trạng thái "pending".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| status (Request Body) | "confirmed" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "confirmed"} và header Authorization chứa token Admin hợp lệ.
2. Kiểm tra phản hồi trả về từ API.
3. Kiểm tra trạng thái đơn hàng trong cơ sở dữ liệu.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Nội dung phản hồi chứa thông tin đơn hàng đã được cập nhật trạng thái thành "confirmed".
- Trạng thái của đơn hàng ID = 1 trong cơ sở dữ liệu được cập nhật chính xác thành "confirmed".

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 200.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'confirmed'.
- Thông báo phản hồi: 'Order status updated'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử trường hợp happy path cho việc xác định ID hợp lệ và tồn tại.
