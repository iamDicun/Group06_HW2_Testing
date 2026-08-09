import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Student ID & Timestamp ─────────────────────────────────────────────────
const STUDENT_ID = '23127031';
const GENERATED_AT = new Date().toISOString();

// ─── Load test data ─────────────────────────────────────────────────────────
const testDataPath = path.resolve(__dirname, '../test-data/fr14-category.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;

// ─── Helpers: Login ─────────────────────────────────────────────────────────
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
}

// ─── Helpers: Category page ─────────────────────────────────────────────────
async function goToCategoryPage(page: Page) {
  await page.goto('/admin/categories');
}

async function getCategoryCount(page: Page): Promise<number> {
  const rows = page.locator('table tbody tr, [data-testid="category-item"], [data-testid="category-row"]');
  return await rows.count();
}

async function addCategory(page: Page, name: string) {
  const nameInput = page.getByPlaceholder(/nhập tên danh mục|category name/i);
  await nameInput.fill(name);
  const addButton = page.getByRole('button', { name: /thêm|add|create|tạo/i });
  await addButton.click();
}

async function deleteCategory(page: Page, name: string) {
  const row = page.locator(`tr:has-text("${name}"), [data-testid="category-item"]:has-text("${name}")`).first();
  const deleteButton = row.getByRole('button', { name: /xóa|delete|remove/i });
  await deleteButton.click();

  // Handle confirmation dialog if exists
  const confirmButton = page.getByRole('button', { name: /ok|confirm|xác nhận|đồng ý/i });
  if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
    await confirmButton.click();
  }
}

// ─── Test suite ─────────────────────────────────────────────────────────────
test.describe('FR-14: Quản lý Danh mục (Category CRUD)', () => {
  test(`Run by: ${STUDENT_ID}`, async ({ page }) => {
    expect(STUDENT_ID).toBeTruthy();
  });

  // ─── TC-AUTOMATION-FR-14-001: Xem danh sách danh mục ────────────────────
  test('TC-AUTOMATION-FR-14-001 - Xem danh sách danh mục', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-001');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    // Assertion: Visibility — danh sách hiển thị
    const categoryList = page.locator('table, [data-testid="category-list"], [data-testid="categories"]');
    await expect(categoryList).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-14-002: Thêm danh mục mới ─────────────────────────
  test('TC-AUTOMATION-FR-14-002 - Thêm danh mục mới thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-002');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Text content — danh mục mới xuất hiện
    const newCategory = page.getByText(tc.data.categoryName, { exact: false });
    await expect(newCategory).toBeVisible();

    // Assertion: Count — số danh mục tăng 1
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + 1);
  });

  // ─── TC-AUTOMATION-FR-14-003: Thêm tên rỗng → bị từ chối ───────────────
  test('TC-AUTOMATION-FR-14-003 - Thêm danh mục với tên rỗng — bị từ chối', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-003');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Visibility — lỗi validation hiển thị
    const errorMessage = page.getByText(/bắt buộc|required|không được để trống|invalid/i);
    await expect(errorMessage).toBeVisible();

    // Assertion: Count — số danh mục không thay đổi
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  // ─── TC-AUTOMATION-FR-14-004: Xóa danh mục ──────────────────────────────
  test('TC-AUTOMATION-FR-14-004 - Xóa danh mục thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-004');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    // First add a category to delete
    const nameToAdd = 'To Be Deleted';
    await addCategory(page, nameToAdd);

    // Verify it's there
    await expect(page.getByText(nameToAdd, { exact: false })).toBeVisible();

    const countBefore = await getCategoryCount(page);

    // Delete it
    await deleteCategory(page, nameToAdd);

    // Assertion: Visibility — danh mục biến mất
    await expect(page.getByText(nameToAdd, { exact: false })).not.toBeVisible();

    // Assertion: Count — số danh mục giảm 1
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore - 1);
  });

  // ─── TC-AUTOMATION-FR-14-005: Count +1 sau khi thêm ────────────────────
  test('TC-AUTOMATION-FR-14-005 - Thêm danh mục — kiểm tra count +1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-005');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Count — count tăng đúng 1
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + 1);
  });

  // ─── TC-AUTOMATION-FR-14-006: Count -1 sau khi xóa ────────────────────
  test('TC-AUTOMATION-FR-14-006 - Xóa danh mục — kiểm tra count -1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-006');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    // Add first to ensure we have something to delete
    await addCategory(page, 'Temp Delete Test');
    await expect(page.getByText('Temp Delete Test', { exact: false })).toBeVisible();

    const countBefore = await getCategoryCount(page);

    await deleteCategory(page, 'Temp Delete Test');

    // Assertion: Count — count giảm đúng 1
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore - 1);
  });

  // ─── TC-AUTOMATION-FR-14-007: Full CRUD cycle ──────────────────────────
  test('TC-AUTOMATION-FR-14-007 - Thêm rồi xóa danh mục — full CRUD cycle', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-007');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    // Add
    await addCategory(page, tc.data.categoryName);
    await expect(page.getByText(tc.data.categoryName, { exact: false })).toBeVisible();

    // Delete
    await deleteCategory(page, tc.data.categoryName);

    // Assertion: Visibility — biến mất
    await expect(page.getByText(tc.data.categoryName, { exact: false })).not.toBeVisible();

    // Assertion: Count — trả về trạng thái ban đầu
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  // ─── TC-AUTOMATION-FR-14-008: Tên chỉ có spaces → bị từ chối ───────────
  test('TC-AUTOMATION-FR-14-008 - Thêm danh mục chỉ chứa khoảng trắng — bị từ chối', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-008');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Visibility — lỗi validation
    const errorMessage = page.getByText(/bắt buộc|required|không được để trống|invalid/i);
    await expect(errorMessage).toBeVisible();

    // Assertion: Count — không thay đổi
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  // ─── TC-AUTOMATION-FR-14-009: Tên dài 100+ ký tự ───────────────────────
  test('TC-AUTOMATION-FR-14-009 - Thêm danh mục với tên dài (boundary)', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-009');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Value — kiểm tra input có chứa tên dài
    const nameInput = page.getByPlaceholder(/nhập tên danh mục|category name/i);
    await expect(nameInput).toHaveValue(tc.data.categoryName);

    // Check if either success or validation error
    const successOrError = page.getByText(/thành công|success|bắt buộc|required|invalid|quá dài/i);
    await expect(successOrError).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-14-010: Xóa danh mục cuối cùng ───────────────────
  test('TC-AUTOMATION-FR-14-010 - Xóa danh mục cuối cùng — danh sách trống', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-010');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    // Add one category to delete
    await addCategory(page, 'Last One');
    await expect(page.getByText('Last One', { exact: false })).toBeVisible();

    // Delete it
    await deleteCategory(page, 'Last One');

    // Assertion: Visibility — empty state hoặc danh sách trống
    const emptyState = page.getByText(/không có|chưa có|empty|no categories/i);
    const rows = page.locator('table tbody tr, [data-testid="category-item"]');
    await expect(emptyState.or(rows)).toHaveCount(0);
  });

  // ─── TC-AUTOMATION-FR-14-011: Ký tự đặc biệt ───────────────────────────
  test('TC-AUTOMATION-FR-14-011 - Thêm danh mục với ký tự đặc biệt', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-011');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    await addCategory(page, tc.data.categoryName);

    // Assertion: Text content — hiển thị đúng ký tự đặc biệt
    const category = page.getByText(tc.data.categoryName, { exact: false });
    await expect(category).toBeVisible();
  });

  // ─── TC-AUTOMATION-FR-14-012: Thêm nhiều danh mục liên tiếp ────────────
  test('TC-AUTOMATION-FR-14-012 - Thêm nhiều danh mục liên tiếp', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-012');
    await performLogin(page, tc.data.email, tc.data.password);
    await goToCategoryPage(page);

    const countBefore = await getCategoryCount(page);

    // Add all categories
    for (const name of tc.data.categoriesToAdd) {
      await addCategory(page, name);
    }

    // Assertion: Visibility — tất cả hiển thị
    for (const name of tc.data.categoriesToAdd) {
      await expect(page.getByText(name, { exact: false })).toBeVisible();
    }

    // Assertion: Count — count tăng đúng 3
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + tc.data.categoriesToAdd.length);
  });
});
