# Test Case: TC_UC_UC16_04

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Exception flow (Header thiếu/không đúng định dạng)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập.
  - File CSV có header không đúng (ví dụ thiếu `price` hoặc đặt tên header khác).
- **Các bước thực hiện**:
  1. Admin mở trang Import Sản phẩm.
  2. Chọn file `products_bad_header.csv` có header sai và nhấn `Upload`.
  3. Hệ thống đọc header và validate cấu trúc trước khi parse dữ liệu.
  4. Hệ thống từ chối import và trả về lỗi cụ thể: "CSV header invalid: missing field 'price'".
- **Dữ liệu đầu vào**:
  - File `products_bad_header.csv` với header ví dụ: `name,description,imageUrl,category_id` (thiếu `price`).
- **Kết quả mong đợi**:
  - Không có thao tác ghi DB.
  - Trả về lỗi header không hợp lệ, nêu rõ trường thiếu/không đúng.
- **Ghi chú**:
  - Test cả trường hợp header thừa trường và header sai thứ tự nếu hệ thống yêu cầu thứ tự cố định.
