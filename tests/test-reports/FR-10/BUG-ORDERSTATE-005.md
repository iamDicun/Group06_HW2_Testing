# BUG-ORDERSTATE-005: API trả về 403 Forbidden thay vì 401 Unauthorized khi Token không hợp lệ

## Found by Test Case
TC-ORDERSTATE-030

## Requirement Related
FR-10

## Severity / Priority
Minor / P2

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** user42@eshop.com / admin@eshop.com

## Steps to Reproduce
1. Gửi request PUT `/api/admin/orders/1/status` với body `{"status": "confirmed"}` và header Authorization chứa Token không hợp lệ `Bearer invalid_token`.

## Expected Result
API trả về mã phản hồi HTTP 401 Unauthorized do token xác thực không hợp lệ.

## Actual Result
API trả về mã phản hồi HTTP 403 Forbidden với body `{"error": "Forbidden"}`.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/admin/orders/1/status -H "Authorization: Bearer invalid_token" -H "Content-Type: application/json" -d '{"status": "confirmed"}'

# Response
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "error": "Forbidden"
}
```

## Labels
- `type: bug`
- `module: ORDERSTATE`
- `severity: Minor`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-030`
