import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for FR-19: User Management (Admin)
 * URL: http://localhost:5174 (Admin Web -> Tab Người dùng)
 * Run by: 23127391
 */
export class AdminUsersPage {
  readonly page: Page;
  readonly usersTab: Locator;
  readonly usersHeading: Locator;
  readonly usersTable: Locator;
  readonly userRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usersTab = page.locator('li:has-text("Người dùng")');
    this.usersHeading = page.getByRole('heading', { name: 'Quản lý Người dùng' });
    this.usersTable = page.locator('table');
    this.userRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5174');
    if (await this.usersTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.usersTab.click();
      await this.usersHeading.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    }
  }

  getUserRowByEmail(email: string): Locator {
    return this.page.locator(`table tbody tr:has-text("${email}")`);
  }

  async getUserCount(): Promise<number> {
    return await this.userRows.count();
  }

  async deleteUser(email: string): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null);
    const row = this.getUserRowByEmail(email);
    const deleteBtn = row.getByRole('button', { name: 'Xóa' });
    if (await deleteBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await deleteBtn.click();
      const dialog = await dialogPromise;
      if (dialog) {
        const msg = dialog.message();
        await dialog.accept().catch(() => {});
        return msg;
      }
    }
    await this.page.waitForTimeout(500);
    return '';
  }

  async isUserPresent(email: string): Promise<boolean> {
    const row = this.getUserRowByEmail(email);
    return (await row.count()) > 0;
  }

  async getUserDetails(email: string): Promise<{ id: string; email: string; role: string; phone: string }> {
    const row = this.getUserRowByEmail(email);
    const cells = row.locator('td');
    return {
      id: (await cells.nth(1).textContent())?.trim() || '',
      email: (await cells.nth(2).textContent())?.trim() || '',
      role: (await cells.nth(3).textContent())?.trim() || '',
      phone: (await cells.nth(4).textContent())?.trim() || '',
    };
  }
}
