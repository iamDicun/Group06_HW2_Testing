# AI Critique - Đánh Giá AI (200-300 từ)

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  
**Bài tập:** HW03 - GUI & Usability Testing trên EShop

---

Trong bài tập này, AI tỏ ra rất hiệu quả trong việc thiết kế nhanh khung checklist 60 mục, thiết kế kịch bản usability có cấu trúc và viết các script tự động hóa hỗ trợ (Playwright chụp màn hình và PowerShell đồng bộ issue lên GitHub). 

Tuy nhiên, AI gặp hạn chế lớn ở khả năng tự động đánh giá giao diện thực tế. Do chỉ phân tích mã nguồn tĩnh và text, AI không thể cảm nhận được các lỗi trải nghiệm trực quan (như font chữ khó đọc, nút bấm quá nhỏ trên mobile, hoặc độ tương phản màu sắc kém giữa chữ lỗi và màu nền). Ngoài ra, ban đầu AI đã hiểu sai yêu cầu về Usability Testing khi đề xuất soạn 7 kịch bản khác nhau cho 7 người dùng, thay vì 1 kịch bản End-to-End duy nhất cho cả 7 người cùng thực hiện nhằm đối chiếu điểm số SUS một cách khách quan. Lỗi này xảy ra do AI suy luận máy móc theo cụm từ khóa mà thiếu đi sự phân tích sâu sắc các ràng buộc logic của đề bài.

Nguyên tắc cốt lõi tôi rút ra được sau bài tập này là luôn giữ thế chủ động và xem AI là một trợ lý hỗ trợ tăng tốc công việc chứ không phải là công cụ thay thế hoàn toàn. Các mục checklist hay kịch bản do AI đề xuất bắt buộc phải được con người kiểm tra, chạy thử nghiệm thủ công trên môi trường thực tế để đảm bảo tính xác thực và chất lượng kiểm thử tốt nhất.
