# BUG-ORDERSTATE-004: Admin không thể hủy đơn của người khác bằng API cancel thông thường của user

## Found by Test Case
TC-ORDERSTATE-025, TC-ORDERSTATE-026, TC-ORDERSTATE-027

## Requirement Related
FR-10

## Severity / Priority
Major / P1

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** user42@eshop.com / admin@eshop.com

## Steps to Reproduce
1. Khởi tạo đơn hàng ID = 14 thuộc sở hữu của User 99 ở trạng thái `pending`.
2. Gửi request PUT `/api/orders/14/cancel` với header Authorization chứa token của Admin.

## Expected Result
API trả về mã phản hồi HTTP 200 OK và cập nhật trạng thái đơn hàng thành `canceled` (Admin override).

## Actual Result
API trả về mã phản hồi HTTP 404 Not Found với body `{"error": "Order not found"}`.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/orders/14/cancel -H "Authorization: Bearer <admin_token>"

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
- `severity: Major`
- `priority: P1`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-025`
