# Test Case: TC_UC_UC16_06

- **Use case liên quan**: UC-16
- **Loại kịch bản**: Exception flow (Lỗi hệ thống trong quá trình import)
- **Điều kiện tiên quyết**:
  - Admin đã đăng nhập.
  - Hệ thống có thể mô phỏng/giả lập lỗi DB hoặc timeout trong quá trình import (ví dụ bằng môi trường test/stub).
  - File CSV có header đúng và các dòng hợp lệ (để phân biệt lỗi là do hệ thống, không phải dữ liệu).
- **Các bước thực hiện**:
  1. Thiết lập môi trường test để mô phỏng lỗi DB trong quá trình import (ví dụ ép lỗi khi commit transaction).
  2. Admin chọn file `products_valid_for_system_error.csv` và nhấn `Upload`.
  3. Hệ thống bắt đầu parse và validate, sau đó cố gắng ghi vào DB nhưng gặp lỗi giả lập.
  4. Hệ thống phải rollback mọi thay đổi và trả về lỗi tổng quát (ví dụ HTTP 500) cùng hướng dẫn cho admin.
- **Dữ liệu đầu vào**:
  - File CSV hợp lệ (header và dữ liệu hợp lệ) để đảm bảo lỗi do hệ thống.
- **Kết quả mong đợi**:
  - Không có sản phẩm mới trong DB (rollback hoàn toàn).
  - Hệ thống trả về lỗi server rõ ràng và log chi tiết được ghi để điều tra.
- **Ghi chú**:
  - Kiểm tra log hệ thống/transaction để đảm bảo rollback đã thực hiện.
