# BUG-USERMGMT-001: API Admin xóa người dùng không kiểm tra tính hợp lệ của ID người dùng (trả về 200 OK thay vì 400/404)

## Found by Test Case
TC-USERMGMT-002, TC-USERMGMT-003, TC-USERMGMT-004, TC-USERMGMT-005

## Requirement Related
FR-19

## Severity / Priority
Minor / P3

## Environment
- **Browser:** N/A / Chrome
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** admin@eshop.com / user2@eshop.com

## Steps to Reproduce
1. Gửi request DELETE `/api/admin/users/999999` (ID không tồn tại).
2. Gửi request DELETE `/api/admin/users/0` (ID = 0).
3. Gửi request DELETE `/api/admin/users/-1` (ID âm).
4. Gửi request DELETE `/api/admin/users/abc` (ID không phải số).

## Expected Result
API trả về mã phản hồi HTTP 400 Bad Request cho ID rác/âm/0 hoặc 404 Not Found cho ID không tồn tại.

## Actual Result
API luôn trả về mã phản hồi HTTP 200 OK với body `{"message": "User deleted"}` dù ID không tồn tại hoặc không hợp lệ.

## Evidence
```bash
# Request (ID không tồn tại)
curl.exe -X DELETE http://localhost:3000/api/admin/users/999999 -H "Authorization: Bearer <admin_token>"

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "User deleted"
}
```

## Labels
- `type: bug`
- `module: USERMGMT`
- `severity: Minor`
- `priority: P3`
- `status: new`
- `found-by: test-case TC-USERMGMT-002`
