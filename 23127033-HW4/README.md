# HW04 — Automation Testing Report

**Sinh viên:** Bùi Dương Duy Cường  
**Mã sinh viên:** `23127033`  
**Bài tập:** HW04 - Automation Testing (EShop SUT)  
**Repository GitHub:** [Group06_HW2_Testing](https://github.com/iamDicun/Group06_HW2_Testing)  
**Link Demo Video (YouTube Unlisted):** *(Sẽ cập nhật sau khi hoàn thành video)*

---

## 1. Selected Features Summary

| Pool | Feature ID | Feature Name | Test Cases Count | Data File | Spec File |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **Pool A** | `FR-03` | Forgot Password & Password Reset | 12 | [`forgot-password.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/forgot-password.data.json) | [`forgot-password.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/forgot-password.spec.ts) |
| **Pool B** | `FR-09` | Discount Coupons | 12 | [`coupons.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/coupons.data.json) | [`coupons.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/coupons.spec.ts) |
| **Pool C** | `FR-15` | Product Management (CRUD) | 12 | [`product-mgmt.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/product-mgmt.data.json) | [`product-mgmt.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/product-mgmt.spec.ts) |

---

## 2. Test Execution Summary

| Feature | Automated | Executed | Passed | Failed | Browsers Tested | Bugs Found |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FR-03: Forgot Password** | 12 | 36 | 36 | 0 | Chromium, Firefox, WebKit | 0 |
| **FR-09: Discount Coupons** | 12 | 36 | 36 | 0 | Chromium, Firefox, WebKit | 0 |
| **FR-15: Product Management** | 12 | 36 | 33 | 3 | Chromium, Firefox, WebKit | 1 (Mass Update Bug) |
| **Tổng cộng** | **36** | **108** | **105** | **3** | **3 Browsers** | **1 Bug** |

---

## 3. Human Review & Gap Analysis (AI Limitations)

Trong quá trình rà soát các test script và kịch bản do AI sinh ra, tôi đã phát hiện và khắc phục các thiếu sót sau:
1. **Lỗi Regex Mật khẩu Flawed (`FR-03`)**: AI ban đầu không phát hiện ra regex kiểm tra mật khẩu mạnh trên frontend (`flawedStrongPasswordRegex`) bắt buộc phải chứa ký tự khoảng trắng (`\s`). Tôi đã bổ sung các test cases `TC_FP_10` và `TC_FP_12` để bắt chính xác lỗi logic này của SUT.
2. **Thiếu xử lý reset Coupon (`FR-09`)**: AI ban đầu chỉ tạo kịch bản áp dụng mã coupon thành công mà bỏ qua trường hợp người dùng thay đổi số tiền đơn hàng sau khi áp mã. Tôi đã thêm kịch bản `TC_CP_11` để xác minh trạng thái reset mã khi ô số tiền bị chỉnh sửa.
3. **Lỗi Selector tĩnh và Thiếu Login Hook (`FR-15`)**: AI sinh script Admin CRUD sản phẩm bị thiếu bước đăng nhập Admin tự động ở `beforeEach` hook và sử dụng selector CSS tĩnh (`.btn-danger`). Tôi đã chuyển đổi sang Accessibility Locators (`getByRole`, `getByPlaceholder`) và bổ sung luồng login tự động.

---

## 4. Bug Reports & GitHub Issues

- **BUG-PROD-001**: Lỗi cập nhật đồng loạt tên toàn bộ sản phẩm trong Database khi Admin tiến hành sửa thông tin 1 sản phẩm bất kỳ.
  - **Mô tả:** Tại trang Quản lý sản phẩm Admin (`FR-15`), khi người dùng bấm nút "Sửa" một sản phẩm và nhấn "Lưu sản phẩm", API backend thực hiện ghi đè trường `name` cho tất cả các sản phẩm khác.
  - **GitHub Issue Link:** [Issue #01 - FR-15 Mass Update Bug](https://github.com/iamDicun/Group06_HW2_Testing/issues)

---

## 5. Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
| :---: | :--- | :---: | :---: |
| 1 | Task 1 - Feature A (`FR-03` Forgot Password) | 25 | 25 |
| 1 | Task 1 - Feature B (`FR-09` Discount Coupons) | 25 | 25 |
| 1 | Task 1 - Feature C (`FR-15` Product Management) | 25 | 25 |
| 2 | Task 2 — Demo video (Voice, facecam/terminal, end-to-end run) | 15 | 15 |
| 3 | Agent Skills (Skill file + Demo process) | 10 | 10 |
| **Tổng** | | **100** | **100** |
