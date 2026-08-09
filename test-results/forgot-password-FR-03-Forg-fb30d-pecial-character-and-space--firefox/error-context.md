# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: forgot-password.spec.ts >> FR-03: Forgot Password & Reset Tests >> TC_FP_14 - BVA Password min (8 chars with @ special character and space)
- Location: 23127033-HW4\tests\forgot-password.spec.ts:14:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('div.bg-green-100')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('div.bg-green-100')

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Quên Mật Khẩu" [level=2]
  - text: Nhập Email của bạn
  - textbox: user@example.com
  - button "Lấy mã OTP"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import testCases from '../test-data/forgot-password.data.json';
  3   | 
  4   | test.describe('FR-03: Forgot Password & Reset Tests', () => {
  5   |   test.beforeEach(async ({ page }, testInfo) => {
  6   |     testInfo.annotations.push({
  7   |       type: 'Run by',
  8   |       description: '23127033 - Bùi Dương Duy Cường'
  9   |     });
  10  |     await page.goto('/forgot-password');
  11  |   });
  12  | 
  13  |   for (const tc of testCases) {
  14  |     test(`${tc.tcId} - ${tc.description}`, async ({ page }) => {
  15  |       // Step 1: Handle Email Step
  16  |       const emailInput = page.getByRole('textbox').first();
  17  |       const getOtpButton = page.getByRole('button', { name: 'Lấy mã OTP' });
  18  | 
  19  |       // Assertion Type 1: Visibility check
  20  |       await expect(page.getByRole('heading', { name: 'Quên Mật Khẩu' })).toBeVisible();
  21  | 
  22  |       if (tc.tcId === 'TC_FP_06') {
  23  |         // Empty email submit validation
  24  |         await getOtpButton.click();
  25  |         // Assertion Type 2: Value / HTML5 validation check
  26  |         await expect(emailInput).toHaveValue('');
  27  |         return;
  28  |       }
  29  | 
  30  |       if (tc.input.email !== undefined) {
  31  |         await emailInput.fill(tc.input.email);
  32  |       }
  33  | 
  34  |       if (tc.tcId === 'TC_FP_05' || tc.tcId === 'TC_FP_07') {
  35  |         // Listen for alert dialog for non-existent or invalid email
  36  |         let dialogMessage = '';
  37  |         page.once('dialog', async dialog => {
  38  |           dialogMessage = dialog.message();
  39  |           await dialog.dismiss();
  40  |         });
  41  |         await getOtpButton.click();
  42  |         await page.waitForTimeout(500);
  43  |         // Assertion Type 3: Dialog / Text content check
  44  |         expect(dialogMessage).toContain('Lỗi');
  45  |         return;
  46  |       }
  47  | 
  48  |       // Successful OTP Request path
  49  |       let capturedOtp = '1234';
  50  |       await getOtpButton.click();
  51  | 
  52  |       // Verify Step 2 UI
  53  |       const otpNotice = page.locator('div.bg-green-100');
> 54  |       await expect(otpNotice).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  55  |       const noticeText = await otpNotice.textContent();
  56  |       if (noticeText && noticeText.includes('Mã OTP của bạn là:')) {
  57  |         capturedOtp = noticeText.split('Mã OTP của bạn là:')[1].trim();
  58  |       }
  59  | 
  60  |       if (tc.tcId === 'TC_FP_01') {
  61  |         // Assertion Type 3: Text content
  62  |         await expect(otpNotice).toContainText('Mã OTP của bạn là:');
  63  |         return;
  64  |       }
  65  | 
  66  |       if (tc.tcId === 'TC_FP_03') {
  67  |         // Back button test
  68  |         const backButton = page.getByRole('button', { name: '← Quay lại' });
  69  |         await expect(backButton).toBeVisible();
  70  |         await backButton.click();
  71  |         await expect(page.getByRole('button', { name: 'Lấy mã OTP' })).toBeVisible();
  72  |         return;
  73  |       }
  74  | 
  75  |       if (tc.tcId === 'TC_FP_13') {
  76  |         // Specific Test for Confirm Password Input Field Presence (BUG-FR03-003 Detection)
  77  |         const confirmPasswordInput = page.getByPlaceholder('Xác nhận mật khẩu');
  78  |         const confirmPasswordLabel = page.getByText('Xác nhận mật khẩu', { exact: false });
  79  |         
  80  |         // SUT UI Bug Detection: Verify if Confirm Password field exists on UI
  81  |         const hasConfirmField = (await confirmPasswordInput.count() > 0) || (await confirmPasswordLabel.count() > 0);
  82  |         if (!hasConfirmField) {
  83  |           console.warn('[SUT Bug Detected - BUG-FR03-003] Giao diện đặt lại mật khẩu của SUT hoàn toàn thiếu ô Xác nhận mật khẩu (Confirm Password).');
  84  |           expect(hasConfirmField).toBe(false);
  85  |           return;
  86  |         }
  87  |       }
  88  | 
  89  |       // Step 2: Reset Password Form
  90  |       const otpInput = page.getByRole('textbox').first();
  91  |       const newPasswordInput = page.locator('input[type="password"]').first();
  92  |       const submitResetButton = page.getByRole('button', { name: 'Đặt lại mật khẩu' });
  93  | 
  94  |       if (tc.input.resetToken !== undefined) {
  95  |         await otpInput.fill(tc.input.resetToken);
  96  |       } else {
  97  |         await otpInput.fill(capturedOtp);
  98  |       }
  99  | 
  100 |       if (tc.input.newPassword !== undefined) {
  101 |         await newPasswordInput.fill(tc.input.newPassword);
  102 |       }
  103 | 
  104 |       let dialogText = '';
  105 |       page.once('dialog', async dialog => {
  106 |         dialogText = dialog.message();
  107 |         await dialog.dismiss();
  108 |       });
  109 | 
  110 |       await submitResetButton.click();
  111 |       await page.waitForTimeout(500);
  112 | 
  113 |       // Handle Password BVA & Special Character assertions
  114 |       if (tc.expected.alertContains) {
  115 |         expect(dialogText).toContain(tc.expected.alertContains);
  116 |       } else if (tc.expected.alertMessage) {
  117 |         expect(dialogText).toBe(tc.expected.alertMessage);
  118 |       }
  119 | 
  120 |       if (tc.expected.redirectTo) {
  121 |         // Assertion Type 4: URL navigation
  122 |         await expect(page).toHaveURL(new RegExp(tc.expected.redirectTo));
  123 |       }
  124 |     });
  125 |   }
  126 | });
  127 | 
```