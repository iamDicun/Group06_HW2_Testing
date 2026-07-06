# BUG-IMPORT-002: API cho phép import sản phẩm có giá âm hoặc bằng 0

## Found by Test Case
TC-IMPORT-005

## Requirement Related
FR-16

## Severity / Priority
Major / P2

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** admin@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản Admin.
2. Gửi request `POST /api/admin/import-products` với payload chứa sản phẩm có giá trị âm hoặc bằng 0: `{"name": "Sản phẩm lỗi giá", "price": -5000, "category_id": 1}`.

## Expected Result
- API phải validate dữ liệu và từ chối import các sản phẩm có giá trị $\le$ 0.
- Trả về mã phản hồi HTTP 400 Bad Request kèm thông báo lỗi thích hợp.

## Actual Result
- API trả về HTTP 200 OK thông báo thành công và lưu trực tiếp sản phẩm có giá trị âm (`price = -5000`) vào cơ sở dữ liệu bảng `products`. Backend hoàn toàn bỏ qua việc xác thực miền giá trị hợp lệ của giá bán.

## Evidence
```bash
# Gửi request import sản phẩm có giá âm
curl.exe -X POST http://localhost:3000/api/admin/import-products \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {"name": "Sản phẩm lỗi giá", "price": -5000, "description": "Lỗi giá âm", "imageUrl": "", "category_id": 1}
    ]
  }'

# Response trả về thành công
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Import hoàn tất: 1/1 sản phẩm được thêm",
  "inserted": 1,
  "errors": []
}
```

## Labels
- `type: bug`
- `module: PRODUCTIMPORT`
- `severity: Major`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-IMPORT-005`
