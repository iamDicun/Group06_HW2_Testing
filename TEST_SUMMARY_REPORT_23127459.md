# TEST SUMMARY REPORT

**Sinh viên:** Huỳnh Vương Thụy Quân  
**MSSV:** 23127459  
**Nhóm:** 06  
**Dự án:** EShop - E-Commerce Platform  
**Ngày tạo:** 17/08/2026  
**Phiên bản:** 1.0

---

## MỤC LỤC

1. [Project Overview & Objective](#1-project-overview--objective)
2. [Test Scope & Strategy](#2-test-scope--strategy)
3. [Test Environment & Tools](#3-test-environment--tools)
4. [Test Execution & Metrics Summary](#4-test-execution--metrics-summary)
5. [Defect Details & Summary](#5-defect-details--summary)
6. [Test Coverage & Metrics](#6-test-coverage--metrics)
7. [Exit Criteria Assessment](#7-exit-criteria-assessment)
8. [Lessons Learned & Recommendations](#8-lessons-learned--recommendations)
9. [Conclusion & Sign-off](#9-conclusion--sign-off)

---

## 1. Project Overview & Objective

### 1.1 Tổng quan dự án

EShop là nền tảng thương mại điện tử (E-Commerce Platform) được xây dựng bằng **Node.js + Express + SQLite** (Backend) và **React + Vite + Tailwind CSS** (Frontend). Hệ thống bao gồm các phân hệ chính:

- **Frontend Web:** Giao diện mua sắm cho người dùng cuối
- **Frontend Admin:** Quản trị hệ thống
- **Backend API:** Xử lý nghiệp vụ và dữ liệu

### 1.2 Mục tiêu kiểm thử

Báo cáo này tổng hợp kết quả kiểm thử từ 5 nhánh Git cá nhân của MSSV 23127459, bao gồm:

| Nhánh | Bài tập | Loại kiểm thử |
|-------|---------|----------------|
| `23127459-inclass-decisiontable` | In-class: Decision Table Testing | Test Design (Black-box) |
| `23127459` | HW02: Domain Testing | Test Design (Black-box) |
| `HW03-23127459` | HW03: GUI Testing & Bug Reports | Manual Testing |
| `HW04-23127459` | HW04: Automation Testing | Automation (Playwright) |
| `HW05-23127459` | HW05: Performance Testing | Performance (JMeter) |

### 1.3 Phạm vi SUT (System Under Test)

- **URL:** http://localhost:3000 (API), http://localhost:5173 (Web), http://localhost:5174 (Admin)
- **Database:** SQLite (file-based)
- **Các Function được kiểm thử:** FR-01 (Register), FR-03 (Forgot Password), FR-05 (Product Search), FR-07 (Cart), FR-10 (Order Status), FR-11 (Order History), FR-17 (Coupon CRUD), SEC-04 (XSS Security)

---

## 2. Test Scope & Strategy

### 2.1 In-Scope (Trong phạm vi)

| # | Phạm vi | Mô tả |
|---|---------|-------|
| 1 | Functional Testing | Kiểm thử chức năng đăng nhập, đăng ký, tìm kiếm, giỏ hàng, thanh toán |
| 2 | GUI Testing | Kiểm thử giao diện người dùng trên nhiều trình duyệt |
| 3 | Automation Testing | Tự động hóa kiểm thử với Playwright + TypeScript |
| 4 | Performance Testing | Kiểm thử hiệu năng với Apache JMeter |
| 5 | Security Testing | Kiểm thử lỗ hổng XSS |
| 6 | Decision Table Testing | Kỹ thuật thiết kế test case bằng bảng quyết định |
| 7 | State Transition Testing | Kỹ thuật kiểm thử chuyển trạng thái |
| 8 | Boundary Value Analysis | Phân tích giá trị biên |

### 2.2 Out-of-Scope (Ngoài phạm vi)

| # | Phạm vi | Lý do |
|---|---------|-------|
| 1 | API Testing chi tiết | Không có bài tập riêng |
| 2 | Mobile App Testing | Chỉ test Web |
| 3 | Load Testing 1000+ VUs | Giới hạn tài nguyên |
| 4 | Penetration Testing | Không phải phạm vi bài tập |

### 2.3 Kỹ thuật kiểm thử đã áp dụng

| Kỹ thuật | Nhánh áp dụng | Mô tả |
|----------|---------------|-------|
| **Equivalence Partitioning** | 23127459-inclass, 23127459 | Chia dữ liệu thành các nhóm hợp lệ/thất bại |
| **Boundary Value Analysis** | 23127459-inclass, 23127459 | Kiểm thử giá trị biên (min, max, min-1, max+1) |
| **Decision Table Testing** | 23127459-inclass-decisiontable | Thiết kế test case bằng bảng quyết định cho FR-03, FR-07 |
| **State Transition Testing** | 23127459-inclass-decisiontable | Kiểm thử chuyển trạng thái giỏ hàng (S1→S2→S3) |
| **Use Case Testing** | 23127459-inclass-decisiontable | Kiểm thử theo kịch bản sử dụng |
| **Black-box Testing** | Tất cả | Kiểm thử hộp đen (không xem mã nguồn) |
| **White-box Testing** | HW04-23127459 | Đọc mã nguồn để tìm root cause |
| **Smoke Testing** | HW05-23127459 | Kiểm thử nhanh hệ thống hoạt động |
| **Load Testing** | HW05-23127459 | Tải 50 VUs cho Read operations |
| **Stress Testing** | HW05-23127459 | Tải 100 VUs cho Auth operations |
| **Spike Testing** | HW05-23127459 | Tải đột biến 200 VUs cho Transaction |

---

## 3. Test Environment & Tools

### 3.1 Môi trường thực thi

| Component | Chi tiết |
|-----------|----------|
| **OS** | Windows 11 Pro |
| **CPU** | Intel Core i9-13900H (14 cores / 20 threads) |
| **RAM** | 16 GB DDR5 |
| **Storage** | 512 GB NVMe SSD |

### 3.2 Công cụ kiểm thử

| Công cụ | Phiên bản | Mục đích |
|---------|-----------|----------|
| **Playwright** | v1.62.1 | Automation Testing (Multi-browser) |
| **TypeScript** | - | Ngôn ngữ lập trình test scripts |
| **Apache JMeter** | 5.6.3 | Performance Testing |
| **GitHub Actions** | - | CI/CD Pipeline |
| **VS Code** | - | IDE |
| **Node.js** | v20.x | Runtime environment |
| **Git** | - | Version control |

### 3.3 Multi-Browser Configuration

| Browser | Device | Trạng thái |
|---------|--------|------------|
| Chromium | Desktop Chrome | Executed |
| Firefox | Desktop Firefox | Executed |
| WebKit | Desktop Safari | Executed |

---

## 4. Test Execution & Metrics Summary

### 4.1 Tổng hợp kết quả theo nhánh

| Nhánh | Nội dung | Tổng TC | Executed | Passed | Failed | Skipped | Pass Rate |
|-------|----------|---------|----------|--------|--------|---------|-----------|
| `23127459-inclass-decisiontable` | In-class: Decision Table (FR-01, FR-03, FR-07) | 31 | 31 | 26 | 5 | 0 | 83.87% |
| `23127459` | HW02: Domain Testing (FR-01, FR-02, FR-03) | 20 | 20 | 16 | 4 | 0 | 80.00% |
| `HW03-23127459` | HW03: GUI Testing & Bug Reports | 45 | 45 | 18 | 27 | 0 | 40.00% |
| `HW04-23127459` | HW04: Automation Testing (FR-05, FR-11, FR-17) | 51 | 51 | 38 | 13 | 0 | 74.51% |
| `HW05-23127459` | HW05: Performance Testing (3 Scenarios) | 3 | 3 | 1 | 2 | 0 | 33.33% |
| **TỔNG CỘNG** | | **150** | **150** | **99** | **51** | **0** | **66.00%** |

### 4.2 Chi tiết nhánh `23127459-inclass-decisiontable`

**Kỹ thuật:** Decision Table Testing, State Transition Testing, Use Case Testing

| FR | Feature | Test Cases | Technique | Passed | Failed |
|----|---------|------------|-----------|--------|--------|
| FR-01 | Register | 2 | Equivalence Partitioning | 2 | 0 |
| FR-03 | Forgot Password | 9 | Decision Table | 6 | 3 |
| FR-07 | Cart (State Transition) | 9 | State Transition | 8 | 1 |
| FR-07 | Cart (Use Case) | 11 | Use Case Testing | 10 | 1 |
| **TOTAL** | | **31** | | **26** | **5** |

**Bug tìm thấy:**
- OTP 4 chữ số thay vì 6 chữ số (vi phạm FR-03)
- Thiếu toast notification khi thêm vào giỏ
- Cart badge không hiển thị

### 4.3 Chi tiết nhánh `HW03-23127459`

**Kỹ thuật:** GUI Testing, Cross-browser Testing (Chrome, Firefox, Edge)

| STT | Bug ID | Mô tả lỗi | Severity |
|-----|--------|------------|----------|
| 1 | BUG-01 | Trang Home có nhiều hơn 1 thẻ `<h1>` | Medium |
| 2 | BUG-02 | Ảnh sản phẩm không có loading='lazy' | Low |
| 3 | BUG-03 | Tiền tệ hiển thị 'VND' thay vì '₫' | Medium |
| 4 | BUG-08 | Ô tổng tiền cho phép sửa trực tiếp | High |
| 5 | BUG-11 | Input Mật khẩu dùng type='text' | High |
| 6 | BUG-12 | Form Register thiếu trường 'Xác nhận mật khẩu' | High |
| ... | ... | (Tổng 27 bugs) | ... |

**Tổng:** 27 Failed / 45 mục kiểm tra

### 4.4 Chi tiết nhánh `HW04-23127459`

**Kỹ thuật:** Automation Testing (Playwright + TypeScript, Multi-browser, Data-Driven)

| Feature | Test Cases | Runs (x3 browsers) | Pass | Fail | Status |
|---------|------------|---------------------|------|------|--------|
| FR-05: Product Search | 20 | 60 | 10 | 50 | FAIL |
| FR-11: Order History | 17 | 51 | 42 | 9 | FAIL |
| FR-17: Coupon CRUD | 14 | 42 | 42 | 0 | ALL PASS |
| **TOTAL** | **51** | **153** | **94** | **59** | |

**Root Cause FR-05 Failure:** Test assertions quá yếu (false positives) → Sau refactor, 10/20 TCs correctly FAIL phát hiện SUT bugs.

**Bug tìm thấy (5 bugs):**
- BUG-001: Homepage render 2 `<h1>` tags
- BUG-002: Price hiển thị "VND" thay vì "₫"
- BUG-003: Product images có alt="" rỗng
- BUG-004: XSS qua `dangerouslySetInnerHTML`
- BUG-005: Thiếu empty state message

### 4.5 Chi tiết nhánh `HW05-23127459`

**Kỹ thuật:** Performance Testing (Apache JMeter)

| Scenario | VUs | Duration | Throughput | Avg RT | p99 RT | Error Rate | Status |
|----------|-----|----------|------------|--------|--------|------------|--------|
| Load Test | 50 | 300s | 11.50 req/s | 1.01ms | 4ms | 49.62% | FAIL |
| Stress Test | 100 | 180s | 90.99 req/s | 1.31ms | 4ms | 99.40% | FAIL |
| Spike Test | 200 | 120s | 84.74 req/s | 53.82ms | 2,075ms | 0.00% | PASS |

**Bug tìm thấy:**
- Lock Account 180s thay vì 30s (vi phạm spec)
- Login increment +2 thay vì +1

---

## 5. Defect Details & Summary

### 5.1 Tổng hợp Defect

| Severity | Count | Percentage |
|----------|-------|------------|
| Critical | 3 | 5.88% |
| High | 8 | 15.69% |
| Medium | 25 | 49.02% |
| Low | 15 | 29.41% |
| **Tổng** | **51** | **100%** |

### 5.2 Danh sách Defect chính

| Defect ID | Mô tả | Nhánh | Severity | Status |
|-----------|-------|-------|----------|--------|
| BUG-001 | Homepage render 2 `<h1>` tags | HW04 | Medium | Open |
| BUG-002 | Price hiển thị "VND" thay vì "₫" | HW03, HW04 | Medium | Open |
| BUG-003 | Product images alt="" rỗng | HW04 | Medium | Open |
| BUG-004 | XSS qua `dangerouslySetInnerHTML` | HW04 | High | Open |
| BUG-008 | Ô tổng tiền cho phép sửa trực tiếp | HW03 | High | Open |
| BUG-011 | Input Mật khẩu dùng type='text' | HW03 | High | Open |
| BUG-012 | Form Register thiếu 'Xác nhận mật khẩu' | HW03 | High | Open |
| BUG-027 | Lock Account 180s thay vì 30s | HW05 | High | Open |
| TC-FORGOT-01 | OTP 4 chữ số thay vì 6 chữ số | In-class | Medium | Open |
| TC-CART-12 | Thiếu toast notification | In-class | Low | Open |

---

## 6. Test Coverage & Metrics

### 6.1 Requirements Coverage

| Requirement | Feature | Đã kiểm thử | Trạng thái |
|-------------|---------|--------------|------------|
| FR-01 | Register | Yes | Partially Passed |
| FR-02 | Login | Yes | Passed |
| FR-03 | Forgot Password | Yes | Failed (OTP bug) |
| FR-05 | Product Search | Yes | Failed (XSS, UI bugs) |
| FR-07 | Cart | Yes | Partially Passed |
| FR-10 | Order Status | Yes | Failed |
| FR-11 | Order History | Yes | Partially Passed |
| FR-17 | Coupon CRUD | Yes | Passed |
| FR-21 | HTML Structure | Yes | Failed (h1 tags) |
| FR-24 | Accessibility | Yes | Failed (alt text) |
| SEC-04 | XSS Security | Yes | Failed |

**Requirements Coverage Rate:** 100% (11/11 FRs đã kiểm thử)

### 6.2 Code Coverage

- Không có công cụ code coverage được cấu hình trong dự án
- **Đánh giá:** Cần tích hợp Istanbul/nyc cho JavaScript coverage

---

## 7. Exit Criteria Assessment

| Exit Criterion | Target | Thực tế | Đạt? |
|----------------|--------|---------|------|
| Requirements Coverage | >= 90% | 100% | YES |
| Test Case Execution | >= 80% | 100% (150/150) | YES |
| Pass Rate | >= 70% | 66% | NO |
| Critical Bugs Fixed | 100% | 0% (all Open) | NO |
| High Bugs Fixed | >= 80% | 0% (all Open) | NO |
| Performance Threshold (p95) | < 1000ms | 29ms (Spike) | YES |

**Kết luận Exit Criteria:** **KHÔNG ĐẠT** - Cần fix critical/high bugs trước khi release

---

## 8. Lessons Learned & Recommendations

### 8.1 Rủi ro & Vấn đề gặp phải

| # | Vấn đề | Tác động | Giải pháp |
|---|--------|----------|-----------|
| 1 | AI tạo test assertions quá yếu | False positives (tests pass nhưng SUT có bug) | Human review + refactor assertions |
| 2 | SQLite concurrent write limits | Database locked errors khi load test | Chuyển sang PostgreSQL cho production |
| 3 | Cross-browser inconsistency | Firefox có thêm failures | Thorough cross-browser testing |
| 4 | Thiếu code coverage tools | Không đo được mức phủ mã nguồn | Tích hợp Istanbul/nyc |

### 8.2 Đề xuất cải tiến

| # | Đề xuất | Ưu tiên |
|---|---------|---------|
| 1 | Fix bugs theo severity: Critical → High → Medium | Cao |
| 2 | Thêm Playwright code coverage reporter | Trung bình |
| 3 | Tích hợp JMeter vào CI/CD pipeline | Trung bình |
| 4 | Thêm visual regression testing (Percy/Chromatic) | Thấp |
| 5 | Cải thiện test data management | Thấp |

---

## 9. Conclusion & Sign-off

### 9.1 Kết luận

Sau khi quét và phân tích 5 nhánh Git cá nhân, kết quả kiểm thử cho thấy:

- **Tổng test cases:** 150
- **Pass Rate:** 66.00% (99/150)
- **Tổng defects tìm thấy:** 51
- **Critical/High bugs:** 11 (chưa fix)

Hệ thống EShop có nhiều lỗi cần sửa trước khi production, đặc biệt:
- Lỗi XSS security (BUG-004)
- Lỗi UI/UX (BUG-01, BUG-02, BUG-03)
- Lỗi Business Logic (Lock Account 180s)

### 9.2 Trạng thái sẵn sàng

| Tiêu chí | Trạng thái |
|-----------|------------|
| Test Design | DONE |
| Test Execution | DONE |
| Bug Reporting | DONE |
| Bug Fixing | NOT DONE |
| Regression Testing | NOT DONE |
| **Ready for Submission** | **YES (for homework)** |

### 9.3 Nghiệm thu

```
Tôi xác nhận báo cáo Test Summary Report này là kết quả kiểm thử
thực tế trên hệ thống EShop.

Ngày: 17/08/2026
Sinh viên: Huỳnh Vương Thụy Quân
MSSV: 23127459
```

---

**Tài liệu tham khảo:**
- SoftwareTestingHelp - Test Summary Report Template
- ISTQB Foundation Level Syllabus
- Playwright Official Documentation
- Apache JMeter User Manual
