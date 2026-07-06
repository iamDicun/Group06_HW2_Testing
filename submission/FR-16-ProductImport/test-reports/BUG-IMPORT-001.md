# BUG-IMPORT-001: API import sản phẩm thiếu tính giao dịch nguyên tử (Atomic Rollback)

## Found by Test Case
TC-IMPORT-004, TC-IMPORT-005

## Requirement Related
FR-16

## Severity / Priority
Critical / P1

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** admin@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản Admin để nhận token.
2. Gửi request `POST /api/admin/import-products` với payload gồm 3 sản phẩm: sản phẩm 1 và 3 hợp lệ, nhưng sản phẩm 2 bị lỗi dữ liệu (ví dụ: thiếu tên sản phẩm `name`).

## Expected Result
- Theo đặc tả: *Nếu có lỗi ở bất kỳ dòng nào, toàn bộ import phải được rollback (giao dịch nguyên tử — all-or-nothing).*
- Do đó, API phải từ chối xử lý, trả về mã lỗi HTTP 400 Bad Request, và **không có bất kỳ sản phẩm nào từ đợt import này được ghi vào CSDL**.

## Actual Result
- API trả về HTTP 200 OK với thông điệp: `Import hoàn tất: 2/3 sản phẩm được thêm`.
- Sản phẩm 1 ("Sản phẩm A") và sản phẩm 3 ("Sản phẩm C") vẫn được thêm thành công vào cơ sở dữ liệu bảng `products`. Chỉ có sản phẩm 2 bị bỏ qua. Hệ thống hoàn toàn thiếu cơ chế Transaction Rollback để bảo đảm tính nguyên tử của tác vụ.

## Evidence
```bash
# Gửi request import chứa 1 dòng lỗi (dòng 2 thiếu name)
curl.exe -X POST http://localhost:3000/api/admin/import-products \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {"name": "Sản phẩm A", "price": 150000, "description": "Mô tả A", "imageUrl": "", "category_id": 1},
      {"name": "", "price": 250000, "description": "Mô tả B", "imageUrl": "", "category_id": 1},
      {"name": "Sản phẩm C", "price": 350000, "description": "Mô tả C", "imageUrl": "", "category_id": 1}
    ]
  }'

# Response trả về (báo thành công một phần thay vì báo lỗi toàn bộ)
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Import hoàn tất: 2/3 sản phẩm được thêm",
  "inserted": 2,
  "errors": [
    "Hàng 3: Thiếu tên sản phẩm"
  ]
}
```

## Labels
- `type: bug`
- `module: PRODUCTIMPORT`
- `severity: Critical`
- `priority: P1`
- `status: new`
- `found-by: test-case TC-IMPORT-004`
