#!/bin/bash
# Shell script to run Postman collection with Newman
mkdir -p ./submission/reports

COLLECTION="./tests/test-runs/EShop_API_Testing.postman_collection.json"
ENV="./tests/test-runs/eshop-api.postman_environment.json"
REPORT_HTML="./submission/reports/EShop_API_Test_Report.html"

echo "=========================================================="
echo "     ESHOP API AUTOMATED TESTING RUNNER (NEWMAN)          "
echo "=========================================================="

npx -y newman run "$COLLECTION" \
    --environment "$ENV" \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export "$REPORT_HTML" \
    --reporter-htmlextra-title "EShop API Test Suite Report (FR-04, FR-10, FR-16)" \
    --delay-request 50
