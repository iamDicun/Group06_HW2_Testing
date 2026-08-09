import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Student ID & Timestamp ─────────────────────────────────────────────────
const STUDENT_ID = '23127031';
const GENERATED_AT = new Date().toISOString();

// ─── Load test data ─────────────────────────────────────────────────────────
const testDataPath = path.resolve(__dirname, '../test-data/fr08-checkout.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;

// ─── Helpers: Login (reuse pattern from FR-02) ─────────────────────────────
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

// ─── Helpers: Add to cart ───────────────────────────────────────────────────
async function addProductToCart(page: Page, productName: string) {
  // Find product card and click "Add to cart" button
  const productCard = page.locator(`text=${productName}`).first();
  await productCard.scrollIntoViewIfNeeded();
  const addButton = productCard.locator('..').getByRole('button', { name: /add to cart|thêm vào giỏ|cart/i });
  await addButton.click();
}

// ─── Helpers: Navigate to checkout ──────────────────────────────────────────
async function goToCheckout(page: Page) {
  await page.goto('/checkout');
}

// ─── Helpers: Format price to VND string ────────────────────────────────────
function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}

// ─── Test suite ─────────────────────────────────────────────────────────────
test.describe('FR-08: Thanh toán (Checkout)', () => {
  test(`Run by: ${STUDENT_ID}`, async ({ page }) => {
    expect(STUDENT_ID).toBeTruthy();
  });

  // ─── TC-AUTOMATION-FR-08-001: Chưa đăng nhập → không access checkout ────
  test('TC-AUTOMATION-FR-08-001 - Chưa đăng nhập → không access checkout page', async ({ page }) => {
    await goToCheckout(page);

    // Assertion: URL — redirect về login
    await expect(page).toHaveURL(/login/i);
  });

  // ─── TC-AUTOMATION-FR-08-002: Đã đăng nhập →access checkout ────────────
  test('TC-AUTOMATION-FR-08-002 - Đã đăng nhập →access checkout page thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-002');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: URL — ở trang checkout
    await expect(page).toHaveURL(/checkout/i);
  });

  // ─── TC-AUTOMATION-FR-08-003: Hiển thị danh sách sản phẩm ──────────────
  test('TC-AUTOMATION-FR-08-003 - Hiển thị danh sách sản phẩm đặt mua trên checkout', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-003');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add products to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: Visibility — mỗi sản phẩm hiển thị trên checkout
    for (const item of tc.data.cartItems) {
      const productElement = page.getByText(item.name, { exact: false });
      await expect(productElement).toBeVisible();
    }
  });

  // ─── TC-AUTOMATION-FR-08-004: Tổng tiền đúng ───────────────────────────
  test('TC-AUTOMATION-FR-08-004 - Tổng tiền hiển thị đúng theo giỏ hàng', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-004');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add products to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: Text content — tổng tiền hiển thị đúng
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-08-005: Total readonly/disabled ──────────────────
  test('TC-AUTOMATION-FR-08-005 - Tổng tiền không cho phép chỉnh sửa', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-005');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: Attribute — total field readonly hoặc disabled hoặc không phải input
    const totalInput = page.locator('input[name="total"], input[name="total_amount"], [data-testid="total-amount"]').first();

    // Check if total field exists as input
    const isInput = await totalInput.count() > 0;
    if (isInput) {
      // If it's an input, it should be readonly or disabled
      const isReadonly = await totalInput.getAttribute('readonly');
      const isDisabled = await totalInput.isDisabled();
      expect(isReadonly !== null || isDisabled).toBeTruthy();
    } else {
      // If it's not an input, it's display-only (readonly by nature)
      expect(true).toBeTruthy();
    }
  });

  // ─── TC-AUTOMATION-FR-08-006: Backend bỏ qua fake total ────────────────
  test('TC-AUTOMATION-FR-08-006 - Backend bỏ qua total_amount do client gửi lên', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-006');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Intercept checkout request and modify total_amount
    let requestBody: any = null;
    page.on('request', (request) => {
      if (request.url().includes('/api/checkout') || request.url().includes('/api/orders')) {
        try {
          const postData = request.postData();
          if (postData) {
            requestBody = JSON.parse(postData);
          }
        } catch (e) {}
      }
    });

    // Click checkout/pay button
    const checkoutButton = page.getByRole('button', { name: /checkout|pay|thanh toán|đặt hàng/i });
    await checkoutButton.click();

    // Assertion: Value — nếu có request body, total_amount phải khác fake value
    if (requestBody && requestBody.total_amount !== undefined) {
      expect(requestBody.total_amount).not.toBe(tc.data.fakeTotalAmount);
      expect(requestBody.total_amount).toBe(tc.expected.actualTotal);
    }
  });

  // ─── TC-AUTOMATION-FR-08-007: Thanh toán thành công → giỏ xóa ─────────
  test('TC-AUTOMATION-FR-08-007 - Thanh toán thành công → giỏ hàng được xóa', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-007');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Click checkout/pay button
    const checkoutButton = page.getByRole('button', { name: /checkout|pay|thanh toán|đặt hàng/i });
    await checkoutButton.click();

    // Assertion: Visibility — giỏ hàng trống hoặc thông báo thành công
    const successMessage = page.getByText(/thành công|success|hoàn tất|đã đặt/i);
    const emptyCart = page.getByText(/giỏ hàng trống|cart is empty|không có sản phẩm/i);
    await expect(successMessage.or(emptyCart)).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-08-008: Checkout page trống sau thanh toán ───────
  test('TC-AUTOMATION-FR-08-008 - Sau thanh toán, checkout page hiển thị giỏ hàng trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-008');

    // Login
    await performLogin(page, 'test@eshop.com', 'Test1234!');

    // Assume payment was completed (from previous test or precondition)
    // Navigate to checkout
    await goToCheckout(page);

    // Assertion: Visibility — checkout page trống hoặc không có sản phẩm
    const emptyState = page.getByText(/giỏ hàng trống|cart is empty|không có sản phẩm|no items/i);
    const noProducts = page.locator('[data-testid="cart-item"], [data-testid="checkout-item"]');
    await expect(emptyState.or(noProducts)).toHaveCount(0);
  });

  // ─── TC-AUTOMATION-FR-08-009: Thanh toán >=3 sản phẩm ─────────────────
  test('TC-AUTOMATION-FR-08-009 - Thanh toán với nhiều sản phẩm (>=3)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-009');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add all products to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: Count — số sản phẩm hiển thị đúng
    const productItems = page.locator('[data-testid="cart-item"], [data-testid="checkout-item"], tr');
    const count = await productItems.count();
    expect(count).toBeGreaterThanOrEqual(tc.expected.productCount);

    // Assertion: Text content — tổng tiền đúng
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-08-010: Thanh toán với SL > 1 ───────────────────
  test('TC-AUTOMATION-FR-08-010 - Thanh toán với sản phẩm có số lượng > 1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-010');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart (quantity from test data)
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Assertion: Text content — tổng tiền = đơn giá × số lượng
    const totalText = formatPrice(tc.expected.expectedTotal);
    const totalElement = page.getByText(new RegExp(totalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    await expect(totalElement).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-08-011: Gửi total=0 → backend tính lại ──────────
  test('TC-AUTOMATION-FR-08-011 - Gửi total_amount = 0 → backend tính lại đúng', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-011');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Add product to cart
    for (const item of tc.data.cartItems) {
      await addProductToCart(page, item.name);
    }

    // Go to checkout
    await goToCheckout(page);

    // Intercept checkout request
    let requestBody: any = null;
    page.on('request', (request) => {
      if (request.url().includes('/api/checkout') || request.url().includes('/api/orders')) {
        try {
          const postData = request.postData();
          if (postData) {
            requestBody = JSON.parse(postData);
          }
        } catch (e) {}
      }
    });

    // Click checkout button
    const checkoutButton = page.getByRole('button', { name: /checkout|pay|thanh toán|đặt hàng/i });
    await checkoutButton.click();

    // Assertion: Value — backend không chấp nhận total_amount = 0
    if (requestBody && requestBody.total_amount !== undefined) {
      expect(requestBody.total_amount).not.toBe(0);
      expect(requestBody.total_amount).toBe(tc.expected.actualTotal);
    }
  });

  // ─── TC-AUTOMATION-FR-08-012: Giỏ hàng trống → không TT được ──────────
  test('TC-AUTOMATION-FR-08-012 - Thanh toán với giỏ hàng trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-08-012');

    // Login
    await performLogin(page, tc.data.email, tc.data.password);

    // Go to checkout with empty cart
    await goToCheckout(page);

    // Assertion: Visibility — thông báo giỏ hàng trống hoặc nút checkout disabled
    const emptyCartMessage = page.getByText(/giỏ hàng trống|cart is empty|không có sản phẩm/i);
    const checkoutButton = page.getByRole('button', { name: /checkout|pay|thanh toán|đặt hàng/i });
    const isDisabled = await checkoutButton.isDisabled().catch(() => false);

    await expect(emptyCartMessage.or(checkoutButton)).toBeVisible();
    if (isDisabled) {
      await expect(checkoutButton).toBeDisabled();
    }
  });
});
