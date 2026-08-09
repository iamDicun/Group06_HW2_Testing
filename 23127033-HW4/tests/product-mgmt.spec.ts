import { test, expect } from '@playwright/test';
import testCases from '../test-data/product-mgmt.data.json';

test.describe('FR-15: Product Management CRUD Tests (Web Admin)', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.annotations.push({
      type: 'Run by',
      description: '23127033 - Bùi Dương Duy Cường'
    });
  });

  for (const tc of testCases) {
    test(`${tc.tcId} - ${tc.description}`, async ({ page }) => {
      // Admin Login Flow for authenticated tests
      if (tc.tcId !== 'TC_PM_08' && tc.tcId !== 'TC_PM_09') {
        // Direct admin login via API or UI
        await page.goto('http://localhost:5174'); // Admin Portal URL
        // If login form is shown, perform login
        const emailField = page.getByPlaceholder('Email');
        if (await emailField.isVisible()) {
          await emailField.fill('admin@example.com');
          await page.getByPlaceholder('Password').fill('Admin123!');
          await page.getByRole('button', { name: 'Login' }).click();
        }
        // Navigate to Products tab
        const productsTab = page.getByText('Sản phẩm');
        await expect(productsTab).toBeVisible();
        await productsTab.click();
      }

      if (tc.tcId === 'TC_PM_08') {
        // Unauthenticated access
        await page.goto('http://localhost:5174');
        // Assertion Type 1: Visibility check of login form
        await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
        return;
      }

      if (tc.tcId === 'TC_PM_09') {
        // Non-admin user login attempt
        await page.goto('http://localhost:5174');
        await page.getByPlaceholder('Email').fill(tc.input.email);
        await page.getByPlaceholder('Password').fill(tc.input.password);
        let alertText = '';
        page.once('dialog', async dialog => {
          alertText = dialog.message();
          await dialog.dismiss();
        });
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForTimeout(500);
        // Assertion Type 2: Alert text verification
        expect(alertText).toBe(tc.expected.alertMessage);
        return;
      }

      if (tc.tcId === 'TC_PM_01' || tc.tcId === 'TC_PM_06' || tc.tcId === 'TC_PM_10' || tc.tcId === 'TC_PM_11') {
        const nameInput = page.getByPlaceholder('Tên sản phẩm');
        const priceInput = page.getByPlaceholder('Giá tiền');
        const submitButton = page.getByRole('button', { name: 'Lưu sản phẩm' });

        if (tc.tcId === 'TC_PM_05') {
          await priceInput.fill('100000');
          await submitButton.click();
          // Assertion Type 3: Value check
          await expect(nameInput).toHaveValue('');
          return;
        }

        if (tc.input.name !== undefined) await nameInput.fill(tc.input.name);
        if (tc.input.price !== undefined) await priceInput.fill(String(tc.input.price));

        if (tc.tcId === 'TC_PM_06') {
          let errorAlert = '';
          page.once('dialog', async d => {
            errorAlert = d.message();
            await d.dismiss();
          });
          await submitButton.click();
          await page.waitForTimeout(500);
          expect(errorAlert).toContain('Lỗi');
          return;
        }

        await submitButton.click();

        if (tc.expected.productInList || tc.expected.success) {
          // Assertion Type 4: Element text in table
          await expect(page.locator('table')).toContainText(tc.input.name.substring(0, 30));
        }
        return;
      }

      if (tc.tcId === 'TC_PM_04') {
        // Edit and cancel
        const editButtons = page.getByRole('button', { name: 'Sửa' });
        if (await editButtons.count() > 0) {
          await editButtons.first().click();
          const cancelButton = page.getByRole('button', { name: 'Hủy sửa' });
          await expect(cancelButton).toBeVisible();
          await cancelButton.click();
          // Assertion Type 1: Heading state after cancel
          await expect(page.getByRole('heading', { name: 'Thêm sản phẩm mới' })).toBeVisible();
        }
        return;
      }

      if (tc.tcId === 'TC_PM_12') {
        // SUT Bug check: Mass update bug detection
        const editButtons = page.getByRole('button', { name: 'Sửa' });
        if (await editButtons.count() > 1) {
          await editButtons.first().click();
          await page.getByPlaceholder('Tên sản phẩm').fill('Mass Update Test SP');
          page.once('dialog', async d => await d.dismiss());
          await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
          await page.waitForTimeout(500);
          // Observe if all table rows get mass updated (SUT bug behavior)
          const tableText = await page.locator('table').textContent();
          console.log('[SUT Bug Detected] Table text after edit:', tableText);
        }
      }
    });
  }
});
