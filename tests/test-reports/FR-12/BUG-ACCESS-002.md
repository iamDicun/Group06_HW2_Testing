# [BUG][ACCESS-CONTROL] Các API thay đổi dữ liệu sản phẩm (POST/PUT/DELETE /api/products/*) hoàn toàn không yêu cầu xác thực

## Found by Test Case
- TC-ACCESS-006: Truy cập API được bảo vệ mà không gửi kèm Token

## Requirement Related
- FR-12: Access Control (Kiểm soát truy cập)

## Severity / Priority
- Severity: Critical
- Priority: P1

## Environment
- **Browser:** Postman / cURL
- **OS:** Windows 11
- **API URL:** http://localhost:3000/api/products

## Steps to Reproduce
1. Không đăng nhập, không tạo token.
2. Gửi yêu cầu DELETE tới API `http://localhost:3000/api/products/1` mà không đính kèm bất kỳ header `Authorization` nào.
3. Hoặc gửi yêu cầu POST tới API `http://localhost:3000/api/products` với payload sản phẩm mới.

## Expected Result
- Trả về mã lỗi HTTP `401 Unauthorized`.
- Dữ liệu sản phẩm không bị xóa hoặc chỉnh sửa trong cơ sở dữ liệu.

## Actual Result
- Yêu cầu được thực thi thành công. Trả về HTTP `200 OK` cùng thông báo: `{"message": "Product deleted"}`.
- Cơ sở dữ liệu sản phẩm bị thay đổi (sản phẩm có ID = 1 biến mất).

## Evidence
```bash
# Thực hiện xóa sản phẩm mà không đính kèm JWT token xác thực
curl.exe -X DELETE http://localhost:3000/api/products/1

# Response nhận được:
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Product deleted"
}
```

## Labels
- `type: bug`
- `module: ACCESS-CONTROL`
- `severity: Critical`
- `priority: P1`
- `status: new`
- `found-by: test-case TC-ACCESS-006`
