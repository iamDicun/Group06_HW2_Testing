# HW04 — Automation Testing Report

**Sinh viên:** Bùi Dương Duy Cường  
**Mã sinh viên:** `23127033`  
**Bài tập:** HW04 - Automation Testing (EShop SUT)  
**Public GitHub Repository (Thư mục HW04):** [HW04 Directory (GitHub Branch 23127033-HW4-HW5)](https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW4-HW5/23127033-HW4/)  
**Thư mục Test Scripts (.spec.ts):** [`./tests/`](https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW4-HW5/23127033-HW4/tests/)  
**Thư mục Test Data (.json):** [`./test-data/`](https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW4-HW5/23127033-HW4/test-data/)  
**Báo cáo chính chi tiết:** [`./main-report.md`](./main-report.md)  
**Playwright Multi-Browser HTML Report (GitHub):** [Playwright HTML Report trên GitHub Repo](https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW4-HW5/playwright-report)  
**Link Video Demo Agent Skill (YouTube Unlisted):** [https://youtu.be/_de9jzahfRE](https://youtu.be/_de9jzahfRE)  
**Link Video Demo Automation & Multi-Browser (YouTube Unlisted):** [https://youtu.be/m8WTSC1_GsI](https://youtu.be/m8WTSC1_GsI)  

---

## 1. Selected Features Summary

| Pool | Feature ID | Feature Name | Test Cases Count | Data File | Spec File |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **Pool A** | `FR-03` | Forgot Password & Password Reset | 16 | [`forgot-password.data.json`](./test-data/forgot-password.data.json) | [`forgot-password.spec.ts`](./tests/forgot-password.spec.ts) |
| **Pool B** | `FR-09` | Discount Coupons | 16 | [`coupons.data.json`](./test-data/coupons.data.json) | [`coupons.spec.ts`](./tests/coupons.spec.ts) |
| **Pool C** | `FR-15` | Product Management (CRUD) | 18 | [`product-mgmt.data.json`](./test-data/product-mgmt.data.json) | [`product-mgmt.spec.ts`](./tests/product-mgmt.spec.ts) |

---

## 2. Test Execution Summary

| Feature | Automated | Executed | Passed | Failed | Browsers Tested | Bugs Found |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FR-03: Forgot Password** | 16 | 48 | 42 | 6 | Chromium, Firefox, WebKit | 2 (Missing Confirm Field, Password Rejected) |
| **FR-09: Discount Coupons** | 16 | 48 | 36 | 12 | Chromium, Firefox, WebKit | 2 (SAVE10 Formula Error, Unauthenticated Coupon App) |
| **FR-15: Product Management** | 18 | 54 | 42 | 12 | Chromium, Firefox, WebKit | 4 (Mass Update Bug, Missing Delete Confirm, Price 0 Accepted, Broken Edit Fields) |
| **Tổng cộng** | **50** | **150** | **120** | **30** | **3 Browsers** | **8 Bugs** |

---

## 3. Human Review & Gap Analysis (AI Limitations)

Xem nội dung phân tích chi tiết tại file [`./main-report.md`](./main-report.md#4-phan-tich-chuyen-sau-ly-do-vi-sao-dung-ai-skill-van-thieu-thieu-sot--loi-sut-bug-human-gap-analysis) với 4 nguyên nhân cốt lõi:
1. Hạn chế về ngữ cảnh giao diện thực tế (Lack of Empirical Live DOM Context).
2. Sự suy luận máy móc theo "Happy Path Standard" nông (Over-reliance on Standard Assumptions).
3. Không đọc được logic ẩn & công thức toán học bị lỗi trong code.
4. Assertion bề mặt (Shallow Assertions) & Thiếu kiểm tra bất đồng bộ.

---

## 4. Confirmed Bug Reports & GitHub Issues Evidence

| Mã Lỗi | Mô Tả Lỗi | File Report Local | GitHub Issue |
| :---: | :--- | :--- | :---: |
| **BUG-FR03-003** | Giao diện đặt lại mật khẩu SUT thiếu ô Xác nhận mật khẩu (Confirm Password) | [`./bug-reports/BUG-FR03-003.md`](./bug-reports/BUG-FR03-003.md) | [#132](https://github.com/iamDicun/Group06_HW2_Testing/issues/132) |
| **BUG-FR03-005** | Mật khẩu hợp lệ 8-9 ký tự bị từ chối do Regex đòi khoảng trắng | [`./bug-reports/BUG-FR03-005.md`](./bug-reports/BUG-FR03-005.md) | [#133](https://github.com/iamDicun/Group06_HW2_Testing/issues/133) |
| **BUG-FR09-002** | Mã giảm giá phần trăm SAVE10 tính sai số tiền giảm (nhân 10 lần) | [`./bug-reports/BUG-FR09-002.md`](./bug-reports/BUG-FR09-002.md) | [#134](https://github.com/iamDicun/Group06_HW2_Testing/issues/134) |
| **BUG-FR09-003** | Khách chưa đăng nhập vẫn áp dụng thành công mã coupon | [`./bug-reports/BUG-FR09-003.md`](./bug-reports/BUG-FR09-003.md) | [#135](https://github.com/iamDicun/Group06_HW2_Testing/issues/135) |
| **BUG-FR15-002** | Chấp nhận giá sản phẩm bằng 0 ₫ / Giá âm khi tạo hoặc sửa | [`./bug-reports/BUG-FR15-002.md`](./bug-reports/BUG-FR15-002.md) | [#136](https://github.com/iamDicun/Group06_HW2_Testing/issues/136) |
| **BUG-FR15-003** | Sửa chi tiết các trường sản phẩm (Giá, Mô tả, Danh mục) không hoạt động | [`./bug-reports/BUG-FR15-003.md`](./bug-reports/BUG-FR15-003.md) | [#137](https://github.com/iamDicun/Group06_HW2_Testing/issues/137) |
| **BUG-FR15-004** | Xóa sản phẩm trong Admin không hiển thị Hộp thoại xác nhận (Confirm Dialog) | [`./bug-reports/BUG-FR15-004.md`](./bug-reports/BUG-FR15-004.md) | [#138](https://github.com/iamDicun/Group06_HW2_Testing/issues/138) |
| **BUG-PROD-001** | Sửa 1 sản phẩm làm mass update đổi tên toàn bộ sản phẩm trong DB | [`./bug-reports/BUG-PROD-001.md`](./bug-reports/BUG-PROD-001.md) | [#139](https://github.com/iamDicun/Group06_HW2_Testing/issues/139) |

---

## 5. Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
| :---: | :--- | :---: | :---: |
| 1 | Task 1 — Feature A (`FR-03` Forgot Password) | 25 | 25 |
| 1 | Task 1 — Feature B (`FR-09` Discount Coupons) | 25 | 25 |
| 1 | Task 1 — Feature C (`FR-15` Product Management) | 25 | 25 |
| 2 | Task 2 — Demo video (Voice, facecam/terminal, end-to-end run) | 15 | 15 |
| 3 | Agent Skills (Skill file + Demo process) | 10 | 10 |
| **Tổng** | | **100** | **100** |
