import { defineConfig, devices } from "@playwright/test";

/**
 * HW04 - Automation Testing
 * MSSV: 23127459
 *
 * Cấu hình chạy đa trình duyệt (Chromium, Firefox, WebKit).
 * Báo cáo HTML nhúng thông tin "Run by: 23127459".
 */
export const MSSV = "23127459";

const WEB_BASE_URL = process.env.WEB_BASE_URL || "http://localhost:5173";
const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || "http://localhost:5174";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: process.env.PW_WORKERS ? Number(process.env.PW_WORKERS) : 3,
  retries: 0,

  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
        title: `Run by: ${MSSV} - EShop E2E Automation Test Report (FR-05, FR-11, FR-17)`,
      },
    ],
  ],

  use: {
    baseURL: WEB_BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 30_000,
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
