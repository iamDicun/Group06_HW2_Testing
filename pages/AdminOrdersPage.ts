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
    this.ordersTab = page.locator('li:has-text("Đơn hàng")');
    this.ordersHeading = page.getByRole('heading', { name: 'Quản lý Đơn hàng' });
    this.ordersTable = page.locator('table');
    this.orderRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5174');
    if (await this.ordersTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.ordersTab.click();
      await this.ordersHeading.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    }
  }

  getOrderRow(orderId: number | string): Locator {
    return this.page.locator(`tr:has-text("#${orderId}")`);
  }

  async getOrderStatus(orderId: number | string): Promise<string> {
    const row = this.getOrderRow(orderId);
    const badge = row.locator('span.rounded');
    return (await badge.textContent())?.trim() || '';
  }

  async clickOrderAction(orderId: number | string, actionName: string): Promise<string> {
    const row = this.getOrderRow(orderId);
    const btn = row.getByRole('button', { name: actionName });
    if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
      try {
        const [dialog] = await Promise.all([
          this.page.waitForEvent('dialog', { timeout: 1500 }).catch(() => null),
          btn.click(),
        ]);
        if (dialog) {
          const msg = dialog.message();
          await dialog.accept().catch(() => {});
          await this.page.waitForTimeout(400);
          return msg;
        }
      } catch (e) {}
      await this.page.waitForTimeout(600);
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
