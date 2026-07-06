# TC-ACCESS-006: Truy cập API được bảo vệ mà không gửi kèm Token

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Sản phẩm có ID `1` đã tồn tại trong hệ thống.

## Test Data
| Field | Value |
|-------|-------|
| Method | DELETE |
| Endpoint | /api/products/1 |
| Header: Authorization | (Không gửi header này) |

## Test Steps
1. Gửi yêu cầu `DELETE /api/products/1` mà không đính kèm header `Authorization`.

## Expected Result
- HTTP Status Code trả về là `401 Unauthorized`.
- Sản phẩm có ID `1` không bị xóa khỏi cơ sở dữ liệu.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK và sản phẩm bị xóa thành công khỏi CSDL mặc dù hoàn toàn không gửi kèm JWT Token xác thực.

## Status
FAILED

## Related Bugs
BUG-ACCESS-002

## Notes
Đây là trường hợp kiểm thử thiếu token hoàn toàn.
