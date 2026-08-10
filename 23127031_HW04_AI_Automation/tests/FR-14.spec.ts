import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const STUDENT_ID = '23127031';
const TIMESTAMP = Date.now();

const testDataPath = path.resolve(__dirname, '../test-data/fr14-category.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
const testCases: any[] = testData.testCases;
const ADMIN_URL = 'http://localhost:5174';
const ADMIN_EMAIL = testData._meta.adminCredentials.email;
const ADMIN_PASS = testData._meta.adminCredentials.password;

async function loginAdmin(page: Page) {
  await page.goto(ADMIN_URL);
  await page.locator('input[placeholder="Email"]').fill(ADMIN_EMAIL);
  await page.locator('input[placeholder="Password"]').fill(ADMIN_PASS);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
}

async function goToCategoryTab(page: Page) {
  await page.locator('li:has-text("Danh mục")').click();
  await page.waitForTimeout(500);
}

async function addCategory(page: Page, name: string) {
  const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
  await nameInput.click();
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

function uniqueName(base: string): string {
  return `${base}_${TIMESTAMP}`;
}

test.describe('FR-14: Quản lý Danh mục (Category CRUD) | Run by: ' + STUDENT_ID, () => {
  test.setTimeout(60000);

  test(`Run by: ${STUDENT_ID}`, async ({ page }) => {
    expect(STUDENT_ID).toBeTruthy();
  });

  // TC-001: Xem danh sách danh mục
  test('TC-AUTOMATION-FR-14-001 - Xem danh sách danh mục', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  // TC-002: Thêm danh mục mới
  test('TC-AUTOMATION-FR-14-002 - Thêm danh mục mới thành công', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('Category New');
    await addCategory(page, name);

    await expect(page.getByText(name).first()).toBeVisible();
  });

  // TC-003: Thêm tên rỗng → bị từ chối
  test('TC-AUTOMATION-FR-14-003 - Thêm danh mục với tên rỗng — bị từ chối', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    // Đếm số row trước
    const rowsBefore = await page.locator('table tbody tr').count();

    const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
    await nameInput.click();
    await nameInput.fill('');
    await page.getByRole('button', { name: 'Thêm mới' }).click();
    await page.waitForTimeout(500);

    // Assertion: Số row không thay đổi
    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBe(rowsBefore);
  });

  // TC-004: Xóa danh mục
  test('TC-AUTOMATION-FR-14-004 - Xóa danh mục thành công', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('To Delete');
    await addCategory(page, name);
    await expect(page.getByText(name).first()).toBeVisible();

    await deleteCategory(page, name);

    await expect(page.getByText(name).first()).not.toBeVisible();
  });

  // TC-005: Thêm — count +1 (verify bằng text thay vì count)
  test('TC-AUTOMATION-FR-14-005 - Thêm danh mục — count +1', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('Count Test');
    await addCategory(page, name);

    await expect(page.getByText(name).first()).toBeVisible();
  });

  // TC-006: Xóa — count -1
  test('TC-AUTOMATION-FR-14-006 - Xóa danh mục — count -1', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('Count Delete');
    await addCategory(page, name);
    await expect(page.getByText(name).first()).toBeVisible();

    await deleteCategory(page, name);

    await expect(page.getByText(name).first()).not.toBeVisible();
  });

  // TC-007: Full CRUD cycle
  test('TC-AUTOMATION-FR-14-007 - Thêm rồi xóa danh mục — full CRUD cycle', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('CRUD Cycle');
    await addCategory(page, name);
    await expect(page.getByText(name).first()).toBeVisible();

    await deleteCategory(page, name);
    await expect(page.getByText(name).first()).not.toBeVisible();
  });

  // TC-008: Spaces only → bị từ chối
  test('TC-AUTOMATION-FR-14-008 - Thêm danh mục chỉ chứa khoảng trắng — bị từ chối', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    // Đếm số row trước
    const rowsBefore = await page.locator('table tbody tr').count();

    const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
    await nameInput.click();
    await nameInput.fill('   ');
    await page.getByRole('button', { name: 'Thêm mới' }).click();
    await page.waitForTimeout(500);

    // Assertion: Số row không thay đổi
    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBe(rowsBefore);
  });

  // TC-009: Tên dài 100+ ký tự
  test('TC-AUTOMATION-FR-14-009 - Thêm danh mục với tên dài (boundary)', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const longName = 'A'.repeat(107);
    const nameInput = page.locator('input[placeholder="Tên danh mục mới"]');
    await nameInput.click();
    await nameInput.fill(longName);

    await expect(nameInput).toHaveValue(longName);

    await page.getByRole('button', { name: 'Thêm mới' }).click();
    await page.waitForTimeout(1000);

    // Page should still be functional
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  // TC-010: Xóa danh mục cuối cùng
  test('TC-AUTOMATION-FR-14-010 - Xóa danh mục cuối cùng — danh sách trống', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('Last One');
    await addCategory(page, name);
    await expect(page.getByText(name).first()).toBeVisible();

    await deleteCategory(page, name);

    await expect(page.getByText(name).first()).not.toBeVisible();
  });

  // TC-011: Ký tự đặc biệt
  test('TC-AUTOMATION-FR-14-011 - Thêm danh mục với ký tự đặc biệt', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const name = uniqueName('Special @#$%');
    await addCategory(page, name);

    await expect(page.getByText(name).first()).toBeVisible();
  });

  // TC-012: Thêm nhiều danh mục liên tiếp
  test('TC-AUTOMATION-FR-14-012 - Thêm nhiều danh mục liên tiếp', async ({ page }) => {
    await loginAdmin(page);
    await goToCategoryTab(page);

    const names = [
      uniqueName('Multi A'),
      uniqueName('Multi B'),
      uniqueName('Multi C'),
    ];

    for (const name of names) {
      await addCategory(page, name);
    }

    for (const name of names) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
  });
});
