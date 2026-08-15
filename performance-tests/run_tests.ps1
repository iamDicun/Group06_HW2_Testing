# PowerShell Automation Runner for EShop Performance Testing Suite
# Student: 23127031

param (
    [string]$Scenario = "all" # Options: all, load, stress, spike, endurance
)

$ReportsDir = Join-Path $PSScriptRoot "reports"
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir | Out-Null
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   ESHOP K6 PERFORMANCE TEST RUNNER (MSSV: 23127031)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Ensure backend is reachable
try {
    $healthCheck = Invoke-WebRequest -Uri "http://localhost:3000/api/products" -Method GET -TimeoutSec 3 -ErrorAction Stop
    Write-Host "[OK] Backend server is online at http://localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Could not connect to http://localhost:3000. Please make sure the backend is running!" -ForegroundColor Red
    Write-Host "You can start the backend with: cd application/backend; node server.js" -ForegroundColor Yellow
}

# 2. Reset lockouts and seed users
Write-Host "`n[STEP] Resetting any existing account lockouts..." -ForegroundColor Yellow
node (Join-Path $PSScriptRoot "scripts\reset_lockouts.js")

# Function to run a k6 test script
function Run-K6Test {
    param (
        [string]$ScriptName,
        [string]$ReportType
    )

    $ScriptPath = Join-Path $PSScriptRoot $ScriptName
    Write-Host "`n----------------------------------------------------------" -ForegroundColor Magenta
    Write-Host "Executing: $ScriptName" -ForegroundColor Magenta
    Write-Host "Report Type: $ReportType" -ForegroundColor Magenta
    Write-Host "----------------------------------------------------------" -ForegroundColor Magenta

    & k6 run $ScriptPath
    
    # Reset lockouts after run
    node (Join-Path $PSScriptRoot "scripts\reset_lockouts.js")
}

# Execute based on parameter
if ($Scenario -eq "load" -or $Scenario -eq "all") {
    Run-K6Test -ScriptName "23127031_Load_20260815.js" -ReportType "Listener 1: Interactive HTML Dashboard"
}

if ($Scenario -eq "stress" -or $Scenario -eq "all") {
    Run-K6Test -ScriptName "23127031_Stress_20260815.js" -ReportType "Listener 2: Aggregated JSON Metric Export"
}

if ($Scenario -eq "spike" -or $Scenario -eq "all") {
    Run-K6Test -ScriptName "23127031_Spike_20260815.js" -ReportType "Listener 3: Raw Text Console & Metric Log"
}

if ($Scenario -eq "endurance") {
    Run-K6Test -ScriptName "23127031_Endurance_20260815.js" -ReportType "Endurance/Soak Test Summary"
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  ALL REQUESTED TESTS COMPLETED. REPORTS SAVED IN:" -ForegroundColor Green
Write-Host "  $ReportsDir" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
