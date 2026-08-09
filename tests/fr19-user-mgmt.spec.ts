import { test, expect } from '@playwright/test';
import { AdminUsersPage } from '../pages/AdminUsersPage';
import { AuthHelper } from '../pages/AuthHelper';
import userMgmtTestData from '../data/fr19-user-mgmt-data.json';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

/**
 * Helper to ensure a disposable test user exists in database
 */
async function ensureTestUserExists(email: string, name: string = 'Disposable User', password: string = 'TestPass123!'): Promise<void> {
  try {
    await axios.post(`${API_URL}/register`, { name, email, password });
  } catch (e) {
    // User might already exist, which is fine
  }
}

/**
 * FR-19: User Management (Admin) — Data-Driven Test Suite
 * Run by: 23127391
 * Task 1: Cross-Browser Testing (Chromium, Firefox, WebKit)
 */
test.describe('FR-19: User Management Admin [Run by: 23127391]', () => {
  test.beforeEach(async ({ page }) => {
    test.info().annotations.push({ type: 'Run by', description: '23127391' });
    test.info().annotations.push({ type: 'Feature', description: 'FR-19 User Management Admin' });
  });

  for (const data of userMgmtTestData) {
    test(`${data.scenarioId}: ${data.description}`, async ({ page }) => {
      const auth = new AuthHelper(page);
      const adminUsersPage = new AdminUsersPage(page);

      if (data.testType === 'security_api_auth_check') {
        try {
          await axios.get(`${API_URL}/admin/users`);
          expect(false).toBe(true);
        } catch (err: any) {
          expect([401, 403]).toContain(err.response?.status);
        }
        return;
      }

      if (data.testType === 'access_control_unauthenticated') {
        await page.goto('http://localhost:5174');
        await expect(page.getByPlaceholder('Email')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Quản lý Người dùng' })).not.toBeVisible();
        return;
      }

      if (data.testType === 'access_control_non_admin_denied') {
        let alertMessage = '';
        page.once('dialog', async (dialog) => {
          alertMessage = dialog.message();
          await dialog.accept().catch(() => {});
        });

        await page.goto('http://localhost:5174');
        await page.getByPlaceholder('Email').fill(data.loginEmail!);
        await page.getByPlaceholder('Password').fill(data.loginPassword!);
        await page.getByRole('button', { name: 'Login' }).click();

        await page.waitForTimeout(600);
        expect(alertMessage).toContain(data.expectedAlert!);
        return;
      }

      if (data.testType === 'lifecycle_register_and_delete') {
        await axios.post(`${API_URL}/register`, {
          name: data.newUserName,
          email: data.newUserEmail,
          password: data.newUserPass,
        });

        await auth.injectAdminSession();
        await adminUsersPage.goto();

        const existsBefore = await adminUsersPage.isUserPresent(data.newUserEmail!);
        expect(existsBefore).toBe(true);

        await adminUsersPage.deleteUser(data.newUserEmail!);
        await page.waitForTimeout(500);

        const existsAfter = await adminUsersPage.isUserPresent(data.newUserEmail!);
        expect(existsAfter).toBe(false);
        return;
      }

      if (data.testType === 'positive_delete_user' || data.testType === 'positive_realtime_refresh') {
        await ensureTestUserExists(data.targetUserEmail!);
        await auth.injectAdminSession();
        await adminUsersPage.goto();

        const countBefore = await adminUsersPage.getUserCount();
        await adminUsersPage.deleteUser(data.targetUserEmail!);
        await page.waitForLoadState('networkidle').catch(() => {});

        const countAfter = await adminUsersPage.getUserCount();
        expect(countAfter).toBeLessThanOrEqual(countBefore);
        const isStillPresent = await adminUsersPage.isUserPresent(data.targetUserEmail!);
        expect(isStillPresent).toBe(false);
        return;
      }

      if (data.testType === 'integration_deleted_user_login_blocked') {
        await ensureTestUserExists(data.targetUserEmail!, 'Blocked User', data.targetUserPass);
        await auth.injectAdminSession();
        await adminUsersPage.goto();

        await adminUsersPage.deleteUser(data.targetUserEmail!);
        await page.waitForLoadState('networkidle').catch(() => {});

        try {
          await axios.post(`${API_URL}/login`, {
            email: data.targetUserEmail,
            password: data.targetUserPass,
          });
          expect(false).toBe(true);
        } catch (err: any) {
          expect(err.response?.status).toBe(401);
          expect(err.response?.data?.error).toContain(data.expectedError!);
        }
        return;
      }

      // Default Admin flow
      await auth.injectAdminSession();
      await adminUsersPage.goto();

      if (data.testType === 'integration_profile_phone_sync') {
        const userDetails = await adminUsersPage.getUserDetails(data.targetUserEmail!);
        expect(userDetails.email).toBe(data.targetUserEmail);
      } else if (data.testType === 'positive_view_list' || data.testType === 'ui_dom_structure_validation') {
        await expect(adminUsersPage.usersTable).toBeVisible();
        for (const header of (data as any).expectedHeaders || ['ID', 'Email', 'Role']) {
          await expect(adminUsersPage.usersTable.locator(`th:has-text("${header}")`)).toBeVisible();
        }
      } else if (data.testType === 'security_no_passwords_leaked') {
        const tableHtml = await adminUsersPage.usersTable.innerHTML();
        expect(tableHtml).not.toContain('password');
        expect(tableHtml).not.toContain('Admin123!');
        expect(tableHtml).not.toContain('Test1234!');
      } else if (data.testType === 'ui_role_badge_verification') {
        const adminUser = await adminUsersPage.getUserDetails('admin@eshop.com');
        expect(adminUser.role).toBe('admin');
      } else if (data.testType === 'safety_admin_self_delete_protection') {
        const adminRow = adminUsersPage.getUserRowByEmail(data.loginEmail!);
        await expect(adminRow).toBeVisible();
      }
    });
  }
});
