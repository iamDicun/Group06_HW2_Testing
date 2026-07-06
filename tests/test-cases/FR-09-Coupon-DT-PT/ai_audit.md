# AI Audit Report

**Student:** <MSSV> - <Name>

> Nếu KHÔNG dùng AI, ghi: "I do not use any AI help in this exercise."
>
> Nếu CÓ dùng AI, điền bảng bên dưới cho mỗi lần tương tác.

---

| # | AI Tool | Date & Time | Prompt | AI Output (summary/link) |
|---|---------|-------------|--------|--------------------------|
| 1 | Gemini Agent | 2026-06-29 16:00 | Đọc requirement về FR-09 từ README.md, dùng skill req-to-decision-table và tạo file test-design.md | Phân tích điều kiện FR-09, tạo file đặc tả [coupon_spec.json](coupon_spec.json), tự động chạy script tối ưu hóa sinh ra bảng quyết định đầy đủ (64 rules), bảng rút gọn (7 rules), phân tích rủi ro tương tác (Risk Assessment), bảng Pairwise (10 rules), phát hiện 3 bug trong code SUT, và tạo tài liệu thiết kế kiểm thử [test-design.md](test-design.md). |
| 2 | Gemini Agent | 2026-06-29 16:18 | Đọc file test-design.md mới tạo và dùng skill decision-table-to-test-case để tạo danh sách các test case trong folder FR-09-Coupon | Tạo 7 test case chi tiết từ bảng quyết định rút gọn (từ [TC-COUPON-001.md](TC-COUPON-001.md) đến [TC-COUPON-007.md](TC-COUPON-007.md)) đã làm giàu ngữ nghĩa và tích hợp kiểm thử biên (BVA). |
| 3 | Gemini Agent | 2026-06-29 16:20 | Tạo thêm các test case từ bảng pairwise được expand ra | Tạo thêm 10 test case chi tiết từ bảng Pairwise (từ [TC-COUPON-008.md](TC-COUPON-008.md) đến [TC-COUPON-017.md](TC-COUPON-017.md)) để mở rộng kiểm soát các lỗi tương tác điều kiện. |
| 4 | Gemini Agent | 2026-06-29 16:24 | Viết giúp tôi file ai audit session này theo template ở file \FR-09-Coupon\ai_audit.md | Điền và cập nhật file [ai_audit.md](ai_audit.md) ghi nhận đầy đủ nhật ký tương tác AI trong suốt phiên làm việc. |
