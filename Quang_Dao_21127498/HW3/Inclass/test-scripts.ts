import { test, expect } from '@playwright/test';
import * as loginData from '../test-data/login-data.json';

test.describe('FR-02: Feature Testing - Đăng nhập', () => {

  loginData.forEach((data) => {
    test(`[${data.id}] - ${data.description}`, async ({ page }) => {
      // 1. Điều hướng tới trang Đăng nhập
      await page.goto('http://localhost:5173/login');

      // Khởi tạo các locator
      const emailInput = page.getByLabel(/email/i).or(page.locator('input[type="email"]'));
      const passwordInput = page.getByLabel(/mật khẩu|password/i).or(page.locator('input[type="password"]'));
      const submitButton = page.getByRole('button', { name: /đăng nhập|login/i });

      // [Pattern 1]: Assertion kiểm tra nút bấm/input hiển thị trên UI
      await expect(submitButton).toBeVisible();

      // 2. Nhập thông tin test data
      if (data.email) await emailInput.fill(data.email);
      if (data.password) await passwordInput.fill(data.password);

      // 3. Bấm đăng nhập
      await submitButton.click();

      // 4. Kiểm tra kết quả mong đợi (Data-Driven Assertions)
      if (data.expectedStatus === 'success') {
        // [Pattern 2]: Assertion kiểm tra URL chuyển hướng sau đăng nhập
        await expect(page).toHaveURL(new RegExp(data.expectedUrl));
      } else {
        // [Pattern 3]: Assertion kiểm tra thông báo lỗi hiển thị
        const errorMessage = page.locator('.error-message, [role="alert"], .toast');
        await expect(errorMessage).toContainText(new RegExp(data.expectedMessage, 'i'));
      }
    });
  });

});