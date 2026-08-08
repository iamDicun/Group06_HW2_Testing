import { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Custom Playwright Reporter
 * Visibly injects author metadata and banner into HTML report and console:
 * "Run by: 23127391"
 */
export default class CustomHeaderReporter implements Reporter {
  private totalTests = 0;
  private passedTests = 0;
  private failedTests = 0;
  private skippedTests = 0;
  private startTime = Date.now();

  onBegin(config: FullConfig, suite: Suite) {
    this.totalTests = suite.allTests().length;
    console.log('\n===============================================================');
    console.log('  EShop Automation Test Suite — Data-Driven Cross-Browser');
    console.log('  Task 1: Automation Testing for FR-04, FR-10, FR-19');
    console.log('  Run by: 23127391');
    console.log(`  Total Planned Test Executions: ${this.totalTests}`);
    console.log('  Target Browsers: Chromium, Firefox, WebKit (9 Suite Runs)');
    console.log('===============================================================\n');
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') this.passedTests++;
    else if (result.status === 'failed') this.failedTests++;
    else if (result.status === 'skipped') this.skippedTests++;
  }

  onEnd(result: FullResult) {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log('\n===============================================================');
    console.log('  TEST EXECUTION SUMMARY');
    console.log('  Run by: 23127391');
    console.log(`  Result Status: ${result.status.toUpperCase()}`);
    console.log(`  Passed: ${this.passedTests} | Failed: ${this.failedTests} | Skipped: ${this.skippedTests} | Total: ${this.totalTests}`);
    console.log(`  Duration: ${duration}s`);
    console.log('===============================================================\n');

    // Post-process Playwright HTML report to guarantee "Run by: 23127391" banner is prominently visible
    try {
      const reportDir = path.resolve(process.cwd(), 'playwright-report');
      const indexPath = path.join(reportDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');

        // Inject banner into the HTML report header / title
        const bannerInjection = `
          <div id="author-banner" style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 14px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-bottom: 3px solid #f59e0b; position: relative; z-index: 9999;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #f59e0b; color: #1e293b; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 800; letter-spacing: 0.5px;">TASK 1</span>
              <span>EShop Automation Test Report — Cross-Browser Suite (Chromium / Firefox / WebKit)</span>
            </div>
            <div style="background: rgba(255,255,255,0.15); padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 700; border: 1px solid rgba(255,255,255,0.3);">
              Run by: <span style="color: #fbbf24; text-decoration: underline;">23127391</span>
            </div>
          </div>
        `;

        if (!html.includes('id="author-banner"')) {
          html = html.replace('<body>', `<body>${bannerInjection}`);
          html = html.replace('<title>', `<title>[Run by: 23127391] `);
          fs.writeFileSync(indexPath, html, 'utf-8');
        }
      }
    } catch (e) {
      console.warn('Could not inject banner to HTML report:', e);
    }
  }
}
