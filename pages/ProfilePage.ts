import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for FR-04: Personal Profile Management
 * URL: http://localhost:5173/profile
 * Run by: 23127391
 */
export class ProfilePage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly updateButton: Locator;
  readonly loginRequiredPrompt: Locator;
  readonly profileHeader: Locator;
  readonly orderHistoryHeader: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('form input[disabled]');
    this.nameInput = page.locator('form input[required]');
    this.phoneInput = page.locator('form input[placeholder*="09"], form input[type="text"]').nth(2);
    this.addressInput = page.locator('form textarea');
    this.updateButton = page.getByRole('button', { name: 'Cập nhật' });
    this.loginRequiredPrompt = page.getByText('Vui lòng đăng nhập');
    this.profileHeader = page.getByRole('heading', { name: 'Hồ sơ của bạn' });
    this.orderHistoryHeader = page.getByRole('heading', { name: 'Lịch sử đơn hàng' });
    this.orderRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/profile');
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async fillProfile(name: string, phone: string, address: string) {
    if (name !== undefined && name !== '') {
      await this.nameInput.fill(name);
    } else if (name === '') {
      await this.nameInput.clear();
    }
    if (phone !== undefined) {
      await this.phoneInput.fill(phone);
    }
    if (address !== undefined) {
      await this.addressInput.fill(address);
    }
  }

  async submitUpdate(): Promise<string> {
    let dialogMessage = '';
    const dialogPromise = new Promise<string>((resolve) => {
      const handler = async (dialog: any) => {
        dialogMessage = dialog.message();
        await dialog.accept().catch(() => {});
        resolve(dialogMessage);
      };
      this.page.once('dialog', handler);
      setTimeout(() => resolve(''), 3000);
    });

    await this.updateButton.click();
    const result = await dialogPromise;
    return result || dialogMessage;
  }

  getOrderRow(orderId: number | string): Locator {
    return this.page.locator('table tbody tr').filter({
      has: this.page.locator('td', { hasText: new RegExp(`^#${orderId}$`) }),
    });
  }

  async cancelOrder(orderId: number | string): Promise<string> {
    const row = this.getOrderRow(orderId);
    await row.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const cancelBtn = row.getByRole('button', { name: 'Hủy đơn' });
    if (await cancelBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      let dialogMsg = '';
      const dialogPromise = new Promise<string>((resolve) => {
        const handler = async (dialog: any) => {
          dialogMsg = dialog.message();
          await dialog.accept().catch(() => {});
          resolve(dialogMsg);
        };
        this.page.once('dialog', handler);
        setTimeout(() => resolve(''), 3000);
      });

      await cancelBtn.click();
      return await dialogPromise;
    }
    return '';
  }

  async getOrderStatus(orderId: number | string): Promise<string> {
    const row = this.getOrderRow(orderId);
    await row.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const badge = row.locator('td:nth-child(4) span');
    return (await badge.textContent())?.trim() || '';
  }
}
