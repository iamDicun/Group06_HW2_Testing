import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const STUDENT_ID = '23127031';

const testDataPath = path.resolve(__dirname, '../test-data/fr14-category.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;
const ADMIN_URL = 'http://localhost:5174';

async function loginAdmin(page: Page, email: string, password: string) {
  await page.goto(ADMIN_URL);
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
}

async function goToCategoryTab(page: Page) {
  await page.locator('li:has-text("Danh mục")').click();
  await page.waitForTimeout(500);
}

async function getCategoryCount(page: Page): Promise<number> {
  const rows = page.locator('table tbody tr');
  return await rows.count();
}

async function addCategory(page: Page, name: string) {
  const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
  await nameInput.fill(name);
  await page.getByRole('button', { name: 'Thêm mới' }).click();
  await page.waitForTimeout(500);
}

async function deleteCategory(page: Page, name: string) {
  const row = page.locator(`tr:has-text("${name}")`).first();
  const deleteButton = row.getByRole('button', { name: 'Xóa' });
  await deleteButton.click();
  await page.waitForTimeout(500);
}

test.describe('FR-14: Quản lý Danh mục (Category CRUD) | Run by: ' + STUDENT_ID, () => {

  test('TC-AUTOMATION-FR-14-001 - Xem danh sách danh mục', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-001');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('TC-AUTOMATION-FR-14-002 - Thêm danh mục mới thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-002');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    await addCategory(page, tc.data.categoryName);
    const newCategory = page.getByText(tc.data.categoryName, { exact: false });
    await expect(newCategory).toBeVisible();
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + 1);
  });

  test('TC-AUTOMATION-FR-14-003 - Thêm tên rỗng → bị từ chối', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-003');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    await addCategory(page, tc.data.categoryName);
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  test('TC-AUTOMATION-FR-14-004 - Xóa danh mục thành công', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-004');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    await addCategory(page, 'To Be Deleted');
    await expect(page.getByText('To Be Deleted', { exact: false })).toBeVisible();
    const countBefore = await getCategoryCount(page);
    await deleteCategory(page, 'To Be Deleted');
    await expect(page.getByText('To Be Deleted', { exact: false })).not.toBeVisible();
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore - 1);
  });

  test('TC-AUTOMATION-FR-14-005 - Thêm danh mục — count +1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-005');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    await addCategory(page, tc.data.categoryName);
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + 1);
  });

  test('TC-AUTOMATION-FR-14-006 - Xóa danh mục — count -1', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-006');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    await addCategory(page, 'Temp Delete Test');
    await expect(page.getByText('Temp Delete Test', { exact: false })).toBeVisible();
    const countBefore = await getCategoryCount(page);
    await deleteCategory(page, 'Temp Delete Test');
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore - 1);
  });

  test('TC-AUTOMATION-FR-14-007 - Full CRUD cycle', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-007');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    await addCategory(page, tc.data.categoryName);
    await expect(page.getByText(tc.data.categoryName, { exact: false })).toBeVisible();
    await deleteCategory(page, tc.data.categoryName);
    await expect(page.getByText(tc.data.categoryName, { exact: false })).not.toBeVisible();
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  test('TC-AUTOMATION-FR-14-008 - Tên chỉ có spaces → bị từ chối', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-008');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    await addCategory(page, tc.data.categoryName);
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore);
  });

  test('TC-AUTOMATION-FR-14-009 - Tên dài 100+ ký tự', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-009');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    await addCategory(page, tc.data.categoryName);
    const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
    await expect(nameInput).toHaveValue(tc.data.categoryName);
  });

  test('TC-AUTOMATION-FR-14-010 - Xóa danh mục cuối cùng', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-010');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    await addCategory(page, 'Last One');
    await expect(page.getByText('Last One', { exact: false })).toBeVisible();
    await deleteCategory(page, 'Last One');
    const rows = page.locator('table tbody tr');
    const count = await rows.count();
    expect(count).toBe(0);
  });

  test('TC-AUTOMATION-FR-14-011 - Ký tự đặc biệt', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-011');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    await addCategory(page, tc.data.categoryName);
    const category = page.getByText(tc.data.categoryName, { exact: false });
    await expect(category).toBeVisible();
  });

  test('TC-AUTOMATION-FR-14-012 - Thêm nhiều danh mục liên tiếp', async ({ page }) => {
    const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-14-012');
    await loginAdmin(page, tc.data.email, tc.data.password);
    await goToCategoryTab(page);
    const countBefore = await getCategoryCount(page);
    for (const name of tc.data.categoriesToAdd) {
      await addCategory(page, name);
    }
    for (const name of tc.data.categoriesToAdd) {
      await expect(page.getByText(name, { exact: false })).toBeVisible();
    }
    const countAfter = await getCategoryCount(page);
    expect(countAfter).toBe(countBefore + tc.data.categoriesToAdd.length);
  });
});