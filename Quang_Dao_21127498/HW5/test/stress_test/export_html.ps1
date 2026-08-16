$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="load-test-report.html"
k6 run stress-test.js