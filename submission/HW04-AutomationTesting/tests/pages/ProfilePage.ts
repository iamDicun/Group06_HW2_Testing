import { Locator, Page } from "@playwright/test";

/** Page Object cho trang Ho so ca nhan / Lich su don hang (user) - FR-11. */
export class ProfilePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly table: Locator;
  readonly rows: Locator;
  readonly emptyMessage: Locator;
  readonly loginRequired: Locator;
  readonly cancelButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h2:has-text("Lịch sử đơn hàng")');
    this.table = page.locator("table");
    this.rows = page.locator("table tbody tr");
    this.emptyMessage = page.locator("text=Bạn chưa có đơn hàng nào.");
    this.loginRequired = page.locator("text=Vui lòng đăng nhập");
    this.cancelButtons = page.locator('button:has-text("Hủy đơn")');
  }

  async goto(): Promise<void> {
    await this.page.goto("/profile");
  }

  rowContaining(label: string): Locator {
    return this.page.locator("table tbody tr", { hasText: label });
  }
}
