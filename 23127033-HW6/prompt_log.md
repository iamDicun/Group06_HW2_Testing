# Prompt Log — HW06 API Testing

**Sinh viên:** Bùi Dương Duy Cường — `MSSV: 23127033`  
**Nhóm:** Group 06  

---

## Session 1: Đọc Hiểu Đề Bài & Hoạch Định Cấu Trúc Toàn Diện HW06
- **Ngày thực hiện:** 22/08/2026
- **Công cụ AI:** Gemini 3.7 Flash (Antigravity Agent)
- **Prompt:** *"Oke trước đó là mini exercise, còn giờ là làm full bài từ file pdf, đọc hiểu và hướng dẫn tôi làm như thế nào"*
- **Kết quả thu được:**
  1. Đọc và phân tích toàn bộ 8 trang file `2026.HW06.API Testing_En.pdf`.
  2. Xác định yêu cầu thực hiện trọn vẹn 3 APIs từ 3 Pools khác nhau (`POST /api/login`, `POST /api/apply-coupon`, `PUT /api/admin/orders/:id/status`).
  3. Lên lộ trình 5 bước thực hiện cho từng API (Generate $\ge 35$ TCs, Audit, Extend $\ge 5$ TCs, Execute với Postman/Newman, Bug report).
  4. Chuẩn bị cấu trúc thư mục nộp bài chuẩn và tài liệu mẫu theo thang điểm 100.

---

## Session 2: Tinh Chỉnh Hồ Sơ Báo Cáo & Xây Dựng Prompt Xin Agent Skill
- **Ngày thực hiện:** 22/08/2026
- **Công cụ AI:** Gemini 3.7 Flash (Antigravity Agent)
- **Prompt:** *"Tôi vừa thêm các file mẫu của hw5, bạn xóa các file cũ của mini exercise, kể cả cái workflow gì nhé, rồi chỉnh lại các file mẫu để khớp hw6 và chuẩn bị cấu trúc chuẩn để chuẩn bị làm hw6. Sau đó chuẩn bị cho tôi câu prompt dành cho claude để xin được 1 cái skill từ đó (ưu tiên phải reusable nhé) rồi sau đó tôi đưa bạn làm sau"*
- **Kết quả thu được:**
  1. Dọn dẹp sạch toàn bộ các file tạm của Mini Exercise.
  2. Cập nhật các file báo cáo mẫu chuẩn HW06: `README.md`, `main-report.md`, `ai_audit.md`, `ai_critique.md`.
  3. Thiết lập các thư mục con cho 3 API (`api1-auth-login`, `api2-coupon-apply`, `api3-admin-status`), `agent-skill/`, `bugs/`, `ci-cd/`, `postman/`.
  4. Xây dựng prompt chuẩn chuyên sâu dành cho Claude để tạo Reusable Agent Skill (AI-Driven API Test Generator) đạt chuẩn Bloom-AI G9.5 Create.
