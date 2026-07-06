# SUMMARY REPORT — Test Cases & Bug Report Overview

**Ngày:** 06/07/2026  
**Phạm vi:** FR-03 (Forgot Password), FR-05 (Product Search), FR-07 (Cart), FR-09 (Coupon Apply), FR-11 (Order History), FR-17 (Coupon Management), MOBILE-App

---

## 1. Tổng quan Test Cases

| Chỉ tiêu | Giá trị |
|----------|---------|
| **Tổng số TC** | **68** |
| Số TC Passed | 35 |
| Số TC Failed | 33 |
| Tỉ lệ Pass | 51.5% |
| Số TC chưa chạy | 0 |

## 2. Coverage theo FR

| FR | Module | Số TC | Passed | Failed | Tỉ lệ Pass |
|----|--------|-------|--------|--------|-----------|
| FR-03 | Forgot Password | 9 | 7 | 2 | 77.8% |
| FR-05 | Product Search | 10 | 7 | 3 | 70% |
| FR-07 | Cart | 20 | 1 | 19 | 5% |
| FR-11 | Order History | 6 | 5 | 1 | 83.3% |
| FR-17 | Coupon Management | 14 | 6 | 8 | 42.9% |
| MOBILE | Mobile App (FR-05) | 9 | 9 | 0 | 100% |

## 3. Coverage theo Test Design Technique

| Kỹ thuật | FR-03 | FR-05 | FR-07 | FR-11 | FR-17 | MOBILE | Tổng |
|-----------|-------|-------|-------|-------|-------|--------|------|
| Equivalence Partitioning (EP) | 0 | 9 | 0 | 5 | 10 | 8 | **32** |
| Boundary Value Analysis (BVA) | 0 | 1 | 0 | 1 | 2 | 1 | **5** |
| EP + BVA (combined) | 0 | 0 | 0 | 0 | 2 | 0 | **2** |
| Decision Table | 5 | 0 | 0 | 0 | 0 | 0 | **5** |
| Pairwise | 4 | 0 | 0 | 0 | 0 | 0 | **4** |
| Use Case Testing | 0 | 0 | 11 | 0 | 0 | 0 | **11** |
| State Transition | 0 | 0 | 9 | 0 | 0 | 0 | **9** |

## 4. Chi tiết kết quả từng TC

### FR-03 — Forgot Password

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-FORGOT-01 | Decision Table | ❌ Failed |
| TC-FORGOT-02 | Decision Table | ❌ Failed |
| TC-FORGOT-03 | Decision Table | ✅ Passed |
| TC-FORGOT-04 | Decision Table | ✅ Passed |
| TC-FORGOT-05 | Decision Table | ✅ Passed |
| TC-FORGOT-06 | Pairwise | ❌ Failed |
| TC-FORGOT-07 | Pairwise | ✅ Passed |
| TC-FORGOT-08 | Pairwise | ✅ Passed |
| TC-FORGOT-09 | Pairwise | ✅ Passed |

### FR-05 — Product Search

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-PROD_SEARCH-001 | BVA | ✅ Passed |
| TC-PROD_SEARCH-002 | EP | ❌ Failed |
| TC-PROD_SEARCH-003 | EP | ✅ Passed |
| TC-PROD_SEARCH-004 | EP | ❌ Failed |
| TC-PROD_SEARCH-005 | EP | ✅ Passed |
| TC-PROD_SEARCH-006 | EP | ❌ Failed |
| TC-PROD_SEARCH-007 | EP | ✅ Passed |
| TC-PROD_SEARCH-008 | EP | ✅ Passed |
| TC-PROD_SEARCH-009 | EP | ✅ Passed |
| TC-PROD_SEARCH-010 | EP | ✅ Passed |

### FR-07 — Cart

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-CART-01 | Use Case | ❌ Failed |
| TC-CART-02 | Use Case | ❌ Failed |
| TC-CART-03 | Use Case | ❌ Failed |
| TC-CART-04 | Use Case | ❌ Failed |
| TC-CART-05 | Use Case | ❌ Failed |
| TC-CART-06 | Use Case | ❌ Failed |
| TC-CART-07 | Use Case | ❌ Failed |
| TC-CART-08 | Use Case | ❌ Failed |
| TC-CART-09 | Use Case | ❌ Failed |
| TC-CART-10 | Use Case | ❌ Failed |
| TC-CART-11 | Use Case | ❌ Failed |
| TC-CART-12 | State Transition | ✅ Passed |
| TC-CART-13 | State Transition | ❌ Failed |
| TC-CART-14 | State Transition | ❌ Failed |
| TC-CART-15 | State Transition | ❌ Failed |
| TC-CART-16 | State Transition | ❌ Failed |
| TC-CART-17 | State Transition | ❌ Failed |
| TC-CART-18 | State Transition | ❌ Failed |
| TC-CART-19 | State Transition | ❌ Failed |
| TC-CART-20 | State Transition | ❌ Failed |

### FR-11 — Order History

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-ORDER-001 | BVA | ✅ Passed |
| TC-ORDER-002 | EP | ❌ Failed |
| TC-ORDER-003 | EP | ✅ Passed |
| TC-ORDER-004 | EP | ✅ Passed |
| TC-ORDER-005 | EP | ✅ Passed |
| TC-ORDER-006 | EP | ✅ Passed |

### FR-17 — Coupon Management

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-COUPON-01 | EP | ❌ Failed |
| TC-COUPON-02 | EP | ❌ Failed |
| TC-COUPON-03 | EP | ✅ Passed |
| TC-COUPON-04 | EP | ❌ Failed |
| TC-COUPON-05 | EP + BVA | ❌ Failed |
| TC-COUPON-06 | BVA | ❌ Failed |
| TC-COUPON-07 | EP + BVA | ❌ Failed |
| TC-COUPON-08 | EP | ❌ Failed |
| TC-COUPON-09 | EP | ❌ Failed |
| TC-COUPON-10 | EP | ✅ Passed |
| TC-COUPON-11 | EP | ✅ Passed |
| TC-COUPON-12 | EP | ✅ Passed |
| TC-COUPON-13 | EP | ❌ Failed |
| TC-COUPON-14 | EP | ✅ Passed |

### MOBILE-App (FR-05)

| TC ID | Technique | Status |
|-------|-----------|--------|
| TC-MOBILE-FR05-001 | BVA | ✅ Passed |
| TC-MOBILE-FR05-002 | EP | ✅ Passed |
| TC-MOBILE-FR05-003 | EP | ✅ Passed |
| TC-MOBILE-FR05-004 | EP | ✅ Passed |
| TC-MOBILE-FR05-005 | EP | ✅ Passed |
| TC-MOBILE-FR05-006 | EP | ✅ Passed |
| TC-MOBILE-FR05-007 | EP | ✅ Passed |
| TC-MOBILE-FR05-008 | EP | ✅ Passed |
| TC-MOBILE-FR05-009 | EP | ✅ Passed |

---

## 5. Bugs tìm được

| # | Module | FR | Severity | Mô tả |
|---|--------|----|----------|-------|
| 1 | Product Search | FR-05 | Critical | Reflected XSS qua dangerouslySetInnerHTML |
| 2 | Product Search | FR-05 | Critical | SQL Injection do string interpolation |
| 3 | Product Search | FR-05 | Minor | Search input không trim khoảng trắng đầu |
| 4 | Product Search | FR-05 | Minor | Nhiều khoảng trắng liên tiếp không được normalize |
| 5 | Order History | FR-11 | Major | Cột ngày không hiển thị giờ |
| 6 | Coupon Mgmt | FR-17 | High | API admin coupon không kiểm tra role |
| 7 | Coupon Mgmt | FR-17 | High | Thiếu server-side validation trên tạo coupon |
| 8 | Coupon Mgmt | FR-17 | Medium | Xóa coupon không có dialog xác nhận |
| 9 | Coupon Mgmt | FR-17 | Medium | Duplicate code trả về HTTP 500 |
| 10 | Coupon Apply | FR-09 | High | So sánh min_order_amount dùng > thay vì >= |
| 11 | Coupon Apply | FR-09 | High | API apply-coupon không yêu cầu xác thực |
| 12 | Forgot Password | FR-03 | Major | OTP 4 số thay vì 6 số |
| 13 | Forgot Password | FR-03 | Minor | Message regex password nhắc "KÝ TỰ ĐẶC BIỆT" nhưng chấp nhận whitespace |
| 14 | Forgot Password | FR-03 | Major | Thiếu trường xác nhận mật khẩu ở Step 2 |
| 15 | Forgot Password | FR-03 | Minor | Thông báo lỗi "User not found" bằng tiếng Anh |
| 16 | Cart | FR-07 | High | Thiếu nút +/- trên quantity selector |
| 17 | Cart | FR-07 | High | Không có dialog xác nhận khi xoá sản phẩm |
| 18 | Cart | FR-07 | Medium | Nhãn tổng tiền sai "Tổng tạm tính" |
| 19 | Cart | FR-07 | High | addToCart không merge sản phẩm trùng |
| 20 | Cart | FR-07 | Medium | Giỏ hàng rỗng không có hình minh hoạ |
| 21 | Cart | FR-07 | Medium | Không có badge trên icon giỏ hàng ở navbar |
| 22 | Cart | FR-07 | Low | Nhãn nút "← Mua tiếp" không chuẩn |
| 23 | Cart | FR-07 | Medium | Cần click 2 lần để vào giỏ hàng từ navbar |
| 24 | Cart | FR-07 | Medium | Tổng tiền thiếu ký hiệu tiền tệ ₫ |
| 25 | Cart | FR-07 | Low | Nhãn logout "Thoát" thay vì "Đăng xuất" |

### Bug coverage theo FR

| FR | Số bug | Critical | Major | High | Medium | Low |
|----|--------|----------|-------|------|--------|-----|
| FR-03 | 4 | 0 | 2 | 0 | 0 | 2 |
| FR-05 | 4 | 2 | 0 | 0 | 0 | 2 |
| FR-07 | 10 | 0 | 0 | 3 | 5 | 2 |
| FR-11 | 1 | 0 | 1 | 0 | 0 | 0 |
| FR-17 | 4 | 0 | 0 | 2 | 2 | 0 |
| FR-09 | 2 | 0 | 0 | 2 | 0 | 0 |
| **Tổng** | **25** | **2** | **3** | **7** | **7** | **6** |

### Bug coverage theo Severity

| Severity | Số lượng |
|----------|----------|
| Critical | 2 |
| Major | 3 |
| High | 7 |
| Medium | 7 |
| Low | 6 |

---

## 6. Đánh giá chất lượng

**FR-03 (Forgot Password):** 22.2% TC thất bại. 2 bug Major: OTP chỉ 4 số (không đúng spec 6 số), thiếu trường xác nhận mật khẩu. 2 bug Minor: message regex không nhất quán, lỗi tiếng Anh.

**FR-05 (Product Search):** 30% TC thất bại. 2 bug Critical (XSS, SQL Injection) — nguy cơ bảo mật nghiêm trọng nhất toàn bộ hệ thống.

**FR-07 (Cart):** 95% TC thất bại — tỉ lệ cao nhất toàn bộ dự án. 10 bug được phát hiện bao gồm thiếu nút +/- (BUG-01), thiếu dialog xác nhận xoá (BUG-02), nhãn sai (BUG-03, BUG-07, BUG-10), không merge khi thêm trùng (BUG-04), thiếu hình minh hoạ giỏ rỗng (BUG-05), thiếu badge navbar (BUG-06), cần click 2 lần (BUG-08), thiếu ký hiệu ₫ (BUG-09). Chỉ có 1/20 TC (TC-CART-12) được đánh giá Passed.

**FR-11 (Order History):** 16.7% TC thất bại. 1 bug Major — thiếu hiển thị thời gian trên cột ngày.

**FR-17 (Coupon Management):** 57.1% TC thất bại. Thiếu kiểm tra phân quyền admin, thiếu validation đầu vào, thiếu xác nhận xoá, xử lý lỗi duplicate kém.

**MOBILE-App:** 0% TC thất bại trên mobile, tuy nhiên các bug về XSS và SQL injection ảnh hưởng đến cả nền tảng web và mobile.

**Khuyến nghị ưu tiên:**
1. P0: Fix XSS (FR-05) và SQL Injection (FR-05) — nguy cơ bảo mật
2. P1: Fix admin role check (FR-17), server-side validation (FR-17), apply-coupon auth (FR-09), min_order comparison (FR-09), thiếu nút +/- (BUG-01), thiếu dialog xác nhận xoá (BUG-02), không merge sản phẩm trùng (BUG-04)
3. P2: Fix OTP độ dài (FR-03), thiếu confirm password (FR-03), date time display (FR-11), xác nhận xoá (FR-17), duplicate error (FR-17), nhãn tổng tiền (BUG-03), hình minh hoạ (BUG-05), badge navbar (BUG-06), double click (BUG-08), thiếu ₫ (BUG-09)
4. P3: Fix trim/normalize spaces (FR-05), regex password message (FR-03), lỗi tiếng Anh (FR-03), nhãn nút và logout (BUG-07, BUG-10)
