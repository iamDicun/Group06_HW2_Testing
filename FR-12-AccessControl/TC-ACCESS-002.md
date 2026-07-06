# TC-ACCESS-002: Cập nhật sản phẩm với token admin hợp lệ

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Tài khoản Admin (`admin@eshop.com` / `Admin123!`) đã đăng nhập và có Token JWT hợp lệ.
- Sản phẩm có ID `1` đã tồn tại trong hệ thống.

## Test Data
| Field | Value |
|-------|-------|
| Method | PUT |
| Endpoint | /api/products/1 |
| Header: Authorization | Bearer <valid_admin_jwt_token> |
| Body (JSON) | `{"name": "Sản phẩm A Cập Nhật", "price": 120000, "category_id": 1}` |

## Test Steps
1. Gửi yêu cầu đăng nhập tài khoản Admin để lấy token JWT hợp lệ.
2. Gửi yêu cầu `PUT /api/products/1` kèm theo header `Authorization: Bearer <mã JWT Token Admin>` và body JSON chứa thông tin sản phẩm mới.

## Expected Result
- HTTP Status Code trả về là `200 OK` (hoặc `204 No Content`).
- Thông tin sản phẩm được cập nhật thành công trong hệ thống.

## Actual Result (filled after execution)
[What actually happened]

## Status
Not Run

## Related Bugs
None

## Notes
Đây là API có tính ảnh hưởng dữ liệu (PUT) nên bắt buộc phải kiểm tra quyền admin.
