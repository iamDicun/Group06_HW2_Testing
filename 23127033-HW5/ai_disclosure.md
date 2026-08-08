# AI Disclosure - HW03 GUI & Usability

## Thông Tin Khóa Học & Sinh Viên

| Trường | Giá Trị |
|-------|-------|
| Khóa học | CS423 / CSC15003 - Kiểm Thử Phần Mềm |
| Mã Bài Tập | HW03-AI |
| Tiêu Đề Bài Tập | GUI & Usability Testing trên EShop |
| Danh Mục Sử Dụng AI | Cat. 4 - AI-Assisted Production |
| Ngày | 2026-08-01 |
| Tên sinh viên | Bùi Dương Duy Cường |
| Mã sinh viên | 23127033 |

---

## Câu Hỏi Khai Báo

### 1. Công Cụ AI Được Sử Dụng

Gemini 3.5 Flash (Antigravity) tích hợp trong môi trường phát triển.

### 2. Các Giai Đoạn Sử Dụng AI

| Giai Đoạn | Được Sử Dụng? | Ghi Chú |
|-------|-------|-------|
| Brainstorming | Có | Phân tích các khía cạnh giao diện (IA-01 đến IA-04) của EShop. |
| Phác thảo | Có | Thiết kế cấu trúc kịch bản Usability và Checklist 60 mục. |
| Soạn thảo checklist | Có | Tạo danh sách 60 mục kiểm thử GUI & Usability dạng CSV. |
| Phát triển kịch bản test | Có | Thiết kế kịch bản Usability tích hợp luồng E2E và bảng câu hỏi SUS. |
| Tự động hóa | Có | Viết script chụp ảnh màn hình bằng Playwright và script đẩy issue lên GitHub bằng GitHub CLI. |
| Phân tích dữ liệu | Có | Chuẩn bị biểu mẫu thống kê kết quả usability. |

### 3. Lời Nhắc & Tác Vụ Chính Được Gửi Đến AI

Lời nhắc chính: "soạn giúp tôi check list excel tầm 60 mục, dựa vào folder application để hiểu eshop sut hoạt động thế nào, rồi viết bug-report... soạn giúp tôi kịch bản Usability cho 7 người dùng..."

### 4. Những Phần Cụ Thể Mà AI Đóng Góp

AI đã đóng góp:
- Danh sách 60 mục kiểm thử cho 4 khía cạnh giao diện (IA-01 đến IA-04).
- Kịch bản Usability Testing tích hợp (Đăng ký -> Đăng nhập -> Tìm kiếm -> Giỏ hàng -> Áp mã -> Thanh toán) cùng với bảng khảo sát SUS và câu hỏi phỏng vấn.
- Script Node.js (`capture_screenshots.js`) tự động chụp ảnh màn hình trên Chrome, Firefox và Safari giả lập.
- Script PowerShell (`sync_github_issues.ps1`) tự động đồng bộ lỗi từ Markdown lên GitHub Issues.

### 5. Cách Tôi Xem Xét, Sửa Đổi Hoặc Xác Minh Đầu Ra AI

- Kiểm tra tính thực tế của 60 mục kiểm thử so với mã nguồn và giao diện thực tế của EShop.
- Tiến hành chạy thử nghiệm script chụp ảnh màn hình để kiểm tra tính năng.
- Chạy thủ công checklist trên 3 trình duyệt để tìm lỗi và chụp ảnh màn hình thật.
- Điều phối 7 người dùng thực tế kiểm thử khả dụng và thu thập kết quả chấm điểm.

### 6. Trích Dẫn

Google DeepMind. (2026). Gemini 3.5 Flash thông qua Antigravity [Mô hình ngôn ngữ lớn].

---

## Tuyên Bố Trung Thực

Tôi xác nhận rằng khai báo trên là chính xác và hoàn chỉnh. Tôi hiểu rằng sử dụng AI không được công bố hoặc khai báo sai về sử dụng AI được coi là gian lận học tập và có thể dẫn đến điểm 0 cho bài tập.

| Trường | Giá Trị |
|-------|-------|
| Tên sinh viên | Bùi Dương Duy Cường |
| Mã sinh viên | 23127033 |
| Lớp / Nhóm | Nhóm 06 |
| Ngày | 2026-08-01 |
| Chữ ký | Bùi Dương Duy Cường |
