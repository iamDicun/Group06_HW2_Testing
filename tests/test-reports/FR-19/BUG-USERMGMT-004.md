# BUG-USERMGMT-004: Lỗ hổng phân quyền nghiêm trọng - Cho phép User thường lấy danh sách và xóa mọi tài khoản người dùng

## Found by Test Case
TC-USERMGMT-009, TC-USERMGMT-010, TC-USERMGMT-011, TC-USERMGMT-016, TC-USERMGMT-017

## Requirement Related
FR-19

## Severity / Priority
Critical / P0

## Environment
- **Browser:** N/A / Chrome
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** admin@eshop.com / user2@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản User thường (role = "user"), lấy token.
2. Gửi request GET `/api/admin/users` chứa token của User thường.
3. Gửi request DELETE `/api/admin/users/3` chứa token của User thường.

## Expected Result
API trả về mã phản hồi HTTP 403 Forbidden do người dùng không có vai trò quản trị viên (role !== 'admin').

## Actual Result
API trả về mã phản hồi HTTP 200 OK cho cả 2 hành động, trả về danh sách toàn bộ người dùng và thực hiện xóa thành công tài khoản ID = 3 khỏi CSDL.

## Evidence
```bash
# Request (Lấy danh sách người dùng bằng token User thường)
curl.exe -X GET http://localhost:3000/api/admin/users -H "Authorization: Bearer <user_token>"

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  { "id": 1, "email": "admin@eshop.com", "role": "admin" },
  ...
]
```

## Labels
- `type: bug`
- `module: USERMGMT`
- `severity: Critical`
- `priority: P0`
- `status: new`
- `found-by: test-case TC-USERMGMT-009`
