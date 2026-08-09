import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Student ID & Timestamp ─────────────────────────────────────────────────
const STUDENT_ID = '23127031';
const GENERATED_AT = new Date().toISOString();

// ─── Load test data ─────────────────────────────────────────────────────────
const testDataPath = path.resolve(__dirname, '../test-data/fr02-login.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;

function usernameField(page: Page) {
  return page.locator('input[type="text"]').nth(0);
}

function passwordField(page: Page) {
  return page.locator('input[type="text"]').nth(1);
}

// ─── Helper: fill login form ────────────────────────────────────────────────
async function fillLoginPage(page: Page, email: string, password: string) {
  const fields = page.locator('input[type="text"]');

  if (email !== '') {
    await fields.nth(0).fill(email);
  }

  if (password !== '') {
    await fields.nth(1).fill(password);
  }
}

// ─── Helper: click login button ─────────────────────────────────────────────
async function clickLoginButton(page: Page) {
  await page.getByRole('button', { name: 'Sign In' }).click();
}

// ─── Helper: perform login ──────────────────────────────────────────────────
async function performLogin(page: Page, email: string, password: string) {
  await page.goto('/login');
  await fillLoginPage(page, email, password);
  await clickLoginButton(page);
}

// ─── Test suite ─────────────────────────────────────────────────────────────
test.describe('FR-02: Đăng nhập & Khóa tài khoản', () => {
  test(`Run by: ${STUDENT_ID}`, async ({ page }) => {
    expect(STUDENT_ID).toBeTruthy();
  });

  // ─── TC-AUTOMATION-FR-02-001: Đăng nhập thành công ──────────────────────
  test('TC-AUTOMATION-FR-02-001 - Đăng nhập thành công với email và password hợp lệ', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-001');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: URL — không còn ở trang login
    await expect(page).not.toHaveURL('/login');
  });

  // ─── TC-AUTOMATION-FR-02-002: Email không tồn tại ───────────────────────
  test('TC-AUTOMATION-FR-02-002 - Đăng nhập thất bại - email không tồn tại', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-002');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Visibility — error message hiển thị
    const errorBanner = page.getByText(/đăng nhập thất bại/i);
    await expect(errorBanner).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-02-003: Password sai ──────────────────────────────
  test('TC-AUTOMATION-FR-02-003 - Đăng nhập thất bại - email đúng, password sai', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-003');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Visibility
    const errorBanner = page.getByText(/đăng nhập thất bại/i);
    await expect(errorBanner).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-02-004: Email để trống ────────────────────────────
  test('TC-AUTOMATION-FR-02-004 - Đăng nhập - email để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-004');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — email field invalid
    const emailField = usernameField(page);
    await expect(emailField).toHaveAttribute('required', '');
  });

  // ─── TC-AUTOMATION-FR-02-005: Password để trống ─────────────────────────
  test('TC-AUTOMATION-FR-02-005 - Đăng nhập - password để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-005');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — password field invalid
    const pwField = passwordField(page);
    await expect(pwField).toHaveAttribute('required', '');
  });

  // ─── TC-AUTOMATION-FR-02-006: Cả hai trường trống ───────────────────────
  test('TC-AUTOMATION-FR-02-006 - Đăng nhập - cả hai trường để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-006');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — cả hai field invalid
    await expect(usernameField(page)).toHaveAttribute('required', '');
    await expect(passwordField(page)).toHaveAttribute('required', '');
  });

  // ─── TC-AUTOMATION-FR-02-007: Email sai format HTML5 ────────────────────
  test('TC-AUTOMATION-FR-02-007 - Đăng nhập - email không đúng format HTML5', async ({ page }) => {
    const emailCases = ['invalid-email', 'test@', '@test.com', 'test.com'];

    for (const invalidEmail of emailCases) {
      await page.goto('/login');
      await usernameField(page).fill(invalidEmail);
      await passwordField(page).fill('AnyPassword123!');

      // Assertion: Attribute — type="email"
      const emailField = usernameField(page);
      await expect(emailField).toHaveAttribute('type', 'email');

      // Assertion: Enabled/Disabled — nút disabled do HTML5 validation
      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await expect(submitButton).toBeDisabled();
    }
  });

  // ─── TC-AUTOMATION-FR-02-010: JWT Token hợp lệ (TRƯỚC lockout) ──────────
  test('TC-AUTOMATION-FR-02-010 - Đăng nhập thành công trả về JWT Token hợp lệ', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-010');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Value — token có trong storage và đúng format JWT
    const token = await page.evaluate(() => {
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    });

    expect(token).toBeTruthy();
    const parts = token!.split('.');
    expect(parts).toHaveLength(3);
  });

  // ─── TC-AUTOMATION-FR-02-013: Token gửi kèm request (TRƯỚC lockout) ─────
  test('TC-AUTOMATION-FR-02-013 - Token JWT được lưu và gửi kèm request xác thực', async ({ page }) => {
    const tc = testCases.find(
      (t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-013'
    );

    const loginResponsePromise = page.waitForResponse(
      response =>
        response.url().includes('/api/login') &&
        response.request().method() === 'POST'
    );

    await page.goto('/login');

    await usernameField(page).fill(tc.data.email);
    await passwordField(page).fill(tc.data.password);

    await page.getByRole('button', { name: 'Sign In' }).click();

    // Chờ login API hoàn thành
    const loginResponse = await loginResponsePromise;
    expect(loginResponse.ok()).toBeTruthy();

    // Kiểm tra token được lưu
    const token = await page.evaluate(() => {
      return localStorage.getItem('token');
    });

    expect(token).toBeTruthy();

    // Chờ request /me
    const meRequest = await page.waitForRequest(
      request =>
        request.url().includes('/api/users/me') &&
        request.method() === 'GET'
    );

    const authorization = meRequest.headers()['authorization'];

    // Kiểm tra Bearer token
    expect(authorization).toBeTruthy();
    expect(authorization).toMatch(/^Bearer\s+\S+$/);

    // Đảm bảo Bearer token chính là JWT đã lưu
    expect(authorization).toBe(`Bearer ${token}`);
  });

  // ─── TC-AUTOMATION-FR-02-011: Lỗi không lộ chi tiết ────────────────────
  test('TC-AUTOMATION-FR-02-011 - Thông báo lỗi không lộ chi tiết nguyên nhân', async ({ page }) => {
    const tc1 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'user@test.com');
    const tc2 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'nonexist@test.com');

    // Login with wrong password (existing email)
    await performLogin(page, tc1.data.email, tc1.data.password);
    const errorText1 = await page.getByText(/đăng nhập thất bại/i).textContent();

    // Login with non-existing email
    await performLogin(page, tc2.data.email, tc2.data.password);
    const errorText2 = await page.getByText(/đăng nhập thất bại/i).textContent();

    // Assertion: Text content — cùng message cho cả 2 trường hợp
    expect(errorText1).toBe(errorText2);

    // Verify forbidden keywords are NOT present
    const forbiddenKeywords = tc1.expected.forbiddenKeywords;
    for (const keyword of forbiddenKeywords) {
      expect(errorText1!.toLowerCase()).not.toContain(keyword.toLowerCase());
    }
  });

  // ─── TC-AUTOMATION-FR-02-012: Field email type="email" ──────────────────
  test('TC-AUTOMATION-FR-02-012 - Kiểm tra field email có type="email"', async ({ page }) => {
    await page.goto('/login');

    // Assertion: Attribute
    const emailField = usernameField(page);
    await expect(emailField).toHaveAttribute('type', 'email');
  });

  // ─── TC-AUTOMATION-FR-02-008: Khóa sau 3 lần sai (CUỐI CÙNG) ──────────
  test('TC-AUTOMATION-FR-02-008 - Tài khoản bị khóa sau 3 lần đăng nhập sai liên tiếp', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-008');
    const { email, password, attempts } = tc.data;

    for (let i = 0; i < attempts; i++) {
      await performLogin(page, email, password);
    }

    // Assertion: Visibility — lockout message hiển thị
    const lockoutMessage = page.getByText(/khóa|locked|tạm khóa|vui lòng thử lại sau/i);
    await expect(lockoutMessage).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-02-009: Đăng nhập khi đang bị khóa ────────────────
  test('TC-AUTOMATION-FR-02-009 - Đăng nhập khi tài khoản đang bị khóa', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-009');
    const lockTc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-008');

    // Trigger lockout first
    for (let i = 0; i < lockTc.data.attempts; i++) {
      await performLogin(page, lockTc.data.email, lockTc.data.password);
    }

    // Try to login with correct password while locked
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Visibility — lỗi vẫn hiển thị
    const errorMessage = page.getByText(/khóa|locked|thất bại|không chính xác/i);
    await expect(errorMessage).toBeVisible();

    // Assertion: URL — vẫn ở trang login
    await expect(page).toHaveURL('/login');
  });
});