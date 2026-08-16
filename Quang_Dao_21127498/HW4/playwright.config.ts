import { defineConfig, devices } from '@playwright/test';

const STUDENT_ID = '21127498';

/**
 * The matrix runner (scripts/run-matrix.js) sets PW_REPORT_DIR to a unique
 * folder for each of the 9 feature x browser cells before invoking
 * `npx playwright test`. When this config is loaded directly (e.g. running
 * `npx playwright test` by hand, with no runner involved), fall back to a
 * single default folder so the config still works on its own.
 */
const reportDir = process.env.PW_REPORT_DIR ?? 'playwright-report';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: reportDir, open: 'never' }],
  ],

  /**
   * Playwright's built-in HTML reporter has no supported "title" option,
   * so this metadata is NOT what makes "Run by: ..." visible in the report
   * (see scripts/run-matrix.js -> stampReport() for that). It is kept here
   * only so the raw run also carries this info in its metadata/trace for
   * anyone inspecting the JSON/trace output directly, not just the HTML.
   */
  metadata: {
    studentId: STUDENT_ID,
    feature: process.env.PW_FEATURE ?? 'unspecified',
    browser: process.env.PW_BROWSER ?? 'unspecified',
  },

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
