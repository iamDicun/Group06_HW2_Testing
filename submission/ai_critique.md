# AI Critique

---

Trong quá trình thực hiện kiểm thử API, AI hỗ trợ rất nhanh ở khâu sinh test case cơ bản, chia domain partition, phân tích boundary value và dựng ma trận state transition. AI cũng viết sẵn script test cho Postman và cấu hình Newman chạy tự động khá tiện. Tuy nhiên, nếu phụ thuộc hoàn toàn vào AI thì bộ test vẫn còn nhiều thiếu sót quan trọng.

Điểm yếu dễ thấy nhất là AI thường bị rập khuôn theo các pattern quen thuộc. Về mảng security, AI chủ yếu tạo các payload kinh điển như SQL injection dạng `' OR '1'='1` hay XSS `<script>`, mà bỏ quên những case gắn liền với nghiệp vụ thực tế như CSV formula injection khi import sản phẩm (FR-16) hoặc lỗi xử lý ký tự unicode 4-byte UTF-8 emoji ở profile (FR-04). Với state transition, AI chỉ sinh các bước chuyển trạng thái đơn luồng tuần tự, không lường trước được race condition và idempotency khi client gửi nhiều request cancel đồng thời (FR-10), cũng như không kiểm tra tính toàn vẹn transaction rollback khi import batch gặp lỗi giữa chừng.

Nguyên nhân là do AI chỉ dự đoán dựa trên dữ liệu mẫu có sẵn chứ không thực sự phân tích sâu về runtime environment hay cơ chế của database SQLite và ứng dụng bên thứ ba như Excel.

Bài học rút ra là AI chỉ nên đóng vai trò hỗ trợ sinh khung test case ban đầu để tiết kiệm thời gian thao tác. Người kiểm thử bắt buộc phải giữ vai trò audit, rà soát lại toàn bộ kịch bản và tự tay thiết kế thêm các test case chuyên sâu về an ninh, tính toàn vẹn dữ liệu và tương tranh thì mới đảm bảo chất lượng cho hệ thống.
