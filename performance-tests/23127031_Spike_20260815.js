import { runEShopWorkflow } from './k6-eshop-workflow.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SCENARIO 3: SPIKE TEST
 * Name: 23127031_Spike_20260815
 * Objective: Verify system behavior during an abrupt traffic surge (flash sale) and measure recovery latency back to baseline.
 * Report View: Detailed Text-Formatted Log & Console View (Listener 3)
 */
export const options = {
  stages: [
    { duration: '30s', target: 15 },   // Phase 1: Baseline normal operation (15 VUs)
    { duration: '15s', target: 120 },  // Phase 2: Sudden Flash-Sale Spike (15s jump to 120 VUs ~ 8x)
    { duration: '45s', target: 120 },  // Phase 3: Short peak hold
    { duration: '15s', target: 15 },   // Phase 4: Instant drop back to baseline
    { duration: '1m30s', target: 15 }, // Phase 5: Recovery measurement at baseline
    { duration: '15s', target: 0 },    // Phase 6: Cooldown
  ],
  thresholds: {
    // Focus is on system survivability and fast recovery post-spike
    http_req_failed: ['rate<0.15'], // Allow up to 15% error during severe spike peak
  },
};

export default function () {
  runEShopWorkflow();
}

// Distinct Report Output 3: Comprehensive Text Log Output
export function handleSummary(data) {
  const summaryOutput = textSummary(data, { indent: '  ', enableColors: false });
  const timestamp = new Date().toISOString();
  
  const header = `========================================================================
EShop Performance Test - SPIKE TEST RUN REPORT
Scenario: 23127031_Spike_20260815
Executed At: ${timestamp}
Report Format: Raw Console & Metric Summary Log (Listener Type 3)
========================================================================\n\n`;

  return {
    'reports/23127031_Spike_20260815_Console.txt': header + summaryOutput,
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
