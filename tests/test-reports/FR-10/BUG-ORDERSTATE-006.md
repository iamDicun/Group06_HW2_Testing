# BUG-ORDERSTATE-006: Lỗi phân quyền nghiêm trọng - Cho phép User thường gọi API Admin đổi trạng thái đơn hàng

## Found by Test Case
TC-ORDERSTATE-031

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
1. Đăng nhập tài khoản User thường (role = "user"), lấy token.
2. Gửi request PUT `/api/admin/orders/1/status` với body `{"status": "confirmed"}` chứa token của User thường.

## Expected Result
API trả về mã phản hồi HTTP 403 Forbidden do người dùng không có quyền admin.

## Actual Result
API trả về mã phản hồi HTTP 200 OK với body `{"message": "Order status updated"}`.
Trạng thái đơn hàng trong CSDL được cập nhật thành công.

## Evidence
```bash
# Request
curl.exe -X PUT http://localhost:3000/api/admin/orders/1/status -H "Authorization: Bearer <user42_token>" -H "Content-Type: application/json" -d '{"status": "confirmed"}'

# Response
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Order status updated"
}
```

## Labels
- `type: bug`
- `module: ORDERSTATE`
- `severity: Critical`
- `priority: P0`
- `status: new`
- `found-by: test-case TC-ORDERSTATE-031`
