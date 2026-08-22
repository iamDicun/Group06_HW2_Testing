# AI Prompt Log

**Exercise:** HW06 — API Testing  
**Repository:** `https://github.com/iamDicun/Group06_HW2_Testing`  

---

## Prompt Interaction Records

### Interaction #1

- **Date & Time:** 2026-08-22 13:30 (GMT+7)
- **AI Tool / Model:** Google Antigravity (Gemini 3.7 Flash)
- **User Prompt:**
  ```text
  Thực hiện skill api test trên các tính năng fr4, fr10, fr16; tạo plan trước, sau đó từ plan implement các script
  ```
- **AI Output Details:**
  1. **Implementation Plan**: Tạo kế hoạch kiểm thử API chi tiết `implementation_plan.md` phân rã theo 3 tính năng FR-04, FR-10, FR-16.
  2. **Technical Analysis Documents (3 files)**:
     - [`tests/test-cases/FR-04-Profile/PROFILE-API-test-analysis.md`](../tests/test-cases/FR-04-Profile/PROFILE-API-test-analysis.md) (51 test conditions: 27 DP, 4 ST, 14 SEC, 6 SCH)
     - [`tests/test-cases/FR-10-OrderState/ORDER-API-test-analysis.md`](../tests/test-cases/FR-10-OrderState/ORDER-API-test-analysis.md) (53 test conditions: 20 DP, 16 ST, 11 SEC, 6 SCH)
     - [`tests/test-cases/FR-16-ProductImport/IMPORT-API-test-analysis.md`](../tests/test-cases/FR-16-ProductImport/IMPORT-API-test-analysis.md) (49 test conditions: 27 DP, 5 ST, 12 SEC, 5 SCH)
  3. **Individual Test Case Files (153 .md files)**:
     - 51 files trong `tests/test-cases/FR-04-Profile/` (`TC-PROFILE-DP-001` → `027`, `TC-PROFILE-ST-001` → `004`, `TC-PROFILE-SEC-001` → `014`, `TC-PROFILE-SCH-001` → `006`)
     - 53 files trong `tests/test-cases/FR-10-OrderState/` (`TC-ORDER-DP-001` → `020`, `TC-ORDER-ST-001` → `016`, `TC-ORDER-SEC-001` → `011`, `TC-ORDER-SCH-001` → `006`)
     - 49 files trong `tests/test-cases/FR-16-ProductImport/` (`TC-IMPORT-DP-001` → `027`, `TC-IMPORT-ST-001` → `005`, `TC-IMPORT-SEC-001` → `012`, `TC-IMPORT-SCH-001` → `005`)
  4. **Postman Collection & Environment**:
     - [`tests/test-runs/EShop_API_Testing.postman_collection.json`](../tests/test-runs/EShop_API_Testing.postman_collection.json) (155 requests, Pre-request script cấp collection tự động inject `X-Student-Id`, assertions kiểm tra status code, schema, security)
     - [`tests/test-runs/eshop-api.postman_environment.json`](../tests/test-runs/eshop-api.postman_environment.json)
  5. **Automated Runner Scripts & HTML Report**:
     - PowerShell runner: [`tests/test-runs/run-newman-tests.ps1`](../tests/test-runs/run-newman-tests.ps1)
     - Bash runner: [`tests/test-runs/run-newman-tests.sh`](../tests/test-runs/run-newman-tests.sh)
     - HTML Extra Report: [`submission/reports/EShop_API_Test_Report.html`](./reports/EShop_API_Test_Report.html)

---

### Interaction #2

- **Date & Time:** 2026-08-22 14:58 (GMT+7)
- **AI Tool / Model:** Google Antigravity (Gemini 3.7 Flash)
- **User Prompt:**
  ```text
  dựa vào các bug trong sumary/report, tạo github issue kèm bằng chứng (nhớ dùng đúng template) và báo cáo lại trong file submission/readme.md
  ```
- **AI Output Details:**
  1. Trích xuất và phân tích chi tiết 7 lỗi thực tế trong mã nguồn Backend EShop:
     - `BUG-01`: Privilege Escalation qua Mass Assignment (`PUT /api/users/me` — `server.js:124-127`)
     - `BUG-02`: Sensitive Data Exposure lộ mật khẩu và reset token (`GET /api/users/me` — `server.js:113-115`)
     - `BUG-03`: Vi phạm Final State cho phép đổi từ canceled sang delivered (`PUT /api/admin/orders/:id/status` — `server.js:550-551`)
     - `BUG-04`: Lỗi logic hủy đơn khi đang shipping (`PUT /api/orders/:id/cancel` — `server.js:329-331`)
     - `BUG-05`: Broken Access Control trên các route `/api/admin/*` (`server.js:100-110`)
     - `BUG-06`: Vi phạm All-or-Nothing Rollback khi import CSV (`POST /api/admin/import-products` — `server.js:213-233`)
     - `BUG-07`: Thiếu validation giá tiền âm và 0 ₫ (`POST /api/admin/import-products` — `server.js:214-220`)
  2. Tạo 7 file GitHub Bug Report Issues theo chuẩn template `.github/ISSUE_TEMPLATE/bug-report.yml` trong [`submission/issues/`](./issues/) và [`.github/issues/`](../.github/issues/).
  3. Cập nhật bảng tổng hợp lỗi và các liên kết tương ứng vào [`submission/README.md`](./README.md) và [`submission/report.md`](./report.md).

---

### Interaction #3

- **Date & Time:** 2026-08-22 15:06 (GMT+7)
- **AI Tool / Model:** Google Antigravity (Gemini 3.7 Flash)
- **User Prompt:**
  ```text
  ý là đẩy lên trang issue của repo, dùng github cli
  ```
- **AI Output Details:**
  1. Kiểm tra vị trí thực thi của GitHub CLI trên hệ thống (`C:\Program Files\GitHub CLI\gh.exe`).
  2. Kiểm tra trạng thái xác thực (`gh auth status`), phát hiện CLI chưa đăng nhập.
  3. Tạo script tự động hóa PowerShell [`push_issues_to_github.ps1`](../push_issues_to_github.ps1) và Node.js [`push_issues_to_github.js`](../push_issues_to_github.js) để tự động hóa việc đẩy 7 Bug Issues lên GitHub repo `iamDicun/Group06_HW2_Testing`.
  4. Cung cấp hướng dẫn đăng nhập GitHub CLI chi tiết qua `gh auth login`.

---

### Interaction #4

- **Date & Time:** 2026-08-22 15:10 (GMT+7)
- **AI Tool / Model:** Google Antigravity (Gemini 3.7 Flash)
- **User Prompt:**
  ```text
  ko đề cập các đường dẫn local vào các file md
  ```
- **AI Output Details:**
  1. Quét tìm toàn bộ các liên kết chứa đường dẫn tuyệt đối local (`file:///...` và thư mục máy cá nhân) trên toàn bộ repository.
  2. Thay thế toàn bộ bằng đường dẫn tương đối Git chuẩn (`./issues/...`, `../application/...`, `../tests/...`) trong các file:
     - [`submission/README.md`](./README.md)
     - [`submission/report.md`](./report.md)
     - [`submission/issues/`](./issues/) (7 files)
     - [`.github/issues/`](../.github/issues/) (7 files)
     - [`tests/test-summary/api-test-pipeline-summary.md`](../tests/test-summary/api-test-pipeline-summary.md)
  3. Chạy kiểm thử grep xác nhận 0 đường dẫn tuyệt đối local còn sót lại.
