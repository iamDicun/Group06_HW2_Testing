# TC-IMPORT-004: Hủy bỏ (Rollback) toàn bộ khi có dòng dữ liệu thiếu tên sản phẩm

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
Nội dung file `missing_name.csv` (dòng số 2 thiếu cột `name`):
```csv
name,price,description,imageUrl,category_id
Sản phẩm A,150000,Mô tả A,,1
,250000,Mô tả B,,1
Sản phẩm C,350000,Mô tả C,,1
```

## Test Steps
1. Gửi request `POST /api/admin/import-products` qua API với body chứa mảng JSON tương ứng:
   ```json
   {
     "products": [
       {"name": "Sản phẩm A", "price": 150000, "description": "Mô tả A", "imageUrl": "", "category_id": 1},
       {"name": "", "price": 250000, "description": "Mô tả B", "imageUrl": "", "category_id": 1},
       {"name": "Sản phẩm C", "price": 350000, "description": "Mô tả C", "imageUrl": "", "category_id": 1}
     ]
   }
   ```
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra cơ sở dữ liệu để xác nhận số lượng sản phẩm hiện tại và sự hiện diện của "Sản phẩm A" và "Sản phẩm C".

## Expected Result
- API trả về mã lỗi HTTP 400 Bad Request.
- Phản hồi trả về báo cáo lỗi chi tiết chỉ rõ dòng 2 bị thiếu tên sản phẩm.
- **Rollback kiểm chứng**: Vì đây là giao dịch nguyên tử (atomic), toàn bộ đợt import phải bị hủy bỏ.
  * Số lượng sản phẩm trong bảng `products` vẫn phải là N (không đổi).
  * Cả "Sản phẩm A" và "Sản phẩm C" đều **không được phép** xuất hiện trong CSDL.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK thông báo `Import hoàn tất: 2/3 sản phẩm được thêm`. Dòng 1 và 3 vẫn được lưu thành công vào CSDL. Thiếu cơ chế rollback giao dịch nguyên tử.

## Status
FAILED

## Related Bugs
- **BUG-IMPORT-001**: API backend xử lý import không đồng bộ và thiếu giao dịch (Transaction Rollback). "Sản phẩm A" vẫn bị lưu vào CSDL mặc dù dòng số 2 bị lỗi.

## Notes
- Kiểm tra tính nguyên tử (atomic - all-or-nothing) của ca sử dụng theo đúng đặc tả yêu cầu.
