# BUG-USERMGMT-002: Middleware xác thực chấp nhận token định dạng không đúng chuẩn (Token <token> thay vì Bearer)

## Found by Test Case
TC-USERMGMT-007, TC-USERMGMT-014

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
1. Gửi request GET `/api/admin/users` với Header Authorization có giá trị `Token <admin_token>` (thiếu tiền tố Bearer).

## Expected Result
API trả về mã phản hồi HTTP 401 Unauthorized do định dạng token không đúng chuẩn Bearer OAuth2.

## Actual Result
API vẫn chấp nhận request, trả về mã phản hồi HTTP 200 OK và trả về danh sách dữ liệu bình thường.

## Evidence
```bash
# Request
curl.exe -X GET http://localhost:3000/api/admin/users -H "Authorization: Token <admin_token>"

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
...
```

## Labels
- `type: bug`
- `module: USERMGMT`
- `severity: Minor`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-USERMGMT-007`
