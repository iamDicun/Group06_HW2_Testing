# TC-ACCESS-008: Xem danh sách danh mục (API công khai) không cần Token

## Requirement ID
FR-12 (và FR-14)

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
Medium

## Preconditions
- Hệ thống đã có sẵn các danh mục trong cơ sở dữ liệu.

## Test Data
| Field | Value |
|-------|-------|
| Method | GET |
| Endpoint | /api/categories |
| Header: Authorization | (Không gửi header này) |

## Test Steps
1. Gửi yêu cầu `GET /api/categories` mà không truyền kèm bất kỳ token nào trong header.

## Expected Result
- HTTP Status Code trả về là `200 OK`.
- Response trả về đúng danh sách các danh mục sản phẩm hiện có.

## Actual Result (filled after execution)
[What actually happened]

## Status
Not Run

## Related Bugs
None

## Notes
API xem danh mục là API công khai, không thuộc nhóm bị bảo vệ bởi FR-12.
