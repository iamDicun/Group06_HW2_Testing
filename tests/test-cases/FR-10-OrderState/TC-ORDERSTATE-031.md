# TC-ORDERSTATE-031: Người dùng thông thường cố gắng truy cập API Admin cập nhật trạng thái đơn hàng (Domain Testing)

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
- Tài khoản người dùng bình thường (role = "user") đã đăng nhập và có token hợp lệ.

## Test Data
| Field | Value |
|---|---|
| id (URL Path) | 1 |
| status (Request Body) | "confirmed" |
| role (Token Claim) | "user" |

## Test Steps
1. Gửi request PUT /api/admin/orders/1/status với body {"status": "confirmed"} và Header Authorization chứa token của User (role = "user").
2. Kiểm tra phản hồi từ API.

## Expected Result
- Mã phản hồi HTTP trả về là 403 Forbidden.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử phân quyền: Người dùng bình thường không được gọi API Admin cập nhật trạng thái.
