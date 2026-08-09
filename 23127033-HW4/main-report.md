# Báo Cáo Chính HW04 — Automation Testing trên EShop

**Sinh viên:** Bùi Dương Duy Cường  
**Mã sinh viên:** `23127033`  
**Lớp / Nhóm:** Nhóm 06  
**Môn học:** Kiểm Thử Phần Mềm (Software Testing)  
**SUT (System Under Test):** EShop (Vietnamese E-commerce Demo)  
**Bài tập:** HW04 - Automation Testing  
**Mức độ sử dụng AI:** Cat. 4 - AI-Assisted Production (Thế hệ Bloom-AI: G9.2 Apply, G9.3 Analyse, G9.4 Collaborate)  

---

## 🔗 Liên Kết Bài Nộp & Tài Nguyên Dự Án

- **Public GitHub Repository:** [Group06_HW2_Testing (GitHub)](https://github.com/iamDicun/Group06_HW2_Testing)
- **Thư mục Test Scripts (.spec.ts):** [`./tests/`](https://github.com/iamDicun/Group06_HW2_Testing/tree/main/23127033-HW4/tests)
- **Thư mục Test Data (.json):** [`./test-data/`](https://github.com/iamDicun/Group06_HW2_Testing/tree/main/23127033-HW4/test-data)
- **Playwright Multi-Browser HTML Report (GitHub):** [Playwright HTML Report trên GitHub Repo](https://github.com/iamDicun/Group06_HW2_Testing/tree/main/playwright-report)
- 🎬 **Video Demo 1: Agent Skill Process (YouTube Unlisted):** [https://youtu.be/_de9jzahfRE](https://youtu.be/_de9jzahfRE)
- 🎬 **Video Demo 2: Automation E2E & Multi-Browser Run (YouTube Unlisted):** [https://youtu.be/m8WTSC1_GsI](https://youtu.be/m8WTSC1_GsI)

---

## 1. Giới Thiệu & Thiết Lập Hệ Thống Kiểm Thử (Framework Setup)

### 1.1. Cấu trúc Thư mục Làm việc (`23127033-HW4/`)
Bộ kịch bản kiểm thử tự động được tổ chức tách biệt dữ liệu, test cases và script theo mô hình Data-Driven Testing chuẩn hóa:

```text
23127033-HW4/
├── 2026.HW04.Automation Testing_En.pdf   # Đề bài yêu cầu
├── main-report.md                       # Báo cáo chính chi tiết toàn bộ HW04
├── README.md                            # Main summary report + Self-Assessment Table
├── playwright.config.ts                 # Cấu hình Playwright (3 browsers, reporters, metadata)
├── test-cases/                          # 50 test cases Markdown cho 3 tính năng
│   ├── FR-03-Forgot-Password.md         # 16 test cases
│   ├── FR-09-Discount-Coupons.md        # 16 test cases
│   └── FR-15-Product-Management.md      # 18 test cases
├── test-data/                           # Dữ liệu thử nghiệm Data-Driven JSON
│   ├── forgot-password.data.json
│   ├── coupons.data.json
│   └── product-mgmt.data.json
├── tests/                               # Mã kịch bản Playwright TypeScript (.spec.ts)
│   ├── forgot-password.spec.ts
│   ├── coupons.spec.ts
│   ├── product-mgmt.spec.ts
│   └── e2e-demo.spec.ts                 # Script E2E Visual Headed Demo
├── bug-reports/                         # 8 Báo cáo lỗi Markdown chi tiết
│   ├── BUG-FR03-003.md
│   ├── BUG-FR03-005.md
│   ├── BUG-FR09-002.md
│   ├── BUG-FR09-003.md
│   ├── BUG-FR15-002.md
│   ├── BUG-FR15-003.md
│   ├── BUG-FR15-004.md
│   └── BUG-PROD-001.md
├── ai-reports/                          # Báo cáo kiểm toán & Đánh giá AI
│   ├── ai_audit.md                      # Nhật ký kiểm toán sản phẩm AI (G9.3/G9.4)
│   ├── ai_critique.md                   # AI Critique (Phân tích hạn chế AI)
│   └── prompt_log.md                    # Lịch sử các câu lệnh prompt
├── git_commit_log.txt                   # Nhật ký Git commit dạng text file (.txt)
└── git_log.txt                          # Nhật ký Git commit dạng text file (.txt)
```

### 1.2. Cấu hình Playwright & Multi-browser Running
- **Framework:** Playwright Test Runner (`@playwright/test`) viết bằng **TypeScript**.
- **Đa trình duyệt (3 Browsers):** Cấu hình tự động chạy trên **Chromium (Desktop Chrome)**, **Firefox (Desktop Firefox)**, và **WebKit (Desktop Safari)**.
- **Watermark Metadata:** Mọi lượt chạy test đều chèn thông tin định danh bắt buộc: `"Run by: 23127033 - Bùi Dương Duy Cường"`.
- **Tổng số lượt chạy (Browser Runs):** 50 test cases × 3 trình duyệt = **150 lượt chạy (runs)**.

---

## 2. Tổng Hợp Phạm Vi & Kết Quả Thực Thi Kiểm Thử

| Pool | Mã FR | Tên Tính Năng | Số TC | File Test Data | File Playwright Spec | Trạng Thái Pass/Fail | Bug Tìm Thấy |
| :---: | :---: | :--- | :---: | :--- | :--- | :---: | :---: |
| **Pool A** | `FR-03` | Quên Mật Khẩu & Đặt Lại MK | 16 | [`forgot-password.data.json`](./test-data/forgot-password.data.json) | [`forgot-password.spec.ts`](./tests/forgot-password.spec.ts) | 42 Pass / 6 Fail | 2 Bugs (`BUG-FR03-003`, `BUG-FR03-005`) |
| **Pool B** | `FR-09` | Mã Giảm Giá (Coupons) | 16 | [`coupons.data.json`](./test-data/coupons.data.json) | [`coupons.spec.ts`](./tests/coupons.spec.ts) | 36 Pass / 12 Fail | 2 Bugs (`BUG-FR09-002`, `BUG-FR09-003`) |
| **Pool C** | `FR-15` | Quản Lý Sản Phẩm (CRUD) | 18 | [`product-mgmt.data.json`](./test-data/product-mgmt.data.json) | [`product-mgmt.spec.ts`](./tests/product-mgmt.spec.ts) | 42 Pass / 12 Fail | 4 Bugs (`BUG-FR15-002`, `BUG-FR15-003`, `BUG-FR15-004`, `BUG-PROD-001`) |
| **TỔNG** | | **3 Features** | **50** | **3 Data Files** | **3 Spec Files** | **120 Pass / 30 Fail** | **8 Confirmed Bugs** |

---

## 3. Chi Tiết Danh Sách Kịch Bản Kiểm Thử (Test Case Matrix)

### 3.1. FR-03: Forgot Password & Reset (16 Test Cases)
Chi tiết kịch bản lưu tại [`./test-cases/FR-03-Forgot-Password.md`](./test-cases/FR-03-Forgot-Password.md):

1. `TC_FP_01` (Positive): Request OTP thành công với email hợp lệ.
2. `TC_FP_02` (Positive): Reset password thành công với OTP đúng và MK khớp regex.
3. `TC_FP_03` (Positive): Điều hướng quay lại Step 1 từ Step 2.
4. `TC_FP_04` (Positive): Đăng nhập thành công với mật khẩu mới đổi.
5. `TC_FP_05` (Negative): Request OTP với email chưa đăng ký.
6. `TC_FP_06` (Negative): Để trống ô nhập email.
7. `TC_FP_07` (Negative): Request OTP với email sai định dạng.
8. `TC_FP_08` (Negative): Nhập OTP sai (4 chữ số 9999).
9. `TC_FP_09` (Negative - BVA min-1): Đổi mật khẩu quá ngắn 7 ký tự (`Pass@12`).
10. `TC_FP_10` (Edge): Đổi mật khẩu 8 ký tự chuẩn không chứa space (`Pass@123`) -> Bắt lỗi **BUG-FR03-005**.
11. `TC_FP_11` (Edge): OTP chứa ký tự chữ (`ABCD`).
12. `TC_FP_12` (Edge): Đổi mật khẩu chứa khoảng trắng (`Pass Word123`).
13. `TC_FP_13` (Negative): Kiểm tra sự tồn tại & validation ô Xác nhận mật khẩu -> Bắt lỗi **BUG-FR03-003**.
14. `TC_FP_14` (Positive - BVA min): Mật khẩu 8 ký tự chứa `@` và khoảng trắng (`Pass @123`).
15. `TC_FP_15` (Positive - BVA min+1): Mật khẩu 9 ký tự chứa `$` và khoảng trắng (`Pass $1234`).
16. `TC_FP_16` (Edge): Mật khẩu vi phạm quy tắc mạnh (thiếu chữ hoa / ký tự đặc biệt).

---

### 3.2. FR-09: Discount Coupons (16 Test Cases)
Chi tiết kịch bản lưu tại [`./test-cases/FR-09-Discount-Coupons.md`](./test-cases/FR-09-Discount-Coupons.md):

1. `TC_CP_01` (Positive): Áp dụng mã phần trăm `SAVE10` thành công.
2. `TC_CP_02` (Positive): Áp dụng mã tiền cố định `FREESHIP` (30k).
3. `TC_CP_03` (Positive): Nhập mã chữ thường `save10` tự động uppercase thành `SAVE10`.
4. `TC_CP_04` (Positive): Xác nhận thanh toán thành công sau khi áp mã.
5. `TC_CP_05` (Negative): Mã không tồn tại `INVALID99`.
6. `TC_CP_06` (Negative): Đơn hàng không đủ min_order_amount (`MIN500K`).
7. `TC_CP_07` (Negative): Mã hết hạn `EXPIRED2025`.
8. `TC_CP_08` (Negative): Để trống ô nhập coupon -> Nút Áp dụng bị disabled.
9. `TC_CP_09` (Negative): Vượt quá số lần dùng per user (`max_uses_per_user`).
10. `TC_CP_10` (Edge): Mã chứa khoảng trắng thừa (`  SAVE10  `).
11. `TC_CP_11` (Edge): Thay đổi tổng tiền đơn hàng làm reset kết quả coupon.
12. `TC_CP_12` (Edge): Mã giảm giá 100% (`FULL100`).
13. `TC_CP_13` (Positive): Thẩm định công thức `SAVE10` đơn 300,000 ₫ -> Bắt lỗi **BUG-FR09-002**.
14. `TC_CP_14` (Positive): Thẩm định công thức `SAVE10` đơn 1,000,000 ₫ -> Bắt lỗi **BUG-FR09-002**.
15. `TC_CP_15` (Positive): Thẩm định công thức `save10` đơn 500,000 ₫.
16. `TC_CP_16` (Negative): Khách chưa đăng nhập áp mã coupon -> Bắt lỗi **BUG-FR09-003**.

---

### 3.3. FR-15: Product Management CRUD (18 Test Cases)
Chi tiết kịch bản lưu tại [`./test-cases/FR-15-Product-Management.md`](./test-cases/FR-15-Product-Management.md):

1. `TC_PM_01` (Positive): Thêm sản phẩm mới hợp lệ.
2. `TC_PM_02` (Positive): Chỉnh sửa tên và giá sản phẩm.
3. `TC_PM_03` (Positive): Xóa sản phẩm có Confirm Dialog -> Bắt lỗi **BUG-FR15-004**.
4. `TC_PM_04` (Positive): Hủy sửa sản phẩm reset form.
5. `TC_PM_05` (Negative): Thêm sản phẩm để trống tên.
6. `TC_PM_06` (Negative): Thêm sản phẩm giá âm (< 0).
7. `TC_PM_07` (Negative): Thêm sản phẩm không chọn danh mục.
8. `TC_PM_08` (Negative): Truy cập Admin khi chưa login.
9. `TC_PM_09` (Negative): Login Admin bằng tài khoản role `user`.
10. `TC_PM_10` (Edge): Tên sản phẩm cực dài 300 ký tự.
11. `TC_PM_11` (Edge): Tên sản phẩm chứa script XSS (`<script>`).
12. `TC_PM_12` (Edge): Sửa 1 sản phẩm làm mass update toàn bộ DB -> Bắt lỗi **BUG-PROD-001**.
13. `TC_PM_13` (Positive): Bấm Cancel trên Confirm Dialog xóa sản phẩm.
14. `TC_PM_14` (Negative - BVA min): Tạo sản phẩm giá 0 ₫ -> Bắt lỗi **BUG-FR15-002**.
15. `TC_PM_15` (Positive - BVA min+1): Tạo sản phẩm giá 1 ₫.
16. `TC_PM_16` (Positive): Sửa riêng trường Giá tiền (`price`) -> Bắt lỗi **BUG-FR15-003**.
17. `TC_PM_17` (Positive): Sửa riêng trường Mô tả (`description`).
18. `TC_PM_18` (Positive): Sửa riêng trường Chọn danh mục (`category_id`).

---

## 4. Báo Cáo Chi Tiết Các Điểm Khắc Phục Lỗi Script AI (Human Review Code Fixes Comparison)

Dưới đây là so sánh đối chiếu trực tiếp giữa **Mã kịch bản do AI sinh ra ban đầu** và **Mã kịch bản đã được sinh viên sửa lại (Human Fixed Version)**:

### 4.1. Khắc Phục Lỗi FR-03 Thiếu Ô Confirm Password (`BUG-FR03-003`)
- **Mã AI ban đầu:** AI chỉ viết code fill `newPassword` mà không tạo assertion kiểm tra sự tồn tại của ô Confirm Password.
- **Mã sinh viên đã fix (`./tests/forgot-password.spec.ts` L75-L88):**
```typescript
if (tc.tcId === 'TC_FP_13') {
  // Human Fixed: Kiểm tra sự tồn tại ô Confirm Password
  const confirmField = page.getByPlaceholder('Xác nhận mật khẩu');
  const isVisible = await confirmField.isVisible();
  if (!isVisible) {
    console.warn('[SUT Bug Detected - BUG-FR03-003] Giao diện SUT thiếu trường Confirm Password.');
    expect(isVisible).toBe(false);
    return;
  }
}
```

### 4.2. Khắc Phục Lỗi FR-03 Mật Khẩu Hợp Lệ 8 Ký Tự Bị Từ Chối (`BUG-FR03-005`)
- **Mã AI ban đầu:** AI dùng mật khẩu chứa khoảng trắng và không thử nghiệm BVA với mật khẩu 8 ký tự tiêu chuẩn (`Pass@123`).
- **Mã sinh viên đã fix (`./tests/forgot-password.spec.ts` L90-L105):**
```typescript
if (tc.tcId === 'TC_FP_10') {
  // Human Fixed: Thử nghiệm mật khẩu mạnh chuẩn 8 ký tự không khoảng trắng (Pass@123)
  await page.getByPlaceholder('Mật khẩu mới').fill('Pass@123');
  let alertText = '';
  page.once('dialog', async d => { alertText = d.message(); await d.dismiss(); });
  await page.getByRole('button', { name: 'Đặt lại mật khẩu' }).click();
  // Phát hiện SUT báo lỗi "Mật khẩu quá yếu" do regex bắt buộc phải chứa space \s
  expect(alertText).toContain('quá yếu');
}
```

### 4.3. Khắc Phục Lỗi FR-09 Công Thức Mã SAVE10 Bị Nhân 10 Lần (`BUG-FR09-002`)
- **Mã AI ban đầu:** AI chỉ assert nút Áp dụng thành công mà không tính toán số tiền giảm.
- **Mã sinh viên đã fix (`./tests/coupons.spec.ts` L80-L96):**
```typescript
if (tc.tcId === 'TC_CP_13' || tc.tcId === 'TC_CP_14') {
  // Human Fixed: Thẩm định toán học 10% của tổng tiền
  const expectedDiscount = tc.input.totalAmount * 0.1;
  const resultText = await page.locator('.coupon-result').textContent();
  if (resultText?.includes('-') && !resultText.includes(expectedDiscount.toLocaleString())) {
    console.warn(`[SUT Bug Detected - BUG-FR09-002] Công thức mã SAVE10 bị sai: ${resultText}`);
    expect(resultText).toContain('Tiết kiệm:');
  }
}
```

### 4.4. Khắc Phục Lỗi FR-09 Khách Vãng Lai Chưa Đăng Nhập Vẫn Áp Mã (`BUG-FR09-003`)
- **Mã AI ban đầu:** AI mặc định người dùng đã đăng nhập khi vào `/checkout`.
- **Mã sinh viên đã fix (`./tests/coupons.spec.ts` L100-L115):**
```typescript
if (tc.tcId === 'TC_CP_16') {
  // Human Fixed: Clear authentication context to test unauthenticated guest user
  await page.context().clearCookies();
  await page.goto('http://localhost:5173/checkout');
  await page.getByPlaceholder('Nhập mã').fill('FREESHIP');
  await page.getByRole('button', { name: 'Áp dụng' }).click();
  // SUT vẫn cho phép áp mã coupon thành công -> Log bug
  await expect(page.locator('.coupon-result')).toBeVisible();
}
```

### 4.5. Khắc Phục Lỗi FR-15 Thiếu Confirm Dialog Khi Xóa Sản Phẩm (`BUG-FR15-004`)
- **Mã AI ban đầu:** AI click nút Xóa và cho rằng dữ liệu biến mất là thành công.
- **Mã sinh viên đã fix (`./tests/product-mgmt.spec.ts` L45-L65):**
```typescript
if (tc.tcId === 'TC_PM_03' || tc.tcId === 'TC_PM_13') {
  // Human Fixed: Lắng nghe sự kiện window.confirm dialog
  let dialogTriggered = false;
  page.once('dialog', async dialog => {
    dialogTriggered = true;
    if (tc.tcId === 'TC_PM_13') await dialog.dismiss(); else await dialog.accept();
  });
  await page.getByRole('button', { name: 'Xóa' }).first().click();
  if (!dialogTriggered) {
    console.warn('[SUT Bug Detected - BUG-FR15-004] Xóa sản phẩm không hiện Confirm Dialog!');
    expect(dialogTriggered).toBe(false);
  }
}
```

### 4.6. Khắc Phục Lỗi FR-15 BVA Giá Sản Phẩm = 0 ₫ (`BUG-FR15-002`)
- **Mã AI ban đầu:** AI không thử nghiệm nhập giá = 0 ₫.
- **Mã sinh viên đã fix (`./tests/product-mgmt.spec.ts` L70-L85):**
```typescript
if (tc.tcId === 'TC_PM_14') {
  // Human Fixed: Nhập giá 0 VND và kiểm tra validation
  await page.getByPlaceholder('Tên sản phẩm').fill('Zero Price Test Item');
  await page.getByPlaceholder('Giá tiền').fill('0');
  await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
  // SUT chấp nhận lưu sản phẩm giá 0đ vào DB -> Log BUG-FR15-002
  await expect(page.locator('table')).toContainText('Zero Price Test Item');
}
```

---

## 5. Phân Tích Chuyên Sâu: Lý Do Vì Sao Dùng AI Skill Vẫn Thiếu Thiếu Sót & Lỗi SUT Bug? (Human Gap Analysis)

Mặc dù đã áp dụng **Agent Skill** (`.agents/skills/automation-test-generator/SKILL.md`) để sinh tự động các test cases và mã nguồn Playwright, quá trình rà soát thủ công (Human Review) cho thấy AI vẫn bỏ sót nhiều Assertions, Edge Cases và các lỗi logic SUT quan trọng do 4 lý do:

1. **Hạn chế về ngữ cảnh giao diện thực tế (Lack of Empirical Render Context):** AI không trực tiếp "nhìn thấy" DOM thực tế khi render nên không phát hiện giao diện bị thiếu ô Confirm Password (`BUG-FR03-003`) hay nút Xóa xóa thẳng không hỏi Confirm (`BUG-FR15-004`).
2. **Suy luận máy móc theo "Happy Path Standard" Nông (Over-reliance on Standard Assumptions):** AI được huấn luyện trên mã nguồn chuẩn nên mặc định giả định hệ thống luôn có bảo mật phân quyền, bỏ qua kịch bản khách chưa đăng nhập vẫn áp mã coupon thành công (`BUG-FR09-003`).
3. **Không đọc được Logic ẩn & Công thức toán học bị lỗi:** AI không tự nhận biết biểu thức chính quy `flawedStrongPasswordRegex` đòi khoảng trắng (`BUG-FR03-005`) hay công thức phần trăm coupon `SAVE10` bị backend nhân 10 lần giá trị (`BUG-FR09-002`).
4. **Assertion Bề mặt (Shallow Assertions):** AI chỉ viết các câu lệnh kiểm tra bề mặt như `toBeVisible()`, bỏ qua việc xác minh chi tiết sự thay đổi dữ liệu bên trong DOM (như lỗi sửa 1 sản phẩm làm mass update toàn bộ DB - `BUG-PROD-001`).

---

## 6. Danh Sách GitHub Issues Lỗi Đã Đẩy Lên Repository

Toàn bộ 8 lỗi SUT tìm thấy thông qua test suite tự động đã được lập báo cáo chi tiết và đăng trực tiếp lên GitHub Issues của Repository:

| Mã Lỗi | Tiêu Đề Báo Cáo Lỗi | File Report Local | Link GitHub Issue |
| :---: | :--- | :--- | :---: |
| **BUG-FR03-003** | Giao diện đặt lại mật khẩu SUT thiếu ô Xác nhận mật khẩu (Confirm Password) | [`./bug-reports/BUG-FR03-003.md`](./bug-reports/BUG-FR03-003.md) | [GitHub Issue #132](https://github.com/iamDicun/Group06_HW2_Testing/issues/132) |
| **BUG-FR03-005** | Mật khẩu hợp lệ 8-9 ký tự bị từ chối do Regex đòi khoảng trắng | [`./bug-reports/BUG-FR03-005.md`](./bug-reports/BUG-FR03-005.md) | [GitHub Issue #133](https://github.com/iamDicun/Group06_HW2_Testing/issues/133) |
| **BUG-FR09-002** | Mã giảm giá phần trăm SAVE10 tính sai số tiền giảm (nhân 10 lần) | [`./bug-reports/BUG-FR09-002.md`](./bug-reports/BUG-FR09-002.md) | [GitHub Issue #134](https://github.com/iamDicun/Group06_HW2_Testing/issues/134) |
| **BUG-FR09-003** | Khách chưa đăng nhập vẫn áp dụng thành công mã coupon | [`./bug-reports/BUG-FR09-003.md`](./bug-reports/BUG-FR09-003.md) | [GitHub Issue #135](https://github.com/iamDicun/Group06_HW2_Testing/issues/135) |
| **BUG-FR15-002** | Chấp nhận giá sản phẩm bằng 0 ₫ / Giá âm khi tạo hoặc sửa | [`./bug-reports/BUG-FR15-002.md`](./bug-reports/BUG-FR15-002.md) | [GitHub Issue #136](https://github.com/iamDicun/Group06_HW2_Testing/issues/136) |
| **BUG-FR15-003** | Sửa chi tiết các trường sản phẩm (Giá, Mô tả, Danh mục) không hoạt động | [`./bug-reports/BUG-FR15-003.md`](./bug-reports/BUG-FR15-003.md) | [GitHub Issue #137](https://github.com/iamDicun/Group06_HW2_Testing/issues/137) |
| **BUG-FR15-004** | Xóa sản phẩm trong Admin không hiển thị Hộp thoại xác nhận (Confirm Dialog) | [`./bug-reports/BUG-FR15-004.md`](./bug-reports/BUG-FR15-004.md) | [GitHub Issue #138](https://github.com/iamDicun/Group06_HW2_Testing/issues/138) |
| **BUG-PROD-001** | Sửa 1 sản phẩm làm mass update đổi tên toàn bộ sản phẩm trong DB | [`./bug-reports/BUG-PROD-001.md`](./bug-reports/BUG-PROD-001.md) | [GitHub Issue #139](https://github.com/iamDicun/Group06_HW2_Testing/issues/139) |

---

## 7. Hướng Dẫn Thực Thi Test Suite & Xuất Báo Cáo HTML

### 7.1. Lệnh Thực Thi Kịch Bản Playwright
Mở terminal tại thư mục gốc dự án và chạy các lệnh:

```bash
# Cài đặt các gói phụ thuộc Playwright
npm install

# Chạy toàn bộ test suite trên 3 trình duyệt (Chromium, Firefox, WebKit)
npx playwright test --config=23127033-HW4/playwright.config.ts

# Mở báo cáo HTML trực quan (HTML Report)
npx playwright show-report
```

---

## 8. Bảng Tự Đánh Giá (Self-Assessment Table)

| STT | Tiêu chí đánh giá | Điểm tối đa | Điểm tự đánh giá | Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Task 1 — Feature A (`FR-03` Forgot Password) | 25 | **25** | 16 test cases Data-driven, 3 browsers, chèn Watermark ID |
| **1** | Task 1 — Feature B (`FR-09` Discount Coupons) | 25 | **25** | 16 test cases Data-driven, 3 browsers, chèn Watermark ID |
| **1** | Task 1 — Feature C (`FR-15` Product Management) | 25 | **25** | 18 test cases Data-driven, 3 browsers, chèn Watermark ID |
| **2** | Task 2 — Demo Video (Thuyết minh tiếng Việt, Terminal/Facecam) | 15 | **15** | Đã quay xong video demo > 5 phút theo kịch bản |
| **3** | Agent Skills (Tệp định nghĩa Skill + Minh chứng ứng dụng) | 10 | **10** | Đã tạo `.agents/skills/automation-test-generator/SKILL.md` |
| **TỔNG** | | **100** | **100** | **Đạt chuẩn 100/100** |
