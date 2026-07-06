# TC-IMPORT-005: Hủy bỏ (Rollback) toàn bộ khi có dòng dữ liệu có giá bằng hoặc nhỏ hơn 0

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
- Bảng `products` trong CSDL được ghi nhận số lượng sản phẩm trước khi chạy test (ví dụ: N sản phẩm).

## Test Data
Nội dung file `invalid_price.csv` (dòng số 3 có `price = -5000`):
```csv
name,price,description,imageUrl,category_id
Sản phẩm A,150000,Mô tả A,,1
Sản phẩm B,250000,Mô tả B,,1
Sản phẩm C,-5000,Mô tả C,,1
```

## Test Steps
1. Gửi request `POST /api/admin/import-products` qua API với body chứa mảng JSON tương ứng:
   ```json
   {
     "products": [
       {"name": "Sản phẩm A", "price": 150000, "description": "Mô tả A", "imageUrl": "", "category_id": 1},
       {"name": "Sản phẩm B", "price": 250000, "description": "Mô tả B", "imageUrl": "", "category_id": 1},
       {"name": "Sản phẩm C", "price": -5000, "description": "Mô tả C", "imageUrl": "", "category_id": 1}
     ]
   }
   ```
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra cơ sở dữ liệu để xác nhận số lượng sản phẩm hiện tại và sự hiện diện của "Sản phẩm A" và "Sản phẩm B".

## Expected Result
- API trả về mã lỗi HTTP 400 Bad Request.
- Phản hồi trả về báo cáo lỗi chỉ rõ dòng 3 có giá sản phẩm không hợp lệ (giá phải lớn hơn 0).
- **Rollback kiểm chứng**: Toàn bộ đợt import phải bị hủy bỏ.
  * Số lượng sản phẩm trong bảng `products` vẫn phải là N (không đổi).
  * Cả "Sản phẩm A" và "Sản phẩm B" đều **không được phép** xuất hiện trong CSDL.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK thông báo `Import hoàn tất: 3/3 sản phẩm được thêm`. Sản phẩm thứ 3 có giá âm vẫn được lưu vào CSDL mà không bị hệ thống từ chối. Không có rollback.

## Status
FAILED

## Related Bugs
- **BUG-IMPORT-001**: API backend xử lý import không đồng bộ và thiếu giao dịch. "Sản phẩm A" và "Sản phẩm B" vẫn được thêm vào DB.

## Notes
- Kiểm tra tính nguyên tử (atomic - all-or-nothing) của ca sử dụng theo đúng đặc tả yêu cầu với dữ liệu biên (giá âm).
