# Script to synchronize Bug Reports from GUI and Usability subfolders to GitHub Issues using gh CLI

$gh = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) {
    $gh = Get-Command gh -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
}

if (-not $gh) {
    Write-Error "GitHub CLI (gh) not found. Please install it and log in."
    exit 1
}

$repo = "iamDicun/Group06_HW2_Testing"
$branch = "HW3-23127033"
$bugReportDir = Join-Path $PSScriptRoot "..\bug-report"

# Find all markdown files recursively in bug-report folder (gui and usability subfolders)
$bugFiles = Get-ChildItem -Path $bugReportDir -Filter "*.md" -Recurse

if ($bugFiles.Count -eq 0) {
    Write-Host "No bug report files found." -ForegroundColor Cyan
    exit 0
}

Write-Host "Found $($bugFiles.Count) bug reports. Synchronizing..." -ForegroundColor Green

foreach ($file in $bugFiles) {
    $filePath = $file.FullName
    $lines = Get-Content -Path $filePath -Encoding utf8
    
    # 1. Read Title
    $titleLine = $lines[0]
    if (-not $titleLine.StartsWith("# ")) {
        Write-Host "Skipping $($file.Name) (invalid Markdown title)" -ForegroundColor Red
        continue
    }
    $title = $titleLine.Substring(2).Trim()
    
    # Escape quotes in title
    $title = $title.Replace('"', "'")
    
    # 2. Check if Issue already created
    $issueLine = $lines | Where-Object { $_ -like "GitHub Issue: *" } | Select-Object -First 1
    if ($issueLine -and $issueLine -match "https://github.com") {
        Write-Host "Already synced: $($file.Name) -> $issueLine" -ForegroundColor DarkGray
        continue
    }

    Write-Host "Syncing: $title ..." -ForegroundColor Yellow
    
    # 3. Parse Labels (Only use standard labels like 'bug' to avoid repository label-missing errors)
    $labels = @()
    $inLabelsSection = $false
    foreach ($line in $lines) {
        if ($line -like "## Labels*") {
            $inLabelsSection = $true
            continue
        }
        if ($inLabelsSection) {
            if ($line.StartsWith("#")) {
                $inLabelsSection = $false
            } elseif ($line.Trim().StartsWith("- ")) {
                $trimmed = $line.Trim()
                $labelVal = $trimmed.Substring(2).Trim().Replace("`"", "").Replace("'", "")
                if ($labelVal -eq "bug" -or $labelVal -eq "help wanted") {
                    $labels += $labelVal
                }
            }
        }
    }
    
    $labelsString = $labels -join ","
    
    # 4. Prepare Body and write to temp file
    # Replace relative image path (evidence/chrome/...) with GitHub raw URL so it displays directly in GitHub Issue web page!
    $bodyLines = @()
    foreach ($line in $lines) {
        if ($line -eq $titleLine -or $line -like "GitHub Issue:*") {
            continue
        }
        # Replace relative image paths with absolute github raw url
        $updatedLine = $line -replace "evidence/chrome/BUG-FR-", "https://github.com/$repo/raw/$branch/23127033-HW3-full/bug-report/evidence/chrome/BUG-FR-"
        $bodyLines += $updatedLine
    }
    $tempBodyPath = Join-Path $PSScriptRoot "temp_body.txt"
    $bodyLines | Set-Content -Path $tempBodyPath -Encoding utf8
    
    # 5. Call gh CLI with --body-file
    $argsList = @("issue", "create", "--repo", $repo, "--title", $title, "--body-file", $tempBodyPath)
    if ($labelsString) {
        $argsList += "--label"
        $argsList += $labelsString
    }
    
    Write-Host "  Pushing to GitHub..." -ForegroundColor Cyan
    
    Push-Location $bugReportDir
    $issueUrl = & $gh $argsList 2>&1 | Out-String
    Pop-Location
    
    $issueUrl = $issueUrl.Trim()
    
    # Clean up temp file
    if (Test-Path $tempBodyPath) {
        Remove-Item $tempBodyPath -Force
    }
    
    if ($LASTEXITCODE -eq 0 -and $issueUrl -like "*https://github.com*") {
        if ($issueUrl -match "https://github.com/\S+/issues/\d+") {
            $issueUrl = $Matches[0]
        }
        Write-Host "  Success! URL: $issueUrl" -ForegroundColor Green
        
        # 6. Update markdown file
        $newLines = @()
        $updated = $false
        foreach ($line in $lines) {
            if ($line -like "GitHub Issue:*") {
                $newLines += "GitHub Issue: $issueUrl"
                $updated = $true
            } else {
                $newLines += $line
            }
        }
        
        if (-not $updated) {
            $tempLines = @()
            $tempLines += $lines[0]
            $tempLines += ""
            $tempLines += "GitHub Issue: $issueUrl"
            for ($i = 1; $i -lt $lines.Length; $i++) {
                $tempLines += $lines[$i]
            }
            $newLines = $tempLines
        }
        
        $newLines | Set-Content -Path $filePath -Encoding utf8
    } else {
        Write-Host "  Failed to create issue. Output: $issueUrl" -ForegroundColor Red
    }
}

Write-Host "Sync completed." -ForegroundColor Green
