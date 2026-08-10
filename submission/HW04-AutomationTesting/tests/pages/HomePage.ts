import { Locator, Page } from "@playwright/test";

/** Page Object cho trang chu (Danh sach san pham) - FR-05. */
export class HomePage {
  readonly page: Page;
  readonly h1: Locator;
  readonly h1All: Locator;
  readonly grid: Locator;
  readonly productCards: Locator;
  readonly productImages: Locator;
  readonly priceElements: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultLine: Locator;
  readonly emptyState: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.locator("h1");
    this.h1All = page.locator("h1");
    this.grid = page.locator(".grid");
    this.productCards = page.locator(".grid > div");
    this.productImages = page.locator(".grid img");
    this.priceElements = page.locator(".grid p.text-red-500");
    this.searchInput = page.locator('input[placeholder="Tìm kiếm..."]');
    this.searchButton = page.locator('button:has-text("Tìm")');
    this.resultLine = page.locator("div.mb-4.text-gray-600");
    this.emptyState = page.locator("text=Không tìm thấy sản phẩm");
    this.loadingIndicator = page.locator('[class*="loading"], [class*="spinner"], [aria-busy="true"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
