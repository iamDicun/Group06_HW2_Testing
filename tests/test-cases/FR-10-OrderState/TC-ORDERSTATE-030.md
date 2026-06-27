# TC-ORDERSTATE-030: Cập nhật trạng thái đơn hàng với Token hết hạn hoặc không hợp lệ (Domain Testing)

## Requirement ID
FR-10

## Feature
Trạng thái Đơn hàng

## Module / Test Type / Technique
OrderState / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Đơn hàng có ID = 1 tồn tại trong CSDL.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| status (Request Body) | "confirmed" |
| Authorization Header | "Bearer expired_or_corrupted_token" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "confirmed"} và Header Authorization: "Bearer expired_or_corrupted_token".
2. Kiểm tra phản hồi từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử lớp tương đương bảo mật: token hết hạn hoặc sai chữ ký (corrupted).
