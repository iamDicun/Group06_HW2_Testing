# [BUG][ACCESS-CONTROL] Người dùng thường truy cập và thực thi các API Admin (/api/admin/*)

## Found by Test Case
- TC-ACCESS-003: Truy cập API Admin với token user (không phải admin)
- TC-ACCESS-004: Tạo danh mục mới với token user (không phải admin)

## Requirement Related
- FR-12: Access Control (Kiểm soát truy cập)

## Severity / Priority
- Severity: Critical
- Priority: P1

## Environment
- **Browser:** Postman / cURL
- **OS:** Windows 11
- **API URL:** http://localhost:3000/api/admin/users, http://localhost:3000/api/categories

## Steps to Reproduce
1. Gửi yêu cầu đăng nhập bằng tài khoản người dùng thường (`user@eshop.com` / `User123!`) qua endpoint `POST /api/auth/login` để lấy JWT token của user.
2. Sao chép JWT token nhận được.
3. Gửi yêu cầu GET tới API Admin `http://localhost:3000/api/admin/users` kèm theo header `Authorization: Bearer <user_token>`.
4. Gửi yêu cầu POST tới API `http://localhost:3000/api/categories` với payload `{"name": "Danh mục mới"}` kèm theo header `Authorization: Bearer <user_token>`.

## Expected Result
- Cả hai yêu cầu đều bị từ chối truy cập.
- Trả về mã HTTP lỗi `403 Forbidden` cùng thông báo lỗi phù hợp (ví dụ: "Forbidden" hoặc "Access Denied").

## Actual Result
- API `GET /api/admin/users` trả về mã HTTP `200 OK` cùng danh sách thông tin người dùng toàn hệ thống (bao gồm cả các thông tin nhạy cảm của người khác).
- API `POST /api/categories` trả về mã HTTP `200 OK` và tạo danh mục mới thành công.
- Hệ thống chỉ xác thực tính hợp lệ của Token JWT mà hoàn toàn không đối chiếu kiểm tra quyền hạn `role === 'admin'`.

## Evidence
```bash
# 1. Truy cập API quản trị danh sách người dùng bằng tài khoản thường
curl.exe -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer <user_token>"

# Response nhận được:
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@eshop.com",
    "role": "admin",
    ...
  },
  {
    "id": 2,
    "name": "User",
    "email": "user@eshop.com",
    "role": "user",
    ...
  }
]
```

## Labels
- `type: bug`
- `module: ACCESS-CONTROL`
- `severity: Critical`
- `priority: P1`
- `status: new`
- `found-by: test-case TC-ACCESS-003`
