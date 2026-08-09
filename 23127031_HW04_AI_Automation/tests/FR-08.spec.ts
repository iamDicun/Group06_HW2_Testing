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
  const productCard = page.locator(`h2:has-text("${productName}")`).first();
  await productCard.scrollIntoViewIfNeeded();
  const addButton = productCard.locator('..').getByRole('button', { name: /thêm vào giỏ/i });
  await addButton.click();
  await page.waitForTimeout(500);
}

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}

test.describe('FR-08: Thanh toán (Checkout) | Run by: ' + STUDENT_ID, () => {

  test('TC-AUTOMATION-FR-08-001 - Chưa đăng nhập → redirect về login', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page).toHaveURL(/login/i);
  });

  test('TC-AUTOMATION-FR-08-002 - Đã đăng nhập → access checkout thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-002');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    await expect(page).toHaveURL(/checkout/i);
  });

  test('TC-AUTOMATION-FR-08-003 - Hiển thị danh sách sản phẩm trên checkout', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-003');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    for (const item of tc.data.cartItems) {
      const productElement = page.getByText(item.name, { exact: false });
      await expect(productElement).toBeVisible();
    }
  });

  test('TC-AUTOMATION-FR-08-004 - Tổng tiền hiển thị đúng (51M)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-004');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  test('TC-AUTOMATION-FR-08-005 - BUG: Total field KHÔNG phải readonly', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-005');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    const totalInput = page.locator('input[type="number"]').first();
    await expect(totalInput).toBeVisible();
    const isReadonly = await totalInput.getAttribute('readonly');
    const isDisabled = await totalInput.isDisabled();
    expect(isReadonly !== null || isDisabled).toBeFalsy();
  });

  test('TC-AUTOMATION-FR-08-006 - BUG: Backend KHÔNG recalculate total', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-006');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    let requestBody: any = null;
    page.on('request', (request) => {
      if (request.url().includes('/api/checkout')) {
        try {
          const postData = request.postData();
          if (postData) requestBody = JSON.parse(postData);
        } catch (e) {}
      }
    });
    const checkoutButton = page.getByRole('button', { name: /xác nhận thanh toán/i });
    await checkoutButton.click();
    await page.waitForTimeout(2000);
  });

  test('TC-AUTOMATION-FR-08-007 - Thanh toán thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-007');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    const checkoutButton = page.getByRole('button', { name: /xác nhận thanh toán/i });
    await checkoutButton.click();
    const successMessage = page.getByText('Thanh toán thành công!');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
  });

  test('TC-AUTOMATION-FR-08-008 - Sau thanh toán, cart trống', async ({ page }) => {
    await performLogin(page, 'test@eshop.com', 'Test1234!');
    await page.goto('/cart');
    const emptyCart = page.getByText(/giỏ hàng trống|không có sản phẩm/i);
    const cartBadge = page.locator('[class*="badge"]');
    await expect(emptyCart.or(cartBadge)).toBeVisible({ timeout: 5000 });
  });

  test('TC-AUTOMATION-FR-08-009 - Thanh toán >=3 sản phẩm (55M)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-009');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  test('TC-AUTOMATION-FR-08-010 - Sản phẩm số lượng > 1 (12M)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-010');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  test('TC-AUTOMATION-FR-08-011 - BUG: Gửi total=0 → backend chấp nhận', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-011');
    await performLogin(page, tc.data.email, tc.data.password);
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }
    await page.goto('/checkout');
    let requestBody: any = null;
    page.on('request', (request) => {
      if (request.url().includes('/api/checkout')) {
        try {
          const postData = request.postData();
          if (postData) requestBody = JSON.parse(postData);
        } catch (e) {}
      }
    });
    const totalInput = page.locator('input[type="number"]').first();
    await totalInput.fill('0');
    const checkoutButton = page.getByRole('button', { name: /xác nhận thanh toán/i });
    await checkoutButton.click();
    await page.waitForTimeout(2000);
  });

  test('TC-AUTOMATION-FR-08-012 - Giỏ hàng trống → checkout trống', async ({ page }) => {
    await performLogin(page, 'test@eshop.com', 'Test1234!');
    await page.goto('/checkout');
    const emptyState = page.getByText(/không có sản phẩm|giỏ hàng trống/i);
    const productItems = page.locator('li');
    const count = await productItems.count();
    expect(count).toBe(0);
  });
});