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
| **Pool B** | `FR-09` | Discount Coupons | 16 | [`coupons.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/coupons.data.json) | [`coupons.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/coupons.spec.ts) |
| **Pool C** | `FR-15` | Product Management (CRUD) | 13 | [`product-mgmt.data.json`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/test-data/product-mgmt.data.json) | [`product-mgmt.spec.ts`](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/23127033-HW4/tests/product-mgmt.spec.ts) |

---

## 2. Test Execution Summary

| Feature | Automated | Executed | Passed | Failed | Browsers Tested | Bugs Found |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FR-03: Forgot Password** | 16 | 48 | 42 | 6 | Chromium, Firefox, WebKit | 2 (Missing Confirm Field, Password Rejected) |
| **FR-09: Discount Coupons** | 16 | 48 | 36 | 12 | Chromium, Firefox, WebKit | 2 (SAVE10 Formula Error, Unauthenticated Coupon App) |
| **FR-15: Product Management** | 13 | 39 | 33 | 6 | Chromium, Firefox, WebKit | 2 (Mass Update Bug, Missing Delete Confirm Dialog) |
| **Tổng cộng** | **45** | **135** | **111** | **24** | **3 Browsers** | **6 Bugs** |

---

## 3. Human Review & Gap Analysis (AI Limitations)

Trong quá trình rà soát các test script và kịch bản do AI sinh ra, tôi đã phát hiện và khắc phục các thiếu sót sau:
1. **Thiếu Hộp thoại Xác nhận khi Xóa sản phẩm (`FR-15`)**: AI ban đầu chỉ giả định nút Xóa sẽ kích hoạt hộp thoại xác nhận `window.confirm`. Tôi đã cập nhật `TC_PM_03`, `TC_PM_13` và script `product-mgmt.spec.ts` để bắt lỗi **BUG-FR15-004** (Nút Xóa thực hiện xóa trực tiếp trong Database mà không hiển thị dialog xác nhận).
2. **Áp dụng Mã giảm giá khi Chưa đăng nhập (`FR-09`)**: AI ban đầu giả định mã coupon chỉ có thể áp dụng khi người dùng đã xác thực. Tôi đã bổ sung `TC_CP_16` phát hiện lỗi **BUG-FR09-003** (Khách chưa đăng nhập vẫn áp được coupon thành công).
3. **Kiểm tra công thức tính phần trăm mã `SAVE10` (`FR-09`)**: AI không tự xác minh số tiền tiết kiệm 10%. Tôi đã bổ sung `TC_CP_13`, `TC_CP_14`, `TC_CP_15` trên các mốc giá trị (300k, 500k, 1M VND) để bắt lỗi **BUG-FR09-002** (Công thức tính giảm giá phần trăm bị sai).
4. **BVA Độ dài Mật khẩu & Ký tự đặc biệt (`FR-03`)**: Bổ sung BVA độ dài 7, 8 (`@`), 9 (`$`) ký tự (`TC_FP_09`, `TC_FP_14`, `TC_FP_15`, `TC_FP_16`) để bắt lỗi **BUG-FR03-005**.
5. **Thiếu kiểm tra ô Xác nhận mật khẩu (`FR-03`)**: Bổ sung `TC_FP_13` để bắt lỗi **BUG-FR03-003** (Giao diện SUT thiếu trường Confirm Password).
6. **Lỗi Selector tĩnh và Thiếu Login Hook (`FR-15`)**: Tái cấu trúc selector sang Accessibility Locators và bổ sung luồng login Admin tự động.

---

## 4. Bug Reports & GitHub Issues

- **BUG-FR03-003**: Giao diện đặt lại mật khẩu của SUT hoàn toàn thiếu ô Xác nhận mật khẩu (Confirm Password).
- **BUG-FR03-005**: Mật khẩu hợp lệ chuẩn 8-9 ký tự chứa ký tự đặc biệt bị hệ thống từ chối do biểu thức chính quy yêu cầu khoảng trắng (`\s`).
- **BUG-FR09-002**: Mã giảm giá phần trăm `SAVE10` tính sai số tiền giảm (nhân 10 lần giá trị thay vì giảm 10%).
- **BUG-FR09-003**: Người dùng khách chưa đăng nhập vẫn có thể áp dụng thành công mã coupon giảm giá.
- **BUG-FR15-004**: Thao tác xóa sản phẩm trong Admin Portal không hiển thị hộp thoại xác nhận (Confirm Dialog).
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
