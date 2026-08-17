// html-report.js — shared reporting for all scenarios.
// Import { handleSummary } into each scenario script and re-export it:
//   import { handleSummary } from './html-report.js';
//   export { handleSummary };
//
// Produces three outputs from ONE run:
//   A. stdout  — compact text summary (works offline; no remote jslib dependency)
//   B. JSON    — full summary object (machine-readable; complements `k6 run --out json=`)
//   C. HTML    — human-readable report
//
// It only reports metrics k6 actually collected — nothing is fabricated. Missing metrics render
// as "n/a" rather than invented numbers.
//
// Configure output paths / labels via __ENV (all optional):
//   REPORT_DIR   (default 'performance/reports')
//   RESULTS_DIR  (default 'performance/results')
//   TEST_NAME    (default 'k6-test')
//   TARGET_URL   (default the BASE_URL your script used, if you pass it through)

const REPORT_DIR = __ENV.REPORT_DIR || 'performance/reports';
const RESULTS_DIR = __ENV.RESULTS_DIR || 'performance/results';
const TEST_NAME = __ENV.TEST_NAME || 'k6-test';
const TARGET_URL = __ENV.TARGET_URL || '(set TARGET_URL to record the target)';

function num(v, digits = 2) {
  return typeof v === 'number' && isFinite(v) ? v.toFixed(digits) : 'n/a';
}

// Safely pull a sub-metric value; returns undefined if absent so we can render "n/a".
function m(data, name, field) {
  const metric = data.metrics && data.metrics[name];
  if (!metric || !metric.values) return undefined;
  return metric.values[field];
}

function collect(data) {
  const dur = (data.metrics && data.metrics.http_req_duration) || null;
  const durValues = dur ? dur.values : {};
  return {
    testName: TEST_NAME,
    timestamp: new Date().toISOString(),
    target: TARGET_URL,
    // request volume / throughput
    httpReqs: m(data, 'http_reqs', 'count'),
    rps: m(data, 'http_reqs', 'rate'),
    iterations: m(data, 'iterations', 'count'),
    vusMax: m(data, 'vus_max', 'value'),
    // latency distribution (only what k6 provides)
    p50: durValues['p(50)'] !== undefined ? durValues['p(50)'] : durValues['med'],
    p90: durValues['p(90)'],
    p95: durValues['p(95)'],
    p99: durValues['p(99)'],
    avg: durValues['avg'],
    max: durValues['max'],
    // errors / checks
    errorRate: m(data, 'http_req_failed', 'rate'),
    checksRate: m(data, 'checks', 'rate'),
    checksPasses: m(data, 'checks', 'passes'),
    checksFails: m(data, 'checks', 'fails'),
    // thresholds
    thresholds: extractThresholds(data),
  };
}

function extractThresholds(data) {
  const out = [];
  const metrics = data.metrics || {};
  for (const name of Object.keys(metrics)) {
    const t = metrics[name].thresholds;
    if (!t) continue;
    for (const expr of Object.keys(t)) {
      // k6 marks a threshold with `ok` (>=0.31) — false means it failed.
      const ok = t[expr] && t[expr].ok !== false;
      out.push({ metric: name, expr, passed: ok });
    }
  }
  return out;
}

function textReport(s) {
  const lines = [];
  lines.push('');
  lines.push(`  ${s.testName}  —  ${s.timestamp}`);
  lines.push(`  target: ${s.target}`);
  lines.push('  ' + '-'.repeat(52));
  lines.push(`  requests        ${s.httpReqs !== undefined ? s.httpReqs : 'n/a'}   (${num(s.rps)}/s)`);
  lines.push(`  iterations      ${s.iterations !== undefined ? s.iterations : 'n/a'}`);
  lines.push(`  vus (max)       ${s.vusMax !== undefined ? s.vusMax : 'n/a'}`);
  lines.push(`  latency  p50/p90/p95/p99  ${num(s.p50)} / ${num(s.p90)} / ${num(s.p95)} / ${num(s.p99)} ms`);
  lines.push(`  latency  avg/max          ${num(s.avg)} / ${num(s.max)} ms`);
  lines.push(`  error rate      ${s.errorRate !== undefined ? num(s.errorRate * 100) + '%' : 'n/a'}`);
  lines.push(`  checks          ${s.checksRate !== undefined ? num(s.checksRate * 100) + '%' : 'n/a'}  (pass ${s.checksPasses ?? 'n/a'} / fail ${s.checksFails ?? 'n/a'})`);
  if (s.thresholds.length) {
    lines.push('  thresholds:');
    for (const t of s.thresholds) {
      lines.push(`    [${t.passed ? 'PASS' : 'FAIL'}] ${t.metric}: ${t.expr}`);
    }
  }
  lines.push('  ' + '-'.repeat(52));
  lines.push('  NOTE: metrics reflect THIS run/environment. Percentiles are distributions,');
  lines.push('  not per-request times. See references/misinterpretation-guide.md before concluding.');
  lines.push('');
  return lines.join('\n');
}

function row(label, value) {
  return `<tr><th>${label}</th><td>${value}</td></tr>`;
}

function htmlReport(s) {
  const anyThresholdFailed = s.thresholds.some((t) => !t.passed);
  const overall = s.thresholds.length ? (anyThresholdFailed ? 'FAIL' : 'PASS') : 'N/A (no thresholds)';
  const thresholdRows = s.thresholds.length
    ? s.thresholds
        .map(
          (t) =>
            `<tr class="${t.passed ? 'ok' : 'bad'}"><td>${t.metric}</td><td><code>${t.expr}</code></td><td>${t.passed ? 'PASS' : 'FAIL'}</td></tr>`
        )
        .join('')
    : '<tr><td colspan="3">No thresholds configured.</td></tr>';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.testName} — k6 report</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 2rem auto; max-width: 820px; padding: 0 1rem; }
  h1 { font-size: 1.4rem; margin-bottom: .2rem; }
  .sub { color: #666; margin-top: 0; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #ccc4; }
  th { width: 45%; font-weight: 600; }
  .badge { display: inline-block; padding: .15rem .6rem; border-radius: .4rem; font-weight: 700; }
  .PASS, .ok { background: #1a7f3722; }
  .FAIL, .bad { background: #c0303022; }
  code { background: #8881; padding: .05rem .3rem; border-radius: .25rem; }
  .note { font-size: .85rem; color: #777; border-left: 3px solid #ccc; padding-left: .8rem; }
</style></head>
<body>
  <h1>${s.testName}</h1>
  <p class="sub">${s.timestamp} &middot; target: ${s.target} &middot; overall thresholds:
     <span class="badge ${overall.startsWith('PASS') ? 'PASS' : overall.startsWith('FAIL') ? 'FAIL' : ''}">${overall}</span></p>

  <h2>Volume &amp; throughput</h2>
  <table>
    ${row('Requests', s.httpReqs !== undefined ? s.httpReqs : 'n/a')}
    ${row('Throughput (req/s)', num(s.rps))}
    ${row('Iterations', s.iterations !== undefined ? s.iterations : 'n/a')}
    ${row('VUs (max)', s.vusMax !== undefined ? s.vusMax : 'n/a')}
  </table>

  <h2>Latency (distribution)</h2>
  <table>
    ${row('p50', num(s.p50) + ' ms')}
    ${row('p90', num(s.p90) + ' ms')}
    ${row('p95', num(s.p95) + ' ms')}
    ${row('p99', num(s.p99) + ' ms')}
    ${row('avg', num(s.avg) + ' ms')}
    ${row('max', num(s.max) + ' ms')}
  </table>

  <h2>Errors &amp; checks</h2>
  <table>
    ${row('Error rate (http_req_failed)', s.errorRate !== undefined ? num(s.errorRate * 100) + ' %' : 'n/a')}
    ${row('Checks passing', s.checksRate !== undefined ? num(s.checksRate * 100) + ' %' : 'n/a')}
    ${row('Checks (pass / fail)', `${s.checksPasses ?? 'n/a'} / ${s.checksFails ?? 'n/a'}`)}
  </table>

  <h2>Thresholds</h2>
  <table><thead><tr><th>Metric</th><th>Rule</th><th>Result</th></tr></thead>
  <tbody>${thresholdRows}</tbody></table>

  <p class="note">Metrics reflect this run and environment only. Percentiles are distributions
  (p95 = ~95% of requests were at or below that value), not per-request times. A passing error
  rate does not by itself prove correctness or absence of a bottleneck. Interpret against
  references/result-analysis.md and references/misinterpretation-guide.md.</p>
</body></html>`;
}

export function handleSummary(data) {
  const s = collect(data);
  const base = `${TEST_NAME}`;
  const out = {};
  out['stdout'] = textReport(s);
  out[`${REPORT_DIR}/${base}.html`] = htmlReport(s);
  out[`${RESULTS_DIR}/${base}.summary.json`] = JSON.stringify(data, null, 2);
  return out;
}
