# TC-ORDERSTATE-005: Kiểm tra cập nhật trạng thái đơn hàng khi ID sai kiểu dữ liệu (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Tài khoản Admin đã đăng nhập và có token xác thực hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | "abc" |
| status (Request Body) | "confirmed" |

## Test Steps
1. Gửi request PUT /api/admin/orders/abc/status với body {"status": "confirmed"} và header Authorization chứa token Admin hợp lệ.
2. Kiểm tra phản hồi trả về từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 400 Bad Request.
- Nội dung phản hồi chứa thông báo lỗi định dạng ID không hợp lệ hoặc không đúng kiểu dữ liệu.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 404 (nhận được: {"error": "Order not found"}).
- Điểm không khớp: Mã phản hồi HTTP trả về là 400 Bad Request.

## Status
FAILED

## Related Bugs
BUG-ORDERSTATE-001

## Notes
- Kiểm thử lớp tương đương sai kiểu dữ liệu của ID (chuỗi thay vì số nguyên).
