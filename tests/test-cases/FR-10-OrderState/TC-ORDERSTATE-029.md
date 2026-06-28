# TC-ORDERSTATE-029: Cập nhật trạng thái đơn hàng với Token sai định dạng (thiếu tiền tố Bearer) (Domain Testing)

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
| Authorization Header | "valid_token_value_without_bearer_prefix" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "confirmed"} và Header Authorization: "valid_token_value_without_bearer_prefix".
2. Kiểm tra phản hồi từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 401 Unauthorized.

## Actual Result (filled after execution)
- API trả về mã phản hồi HTTP 401.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử lớp tương đương bảo mật: token sai định dạng header.
