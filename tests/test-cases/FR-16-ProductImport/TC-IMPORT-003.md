# TC-IMPORT-003: Import thất bại do sai cấu trúc header file CSV

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
Nội dung file `invalid_header.csv` (sai tên các cột bắt buộc):
```csv
product_name,product_price,desc
Sản phẩm A,150000,Mô tả A
```

## Test Steps
1. Tại giao diện Web Admin, chọn file `invalid_header.csv` và bấm nút "Import".
2. Hệ thống phân tích file.
3. Kiểm tra phản hồi của giao diện và kết quả ghi nhận.

## Expected Result
- Hệ thống từ chối import và hiển thị thông báo lỗi cấu trúc: "Cấu trúc cột trong file CSV không hợp lệ. Vui lòng sử dụng đúng template mẫu".
- Không có bất kỳ sản phẩm nào được lưu vào cơ sở dữ liệu.

## Actual Result (filled after execution)
- Giao diện Admin/Backend trả về HTTP 200 OK với thông điệp: "Import hoàn tất: 0/1 sản phẩm được thêm" thay vì từ chối và báo lỗi 400 cấu trúc không hợp lệ.

## Status
FAILED

## Related Bugs
BUG-IMPORT-001

## Notes
- Kiểm tra tính hợp lệ của cấu trúc cột dữ liệu trong file CSV trước khi đẩy lên API (Exception Flow 2).
