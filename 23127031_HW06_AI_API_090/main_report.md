# HW06 — API Testing Report

**Student ID:** 23127031
**GitHub:** https://github.com/iamDicun/Group06_HW2_Testing.git
**Branch:** HW6-23127031

---

## 1. Tổng quan

### 1.1 Mục tiêu
Thực hiện pipeline API testing đầy đủ cho 3 API của eShop Backend:
- **FR-02:** Login (40 test cases)
- **FR-08:** Checkout (40 test cases)
- **FR-14:** Category CRUD (40 test cases)

### 1.2 Kết quả tổng hợp

| Chỉ số | Giá trị |
|--------|---------|
| Tổng test cases | 120 (40 + 40 + 40) |
| Requests chạy thành công | 151 |
| Assertions | 138 |
| Assertions pass | 61 (44.2%) |
| Assertions fail | 77 (55.8%) + 15 test-script errors (JSONError) |
| Bugs tìm thấy | 14 (6 Critical, 5 Major, 3 Minor) |
| Thời gian chạy | 13.7 giây |

### 1.3 Công cụ sử dụng
- **Postman:** Tạo collection, environment, pre-request scripts
- **Newman CLI 6.2.2:** Chạy CLI, xuất HTML report
- **newman-reporter-htmlextra:** Báo cáo HTML chi tiết
- **GitHub Actions:** CI/CD pipeline

---

## 2. Pipeline thực hiện

### 2.1 Generate (AI)
- Sử dụng AI để sinh test cases từ API specification
- Phân loại: Domain Partitions (DP), State Transitions (ST), Security (SEC), Schema Validation (SCHEMA), Extended (EXT)
- Mỗi FR có 40 test cases cover các edge cases

### 2.2 Audit (Human Review)
- Review từng test case, gắn nhãn VALID/INVALID/INCOMPLETE
- Sửa các test case INVALID (ví dụ: TC-FR14-DP-05 bị sửa do invalid)
- Kết quả: Collection cuối cùng chứa 120 test cases hợp lý

### 2.3 Extend
- Thêm 5+ test cases per FR mà AI bỏ sót:
  - FR-02: EXT-01 (case-sensitive email), EXT-02 (whitespace), EXT-03 (race condition), EXT-04 (wrong Content-Type), EXT-05 (DoS email)
  - FR-08: EXT-01 (race condition), EXT-02 (cross-user isolation), EXT-03 (decimal amount), EXT-04 (wrong Content-Type), EXT-05 (spam checkout)
  - FR-14: EXT-01 (extra fields), EXT-02 (race condition), EXT-03 (unsupported HTTP method), EXT-04 (wrong Content-Type), EXT-05 (Unicode/emoji)

### 2.4 Execute
- Newman chạy 151 requests trong 13.7s
- Header `X-Student-Id: 23127031` tự động gắn qua pre-request script
- HTML report xuất tại `newman-report/report.html`

---

## 3. Kết quả theo FR

### 3.1 FR-02: Login

| Loại TC | Tổng | Pass | Fail |
|---------|------|------|------|
| Domain Partitions (DP) | 12 | 8 | 4 |
| State Transitions (ST) | 7 | 3 | 4 |
| Security (SEC) | 8 | 3 | 5 |
| Schema (SCHEMA) | 8 | 0 | 8 |
| Extended (EXT) | 5 | 2 | 3 |
| **Tổng** | **40** | **16** | **24** |

**Bugs chính:** login_attempts +2 (BUG-API-01), lock time 3 phút (BUG-API-02), server crash 500 (BUG-API-03), password lộ (BUG-API-04), JWT không có exp (BUG-API-05), secret hardcode (BUG-API-06)

### 3.2 FR-08: Checkout

| Loại TC | Tổng | Pass | Fail |
|---------|------|------|------|
| Domain Partitions (DP) | 18 | 2 | 16 |
| State Transitions (ST) | 5 | 0 | 5 |
| Security (SEC) | 9 | 5 | 4 |
| Schema (SCHEMA) | 3 | 2 | 1 |
| Extended (EXT) | 5 | 0 | 5 |
| **Tổng** | **40** | **9** | **31** |

**Bugs chính:** Checkout không validate body (BUG-API-07). Nhiều TC fail do collection dùng `Bearer <token>` cứng thay vì `{{userToken}}`.

### 3.3 FR-14: Category CRUD

| Loại TC | Tổng | Pass | Fail |
|---------|------|------|------|
| Domain Partitions (DP) | 9 | 1 | 8 |
| State Transitions (ST) | 6 | 2 | 4 |
| Security (SEC) | 10 | 2 | 8 |
| Schema (SCHEMA) | 10 | 5 | 5 |
| Extended (EXT) | 5 | 1 | 4 |
| **Tổng** | **40** | **11** | **29** |

**Bugs chính:** Không validate tên (BUG-API-08), không check role (BUG-API-09), status code sai (BUG-API-12, 13), DELETE không check exists (BUG-API-11), duplicate name (BUG-API-14)

---

## 4. Postman Features Đã Dùng

| Feature | Mô tả | Sử dụng |
|---------|-------|---------|
| **Collection (v2.1)** | Tổ chức 151 requests theo folders (Login, Checkout, Category, Setup) | FR-02, FR-08, FR-14 |
| **Environment** | Biến `baseUrl`, `adminEmail`, `adminPassword`, `adminToken`, `userToken`, `userTokenB` | Tất cả |
| **Collection Variables** | Lưu token sau login để dùng cho request sau | FR-02, FR-08, FR-14 |
| **Pre-request Script (Collection-level)** | Tự gắn header `X-Student-Id: 23127031` vào mọi request | Tất cả |
| **Pre-request Script (Request-level)** | Reset environment, setup variables trước khi chạy request | FR-02, FR-08, FR-14 |
| **Test Script (`pm.test`)** | Assert status code, response body, validate JSON schema | Tất cả |
| **Test Script (`pm.environment.set`)** | Lưu token từ response vào environment | FR-02 Login |
| **Test Script (`pm.response.json()`)** | Parse response JSON để validate | Tất cả |
| **Console Log** | Bằng chứng header X-Student-Id trong console | Tất cả |
| **Newman CLI** | Chạy collection từ dòng lệnh, xuất HTML report | CI/CD pipeline |
| **Newman HTML Reporter** | Xuất báo cáo HTML chi tiết (`newman-reporter-htmlextra`) | Evidence |

---

## 5. CI/CD Pipeline

Hai workflow riêng biệt:

| Workflow | File | SUT Branch | Kết quả |
|----------|------|------------|---------|
| API Tests - Pass | `api-tests-pass.yml` | `hw06-pass` (fixed) | ✅ Success |
| API Tests - Fail | `api-tests-fail.yml` | `main` (bugs) | ❌ Failure |

Chi tiết trong `CI_CD_report.md`.

---

## 6. Evidence

### 6.1 X-Student-Id Header
Header `X-Student-Id: 23127031` được gắn tự động qua pre-request script ở collection level.

```javascript
// Pre-request Script (Collection-level)
pm.request.headers.add({
    key: 'X-Student-Id',
    value: '23127031'
});
```

### 6.2 Newman Execution
- **Hostname:** localhost:3000
- **Duration:** ~13.7s
- **Total Requests:** 151
- **Assertions:** 138 executed, 61 passed, 77 failed
- **Test-script errors:** 15 (JSONError — do response HTML thay vì JSON)
- **Report:** `newman-report/report.html`

### 6.3 Bug Screenshots
14 bugs đã được report trên GitHub Issues với screenshot evidence:
https://github.com/iamDicun/Group06_HW2_Testing/issues

---

## 7. Tài liệu đính kèm

| File | Mô tả |
|------|-------|
| `HW06_collection.json` | Postman collection (151 requests) |
| `HW06_environment.json` | Postman environment |
| `.github/workflows/api-tests-pass.yml` | CI workflow pass (SUT fixed) |
| `.github/workflows/api-tests-fail.yml` | CI workflow fail (SUT bugs) |
| `newman-report/report.html` | Newman HTML report |
| `bug_reports.md` | 14 bug reports (BUG-API-01~09, 11~15) |
| `testcases_testsummary.xlsx` | Excel test cases + summary |
| `ai_audit_report.md` | AI Audit Report |
| `ai_critique.md` | AI Critique |
