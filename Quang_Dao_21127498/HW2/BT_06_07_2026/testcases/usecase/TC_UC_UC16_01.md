# Test Case: TC_UC_UC16_01

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Main flow (Happy Path)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập với quyền `admin`.
  - Hệ thống sẵn sàng nhận file, DB hoạt động bình thường.
  - File `.csv` hợp lệ: header đúng `name,price,description,imageUrl,category_id` và mọi dòng có `name` không rỗng, `price` là số dương.
- **Các bước thực hiện**:
  1. Admin vào giao diện quản trị -> trang Import Sản phẩm.
  2. Chọn file `products_valid.csv` (ví dụ có 5 dòng sản phẩm hợp lệ) và nhấn `Upload`.
  3. Hệ thống parse file, validate từng dòng.
  4. Nếu tất cả dòng hợp lệ, hệ thống thực hiện import trong một giao dịch và commit.
  5. Hệ thống hiển thị thông báo thành công: "Imported 5 products." và cập nhật danh sách sản phẩm.
- **Dữ liệu đầu vào**:
  - File `products_valid.csv` (header chính xác và 5 dòng dữ liệu hợp lệ). Ví dụ dòng:
    name,price,description,imageUrl,category_id
    Sản phẩm A,100000,"Mô tả A",http://img/a.jpg,1
- **Kết quả mong đợi**:
  - Hệ thống trả về trạng thái thành công (HTTP 200 hoặc tương đương), thông báo số dòng đã import.
  - 5 sản phẩm mới xuất hiện trong DB và trên giao diện quản trị.
  - Không có lỗi và không cần rollback.
- **Ghi chú**:
  - Áp dụng EP/BVA khi sinh các biến thể dữ liệu cho `price` và `name`.