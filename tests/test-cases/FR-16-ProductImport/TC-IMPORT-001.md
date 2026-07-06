# TC-IMPORT-001: Import sản phẩm thành công với file CSV hợp lệ (Happy Path)

## Requirement ID
FR-16

## Feature
Import Sản phẩm từ CSV

## Module / Test Type / Technique
ProductImport / Functional / Use Case Testing

## Priority
High

## Preconditions
- Người dùng đã đăng nhập tài khoản Admin và có token JWT hợp lệ.
- File CSV chứa danh sách sản phẩm hợp lệ tồn tại trên máy tính.

## Test Data
Nội dung file `valid_products.csv`:
```csv
name,price,description,imageUrl,category_id
Sản phẩm A,150000,Mô tả A,,1
Sản phẩm B,250000,Mô tả B,,1
Sản phẩm C,350000,Mô tả C,,1
```

## Test Steps
1. Đăng nhập tài khoản Admin để lấy token JWT hợp lệ.
2. Tại giao diện Web Admin, chọn file `valid_products.csv` và bấm nút "Import".
3. Hoặc gửi request `POST /api/admin/import-products` qua API với body chứa mảng JSON tương ứng:
   ```json
   {
     "products": [
       {"name": "Sản phẩm A", "price": 150000, "description": "Mô tả A", "imageUrl": "", "category_id": 1},
       {"name": "Sản phẩm B", "price": 250000, "description": "Mô tả B", "imageUrl": "", "category_id": 1},
       {"name": "Sản phẩm C", "price": 350000, "description": "Mô tả C", "imageUrl": "", "category_id": 1}
     ]
   }
   ```
4. Kiểm tra phản hồi HTTP từ server.
5. Kiểm tra cơ sở dữ liệu để xác nhận các sản phẩm đã được thêm vào.

## Expected Result
- Mã phản hồi HTTP trả về là 200 OK.
- Response trả về cấu trúc JSON chứa:
  * `message`: "Import hoàn tất: 3/3 sản phẩm được thêm"
  * `inserted`: 3
  * `errors`: []
- Trong cơ sở dữ liệu (bảng `products`), xuất hiện đúng 3 sản phẩm mới được import với các thông tin tương ứng.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK, chèn thành công 3 sản phẩm vào CSDL với cấu trúc chính xác.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm thử luồng thành công cơ bản (happy path) của Use Case.
