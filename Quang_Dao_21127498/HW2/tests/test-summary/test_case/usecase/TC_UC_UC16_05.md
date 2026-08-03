# Test Case: TC_UC_UC16_05

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Exception flow (Ít nhất một dòng lỗi → rollback)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập.
  - File CSV có header đúng nhưng ít nhất một dòng chứa dữ liệu không hợp lệ (ví dụ `name` rỗng, `price` = 0, `price` âm, hoặc `price` không phải số).
- **Các bước thực hiện**:
  1. Admin vào trang Import Sản phẩm.
  2. Chọn file `products_some_invalid.csv` và nhấn `Upload`.
  3. Hệ thống parse file, validate từng dòng.
  4. Hệ thống phát hiện lỗi ở một hoặc nhiều dòng → abort import và rollback giao dịch.
  5. Hệ thống trả về báo cáo lỗi chi tiết: danh sách dòng lỗi kèm lý do (ví dụ line 3: price không phải số; line 5: name rỗng).
- **Dữ liệu đầu vào**:
  - File `products_some_invalid.csv` ví dụ:
    name,price,description,imageUrl,category_id
    Sản phẩm C,150000,"Mô tả C",http://img/c.jpg,1
    ,50000,"Thiếu tên",http://img/d.jpg,1
    Sản phẩm E,-10000,"Giá âm",http://img/e.jpg,2
- **Kết quả mong đợi**:
  - Không có sản phẩm nào được thêm vào DB (rollback hoàn toàn).
  - Hệ thống trả về lỗi chi tiết với số lượng dòng lỗi và nguyên nhân từng dòng.
- **Ghi chú**:
  - Khi sinh test data chi tiết, áp dụng EP/BVA cho `price` (ví dụ: 0, -1, rất lớn, chuỗi) và `name` (rỗng, whitespace, dài >255 ký tự).
