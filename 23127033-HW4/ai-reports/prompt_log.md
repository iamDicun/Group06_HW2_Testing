# Prompt Log — HW04 Automation Testing

**Sinh viên:** Bùi Dương Duy Cường — `23127033`

---

## Session 1: Khởi tạo Cấu trúc & Định nghĩa Agent Skill
- **Ngày:** 09/08/2026
- **Công cụ:** Gemini 3.6 Flash / Claude 3.7 Sonnet
- **Prompt:** "Tôi tên Cường nên sẽ làm các feature được phân công... Trước tiên hãy tổ chức lại folder HW4 này theo cấu trúc đủ tốt... Và cho tôi 1 câu prompt để tạo agent skill..."
- **Kết quả:** Đã tạo cấu trúc thư mục chuẩn `23127033-HW4` với các folder `test-cases`, `test-data`, `tests`, `bug-reports`, `ai-reports` và xây dựng Agent Skill tại `.agents/skills/automation-test-generator/SKILL.md`.

---

## Session 2: Sinh Test Cases, Data JSON & Playwright Scripts cho FR-03, FR-09, FR-15
- **Ngày:** 10/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Tôi đã có skill về test automation, bạn hãy dùng skill và dựa vào đặc tả của 3 feature mà chúng ta đã thỏa thuận để sinh test case, data và script playwright vào đúng cấu trúc thư mục đã tổ chức sẵn giúp tôi, đồng thời cập nhật các báo cáo AI liên quan giúp tôi"
- **Kết quả:**
  1. Sinh 3 file test cases Markdown tại `test-cases/` (mỗi feature 12 kịch bản test).
  2. Sinh 3 file dữ liệu mock JSON tại `test-data/` cho `forgot-password`, `coupons`, `product-mgmt`.
  3. Sinh 3 file script Playwright TypeScript tại `tests/` kèm watermark metadata `Run by: 23127033`.
  4. Cấu hình `playwright.config.ts` hỗ trợ 3 trình duyệt (Chromium, Firefox, WebKit).
  5. Cập nhật đầy đủ các báo cáo `README.md`, `ai_audit.md`, `ai_critique.md`.
