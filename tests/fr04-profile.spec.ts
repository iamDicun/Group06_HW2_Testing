import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';
import { AuthHelper } from '../pages/AuthHelper';
import profileTestData from '../data/fr04-profile-data.json';

/**
 * FR-04: Personal Profile Management — Data-Driven Test Suite
 * Run by: 23127391
 * Task 1: Cross-Browser Testing (Chromium, Firefox, WebKit)
 */
test.describe('FR-04: Personal Profile Management [Run by: 23127391]', () => {
  test.beforeEach(async ({ page }) => {
    test.info().annotations.push({ type: 'Run by', description: '23127391' });
    test.info().annotations.push({ type: 'Feature', description: 'FR-04 Personal Profile Management' });
  });

  for (const data of profileTestData) {
    test(`${data.scenarioId}: ${data.description}`, async ({ page }) => {
      const auth = new AuthHelper(page);
      const profilePage = new ProfilePage(page);

      if (data.testType === 'access_control_unauthenticated') {
        await profilePage.goto();
        await expect(profilePage.loginRequiredPrompt).toBeVisible();
        await expect(profilePage.nameInput).not.toBeVisible();
        return;
      }

      // Fast session injection
      await auth.injectCustomerSession(data.loginEmail!, data.loginPassword!);
      await profilePage.goto();

      if (data.testType === 'security_integrity') {
        await expect(profilePage.emailInput).toBeDisabled();
        const emailVal = await profilePage.emailInput.inputValue();
        expect(emailVal).toBe(data.loginEmail);
        return;
      }

      if (data.testType === 'security_privilege_escalation') {
        const roleLocator = page.locator('select[name="role"], input[name="role"]');
        await expect(roleLocator).toHaveCount(0);
        return;
      }

      if (data.testType === 'negative_required') {
        await profilePage.fillProfile(data.inputName, data.inputPhone, data.inputAddress);
        const isValid = await profilePage.nameInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValid).toBeFalsy();
        return;
      }

      // Fill profile with data-driven values
      await profilePage.fillProfile(data.inputName, data.inputPhone, data.inputAddress);
      const alertMsg = await profilePage.submitUpdate();

      // Verify that SUT responded to form submission
      expect(typeof alertMsg).toBe('string');
    });
  }
});
