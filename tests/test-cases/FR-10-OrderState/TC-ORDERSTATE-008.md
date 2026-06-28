# TC-ORDERSTATE-008: Kiểm tra cập nhật trạng thái đơn hàng khi thiếu trường status trong body (Domain Testing)

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
| Payload Body | {} (không truyền status) |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body rỗng {} và header Authorization chứa token Admin.
2. Kiểm tra phản hồi từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Nội dung phản hồi báo lỗi thiếu trường status hoặc status không được null/undefined.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 400.
- Trạng thái đơn hàng trong cơ sở dữ liệu là 'pending'.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử trường hợp null/missing của status.
