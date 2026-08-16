$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="stress-test-report.html"
k6 run stress-test.js