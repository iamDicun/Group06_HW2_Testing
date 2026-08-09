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

// ─── Helper: fill login form ────────────────────────────────────────────────
async function fillLoginPage(page: Page, email: string, password: string) {
  if (email !== '') {
    await page.getByLabel('Email').fill(email);
  }
  if (password !== '') {
    await page.getByLabel('Password').fill(password);
  }
}

// ─── Helper: click login button ─────────────────────────────────────────────
async function clickLoginButton(page: Page) {
  await page.getByRole('button', { name: /đăng nhập|login/i }).click();
}

// ─── Helper: perform login ──────────────────────────────────────────────────
async function performLogin(page: Page, email: string, password: string) {
  await page.goto('/');
  await fillLoginPage(page, email, password);
  await clickLoginButton(page);
}

// ─── Test suite ─────────────────────────────────────────────────────────────
test.describe('FR-02: Đăng nhập & Khóa tài khoản', () => {
  test.describe.configure({ mode: 'serial' });

  test(`Run by: ${STUDENT_ID}`, async ({ page }) => {
    expect(STUDENT_ID).toBeTruthy();
  });

  // ─── TC-AUTOMATION-FR-02-001: Đăng nhập thành công ──────────────────────
  test('TC-AUTOMATION-FR-02-001 - Đăng nhập thành công với email và password hợp lệ', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-001');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: URL — không còn ở trang login
    await expect(page).not.toHaveURL('/');
  });

  // ─── TC-AUTOMATION-FR-02-002: Email không tồn tại ───────────────────────
  test('TC-AUTOMATION-FR-02-002 - Đăng nhập thất bại - email không tồn tại', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-002');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Visibility — error message hiển thị
    const errorBanner = page.getByText(/đăng nhập thất bại|invalid|không chính xác/i);
    await expect(errorBanner).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-02-003: Password sai ──────────────────────────────
  test('TC-AUTOMATION-FR-02-003 - Đăng nhập thất bại - email đúng, password sai', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-003');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Visibility
    const errorBanner = page.getByText(/đăng nhập thất bại|invalid|không chính xác/i);
    await expect(errorBanner).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-02-004: Email để trống ────────────────────────────
  test('TC-AUTOMATION-FR-02-004 - Đăng nhập - email để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-004');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — email field invalid
    const emailField = page.getByLabel('Email');
    await expect(emailField).toHaveAttribute('aria-invalid', 'true');
  });

  // ─── TC-AUTOMATION-FR-02-005: Password để trống ─────────────────────────
  test('TC-AUTOMATION-FR-02-005 - Đăng nhập - password để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-005');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — password field invalid
    const passwordField = page.getByLabel('Password');
    await expect(passwordField).toHaveAttribute('aria-invalid', 'true');
  });

  // ─── TC-AUTOMATION-FR-02-006: Cả hai trường trống ───────────────────────
  test('TC-AUTOMATION-FR-02-006 - Đăng nhập - cả hai trường để trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-006');
    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: Attribute — cả hai field invalid
    await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Password')).toHaveAttribute('aria-invalid', 'true');
  });

  // ─── TC-AUTOMATION-FR-02-007: Email sai format HTML5 ────────────────────
  test('TC-AUTOMATION-FR-02-007 - Đăng nhập - email không đúng format HTML5', async ({ page }) => {
    const emailCases = ['invalid-email', 'test@', '@test.com', 'test.com'];

    for (const invalidEmail of emailCases) {
      await page.goto('/');
      await page.getByLabel('Email').fill(invalidEmail);
      await page.getByLabel('Password').fill('AnyPassword123!');

      // Assertion: Attribute — type="email"
      const emailField = page.getByLabel('Email');
      await expect(emailField).toHaveAttribute('type', 'email');

      // Assertion: Enabled/Disabled — nút disabled do HTML5 validation
      const submitButton = page.getByRole('button', { name: /đăng nhập|login/i });
      await expect(submitButton).toBeDisabled();
    }
  });

  // ─── TC-AUTOMATION-FR-02-008: Khóa sau 3 lần sai ───────────────────────
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
    await expect(page).toHaveURL('/');
  });

  // ─── TC-AUTOMATION-FR-02-010: JWT Token hợp lệ ──────────────────────────
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

  // ─── TC-AUTOMATION-FR-02-011: Lỗi không lộ chi tiết ────────────────────
  test('TC-AUTOMATION-FR-02-011 - Thông báo lỗi không lộ chi tiết nguyên nhân', async ({ page }) => {
    const tc1 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'user@test.com');
    const tc2 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'nonexist@test.com');

    // Login with wrong password (existing email)
    await performLogin(page, tc1.data.email, tc1.data.password);
    const errorText1 = await page.getByText(/đăng nhập thất bại|invalid|không chính xác/i).textContent();

    // Login with non-existing email
    await performLogin(page, tc2.data.email, tc2.data.password);
    const errorText2 = await page.getByText(/đăng nhập thất bại|invalid|không chính xác/i).textContent();

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
    await page.goto('/');

    // Assertion: Attribute
    const emailField = page.getByLabel('Email');
    await expect(emailField).toHaveAttribute('type', 'email');
  });

  // ─── TC-AUTOMATION-FR-02-013: Token gửi kèm request ─────────────────────
  test('TC-AUTOMATION-FR-02-013 - Token JWT được lưu và gửi kèm request xác thực', async ({ page }) => {
    const tc = testCases.find(
      (t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-013'
    );

    let authHeader = '';

    page.on('request', (request) => {
      if (
        request.url().includes('/api/users/me') &&
        request.method() === 'GET'
      ) {
        authHeader = request.headers()['authorization'] || '';
      }
    });

    await performLogin(page, tc.data.email, tc.data.password);

    // Assertion: token được lưu
    const token = await page.evaluate(() => {
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    });

    expect(token).toBeTruthy();

    // Chờ request xác thực thực tế thay vì fixed timeout
    const meResponse = page.waitForResponse(
      response =>
        response.url().includes('/api/users/me') &&
        response.request().method() === 'GET'
    );

    await page.reload();
    await meResponse;

    // Assertion: Value — Bearer header được gửi
    expect(authHeader).toBeTruthy();
    expect(authHeader).toMatch(/^Bearer .+/);
  });
});
