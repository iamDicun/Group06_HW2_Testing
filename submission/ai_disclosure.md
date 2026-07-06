# AI Disclosure - HW02 Domain Testing

## Thông Tin Khóa Học & Sinh Viên

| Trường | Giá Trị |
|-------|-------|
| Khóa học | CS423 / CSC15003 - Kiểm Thử Phần Mềm |
| Mã Bài Tập | HW02-AI |
| Tiêu Đề Bài Tập | Domain Testing trên EShop |
| Danh Mục Sử Dụng AI | Cat. 4 - AI-Assisted Production |
| Ngày | 2026-06-29 |
| Tên sinh viên | Bùi Dương Duy Cường |
| Mã sinh viên | 23127033 |

---

## Câu Hỏi Khai Báo

### 1. Công Cụ AI Được Sử Dụng

OpenAI GPT-5.5 thông qua OpenCode.

### 2. Các Giai Đoạn Sử Dụng AI

Đánh dấu tất cả những cái áp dụng:

| Giai Đoạn | Được Sử Dụng? | Ghi Chú |
|-------|-------|-------|
| Brainstorming | Có | Xác định các phân vùng miền và biến BVA. |
| Phác thảo | Có | Cấu trúc báo cáo nộp và các artefact test. |
| Soạn thảo test case | Có | Bản nháp Markdown ban đầu, được xem xét so với đặc tả yêu cầu và chuyển đổi thành các bước UI black-box. |
| Phản hồi / sửa đổi | Có | Tinh chỉnh kết quả dự kiến và khả năng áp dụng BVA. |
| Phân tích dữ liệu | Có | Tổ chức các số đếm được thiết kế/không chạy và bản nháp candidate bug. |
| Xem xét báo cáo bug | Có | Các bản nháp bug được AI cấu trúc, nhưng bằng chứng cuối cùng phải đến từ ảnh chụp màn hình UI. |
| Khác | Có | Tạo ma trận truy vết và tóm tắt test run. |

### 3. Lời Nhắc & Tác Vụ Chính Được Gửi Đến AI

Lời nhắc chính: "Tôi cần confirm lại là thư mục reports để chứa nội dung sau này sẽ gôm hết vào main report đúng không... Và tôi muốn bạn là đọc source code, tạo test case, test case nào có bva thì tạo, không có thì ghi rõ tại sao không, tạo test runs, tự test hết và cập nhật summary và bug reports..."

Ngữ cảnh đầy đủ và tiếp nối được ghi lại trong `prompt_log.md`.

### 4. Những Phần Cụ Thể Mà AI Đóng Góp

AI đã đóng góp các bản nháp ban đầu cho 60 test case UI black-box, 1 test run thủ công, danh sách candidate bug draft, 12 tệp báo cáo tính năng, cập nhật ma trận truy vết và các bản nháp phụ lục AI. Sinh viên phải thực hiện thủ công hành vi UI/mobile còn lại và thêm ảnh chụp màn hình/liên kết GitHub Issue.

### 5. Cách Tôi Xem Xét, Sửa Đổi Hoặc Xác Minh Đầu Ra AI

Đầu ra được kiểm tra so với đặc tả yêu cầu và quy tắc bài tập. Bất kỳ nghi ngờ hướng triển khai nào đều được chuyển đổi thành test case UI black-box và phải được xác minh thủ công trước khi được báo cáo dưới dạng bug.

### 6. Trích Dẫn

OpenAI. (2026). GPT-5.5 thông qua OpenCode [Mô hình ngôn ngữ lớn].

---

## Tuyên Bố Trung Thực

Tôi xác nhận rằng khai báo trên là chính xác và hoàn chỉnh. Tôi hiểu rằng sử dụng AI không được công bố hoặc khai báo sai về sử dụng AI được coi là gian lận học tập và có thể dẫn đến điểm 0 cho bài tập.

| Trường | Giá Trị |
|-------|-------|
| Tên sinh viên | Bùi Dương Duy Cường |
| Mã sinh viên | 23127033 |
| Lớp / Nhóm | TODO |
| Ngày | 2026-06-29 |
| Chữ ký | TODO |
