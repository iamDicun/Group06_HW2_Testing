# TC-ORDERSTATE-002: Kiểm tra cập nhật trạng thái đơn hàng khi ID là số nguyên dương nhưng không tồn tại trong CSDL (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Không có đơn hàng nào có ID = 999999 trong cơ sở dữ liệu.
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 999999 |
| status (Request Body) | "confirmed" |

## Test Steps
1. Gửi request PUT /api/admin/orders/999999/status với body {"status": "confirmed"} và header Authorization chứa token Admin hợp lệ.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 404 Not Found.
- Nội dung phản hồi chứa thông báo lỗi cho biết đơn hàng không tồn tại.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 404.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử lớp tương đương ID hợp lệ về định dạng nhưng không tồn tại trong DB.
