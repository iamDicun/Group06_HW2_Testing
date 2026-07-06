# TC-IMPORT-007: Phân tích thành công mô tả chứa dấu phẩy bọc trong nháy kép

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
Nội dung file `quotes_description.csv` (Trường `description` có chứa dấu phẩy được bọc trong dấu nháy kép):
```csv
name,price,description,imageUrl,category_id
Sản phẩm A,150000,"Màu đỏ, size L",,1
```

## Test Steps
1. Giao diện Web Admin hoặc bộ parser client thực hiện đọc file `quotes_description.csv`.
2. Kiểm tra xem bộ parser phân tích đúng cột mô tả là `"Màu đỏ, size L"`, không bị phân tách nhầm thành hai cột riêng biệt.
3. Gửi dữ liệu đã được parse lên API `POST /api/admin/import-products`.
4. Kiểm tra dữ liệu được lưu trong CSDL bảng `products`.

## Expected Result
- Bộ parser của Client phân tích đúng cấu trúc 5 cột.
- API trả về HTTP 200 OK.
- Trong CSDL, mô tả của sản phẩm mới được ghi nhận chính xác là: `Màu đỏ, size L`.

## Actual Result (filled after execution)
- Bộ parser của Client phân tích đúng chuỗi bọc trong nháy kép và lưu chính xác thông tin vào DB.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra tính tuân thủ tiêu chuẩn RFC 4180 đối với tệp CSV có chứa ký tự phân tách đặc biệt.
