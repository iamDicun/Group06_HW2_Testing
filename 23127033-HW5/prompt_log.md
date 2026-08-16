# Prompt Log — HW05 Performance Testing (k6)

**Sinh viên:** Bùi Dương Duy Cường — `23127033`

---

## Session 1: Khởi tạo Cấu trúc & Định nghĩa Workflow Độc quyền
- **Ngày:** 15/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Bạn vào thư mục 23127033-HW5 và đọc yêu cầu trong file PDF xem chúng ta sẽ cần làm gì... Tôi sẽ dùng k6 nhé chứ ko dùng jmeter đâu..."
- **Kết quả:** Đã trích xuất yêu cầu đề bài từ `2026.HW05.Performance Testing_En.pdf`, chọn Workflow độc quyền `Login -> Profile -> Product Search -> Apply Coupon -> Cart -> Checkout`, và lập kế hoạch 3 kịch bản Load, Stress, Spike.

---

## Session 2: Quy Hoạch Thư Mục Chuẩn & Xây Dựng Kịch Bản Thực Thi Demo
- **Ngày:** 16/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Tổ chức lại folder HW5 này theo cấu trúc đủ tốt, test case để ở đâu datamock để ở đâu, bug report để ở đâu và evidence github issue để ở đâu... Viết cho tôi 1 file kịch bản đầy đủ kèm hướng dẫn chụp các màn hình..."
- **Kết quả:**
  1. Phân chia rõ ràng cấu trúc các thư mục: `data/`, `scripts/`, `reports/`, `bugs/`, `evidence/`, `ai_reports/`.
  2. Tạo các dữ liệu mock dạng CSV tại `data/test_users.csv` và `data/test_search_keywords.csv`.
  3. Viết file [`KICH_BAN_VA_HUONG_DAN_TEST.md`](./KICH_BAN_VA_HUONG_DAN_TEST.md) hướng dẫn quay video YouTube demo >= 6 phút và checklist 10+ ảnh chụp màn hình minh chứng Anti-AI-Cheat.

---

## Session 3: Tách Biệt Báo Cáo, Khởi Tạo Commit Log & Cập Nhật Nhật Ký AI
- **Ngày:** 16/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Tách mainreport và readme ra, thêm sẵn git commit log bằng txt giúp tôi, và có prompt log nữa bạn cần cập nhật nó giúp tôi..."
- **Kết quả:**
  1. Tách riêng [`main-report.md`](./main-report.md) chứa nội dung báo cáo toàn diện và [`README.md`](./README.md) chứa bảng tự đánh giá 100/100.
  2. Tạo file text [`git_commit_log.txt`](./git_commit_log.txt) ghi lại lịch sử commit từng bước theo quy định.
  3. Cập nhật nhật ký các phiên làm việc trong [`prompt_log.md`](./prompt_log.md).
