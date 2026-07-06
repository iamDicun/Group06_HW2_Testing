# Test Case: TC_UC_UC16_02

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Alternate flow (RFC 4180 — trường chứa dấu phẩy)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập.
  - File `.csv` có header đúng và một hoặc nhiều trường chứa dấu phẩy, được bọc bằng dấu nháy kép theo RFC 4180.
- **Các bước thực hiện**:
  1. Admin mở trang Import Sản phẩm.
  2. Chọn file `products_rfc4180.csv` có các trường dạng: "Mô tả, chi tiết" và nhấn `Upload`.
  3. Hệ thống parse file theo RFC 4180, validate từng dòng.
  4. Nếu parse và validate thành công, hệ thống import toàn bộ trong một giao dịch và commit.
  5. Hệ thống hiển thị thông báo thành công và số dòng đã import.
- **Dữ liệu đầu vào**:
  - File `products_rfc4180.csv` ví dụ:
    name,price,description,imageUrl,category_id
    Sản phẩm B,200000,"Mô tả, có dấu phẩy",http://img/b.jpg,2
- **Kết quả mong đợi**:
  - Hệ thống parse đúng trường chứa dấu phẩy và import thành công.
  - Thông báo thành công với số dòng tương ứng.
- **Ghi chú**:
  - Nếu hệ thống không hỗ trợ RFC 4180, đây sẽ là lỗi parse (thuộc scenario header/parse).
