# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-demo.spec.ts >> HW04 End-to-End Automation Flow Demo >> E2E Flow: Quên mật khẩu -> Đặt lại mật khẩu mới -> Đăng nhập thành công
- Location: 23127033-HW4\tests\e2e-demo.spec.ts:4:7

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('HW04 End-to-End Automation Flow Demo', () => {
  4  |   test('E2E Flow: Quên mật khẩu -> Đặt lại mật khẩu mới -> Đăng nhập thành công', async ({ page }, testInfo) => {
  5  |     // Chèn Watermark định danh tác giả
  6  |     testInfo.annotations.push({
  7  |       type: 'Run by',
  8  |       description: '23127033 - Bùi Dương Duy Cường'
  9  |     });
  10 | 
  11 |     console.log('🚀 Bước 1: Truy cập trang Quên mật khẩu (/forgot-password)');
  12 |     await page.goto('http://localhost:5173/forgot-password');
  13 |     await expect(page.getByRole('heading', { name: 'Quên Mật Khẩu' })).toBeVisible();
  14 | 
  15 |     console.log('📧 Bước 2: Nhập email tài khoản đã đăng ký (user@example.com)');
  16 |     await page.getByRole('textbox').first().fill('user@example.com');
  17 |     await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  18 | 
  19 |     console.log('🔑 Bước 3: Lấy mã OTP xuất ra trên giao diện');
  20 |     const otpNotice = page.locator('div.bg-green-100');
> 21 |     await expect(otpNotice).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  22 |     const noticeText = await otpNotice.textContent();
  23 |     const capturedOtp = noticeText ? noticeText.split('Mã OTP của bạn là:')[1].trim() : '1234';
  24 |     console.log(`=> Mã OTP thu thập được: ${capturedOtp}`);
  25 | 
  26 |     console.log('📝 Bước 4: Nhập OTP và Mật khẩu mới mạnh (có khoảng trắng theo regex SUT)');
  27 |     await page.getByRole('textbox').first().fill(capturedOtp);
  28 |     await page.locator('input[type="password"]').fill('NewPass 123!');
  29 | 
  30 |     // Lắng nghe hộp thoại Alert đổi mật khẩu thành công
  31 |     page.once('dialog', async dialog => {
  32 |       console.log(`=> Hộp thoại Alert: ${dialog.message()}`);
  33 |       await dialog.dismiss();
  34 |     });
  35 | 
  36 |     console.log('💾 Bước 5: Nhấn nút Đặt lại mật khẩu');
  37 |     await page.getByRole('button', { name: 'Đặt lại mật khẩu' }).click();
  38 | 
  39 |     console.log('🔑 Bước 6: Tự động chuyển hướng sang trang Đăng nhập (/login)');
  40 |     await expect(page).toHaveURL(/.*login/);
  41 |     await expect(page.getByRole('heading', { name: 'Đăng Nhập' })).toBeVisible();
  42 | 
  43 |     console.log('✅ Kịch bản E2E hoàn tất thành công!');
  44 |   });
  45 | });
  46 | 
```