import { Locator, Page } from "@playwright/test";

export interface CouponData {
  code: string;
  type: string;
  discount_value: number;
  min_order_amount?: number;
  expired_at?: string;
  max_uses_per_user?: number;
}

/** Page Object cho tab Quan ly Ma Giam Gia (Admin) - FR-17. */
export class AdminCouponsPage {
  readonly page: Page;
  readonly sidebarItem: Locator;
  readonly heading: Locator;
  readonly codeInput: Locator;
  readonly typeSelect: Locator;
  readonly discountInput: Locator;
  readonly minOrderInput: Locator;
  readonly expiryInput: Locator;
  readonly maxUsesInput: Locator;
  readonly createButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarItem = page.locator("li", { hasText: "Mã Giảm Giá" });
    this.heading = page.locator('h2:has-text("Quản lý Mã Giảm Giá")');
    this.codeInput = page.locator('input[placeholder^="Mã coupon"]');
    this.typeSelect = page.locator("select");
    this.discountInput = page.locator('form input[type="number"]').nth(0);
    this.minOrderInput = page.locator('input[placeholder="Đơn tối thiểu (₫)"]');
    this.expiryInput = page.locator('input[type="date"]');
    this.maxUsesInput = page.locator(
      'input[placeholder="Số lần dùng tối đa/người"]',
    );
    this.createButton = page.locator('button:has-text("Tạo mã")');
    this.tableRows = page.locator("table tbody tr");
  }

  async open(): Promise<void> {
    await this.sidebarItem.click();
  }

  rowByCode(code: string): Locator {
    return this.page.locator("table tbody tr", { hasText: code });
  }

  async fillCoupon(coupon: CouponData): Promise<void> {
    if (coupon.code !== undefined) {
      await this.codeInput.fill(coupon.code);
    }
    await this.typeSelect.selectOption(coupon.type);
    if (coupon.discount_value !== undefined) {
      await this.discountInput.fill(String(coupon.discount_value));
    }
    if (coupon.min_order_amount !== undefined) {
      await this.minOrderInput.fill(String(coupon.min_order_amount));
    }
    if (coupon.expired_at !== undefined) {
      await this.expiryInput.fill(coupon.expired_at);
    }
    if (coupon.max_uses_per_user !== undefined) {
      await this.maxUsesInput.fill(String(coupon.max_uses_per_user));
    }
  }

  async createCoupon(coupon: CouponData): Promise<void> {
    await this.fillCoupon(coupon);
    await this.createButton.click();
  }

  async deleteCoupon(code: string): Promise<void> {
    await this.rowByCode(code).locator('button:has-text("Xóa")').click();
  }
}
