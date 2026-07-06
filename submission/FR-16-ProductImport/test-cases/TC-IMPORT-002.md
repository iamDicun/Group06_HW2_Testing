# TC-IMPORT-002: Import thất bại do định dạng file không phải CSV

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
- File `products.xlsx` hoặc `products.txt` tồn tại trên máy tính.

## Test Data
File `products.xlsx` (định dạng tệp Excel, không phải CSV).

## Test Steps
1. Tại giao diện Web Admin, bấm chọn file.
2. Chọn file `products.xlsx` từ máy tính.
3. Kiểm tra phản hồi của giao diện (hoặc kiểm tra xem nút Import có bị vô hiệu hóa hay không).
4. Cố gắng gửi file thông qua API (nếu Backend có thực hiện kiểm tra content-type hoặc định dạng).

## Expected Result
- Giao diện Admin hiển thị cảnh báo lỗi định dạng ngay lập tức: "Chỉ chấp nhận file định dạng .csv".
- Không cho phép gửi request lên máy chủ hoặc máy chủ trả về mã lỗi thích hợp.
- Cơ sở dữ liệu bảng `products` không có thay đổi.

## Actual Result (filled after execution)
- Giao diện Admin hiển thị cảnh báo lỗi định dạng ngay tại client và chặn không cho phép tải lên file xlsx.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra khâu lọc và xác thực định dạng tệp đầu vào ở phía Client (Exception Flow 1).
