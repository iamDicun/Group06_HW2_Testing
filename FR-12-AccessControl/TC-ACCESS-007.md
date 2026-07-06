# TC-ACCESS-007: Xem danh sách sản phẩm (API công khai) không cần Token

## Requirement ID
FR-12 (và FR-05)

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
Medium

## Preconditions
- Hệ thống đã có sẵn các sản phẩm được lưu trong cơ sở dữ liệu.

## Test Data
| Field | Value |
|-------|-------|
| Method | GET |
| Endpoint | /api/products |
| Header: Authorization | (Không gửi header này) |

## Test Steps
1. Gửi yêu cầu `GET /api/products` mà không truyền kèm bất kỳ token nào trong header.

## Expected Result
- HTTP Status Code trả về là `200 OK`.
- Response trả về đúng cấu trúc danh sách sản phẩm hợp lệ trong hệ thống.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK và danh sách sản phẩm thành công mà không cần token.

## Status
PASSED

## Related Bugs
None

## Notes
Đây là API công khai (đọc dữ liệu), không nằm trong nhóm bị bảo vệ bởi FR-12.
