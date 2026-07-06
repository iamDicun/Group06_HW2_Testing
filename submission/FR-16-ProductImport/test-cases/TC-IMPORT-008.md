# TC-IMPORT-008: Chặn import khi tải lên file CSV trống

## Requirement ID
FR-16

## Feature
Import Sản phẩm từ CSV

## Module / Test Type / Technique
ProductImport / Functional / Use Case Testing

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập tài khoản Admin và có token JWT hợp lệ.

## Test Data
Nội dung file `empty_products.csv` (chỉ có dòng tiêu đề header, không có bất kỳ dòng sản phẩm nào):
```csv
name,price,description,imageUrl,category_id
```

## Test Steps
1. Gửi request `POST /api/admin/import-products` qua API với token của Admin và body chứa mảng `products` rỗng:
   ```json
   {
     "products": []
   }
   ```
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra cơ sở dữ liệu để xác nhận không có sản phẩm nào thay đổi.

## Expected Result
- API trả về mã lỗi HTTP 400 Bad Request.
- Response chứa thông báo lỗi: "Không có dữ liệu để import" hoặc tương đương.
- Cơ sở dữ liệu bảng `products` giữ nguyên.

## Actual Result (filled after execution)
- API trả về HTTP 400 Bad Request cùng thông báo lỗi: "Không có dữ liệu để import" đúng như mong đợi.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra tính hợp lệ của biên tập dữ liệu (dữ liệu rỗng).
