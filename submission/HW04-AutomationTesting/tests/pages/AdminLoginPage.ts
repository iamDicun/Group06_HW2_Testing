import { Locator, Page } from "@playwright/test";

/** Page Object cho man hinh dang nhap phan he Admin (frontend-admin). */
export class AdminLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly heading: Locator;
  readonly sidebarHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.submitButton = page.locator('button:has-text("Login")');
    this.heading = page.locator('h2:has-text("Admin Login")');
    this.sidebarHeading = page.locator('h1:has-text("EShop Admin")');
  }

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
