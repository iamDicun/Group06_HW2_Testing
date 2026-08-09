import { Locator, Page } from "@playwright/test";

/** Page Object cho trang Dang nhap (frontend-web) - dung de login user. */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("form input").nth(0);
    this.passwordInput = page.locator("form input").nth(1);
    this.submitButton = page.locator('form button[type="submit"]');
    this.errorBox = page.locator("div.bg-red-100");
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    const authValidation = this.page.waitForResponse(
      (r) => r.url().includes("/api/users/me") && r.status() === 200,
    );
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await authValidation;
  }
}
