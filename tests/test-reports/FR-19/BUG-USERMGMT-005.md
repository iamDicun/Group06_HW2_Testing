# BUG-USERMGMT-005: Cho phép quản trị viên tự xóa chính mình (Self-deletion) qua API

## Found by Test Case
TC-USERMGMT-018

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
1. Đăng nhập tài khoản Admin ID = 1 lấy token.
2. Gửi request DELETE `/api/admin/users/1` với Header Authorization chứa token của Admin ID = 1.

## Expected Result
API trả về mã phản hồi HTTP 400 Bad Request kèm thông báo lỗi và chặn hành động tự xóa tài khoản của chính mình.

## Actual Result
API thực hiện thành công và trả về mã phản hồi HTTP 200 OK `{"message": "User deleted"}`. Tài khoản Admin ID = 1 bị xóa hoàn toàn khỏi CSDL, dẫn đến hệ thống bị mồ côi.

## Evidence
```bash
# Request
curl.exe -X DELETE http://localhost:3000/api/admin/users/1 -H "Authorization: Bearer <admin_token>"

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "User deleted"
}

# CSDL State After Request
sqlite> SELECT * FROM users WHERE id = 1;
(Không trả về bản ghi nào)
```

## Labels
- `type: bug`
- `module: USERMGMT`
- `severity: Critical`
- `priority: P0`
- `status: new`
- `found-by: test-case TC-USERMGMT-018`
