# BUG-ORDERSTATE-001: API trả về 404 Not Found thay vì 400 Bad Request cho ID đơn hàng không hợp lệ

## Found by Test Case
TC-ORDERSTATE-003, TC-ORDERSTATE-004, TC-ORDERSTATE-005

## Requirement Related
FR-10

## Severity / Priority
Minor / P3

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** user42@eshop.com / admin@eshop.com

## Steps to Reproduce
1. Gửi request PUT `/api/admin/orders/0/status` với body `{"status": "confirmed"}` và header Authorization chứa token Admin.
2. Hoặc gửi request với ID âm `/api/admin/orders/-1/status`.
3. Hoặc gửi request với ID sai kiểu dữ liệu `/api/admin/orders/abc/status`.

## Expected Result
API trả về mã phản hồi HTTP 400 Bad Request (do ID đơn hàng không hợp lệ).

## Actual Result
API trả về mã phản hồi HTTP 404 Not Found với body `{"error": "Order not found"}`.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/admin/orders/0/status -H "Authorization: Bearer <admin_token>" -H "Content-Type: application/json" -d '{"status": "confirmed"}'

# Response
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "error": "Order not found"
}
```

## Labels
- `type: bug`
- `module: ORDERSTATE`
- `severity: Minor`
- `priority: P3`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-003`
