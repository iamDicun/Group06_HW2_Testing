import { runEShopWorkflow } from './k6-eshop-workflow.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SCENARIO 1: LOAD TEST
 * Name: 23127031_Load_20260815
 * Objective: Verify system stability, response times, and throughput under normal and expected peak load.
 * Report View: HTML Dashboard Report (Listener 1)
 */
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up to normal load (20 VUs)
    { duration: '1m', target: 20 },   // Sustained normal load
    { duration: '30s', target: 40 },  // Ramp-up to peak load (40 VUs ~ 2x)
    { duration: '1m', target: 40 },   // Sustained peak load
    { duration: '30s', target: 0 },   // Ramp-down to 0 VUs
  ],
  thresholds: {
    'group_duration{group:::auth}': ['p(95)<500'],            // Auth group SLA p95 < 500ms
    'group_duration{group:::read}': ['p(95)<800'],            // Read group SLA p95 < 800ms
    'group_duration{group:::transactional}': ['p(95)<1500'],  // Transactional SLA p95 < 1500ms
    http_req_duration: ['p(95)<1000'],                        // Overall p95 response time < 1000ms
    http_req_failed: ['rate<0.01'],                           // Error rate must be under 1%
  },
};

export default function () {
  runEShopWorkflow();
}

// Distinct Report Output 1: Rich HTML Dashboard Report
export function handleSummary(data) {
  return {
    'reports/23127031_Load_20260815_Report.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
