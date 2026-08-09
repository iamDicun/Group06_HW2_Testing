# Git Log History — HW04 Automation Testing

**Sinh viên:** Bùi Dương Duy Cường  
**Mã sinh viên:** `23127033`  
**Repository GitHub:** [Group06_HW2_Testing](https://github.com/iamDicun/Group06_HW2_Testing)

---

## 1. Nhật Ký Commit Từng Bước (Incremental Commits Log)

```text
* c91284a - Dicun : update report & final documentation
* d5d2a95 - Dicun : kiểm tra giá sản phẩm = 0 (FR-15 TC_PM_14, TC_PM_15)
* e21553a - Dicun : kiểm tra hộp thoại xác nhận delete (FR-15 TC_PM_03, TC_PM_13)
* 9e68975 - Dicun : kiểm tra đăng nhập trước khi nhập coupon (FR-09 TC_CP_16)
* 6d8cb32 - Dicun : kiểm tra áp mã giảm giá save10 (FR-09 TC_CP_13..15)
* 0be24ec - Dicun : kiểm tra độ dài mật khẩu và ký tự đặc biệt (FR-03 TC_FP_09, TC_FP_14..16)
* e3d695a - Dicun : kiểm tra ô xác nhận mật khẩu (FR-03 TC_FP_13)
* 371ee4b - Dicun : sinh script test lần đầu dựa vào skills
* b25df8c - Dicun : commit template hw4 hw5
```

---

## 2. Chi Tiết Các Lần Commit

1. **`371ee4b` - `sinh script test lần đầu dựa vào skills`**
   - Khởi tạo 3 file Playwright TS script sơ khai (`forgot-password.spec.ts`, `coupons.spec.ts`, `product-mgmt.spec.ts`), 3 file test-data JSON và 3 file test-cases Markdown dựa trên Agent Skill.
2. **`e3d695a` - `kiểm tra ô xác nhận mật khẩu`**
   - Bổ sung `TC_FP_13` và cập nhật `forgot-password.spec.ts` kiểm tra ô Confirm Password (phát hiện `BUG-FR03-003`).
3. **`0be24ec` - `kiểm tra độ dài mật khẩu và ký tự đặc biệt`**
   - Bổ sung `TC_FP_09`, `TC_FP_14`, `TC_FP_15`, `TC_FP_16` kiểm thử BVA độ dài 7, 8 (`@`), 9 (`$`) ký tự và bắt lỗi `BUG-FR03-005`.
4. **`6d8cb32` - `kiểm tra áp mã giảm giá save10`**
   - Bổ sung `TC_CP_13`, `TC_CP_14`, `TC_CP_15` thẩm định số tiền giảm 10% và phát hiện lỗi `BUG-FR09-002`.
5. **`9e68975` - `kiểm tra đăng nhập trước khi nhập coupon`**
   - Bổ sung `TC_CP_16` kiểm tra phân quyền khách vãng lai (Guest) áp coupon và phát hiện `BUG-FR09-003`.
6. **`e21553a` - `kiểm tra hộp thoại xác nhận delete`**
   - Bổ sung `TC_PM_03`, `TC_PM_13` và listener `dialog` trong `product-mgmt.spec.ts` kiểm tra Confirm Dialog khi xóa sản phẩm (`BUG-FR15-004`).
7. **`d5d2a95` - `kiểm tra giá sản phẩm = 0`**
   - Bổ sung `TC_PM_14`, `TC_PM_15` kiểm thử BVA giá 0 ₫ / giá âm và phát hiện `BUG-FR15-002`.
8. **`c91284a` - `update report & final documentation`**
   - Hoàn thiện `main-report.md`, `README.md`, các báo cáo AI và minh chứng 8 GitHub Issues.
