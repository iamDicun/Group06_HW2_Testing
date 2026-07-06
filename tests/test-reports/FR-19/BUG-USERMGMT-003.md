# BUG-USERMGMT-003: API trả về 403 Forbidden thay vì 401 Unauthorized khi Token không hợp lệ hoặc hết hạn

## Found by Test Case
TC-USERMGMT-008, TC-USERMGMT-015

## Requirement Related
FR-19

## Severity / Priority
Minor / P2

## Environment
- **Browser:** N/A / Chrome
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** admin@eshop.com / user2@eshop.com

## Steps to Reproduce
1. Gửi request GET `/api/admin/users` với Header Authorization chứa token sai chữ ký hoặc hết hạn `Bearer invalid_token`.

## Expected Result
API trả về mã phản hồi HTTP 401 Unauthorized do token không hợp lệ.

## Actual Result
API trả về mã phản hồi HTTP 403 Forbidden với body `{"error": "Forbidden"}`.

## Evidence
```bash
# Request
curl.exe -X GET http://localhost:3000/api/admin/users -H "Authorization: Bearer invalid_token"

# Response
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "error": "Forbidden"
}
```

## Labels
- `type: bug`
- `module: USERMGMT`
- `severity: Minor`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-USERMGMT-008`
