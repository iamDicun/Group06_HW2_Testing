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
    this.emailInput = page.locator('input[disabled]');
    // Precise selectors avoiding strict mode violation
    this.nameInput = page.locator('form input[required]');
    this.phoneInput = page.getByPlaceholder('VD: 0912345678');
    this.addressInput = page.getByPlaceholder('Nhập địa chỉ của bạn');
    this.updateButton = page.getByRole('button', { name: 'Cập nhật' });
    this.loginRequiredPrompt = page.getByText('Vui lòng đăng nhập');
    this.profileHeader = page.getByRole('heading', { name: 'Hồ sơ của bạn' });
    this.orderHistoryHeader = page.getByRole('heading', { name: 'Lịch sử đơn hàng' });
    this.orderRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/profile');
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
    try {
      const [dialog] = await Promise.all([
        this.page.waitForEvent('dialog', { timeout: 2500 }),
        this.updateButton.click(),
      ]);
      const msg = dialog.message();
      await dialog.accept().catch(() => {});
      return msg;
    } catch (e) {
      return '';
    }
  }

  async cancelOrder(orderId: number | string): Promise<string> {
    const row = this.page.locator(`tr:has-text("#${orderId}")`);
    const cancelBtn = row.getByRole('button', { name: 'Hủy đơn' });
    if (await cancelBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      try {
        const [dialog] = await Promise.all([
          this.page.waitForEvent('dialog', { timeout: 2500 }),
          cancelBtn.click(),
        ]);
        const msg = dialog.message();
        await dialog.accept().catch(() => {});
        return msg;
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  async getOrderStatus(orderId: number | string): Promise<string> {
    const row = this.page.locator(`tr:has-text("#${orderId}")`);
    return (await row.locator('span').textContent())?.trim() || '';
  }
}
