# 23127391 - Nguyễn Anh Khoa — HW06 API Testing Submission

**Student Info:**
- **Họ và tên:** Nguyễn Anh Khoa
- **MSSV:** 23127391
- **Lớp / Khóa:** K23 - CNTT

**Selected Features:**
- **Pool A**: `FR-04` (Personal Profile Management)
- **Pool B**: `FR-10` (Order State Machine & Lifecycle)
- **Pool C**: `FR-16` (Product Import from CSV/JSON)

**Main Report Document:** Xem báo cáo toàn diện tại [`submission/report.md`](./report.md)

---

## Test Summary

| Metric | Count |
|---|---|
| Features tested | **3** (FR-04, FR-10, FR-16) |
| Test cases designed (AI + Human Extensions) | **158** (153 AI + 5 Human) |
| Test cases executed in Newman / Postman | **155** |
| Passed | **122** |
| Failed (Bugs & Security violations caught) | **33** |
| Blocked | **0** |
| Not yet executed | **0** |
| **Bugs found in Backend SUT** | **7** |

---

## Bug Reports (GitHub Issues)

Tất cả 7 lỗi thực tế phát hiện trong Backend SUT đã được đóng gói thành các **GitHub Bug Report Issues** với đầy đủ thông tin: ID, Tiêu đề chuẩn convention `[BUG][Module]: Title`, Module, Severity, Priority, Environment, Các bước tái hiện (Steps to Reproduce), Kết quả mong đợi (Expected Result), Kết quả thực tế (Actual Result), và Bằng chứng (Evidence: Raw HTTP Request/Response, Newman Assertion Failure, Vị trí mã nguồn).

| Bug ID | Mức độ (Severity) | Ưu tiên (Priority) | Tính năng | Tiêu đề Bug Report / GitHub Issue | Test Case phát hiện | File & Dòng Code lỗi | Chi tiết Issue |
|---|---|---|---|---|---|---|---|
| **BUG-01** | **Critical** | **P0** | FR-04 | `[BUG][FR-04]: Privilege Escalation via Mass Assignment on User Profile Update` | `TC-PROFILE-SEC-006` | [`server.js:124-127`](../application/backend/server.js#L124-L127) | [`BUG-01-role-escalation.md`](./issues/BUG-01-role-escalation.md) |
| **BUG-02** | **Critical** | **P0** | FR-04 | `[BUG][FR-04]: Sensitive Data Exposure Leaking Plaintext Passwords and Reset Tokens via GET /api/users/me` | `TC-PROFILE-SEC-013` | [`server.js:113-115`](../application/backend/server.js#L113-L115) | [`BUG-02-sensitive-data-exposure.md`](./issues/BUG-02-sensitive-data-exposure.md) |
| **BUG-03** | **Critical** | **P0** | FR-10 | `[BUG][FR-10]: State Machine Violation Allowing Invalid Transition from Final State Canceled to Delivered` | `TC-ORDER-ST-014` | [`server.js:550-551`](../application/backend/server.js#L550-L551) | [`BUG-03-final-state-violation.md`](./issues/BUG-03-final-state-violation.md) |
| **BUG-04** | **Major** | **P1** | FR-10 | `[BUG][FR-10]: Broken Cancellation Logic Permitting Regular Users to Cancel In-Transit (Shipping) Orders` | `TC-ORDER-ST-008` | [`server.js:329-331`](../application/backend/server.js#L329-L331) | [`BUG-04-shipping-cancel-logic.md`](./issues/BUG-04-shipping-cancel-logic.md) |
| **BUG-05** | **Critical** | **P0** | FR-10 & FR-16 | `[BUG][FR-10/FR-16]: Broken Access Control on Administrative Endpoints Due to Missing Role Authorization` | `TC-ORDER-SEC-005`, `TC-IMPORT-SEC-003` | [`server.js:100-110`](../application/backend/server.js#L100-L110) | [`BUG-05-broken-access-control.md`](./issues/BUG-05-broken-access-control.md) |
| **BUG-06** | **Major** | **P1** | FR-16 | `[BUG][FR-16]: Violation of Atomic All-or-Nothing Transaction on Product CSV Batch Import` | `TC-IMPORT-ST-002` | [`server.js:213-233`](../application/backend/server.js#L213-L233) | [`BUG-06-atomic-rollback-violation.md`](./issues/BUG-06-atomic-rollback-violation.md) |
| **BUG-07** | **Major** | **P2** | FR-16 | `[BUG][FR-16]: Missing Validation on Product Price Permitting Negative or Zero Price Import` | `TC-IMPORT-DP-016`, `TC-IMPORT-DP-017` | [`server.js:214-220`](../application/backend/server.js#L214-L220) | [`BUG-07-missing-price-validation.md`](./issues/BUG-07-missing-price-validation.md) |

> 📁 *Thư mục lưu trữ file GitHub Issues:* [`submission/issues/`](./issues/) và [`.github/issues/`](../.github/issues/)

---

## Self-Assessment

| No. | Criteria | Max | Self | Minh chứng |
|---|---|---|---|---|
| 1 | API 1 (FR-04: Profile Management) — full pipeline | 30 | 30 | 51 TCs thiết kế, 1 human extension (`EXT-003`), bắt được 2 bugs (`BUG-01`, `BUG-02`). |
| 2 | API 2 (FR-10: Order State Machine) — full pipeline | 30 | 30 | 53 TCs thiết kế, ma trận chuyển trạng thái 5x5, 2 human extensions (`EXT-001`, `EXT-002`), bắt được 3 bugs (`BUG-03`, `BUG-04`, `BUG-05`). |
| 3 | API 3 (FR-16: Product Import CSV) — full pipeline | 30 | 30 | 49 TCs thiết kế, 2 human extensions (`EXT-004`, `EXT-005`), bắt được 2 bugs (`BUG-06`, `BUG-07`). |
| 4 | Agent Skills | 10 | 10 | Thiết kế Agent Skill hoàn chỉnh với sơ đồ Mermaid, mã giả, tuân thủ chặt chẽ quy trình Skill, báo cáo Newman HTML Report và 7 GitHub Bug Issues có đầy đủ bằng chứng. |
| **Total** | | **100** | **100** | **Hoàn thành 100% yêu cầu đề bài HW06** |

---

## Deliverables & Links

- **Main Report**: [`submission/report.md`](./report.md)
- **AI Test Generator Design (Create Level G9.5)**: [`submission/ai_test_generator_design.md`](./ai_test_generator_design.md)
- **GitHub Bug Issues**: [`submission/issues/`](./issues/) | [`.github/issues/`](../.github/issues/)
- **AI Audit Report**: [`submission/ai_audit.md`](./ai_audit.md)
- **AI Prompt Log**: [`submission/prompt_log.md`](./prompt_log.md)
- **AI Critique**: [`submission/ai_critique.md`](./ai_critique.md)
- **Newman HTML Test Report**: [`submission/reports/EShop_API_Test_Report.html`](./reports/EShop_API_Test_Report.html)
- **Postman Collection**: [`submission/tests/test-runs/EShop_API_Testing.postman_collection.json`](./tests/test-runs/EShop_API_Testing.postman_collection.json)
- **Postman Environment**: [`submission/tests/test-runs/eshop-api.postman_environment.json`](./tests/test-runs/eshop-api.postman_environment.json)
- **CI/CD Pipeline**: [`.github/workflows/api-tests.yml`](../.github/workflows/api-tests.yml)
- **Test Cases Folder**: [`submission/tests/test-cases/`](./tests/test-cases/)
