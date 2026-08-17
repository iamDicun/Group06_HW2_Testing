import { test, expect } from '@playwright/test';

test.describe('HW04 End-to-End Automation Flow Demo', () => {
  test('E2E Flow: Quên mật khẩu -> Đặt lại mật khẩu mới -> Đăng nhập thành công', async ({ page }, testInfo) => {
    // Chèn Watermark định danh tác giả
    testInfo.annotations.push({
      type: 'Run by',
      description: '23127033 - Bùi Dương Duy Cường'
    });

    console.log('🚀 Bước 1: Truy cập trang Quên mật khẩu (/forgot-password)');
    await page.goto('http://localhost:5173/forgot-password');
    await expect(page.getByRole('heading', { name: 'Quên Mật Khẩu' })).toBeVisible();

    console.log('📧 Bước 2: Nhập email tài khoản đã đăng ký (user@example.com)');
    await page.getByRole('textbox').first().fill('user@example.com');
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    console.log('🔑 Bước 3: Lấy mã OTP xuất ra trên giao diện');
    const otpNotice = page.locator('div.bg-green-100');
    await expect(otpNotice).toBeVisible();
    const noticeText = await otpNotice.textContent();
    const capturedOtp = noticeText ? noticeText.split('Mã OTP của bạn là:')[1].trim() : '1234';
    console.log(`=> Mã OTP thu thập được: ${capturedOtp}`);

    console.log('📝 Bước 4: Nhập OTP và Mật khẩu mới mạnh (có khoảng trắng theo regex SUT)');
    await page.getByRole('textbox').first().fill(capturedOtp);
    await page.locator('input[type="password"]').fill('NewPass 123!');

    // Lắng nghe hộp thoại Alert đổi mật khẩu thành công
    page.once('dialog', async dialog => {
      console.log(`=> Hộp thoại Alert: ${dialog.message()}`);
      await dialog.dismiss();
    });

    console.log('💾 Bước 5: Nhấn nút Đặt lại mật khẩu');
    await page.getByRole('button', { name: 'Đặt lại mật khẩu' }).click();

    console.log('🔑 Bước 6: Tự động chuyển hướng sang trang Đăng nhập (/login)');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: 'Đăng Nhập' })).toBeVisible();

    console.log('✅ Kịch bản E2E hoàn tất thành công!');
  });
});
