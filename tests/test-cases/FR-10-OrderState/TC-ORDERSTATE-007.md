# TC-ORDERSTATE-007: Kiểm tra cập nhật trạng thái đơn hàng với trạng thái mới là chuỗi rỗng (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- Đơn hàng có ID = 1 tồn tại trong CSDL với trạng thái "pending".
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| status (Request Body) | "" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": ""} và header Authorization chứa token Admin.
2. Kiểm tra phản hồi trả về từ API.
3. Kiểm tra trạng thái đơn hàng trong cơ sở dữ liệu.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Nội dung phản hồi chứa thông báo lỗi status không được để trống.
- Trạng thái của đơn hàng ID = 1 trong cơ sở dữ liệu vẫn giữ nguyên là "pending".

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'pending'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử giá trị biên chuỗi rỗng (empty string) của status.
