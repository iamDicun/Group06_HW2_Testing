import { runEShopWorkflow } from './k6-eshop-workflow.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SCENARIO 2: STRESS TEST
 * Name: 23127031_Stress_20260815
 * Objective: Find breaking point, degradation limits, and observe SQLite lock contention under extreme concurrency.
 * Report View: Summary / Aggregated JSON Metric Export (Listener 2)
 */
export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Step 0: Baseline warm-up (20 VUs)
    { duration: '1m', target: 50 },    // Step 1: Moderate stress (50 VUs)
    { duration: '1m', target: 80 },    // Step 2: High stress (80 VUs)
    { duration: '1m', target: 120 },   // Step 3: Extreme stress (120 VUs - testing SQLite locking limits)
    { duration: '1m', target: 150 },   // Step 4: Maximum breaking stress (150 VUs)
    { duration: '45s', target: 0 },    // Cooldown ramp-down
  ],
  thresholds: {
    // Relaxed thresholds for stress testing to observe system behavior past normal limits
    'group_duration{group:::auth}': ['p(95)<2000'],
    'group_duration{group:::read}': ['p(95)<3000'],
    'group_duration{group:::transactional}': ['p(95)<5000'],
    http_req_failed: ['rate<0.10'], // Monitor degradation if failure rate exceeds 10%
  },
};

export default function () {
  runEShopWorkflow();
}

// Distinct Report Output 2: Structured Aggregated JSON Metric Summary
export function handleSummary(data) {
  // Extract custom aggregated summary metrics
  const customSummary = {
    testName: '23127031_Stress_20260815',
    timestamp: new Date().toISOString(),
    scenarios: data.metrics,
    rootGroup: data.root_group,
    summaryStats: {
      totalRequests: data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0,
      failedRequestsRate: data.metrics.http_req_failed ? data.metrics.http_req_failed.values.rate : 0,
      p90_duration_ms: data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(90)'] : 0,
      p95_duration_ms: data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(95)'] : 0,
      max_duration_ms: data.metrics.http_req_duration ? data.metrics.http_req_duration.values.max : 0,
      avg_rps: data.metrics.http_reqs ? data.metrics.http_reqs.values.rate : 0,
    }
  };

  return {
    'reports/23127031_Stress_20260815_Summary.json': JSON.stringify(customSummary, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
