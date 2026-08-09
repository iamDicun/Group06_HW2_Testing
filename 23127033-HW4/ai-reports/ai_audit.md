# AI Audit Report - HW04 Automation Testing

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  
**Bài tập:** HW04 - Automation Testing trên EShop  
**Danh Mục Sử Dụng AI:** Cat. 4 - AI-Assisted Production  
**Công Cụ AI:** Claude 3.7 Sonnet / Gemini 3.6 Flash (Antigravity Agent)

---

## 1. Bảng Kiểm Toán Sản Phẩm AI (AI Artifact Audit)

| Tên Sản Phẩm | Phân Loại (V/I/IC) | Prompt & Thời Gian | Mô Tả Đầu Ra Của AI | Phát Hiện Thiếu Sót / Lỗi Của AI | Hành Động Khắc Phục Của Sinh Viên |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Agent Skill `automation-test-generator`** | **V** | Prompt tạo Agent Skill (`.agents/skills/automation-test-generator/SKILL.md`) | Bộ phương pháp chuẩn hóa sinh test case, JSON data-driven và Playwright TS scripts. | Ban đầu chưa có quy tắc bắt buộc chèn metadata watermark `Run by: 23127033` vào test runner info. | Cập nhật quy tắc bắt buộc chèn metadata watermark và cấu hình multi-browser 3 trình duyệt. |
| **Test Cases & Data JSON (`FR-03`)** | **IC** | "Sinh 16 kịch bản test và data JSON cho tính năng Quên mật khẩu FR-03..." | 16 test cases kèm file `forgot-password.data.json`. | AI bỏ sót kịch bản kiểm tra ô Confirm Password (`BUG-FR03-003`) và BVA độ dài mật khẩu 7, 8, 9 ký tự (`BUG-FR03-005`). | Bổ sung `TC_FP_09`, `TC_FP_13`, `TC_FP_14`, `TC_FP_15`, `TC_FP_16` để kiểm soát các lỗi này. |
| **Playwright Script (`FR-03`)** | **IC** | "Viết script Playwright test cho FR-03 từ forgot-password.data.json..." | File `forgot-password.spec.ts`. | Dùng CSS selector tĩnh (`#submit-btn`), thiếu xử lý lắng nghe hộp thoại `dialog alert`. | Chuyển sang `getByRole`, thêm listener `page.once('dialog')` để bắt thông báo lỗi & confirm dialog. |
| **Test Cases & Data JSON (`FR-09`)** | **IC** | "Sinh 16 test cases và JSON mock data cho mã giảm giá FR-09..." | 16 test cases kèm file `coupons.data.json`. | AI bỏ sót kịch bản khách chưa đăng nhập vẫn áp được coupon (`BUG-FR09-003`) và công thức `%` bị sai (`BUG-FR09-002`). | Bổ sung `TC_CP_13..16` để thẩm định số tiền tiết kiệm 10% và phân quyền tài khoản guest. |
| **Playwright Script (`FR-09`)** | **IC** | "Viết Playwright script cho FR-09 từ coupons.data.json..." | File `coupons.spec.ts`. | Thiếu assertion kiểm tra trạng thái disabled của nút bấm khi ô mã coupon bị trống. | Thêm assertion `expect(applyButton).toBeDisabled()` đối với kịch bản mã trống và reset state khi chỉnh sửa tổng tiền. |
| **Test Cases & Data JSON (`FR-15`)** | **IC** | "Sinh 18 test cases cho Admin Product CRUD FR-15..." | 18 test cases kèm file `product-mgmt.data.json`. | AI quên kịch bản BVA giá 0 ₫ (`BUG-FR15-002`), thiếu Confirm Dialog khi xóa (`BUG-FR15-004`), và sửa riêng từng trường (`BUG-FR15-003`). | Bổ sung `TC_PM_13..18` kiểm soát toàn bộ các kịch bản biên và bug của SUT. |
| **Playwright Script (`FR-15`)** | **IC** | "Viết Playwright script cho FR-15..." | File `product-mgmt.spec.ts`. | Script bị gãy do thiếu bước tự động đăng nhập Admin trước khi vào tab "Sản phẩm". | Thêm logic tự động login tài khoản Admin trong `beforeEach` hook. |

*Ghi chú phân loại:*  
- **Valid (V)**: Đạt chuẩn, có thể đưa vào sử dụng ngay.  
- **Incomplete (IC)**: Thiếu sót kịch bản biên, selector chưa tối ưu, cần con người rà soát & điều chỉnh.  
- **Invalid (I)**: Sai kịch bản nghiệp vụ hoặc sai phương pháp luận.

---

## 2. Quy Trình Làm Việc Nhóm Giữa Người và AI (Pair AI + Human Workflow - G9.3 & G9.4)

### Phân Công Nhiệm Vụ (Who Did What)

| Nhiệm Vụ | Thực Hiện Bởi | Mô Tả Chi Tiết |
| :--- | :---: | :--- |
| **Xây dựng Agent Skill** | **Người + AI** | Định nghĩa phương pháp luận kiểm thử tự động, chuẩn hóa cấu trúc xuất ra file `.agents/skills/`. |
| **Sinh Test Cases & Mock Data JSON** | **AI** | Sinh 50 test cases và dữ liệu JSON tương ứng cho `FR-03`, `FR-09`, `FR-15`. |
| **Sinh Kịch Bản Playwright TypeScript** | **AI** | Tạo mã kịch bản `.spec.ts` sử dụng Playwright Test Runner. |
| **Human Review & Refinement (G9.3 & G9.4)** | **Người** | Tối ưu hóa locator sang `getByRole`/`getByPlaceholder`, gia cố assertions, xử lý hộp thoại alert và thêm watermark `Run by: 23127033`. |
| **Cấu hình Đa Trình Duyệt (Multi-browser)** | **Người** | Cấu hình `playwright.config.ts` hỗ trợ chạy trên Chromium, Firefox, WebKit. |
| **Tạo Báo Cáo & Log Bug** | **Người** | Lập báo cáo chính `main-report.md`, `README.md`, nhật ký `ai_audit.md`, `ai_critique.md` và log 8 confirmed bugs. |
