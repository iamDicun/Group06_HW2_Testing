# BUG-ORDERSTATE-003: API hủy đơn trả về mã lỗi 404 thay vì 403 khi hủy đơn của người khác

## Found by Test Case
TC-ORDERSTATE-024

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
1. Khởi tạo đơn hàng ID = 13 thuộc sở hữu của User 99 ở trạng thái `pending`.
2. Gửi request PUT `/api/orders/13/cancel` với header Authorization chứa token của User 42.

## Expected Result
API trả về mã phản hồi HTTP 403 Forbidden (hoặc 400 Bad Request) để báo lỗi phân quyền sở hữu đơn hàng.

## Actual Result
API trả về mã phản hồi HTTP 404 Not Found với body `{"error": "Order not found"}`.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/orders/13/cancel -H "Authorization: Bearer <user42_token>"

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
- `priority: P2`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-024`
