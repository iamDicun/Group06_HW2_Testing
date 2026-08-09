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
| **Pool A** | `FR-03` | Forgot Password & Password Reset | 16 | [`forgot-password.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/forgot-password.data.json) | [`forgot-password.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/forgot-password.spec.ts) |
| **Pool B** | `FR-09` | Discount Coupons | 12 | [`coupons.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/coupons.data.json) | [`coupons.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/coupons.spec.ts) |
| **Pool C** | `FR-15` | Product Management (CRUD) | 12 | [`product-mgmt.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/product-mgmt.data.json) | [`product-mgmt.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/product-mgmt.spec.ts) |

---

## 2. Test Execution Summary

| Feature | Automated | Executed | Passed | Failed | Browsers Tested | Bugs Found |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FR-03: Forgot Password** | 16 | 48 | 42 | 6 | Chromium, Firefox, WebKit | 2 (Missing Confirm Field, Password Rejected) |
| **FR-09: Discount Coupons** | 12 | 36 | 36 | 0 | Chromium, Firefox, WebKit | 0 |
| **FR-15: Product Management** | 12 | 36 | 33 | 3 | Chromium, Firefox, WebKit | 1 (Mass Update Bug) |
| **Tổng cộng** | **40** | **120** | **111** | **9** | **3 Browsers** | **3 Bugs** |

---

## 3. Human Review & Gap Analysis (AI Limitations)

Trong quá trình rà soát các test script và kịch bản do AI sinh ra, tôi đã phát hiện và khắc phục các thiếu sót sau:
1. **BVA Độ dài Mật khẩu & Ký tự đặc biệt (`FR-03`)**: AI ban đầu chỉ tạo kịch bản đổi mật khẩu cơ bản. Tôi đã bổ sung các kịch bản BVA độ dài 7, 8 (`@`), 9 (`$`) ký tự (`TC_FP_09`, `TC_FP_14`, `TC_FP_15`, `TC_FP_16`) để kiểm tra quy tắc mật khẩu mạnh và bắt lỗi **BUG-FR03-005** (Mật khẩu hợp lệ 8-9 ký tự không chứa khoảng trắng bị từ chối).
2. **Thiếu kiểm tra ô Xác nhận mật khẩu (`FR-03`)**: AI ban đầu không kiểm tra sự tồn tại của ô Confirm Password. Tôi đã thêm `TC_FP_13` và script `forgot-password.spec.ts` để bắt lỗi **BUG-FR03-003** (Giao diện SUT thiếu trường Confirm Password).
3. **Lỗi Regex Mật khẩu Flawed (`FR-03`)**: AI không tự phát hiện ra regex kiểm tra mật khẩu mạnh trên frontend (`flawedStrongPasswordRegex`) bắt buộc chứa khoảng trắng (`\s`). Tôi đã thêm `TC_FP_10` và `TC_FP_12` để kiểm soát lỗi này.
4. **Thiếu xử lý reset Coupon (`FR-09`)**: AI bỏ qua trường hợp người dùng thay đổi số tiền đơn hàng sau khi áp mã coupon (`TC_CP_11`).
5. **Lỗi Selector tĩnh và Thiếu Login Hook (`FR-15`)**: Tái cấu trúc selector sang Accessibility Locators và bổ sung luồng login Admin tự động.

---

## 4. Bug Reports & GitHub Issues

- **BUG-FR03-003**: Giao diện đặt lại mật khẩu của SUT hoàn toàn thiếu ô Xác nhận mật khẩu (Confirm Password).
- **BUG-FR03-005**: Mật khẩu hợp lệ chuẩn 8-9 ký tự chứa ký tự đặc biệt bị hệ thống từ chối do biểu thức chính quy yêu cầu khoảng trắng (`\s`).
- **BUG-PROD-001**: Lỗi cập nhật đồng loạt tên toàn bộ sản phẩm trong Database khi Admin tiến hành sửa thông tin 1 sản phẩm bất kỳ.

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
