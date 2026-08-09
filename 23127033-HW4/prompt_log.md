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
  1. Sinh các file test cases Markdown tại `./test-cases/`.
  2. Sinh các file dữ liệu mock JSON tại `./test-data/`.
  3. Sinh các file script Playwright TypeScript tại `./tests/` kèm watermark metadata `Run by: 23127033`.
  4. Cấu hình `playwright.config.ts` hỗ trợ 3 trình duyệt (Chromium, Firefox, WebKit).

---

## Session 3: Rà Soát (Human Review), Bổ Sung Assertions, Edge Cases & Hoàn Thiện Main Report
- **Ngày:** 10/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Gôm các test case và mô tả cũng như setup cho homework vào file main-report.md và cho tôi biết lý do tại sao mà dùng skill sinh test case, data + script test mà còn thiếu nhiều assertion và edge case như vậy, ghi chúng vào main report giúp tôi luôn nhé. Và cập nhật các báo cáo AI giúp tôi"
- **Kết quả:**
  1. Xây dựng file báo cáo chính toàn diện [`./main-report.md`](./main-report.md) bao gồm tổng hợp 50 test cases, 8 confirmed bugs, cấu hình setup, và phân tích sâu 4 lý do AI sinh thiếu assertions/edge cases.
  2. Đồng bộ các file báo cáo AI: `./ai-reports/ai_audit.md`, `./ai-reports/ai_critique.md`, `./README.md`.

---

## Session 4: Đẩy GitHub Issues & Hoàn Thiện Báo Cáo Chữ / Relative Paths
- **Ngày:** 10/08/2026
- **Công cụ:** Gemini 3.6 Flash (Antigravity Agent)
- **Prompt:** "Thay tất cả đường dẫn thành relative path, báo cáo html thì để link github luôn đi. cập nhật prompt log, và file git_commit_log đổi thành file txt giúp tôi"
- **Kết quả:**
  1. Chuyển toàn bộ liên kết sang Relative Paths trong toàn bộ tài liệu Markdown.
  2. Dẫn link Playwright HTML report công khai trên GitHub Repo.
  3. Đã tạo file text [`./git_commit_log.txt`](./git_commit_log.txt) và [`./git_log.txt`](./git_log.txt) ghi lại lịch sử commit.
