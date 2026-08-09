import { Page, expect } from '@playwright/test';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

/**
 * Authentication and Session Management Helper
 * Run by: 23127391
 */
export class AuthHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Fast, reliable token pre-seeding using Playwright addInitScript
   * Ensures React AuthContext reads localStorage upon initial mount
   */
  async injectCustomerSession(email: string = 'test@eshop.com', password: string = 'Test1234!') {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = res.data;
      await this.page.addInitScript(({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }, { token, user });
    } catch (e) {
      await this.loginCustomerUI(email, password);
    }
  }

  /**
   * Fast, reliable admin token pre-seeding
   */
  async injectAdminSession(email: string = 'admin@eshop.com', password: string = 'Admin123!') {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = res.data;
      await this.page.addInitScript((token) => {
        localStorage.setItem('adminToken', token);
      }, token);
    } catch (e) {
      await this.loginAdminUI(email, password);
    }
  }

  /**
   * Customer UI Login
   */
  async loginCustomerUI(email: string = 'test@eshop.com', password: string = 'Test1234!') {
    await this.page.goto('http://localhost:5173/login');
    const emailInput = this.page.locator('form input[type="text"]');
    const passwordInput = this.page.locator('form input[type="password"]');
    const submitBtn = this.page.getByRole('button', { name: 'Sign In' });

    if (await emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
      await emailInput.fill(email);
      await passwordInput.fill(password);
      await submitBtn.click();
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Admin UI Login
   */
  async loginAdminUI(email: string = 'admin@eshop.com', password: string = 'Admin123!') {
    await this.page.goto('http://localhost:5174');
    const emailInput = this.page.getByPlaceholder('Email');
    if (await emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
      await emailInput.fill(email);
      await this.page.getByPlaceholder('Password').fill(password);
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.waitForTimeout(300);
    }
  }

  async logoutAdmin() {
    const logoutBtn = this.page.getByText('Đăng xuất');
    if (await logoutBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await logoutBtn.click();
      await this.page.waitForTimeout(200);
    }
  }
}
