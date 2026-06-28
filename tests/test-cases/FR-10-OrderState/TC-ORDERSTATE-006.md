# TC-ORDERSTATE-006: Kiểm tra cập nhật trạng thái đơn hàng với trạng thái mới không nằm trong enum cho phép (Domain Testing)

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
| status (Request Body) | "processing" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "processing"} và header Authorization chứa token Admin.
2. Kiểm tra phản hồi trả về từ API.
3. Kiểm tra trạng thái đơn hàng trong cơ sở dữ liệu.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Nội dung phản hồi chứa thông báo lỗi giá trị status không hợp lệ.
- Trạng thái của đơn hàng ID = 1 trong cơ sở dữ liệu vẫn giữ nguyên là "pending".

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'pending'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử lớp tương đương status nằm ngoài tập enum hợp lệ.
