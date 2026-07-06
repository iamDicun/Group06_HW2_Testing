# TC-ACCESS-004: Tạo danh mục mới với token user (không phải admin)

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Tài khoản User test (`test@eshop.com` / `Test1234!`) đã đăng nhập và có Token JWT hợp lệ.

## Test Data
| Field | Value |
|-------|-------|
| Method | POST |
| Endpoint | /api/categories |
| Header: Authorization | Bearer <valid_user_jwt_token> |
| Body (JSON) | `{"name": "Danh mục bị cấm"}` |

## Test Steps
1. Gửi yêu cầu đăng nhập tài khoản User để lấy token JWT hợp lệ.
2. Gửi yêu cầu `POST /api/categories` kèm theo header `Authorization: Bearer <mã JWT Token User>` và body JSON tạo danh mục.

## Expected Result
- HTTP Status Code trả về là `403 Forbidden`.
- Danh mục mới không được tạo trong cơ sở dữ liệu.

## Actual Result (filled after execution)
[What actually happened]

## Status
Not Run

## Related Bugs
None

## Notes
Tạo danh mục mới là một thao tác ảnh hưởng dữ liệu (POST) thuộc nhóm được bảo vệ, do đó tài khoản thông thường không được phép thực hiện.
