import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for FR-10: Order State Machine
 * URL: http://localhost:5174 (Admin Web -> Tab Đơn hàng)
 * Run by: 23127391
 */
export class AdminOrdersPage {
  readonly page: Page;
  readonly ordersTab: Locator;
  readonly ordersHeading: Locator;
  readonly ordersTable: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersTab = page.locator('li').filter({ hasText: /^Đơn hàng$/ });
    this.ordersHeading = page.getByRole('heading', { name: 'Quản lý Đơn hàng' });
    this.ordersTable = page.locator('table');
    this.orderRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5174');
    await this.ordersTab.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    if (await this.ordersTab.isVisible().catch(() => false)) {
      await this.ordersTab.click();
      await this.ordersHeading.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.ordersTable.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
  }

  getOrderRow(orderId: number | string): Locator {
    return this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: new RegExp(`^#${orderId}$`) }),
    });
  }

  async getOrderStatus(orderId: number | string): Promise<string> {
    const row = this.getOrderRow(orderId);
    await row.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const badge = row.locator('td:nth-child(5) span');
    return (await badge.textContent())?.trim() || '';
  }

  async clickOrderAction(orderId: number | string, actionName: string): Promise<string> {
    const row = this.getOrderRow(orderId);
    await row.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const btn = row.getByRole('button', { name: actionName });
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      let alertMsg = '';
      const dialogHandler = (dialog: any) => {
        alertMsg = dialog.message();
        dialog.accept().catch(() => {});
      };
      this.page.once('dialog', dialogHandler);
      await btn.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      return alertMsg;
    }
    return '';
  }

  async isActionAvailable(orderId: number | string, actionName: string): Promise<boolean> {
    const row = this.getOrderRow(orderId);
    const btn = row.getByRole('button', { name: actionName });
    return await btn.isVisible({ timeout: 1000 }).catch(() => false);
  }

  async getAllAvailableActions(orderId: number | string): Promise<string[]> {
    const row = this.getOrderRow(orderId);
    const buttons = row.locator('button');
    const count = await buttons.count();
    const actionNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      if (text) actionNames.push(text.trim());
    }
    return actionNames;
  }
}

