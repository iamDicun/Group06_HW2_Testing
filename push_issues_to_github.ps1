# Script to push all 7 Bug Reports to GitHub Issues using GitHub CLI (gh)
# Usage: .\push_issues_to_github.ps1 [-Repo "iamDicun/Group06_HW2_Testing"]

param(
    [string]$Repo = "iamDicun/Group06_HW2_Testing"
)

# Locate gh executable
$ghPath = "gh"
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    if (Test-Path "C:\Program Files\GitHub CLI\gh.exe") {
        $ghPath = "C:\Program Files\GitHub CLI\gh.exe"
    } elseif (Test-Path "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe") {
        $ghPath = "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
    } else {
        Write-Error "GitHub CLI (gh.exe) khong duoc tim thay. Vui long cai dat GitHub CLI hoac them vao PATH."
        exit 1
    }
}

Write-Host "Using GitHub CLI at: $ghPath" -ForegroundColor Cyan

# Check GitHub auth status
Write-Host "Checking GitHub authentication status..." -ForegroundColor Cyan
& $ghPath auth status
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Ban chua dang nhap GitHub CLI!"
    Write-Host "Vui long chay lenh sau trong terminal de dang nhap:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor Green
    Write-Host "Hoac set bien moi truong GITHUB_TOKEN:" -ForegroundColor Yellow
    Write-Host "  `$env:GITHUB_TOKEN = '<your_personal_access_token>'" -ForegroundColor Green
    exit 1
}

$issues = @(
    @{
        File = ".github/issues/BUG-01-role-escalation.md"
        Title = "[BUG][FR-04]: Privilege Escalation via Mass Assignment on User Profile Update"
        Labels = "type: bug,status: new"
        BugId = "BUG-01"
    },
    @{
        File = ".github/issues/BUG-02-sensitive-data-exposure.md"
        Title = "[BUG][FR-04]: Sensitive Data Exposure Leaking Plaintext Passwords and Reset Tokens via GET /api/users/me"
        Labels = "type: bug,status: new"
        BugId = "BUG-02"
    },
    @{
        File = ".github/issues/BUG-03-final-state-violation.md"
        Title = "[BUG][FR-10]: State Machine Violation Allowing Invalid Transition from Final State Canceled to Delivered"
        Labels = "type: bug,status: new"
        BugId = "BUG-03"
    },
    @{
        File = ".github/issues/BUG-04-shipping-cancel-logic.md"
        Title = "[BUG][FR-10]: Broken Cancellation Logic Permitting Regular Users to Cancel In-Transit (Shipping) Orders"
        Labels = "type: bug,status: new"
        BugId = "BUG-04"
    },
    @{
        File = ".github/issues/BUG-05-broken-access-control.md"
        Title = "[BUG][FR-10/FR-16]: Broken Access Control on Administrative Endpoints Due to Missing Role Authorization"
        Labels = "type: bug,status: new"
        BugId = "BUG-05"
    },
    @{
        File = ".github/issues/BUG-06-atomic-rollback-violation.md"
        Title = "[BUG][FR-16]: Violation of Atomic All-or-Nothing Transaction on Product CSV Batch Import"
        Labels = "type: bug,status: new"
        BugId = "BUG-06"
    },
    @{
        File = ".github/issues/BUG-07-missing-price-validation.md"
        Title = "[BUG][FR-16]: Missing Validation on Product Price Permitting Negative or Zero Price Import"
        Labels = "type: bug,status: new"
        BugId = "BUG-07"
    }
)

$createdIssues = @()

foreach ($item in $issues) {
    Write-Host "`nCreating Issue for $($item.BugId): $($item.Title)..." -ForegroundColor Cyan
    
    if (-not (Test-Path $item.File)) {
        Write-Error "File khong ton tai: $($item.File)"
        continue
    }

    # Read body content and remove frontmatter if present
    $content = Get-Content -Path $item.File -Raw -Encoding UTF8
    if ($content -match "(?s)^---\r?\n.*?\r?\n---\r?\n(.*)$") {
        $body = $matches[1].Trim()
    } else {
        $body = $content.Trim()
    }

    # Write temporary body file to avoid command-line length limits
    $tempBodyPath = [System.IO.Path]::GetTempFileName() + ".md"
    [System.IO.File]::WriteAllText($tempBodyPath, $body, [System.Text.Encoding]::UTF8)

    try {
        $issueUrl = & $ghPath issue create --repo $Repo --title $item.Title --body-file $tempBodyPath --label $item.Labels
        if ($LASTEXITCODE -eq 0 -and $issueUrl) {
            Write-Host "=> Created successfully: $issueUrl" -ForegroundColor Green
            $createdIssues += @{
                BugId = $item.BugId
                Title = $item.Title
                Url = $issueUrl.Trim()
            }
        } else {
            Write-Warning "Khong the tao issue $($item.BugId)"
        }
    } finally {
        if (Test-Path $tempBodyPath) {
            Remove-Item -Path $tempBodyPath -Force -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "Tong ket cac Issues da tao tren GitHub:" -ForegroundColor Green
foreach ($ci in $createdIssues) {
    Write-Host "$($ci.BugId): $($ci.Url)" -ForegroundColor Yellow
}
