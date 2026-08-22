# Script chay kiem thu tu dong Postman Collection bang Newman
# Usage: powershell -ExecutionPolicy Bypass -File ./tests/test-runs/run-newman-tests.ps1

$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "     ESHOP API AUTOMATED TESTING RUNNER (NEWMAN)          " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Kiem tra va tao thu muc reports
$reportDir = (Resolve-Path (Join-Path $PSScriptRoot "../../submission/reports")).Path
if (!(Test-Path $reportDir)) {
    New-Item -ItemType Directory -Path $reportDir -Force | Out-Null
}

$collectionPath = (Resolve-Path (Join-Path $PSScriptRoot "EShop_API_Testing.postman_collection.json")).Path
$envPath = (Resolve-Path (Join-Path $PSScriptRoot "eshop-api.postman_environment.json")).Path
$reportHtml = Join-Path $reportDir "EShop_API_Test_Report.html"
$reportCli = Join-Path $reportDir "newman-run.log"

Write-Host "`n[1/3] Kiem tra Node.js va Newman..." -ForegroundColor Yellow
if (!(Get-Command newman -ErrorAction SilentlyContinue)) {
    Write-Host "Newman chua duoc cai dat toan cuc. Dang cai dat newman va newman-reporter-htmlextra..." -ForegroundColor Yellow
    npm install -g newman newman-reporter-htmlextra
}

Write-Host "`n[2/3] Khoi chay Newman test runner..." -ForegroundColor Yellow
Write-Host "Collection: $collectionPath"
Write-Host "Environment: $envPath"
Write-Host "Report HTML: $reportHtml"

# Chay newman
newman run "$collectionPath" -e "$envPath" -r "cli,htmlextra" --reporter-htmlextra-export "$reportHtml" --reporter-htmlextra-title "EShop API Test Suite Report (FR-04, FR-10, FR-16)" --delay-request 30 --insecure

Write-Host "`n[3/3] Hoan tat kiem thu!" -ForegroundColor Green
Write-Host "Bao cao HTML da duoc luu tai: $reportHtml" -ForegroundColor Cyan
