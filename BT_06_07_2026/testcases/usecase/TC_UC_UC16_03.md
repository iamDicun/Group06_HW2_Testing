# Test Case: TC_UC_UC16_03

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Exception flow (File không phải `.csv`)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập.
  - Chuẩn bị file `products.xlsx` (hoặc `products.txt`) không phải định dạng CSV.
- **Các bước thực hiện**:
  1. Admin vào trang Import Sản phẩm.
  2. Chọn file `products.xlsx` và nhấn `Upload`.
  3. Hệ thống kiểm tra định dạng/Content-Type file trước khi parse.
  4. Hệ thống từ chối upload và trả về lỗi: "Invalid file type: only .csv allowed." (HTTP 400/415).
- **Dữ liệu đầu vào**:
  - File `products.xlsx` (hoặc `products.txt`).
- **Kết quả mong đợi**:
  - Hệ thống không parse file, không xảy ra action trên DB.
  - Trả về lỗi rõ ràng về kiểu file không hợp lệ.
- **Ghi chú**:
  - Kiểm tra cả phần mở rộng file và Content-Type header nếu có.
