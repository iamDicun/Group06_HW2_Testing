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
    this.usersTab = page.locator('li').filter({ hasText: /^Người dùng$/ });
    this.usersHeading = page.getByRole('heading', { name: 'Quản lý Người dùng' });
    this.usersTable = page.locator('table');
    this.userRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5174');
    await this.usersTab.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    if (await this.usersTab.isVisible().catch(() => false)) {
      await this.usersTab.click();
      await this.usersHeading.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.usersTable.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
  }

  getUserRowByEmail(email: string): Locator {
    return this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: new RegExp(`^${email}$`) }),
    });
  }

  async getUserCount(): Promise<number> {
    return await this.userRows.count();
  }

  async deleteUser(email: string): Promise<string> {
    const row = this.getUserRowByEmail(email);
    await row.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const deleteBtn = row.getByRole('button', { name: 'Xóa' });
    if (await deleteBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      let alertMsg = '';
      const dialogHandler = (dialog: any) => {
        alertMsg = dialog.message();
        dialog.accept().catch(() => {});
      };
      this.page.once('dialog', dialogHandler);
      await deleteBtn.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      return alertMsg;
    }
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

