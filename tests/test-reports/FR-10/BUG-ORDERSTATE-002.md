# BUG-ORDERSTATE-002: Cho phép người dùng hủy đơn hàng đang ở trạng thái đang giao (shipping)

## Found by Test Case
TC-ORDERSTATE-023

## Requirement Related
FR-10

## Severity / Priority
Critical / P0

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** user42@eshop.com / admin@eshop.com

## Steps to Reproduce
1. Khởi tạo đơn hàng có ID = 12 với trạng thái `shipping` thuộc sở hữu của User 42.
2. Đăng nhập User 42 lấy token.
3. Gửi request PUT `/api/orders/12/cancel` với header Authorization chứa token của User 42.

## Expected Result
API trả về mã phản hồi HTTP 400 Bad Request và trạng thái đơn hàng trong DB vẫn giữ nguyên là `shipping`.

## Actual Result
API trả về mã phản hồi HTTP 200 OK với body `{"message": "Order canceled successfully"}`.
Trạng thái đơn hàng ID = 12 trong CSDL bị cập nhật sai thành `canceled`.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/orders/12/cancel -H "Authorization: Bearer <user42_token>"

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Order canceled successfully"
}

# DB Query State After Request
sqlite> SELECT status FROM orders WHERE id = 12;
canceled
```

## Labels
- `type: bug`
- `module: ORDERSTATE`
- `severity: Critical`
- `priority: P0`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-023`
