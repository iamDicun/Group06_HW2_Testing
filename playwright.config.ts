import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * Playwright Configuration for EShop Cross-Browser Data-Driven Automation Testing
 * Run by: 23127391
 * Task 1: Automation Testing on 3 Browsers (Chromium, Firefox, WebKit) for FR-04, FR-10, FR-19
 */
export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: 3,
  retries: 0,
  metadata: {
    'Run by': '23127391',
    'Student ID (MSSV)': '23127391',
    'Course': 'Software Testing — HW02',
    'Assignment Type': 'Task 1: Data-Driven Cross-Browser Automation Suite',
    'Target Features': 'FR-04 (Profile), FR-10 (Order State Machine), FR-19 (User Management Admin)',
    'Target Browsers': 'Chromium, Firefox, WebKit (9 Suite Runs)',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/summary.json' }],
    ['./reporters/custom-header-reporter.ts'],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 5000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
