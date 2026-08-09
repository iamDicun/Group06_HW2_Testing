# AI Audit Report

**Student:** 23127391 - Nguyễn Khoa



| # | AI Tool | Date & Time (UTC+7) | Prompt | AI Output (summary/link) | Verdict | Student Fix |
|---|---------|---------------------|--------|--------------------------|---------|-------------|
| 1 | Gemini | 2026-08-08 16:35 | Đọc skill và thực hiện viết script playwright cho việc automation testing data driven cho 3 tính năng FR-4, FR10, FR-19; mỗi feature là 1 file script, phải ít nhất 12 cases đủ loại cho mỗi feature, sau khi chạy phải xuất report (có thể bằng html report của framework)... | Thiết kế và sinh mã nguồn kiểm thử tự động Data-Driven cho FR-04, FR-10, FR-19 (39 test cases), 3 data JSON, các lớp Page Object, cấu hình chạy trên 3 trình duyệt (Chromium, Firefox, WebKit) và báo cáo HTML hiển thị "Run by: 23127391". | INCOMPLETE | Scripts đã tạo bị lỗi về strict mode trên firefox |
| 2 | Gemini | 2026-08-09 13:41 | chạy đống automation test đi | Thực thi toàn bộ 117 test cases cross-browser, sửa lỗi timing/dialog trong ProfilePage.ts và AdminOrdersPage.ts, đạt 117/117 passed (100%) trên Chromium, Firefox, WebKit. | VALID | |
| 3 | Gemini | 2026-08-09 16:18 | Sau khi kiểm tra và đọc run log tôi thấy các lỗi liên quan đến strict mode trong các scripts, và kiểm tra thêm fragile selectors weak or missing assertions, missing edge cases, flaky waits và báo cáo lại... ghi ngắn gọn vào báo cáo và thực hiện fix | Kiểm toán chi tiết 5 nhóm lỗi (Strict Mode, Fragile Selectors, Weak Assertions, Flaky Waits, Missing Edge Cases), cập nhật mục 6 vào submission/report.md và refactor toàn bộ Page Objects + Test Specs. | VALID | |
| 4 | Gemini | 2026-08-09 16:41 | refactor lại cái report, report là cho cả task 1 và 2, nên hãy để place holder cho task 2 | Tái cấu trúc lại submission/report.md thành cấu trúc báo cáo tổng thể gồm Phần I (Task 1), Phần II (Placeholder Task 2 chi tiết), và Phần III (Tổng kết & Phụ lục minh chứng). | VALID | |


