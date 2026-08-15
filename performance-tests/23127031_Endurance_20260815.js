import { runEShopWorkflow } from './k6-eshop-workflow.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SCENARIO 4: ENDURANCE / SOAK TEST
 * Name: 23127031_Endurance_20260815
 * Objective: Run a 12-minute sustained load test (10m steady @ 30 VUs) to empirically find
 * hardware capacity limits: Maximum Stable RPS, Memory Ceiling, Error Thresholds, and Degradation Drift.
 */
export const options = {
  stages: [
    { duration: '1m', target: 30 },   // Stage 1: Warm-up ramp (1 min to 30 VUs)
    { duration: '10m', target: 30 },  // Stage 2: Sustained load holding at 30 VUs (10 mins)
    { duration: '1m', target: 0 },    // Stage 3: Graceful ramp-down (1 min)
  ],
  thresholds: {
    'group_duration{group:::auth}': ['p(95)<800'],
    'group_duration{group:::read}': ['p(95)<1000'],
    'group_duration{group:::transactional}': ['p(95)<2000'],
    http_req_duration: ['p(95)<1200'],
    http_req_failed: ['rate<0.02'], // Sustained error rate must remain under 2%
  },
};

export default function () {
  runEShopWorkflow();
}

export function handleSummary(data) {
  const summaryText = textSummary(data, { indent: '  ', enableColors: false });
  const timestamp = new Date().toISOString();

  // Extract empirical performance metrics
  const totalHttpReqs = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const avgRps = data.metrics.http_reqs ? (data.metrics.http_reqs.values.rate).toFixed(2) : '0';
  const failedRate = data.metrics.http_req_failed ? ((data.metrics.http_req_failed.values.rate) * 100).toFixed(2) : '0';
  const p95Latency = data.metrics.http_req_duration ? (data.metrics.http_req_duration.values['p(95)']).toFixed(2) : '0';
  const maxLatency = data.metrics.http_req_duration ? (data.metrics.http_req_duration.values.max).toFixed(2) : '0';

  const enduranceReport = `================================================================================
EShop Performance Test — ENDURANCE / SOAK TEST THRESHOLD REPORT
Scenario: 23127031_Endurance_20260815
Execution Time: ${timestamp}
Sustained Duration: 12 minutes (10 minutes steady load @ 30 Virtual Users)
================================================================================

[EMPIRICAL HARDWARE THRESHOLD SUMMARY]
- Total Completed Requests: ${totalHttpReqs}
- Maximum Stable Throughput (RPS): ~${avgRps} requests/sec
- Overall Failure Rate: ${failedRate}% (Target: < 2.0%)
- Latency p(95): ${p95Latency} ms (Target: < 1200 ms)
- Maximum Observed Latency: ${maxLatency} ms

[RESOURCE USAGE OBSERVATION GUIDELINES]
- Process: Node.js (backend) + SQLite + k6 Runner
- Target Memory Ceiling: < 150 MB RSS (Check Task Manager during peak)
- Target CPU Utilization: Stable around 10% - 25% across test duration
- Memory Leak Detection: If RSS increases continuously without plateauing after min 5, flag potential leak.

================================================================================
DETAILED K6 METRICS BREAKDOWN:
================================================================================
${summaryText}
`;

  return {
    'reports/23127031_Endurance_20260815_Report.txt': enduranceReport,
    'reports/23127031_Endurance_20260815_Summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
