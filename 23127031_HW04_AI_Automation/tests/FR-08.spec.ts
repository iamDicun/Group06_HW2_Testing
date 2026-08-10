import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const STUDENT_ID = '23127031';

const testDataPath = path.resolve(__dirname, '../test-data/fr08-checkout.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;

function usernameField(page: Page) {
  return page.locator('input[type="text"]').nth(0);
}

function passwordField(page: Page) {
  return page.locator('input[type="text"]').nth(1);
}

async function performLogin(page: Page, email: string, password: string) {
  await page.goto('/login');
  await usernameField(page).fill(email);
  await passwordField(page).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('**/');
}

async function addProductToCart(page: Page, productName: string) {
  await page.waitForSelector('h2');
  await page.waitForTimeout(500);
  const headings = page.locator('h2');
  const allNames = await headings.allTextContents();
  const idx = allNames.findIndex(n => n.trim() === productName);
  if (idx === -1) throw new Error(`Product "${productName}" not found`);
  await headings.nth(idx).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: /thêm vào giỏ/i }).nth(idx).click();
  await page.waitForTimeout(1000);
}

async function navigateToCheckout(page: Page) {
  // Bước 1: Click "Giỏ hàng" link (SPA nav, giữ React state)
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  await page.waitForTimeout(500);
  // Bước 2: Click "Tiến hành thanh toán" button
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  await page.waitForTimeout(500);
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US');
}

test.describe('FR-08: Thanh toán (Checkout) | Run by: ' + STUDENT_ID, () => {

  // TC-001: Chưa đăng nhập → redirect về login
  test('TC-AUTOMATION-FR-08-001 - Chưa đăng nhập → redirect về login', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page).toHaveURL(/login/i);
  });

  // TC-002: Đã đăng nhập → access checkout thành công
  test('TC-AUTOMATION-FR-08-002 - Đã đăng nhập → access checkout thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-002');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    await expect(page).toHaveURL(/checkout/i);
  });

  // TC-003: Hiển thị danh sách sản phẩm trên checkout
  test('TC-AUTOMATION-FR-08-003 - Hiển thị danh sách sản phẩm trên checkout', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-003');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    for (const item of tc.data.cartItems) {
      await expect(page.getByText(item.name, { exact: false })).toBeVisible();
    }
  });

  // TC-004: Tổng tiền hiển thị đúng
  test('TC-AUTOMATION-FR-08-004 - Tổng tiền hiển thị đúng', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-004');
    await performLogin(page, tc.data.email, tc.data.password);
    await page.waitForSelector('h2');
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    const totalText = formatPrice(tc.expected.expectedTotal);
    await page.getByText('Tổng thanh toán').waitFor({ timeout: 10000 });
    await expect(page.getByText(totalText)).toBeVisible();
  });

  // TC-005: Total field là readonly hoặc disabled
  test('TC-AUTOMATION-FR-08-005 - Total field là readonly hoặc disabled', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-005');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    const editableInput = page.locator('input[type="number"]:not([readonly]):not([disabled])');
    expect(await editableInput.count()).toBe(0);
  });

  // TC-006: Backend tự tính lại total
  test('TC-AUTOMATION-FR-08-006 - Backend tự tính lại total (bỏ qua client)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-006');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    let requestSent = false;
    page.on('request', (request) => {
      if (request.url().includes('/api/checkout') && request.method() === 'POST') {
        requestSent = true;
      }
    });
    await page.getByRole('button', { name: /xác nhận thanh toán/i }).click();
    await page.waitForTimeout(2000);
    expect(requestSent).toBeTruthy();
  });

  // TC-007: Thanh toán thành công → giỏ hàng được xóa
  test('TC-AUTOMATION-FR-08-007 - Thanh toán thành công → giỏ hàng được xóa', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-007');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    await page.getByRole('button', { name: /xác nhận thanh toán/i }).click();
    await page.waitForTimeout(2000);

    // Sau thanh toán, checkout nên hiển thị giỏ trống
    const productItems = page.locator('text=x ₫');
    expect(await productItems.count()).toBe(0);
  });

  // TC-008: Sau thanh toán, checkout page trống
  test('TC-AUTOMATION-FR-08-008 - Sau thanh toán, checkout page trống', async ({ page }) => {
    await performLogin(page, 'test@eshop.com', 'Test1234!');
    // Đợi product list load
    await page.waitForSelector('h2:has-text("iPhone 15 Pro Max")');
    await addProductToCart(page, 'MacBook Pro M3');
    await navigateToCheckout(page);
    await page.getByRole('button', { name: /xác nhận thanh toán/i }).click();
    await page.waitForTimeout(2000);
    // Sau thanh toán, redirect về home → navigate lại checkout qua Giỏ hàng
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
    await page.waitForTimeout(500);
    const productItems = page.locator('text=x ₫');
    expect(await productItems.count()).toBe(0);
  });

  // TC-009: Thanh toán >=3 sản phẩm
  test('TC-AUTOMATION-FR-08-009 - Thanh toán >=3 sản phẩm', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-009');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    for (const item of tc.data.cartItems) {
      await expect(page.getByText(item.name, { exact: false })).toBeVisible();
    }
    const totalText = formatPrice(tc.expected.expectedTotal);
    await page.getByText('Tổng thanh toán').waitFor({ timeout: 10000 });
    await expect(page.getByText(totalText)).toBeVisible();
  });

  // TC-010: Sản phẩm số lượng > 1
  test('TC-AUTOMATION-FR-08-010 - Sản phẩm số lượng > 1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-010');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    const totalText = formatPrice(tc.expected.expectedTotal);
    await page.getByText('Tổng thanh toán').waitFor({ timeout: 10000 });
    await expect(page.getByText(totalText)).toBeVisible();
  });

  // TC-011: Gửi total=0 → backend tính lại đúng
  test('TC-AUTOMATION-FR-08-011 - Gửi total=0 → backend tính lại đúng', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-011');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await navigateToCheckout(page);
    await page.getByRole('button', { name: /xác nhận thanh toán/i }).click();
    await page.waitForTimeout(2000);
  });

  // TC-012: Giỏ hàng trống → checkout trống
  test('TC-AUTOMATION-FR-08-012 - Giỏ hàng trống → checkout trống', async ({ page }) => {
    await performLogin(page, 'test@eshop.com', 'Test1234!');
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
    await page.waitForTimeout(500);
    // Cart trống → không có nút "Tiến hành thanh toán" → navigate trực tiếp
    await page.goto('/checkout');
    const productItems = page.locator('text=x ₫');
    expect(await productItems.count()).toBe(0);
  });
});
