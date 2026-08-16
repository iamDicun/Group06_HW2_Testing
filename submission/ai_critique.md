# AI Critique

Trong bài kiểm thử hiệu năng này, nhóm sử dụng Gemini để hỗ trợ dựng khung kịch bản k6 và xử lý sơ bộ log kết quả. Dù giúp đẩy nhanh tiến độ ban đầu, AI vẫn bộc lộ nhiều sai sót do đưa ra các giả định thiếu thực tế.

Cụ thể, AI cấu hình dùng chung một tài khoản cho toàn bộ Virtual Users, dẫn đến race condition kích hoạt cơ chế khóa tài khoản và làm thất bại 100% request tiếp theo. Bên cạnh đó, mô hình đặt think-time cố định gây hiệu ứng dồn tải nhân tạo, bỏ qua pha đo lường tự phục hồi trong kịch bản Spike, và xuất hiện ảo giác khi đề xuất thiết lập Connection Pooling cho SQLite.

Nguyên nhân chính là mô hình chỉ tổng hợp code mẫu phổ biến thay vì hiểu sâu về ràng buộc trạng thái nghiệp vụ, cũng như đặc thù khóa file đơn luồng của SQLite trên nền runtime Node.js.

Bài học lớn nhất rút ra là AI chỉ đóng vai trò trợ lực tăng tốc, con người bắt buộc phải giữ vai trò thẩm định kỹ thuật. Mọi kịch bản do AI sinh ra cần được rà soát từng dòng mã, tham số tải phải bám sát thực tế, và mọi đề xuất tối ưu đều phải được đối chứng trực tiếp qua số liệu thực nghiệm thay vì phụ thuộc hoàn toàn vào kết quả của mô hình.
