# 🚀 QUICKSTART - GUI Usability Tester

## ⚡ 5-Minute Setup

### Prerequisites
```bash
# Windows PowerShell
$PSVersionTable.PSVersion  # Should be 5.0+

# Check if you have the skill files
ls ./SKILL.md
ls ./scripts/add_watermark.ps1
ls ./scripts/sync_github_issues.ps1
```

---

## 🎯 Scenario: Test a Sign-Up Form (3 Hours)

### 0. Prepare (5 min)
```bash
# Create project directory
mkdir my-usability-test
cd my-usability-test

# Copy templates
cp ../templates/checklist_wcag_60items_TEMPLATE.csv ./checklist.csv
cp ../templates/sample_bugs_found.md ./bugs_found.md

# Create evidence directory
mkdir evidence
```

### 1. Create WCAG Checklist (30 min)
```bash
# Open checklist.csv in Excel or text editor
# Fill in test results for 60 items:
# - IA-01: Perceivable (15 items)
# - IA-02: Operable (15 items)
# - IA-03: Understandable (15 items)
# - IA-04: Robust (15 items)

# Quick template:
# Status: ☐ Pass or ☐ Fail
# Severity: Minor | Major | Blocker
# Evidence: evidence/bug-001.png

# Result: 45 Pass, 15 Fail (75% compliance)
```

### 2. Conduct 5 E2E Tests (90 min)
```bash
# Scenario 1: User Registration (30 min)
# - Take 5-10 screenshots
# - Note any issues
# - Time how long it takes
# - Ask user: "Easy to understand?" 1-5

# Scenario 2: Form Validation (20 min)
# - Try submitting empty form
# - Test error messages
# - Check keyboard navigation

# Scenario 3: Accessibility (20 min)
# - Test with keyboard only (no mouse)
# - Test with screen reader (NVDA)
# - Test with high contrast mode

# Scenario 4: Mobile View (10 min)
# - Test on mobile browser
# - Check responsive design
# - Verify touch targets

# Scenario 5: Browser Compatibility (10 min)
# - Test Chrome, Firefox, Safari
# - Note any differences
```

### 3. Calculate SUS Score (15 min)
```bash
# Collect responses from 5 users
# Each user answers 10 questions (1-5 scale)

User 1: [4, 2, 4, 1, 5, 2, 4, 2, 4, 1] → 82.5
User 2: [3, 3, 3, 2, 4, 3, 3, 3, 3, 2] → 70
User 3: [2, 4, 2, 4, 2, 4, 2, 4, 2, 4] → 45
User 4: [5, 1, 5, 1, 5, 1, 5, 1, 5, 1] → 95
User 5: [4, 2, 4, 2, 4, 2, 4, 2, 4, 2] → 80

Average: 74.5 (GOOD ✅)
```

### 4. Classify Bugs (45 min)
```bash
# List all issues found, classify by severity:

🔴 BLOCKER (Fix in 48h):
- Submit button doesn't work
  → Complete task blocker

🟠 MAJOR (Fix in 3-5 days):
- Form labels missing → WCAG violation
- Color-only errors → Colorblind users can't understand

🟡 MINOR (Fix in 2 weeks):
- Focus outline too faint
- Typos in labels

# Create bugs_found.md with details (see sample)
```

### 5. Watermark Screenshots (5 min)
```powershell
# Run watermark script
.\scripts\add_watermark.ps1 `
  -SourcePath "C:\evidence" `
  -Email "tester@example.com" `
  -Name "Tester A" `
  -BackupOriginal $true

# Result: Images marked with email + name at bottom-left
```

### 6. Sync to GitHub (10 min)
```powershell
# First, create GitHub Personal Access Token
# GitHub Settings → Developer settings → Personal access tokens
# Scope: repo, Copy: ghp_xxxxxxxxxxxxx

# Then sync issues
.\scripts\sync_github_issues.ps1 `
  -Owner "myteam" `
  -Repo "signup-app" `
  -IssuesFile "bugs_found.md" `
  -GitHubToken "ghp_xxxxxxxxxxxxx" `
  -ImageBasePath "./evidence"

# Result: 4 GitHub Issues created with:
# - Detailed bug descriptions
# - Screenshots linked
# - Severity labels (blocker, major, minor)
# - Related WCAG standards
```

### 7. Generate Report (15 min)
```markdown
# Usability Testing Report

## Summary
- **Total Bugs**: 4 (1 Blocker, 2 Major, 1 Minor)
- **SUS Score**: 74.5 (Good)
- **WCAG Compliance**: 75% (45/60 items pass)
- **Issues Created**: 4 GitHub Issues

## Key Findings
1. ✗ Submit button non-functional (BLOCKER)
2. ✗ Form labels missing (MAJOR - Accessibility)
3. ✗ Color-only errors (MAJOR - Colorblind users)
4. ✓ Keyboard navigation works
5. ✓ Mobile responsive design

## Recommendations
1. Fix submit button → ASAP
2. Add form labels → Within 3-5 days
3. Add icons to error messages → Within 3-5 days
4. Improve focus indicator → Nice to have

## Next Steps
- [ ] Create GitHub Issues (DONE ✅)
- [ ] Assign to development team
- [ ] Add to sprint backlog
- [ ] Schedule re-testing after fixes
```

---

## 📝 Common Commands

### PowerShell (Windows)
```powershell
# List all PNG files to watermark
Get-ChildItem -Path ".\evidence" -Filter "*.png" -Recurse

# Create backup before running
Get-ChildItem -Path ".\evidence" -Filter "*.png" -Recurse | 
  ForEach-Object { Copy-Item $_ "$($_.FullName).backup" }

# Check GitHub token validity
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user
```

### File Operations
```bash
# Create project structure
mkdir -p ./evidence ./reports ./templates

# Copy template files
cp ../templates/*.csv ./
cp ../templates/*.md ./templates/

# Count bugs by severity
grep -c "BLOCKER" bugs_found.md
grep -c "MAJOR" bugs_found.md
```

---

## 🐛 Troubleshooting

### Issue: PowerShell script doesn't run
```powershell
# Solution: Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify it worked
Get-ExecutionPolicy
# Should return: RemoteSigned
```

### Issue: GitHub sync fails with 401 error
```powershell
# Check your token
$token = "ghp_xxxxx"
$headers = @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github+json"
}
Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
# If this returns your user info, token is valid
```

### Issue: Screenshots not found when watermarking
```powershell
# Use absolute path instead of relative
$sourcePath = "C:\Users\YourName\Desktop\evidence"  # Full path
.\scripts\add_watermark.ps1 -SourcePath $sourcePath -Email "test@test.com" -Name "Tester"

# Verify path exists
Test-Path "C:\Users\YourName\Desktop\evidence"  # Should return True
```

### Issue: PNG files not watermarked
```powershell
# Check if PNG files exist
Get-ChildItem -Path "C:\evidence" -Filter "*.png" | Measure-Object

# Check file permissions
$file = Get-Item "C:\evidence\screenshot.png"
$file.Attributes
# Make sure files are not "ReadOnly"
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Checklist CSV filled (60 items, 75%+ pass rate)
- [ ] 5 E2E scenarios documented
- [ ] 5 SUS responses collected
- [ ] SUS Score calculated (should be 0-100)
- [ ] Bugs classified (Blocker/Major/Minor)
- [ ] Screenshots watermarked (email + name visible)
- [ ] GitHub Issues created (4+ issues)
- [ ] Labels applied (blocker, major, minor)
- [ ] Evidence images linked in GitHub
- [ ] Report generated

---

## 📊 Expected Output Structure

```
my-usability-test/
├── checklist.csv (60 items: 45 Pass, 15 Fail)
├── usability_scenarios.yaml (5 scenarios)
├── sus_results.json (SUS Score: 74.5)
├── bugs_found.md (4 bugs: 1 Blocker, 2 Major, 1 Minor)
├── evidence/
│   ├── screenshot1.png (+ .bak backup)
│   ├── screenshot2.png (+ .bak backup)
│   └── ... (total 60+ screenshots)
├── evidence_watermarked/
│   ├── screenshot1.png (with watermark)
│   ├── screenshot2.png (with watermark)
│   └── ...
├── github_sync.log (confirms 4 issues created)
└── report.md (summary report)
```

---

## 🎓 Learning Path

1. **Start**: Read SKILL.md (comprehensive guide)
2. **Learn**: Follow this QUICKSTART
3. **Practice**: Use sample_bugs_found.md as reference
4. **Master**: Use config.example.json for full workflow
5. **Advanced**: Customize templates for your project

---

## 🚀 Next Steps

After completing this scenario:

1. **Modify templates** for your specific application
2. **Adjust checklist** based on WCAG requirements
3. **Create custom scripts** for post-processing
4. **Integrate with CI/CD** pipeline
5. **Share findings** with development team

---

## 📞 Need Help?

1. Check **SKILL.md** for detailed documentation
2. Review **sample_bugs_found.md** for format
3. Check **config.example.json** for all options
4. Read **README.md** for setup instructions

---

## ✨ Pro Tips

### Speed Up Testing
- Use Chrome DevTools mobile emulation (F12)
- Record video while testing (QuickTime/OBS)
- Prepare test cases in advance
- Automate checklist verification

### Improve Quality
- Test with real users (not just developers)
- Use multiple browsers/devices
- Test accessibility tools (NVDA, axe)
- Take high-quality screenshots (1920x1080+)

### Optimize GitHub Sync
- Organize bugs by component (Form, Navigation, etc.)
- Use consistent formatting in bugs_found.md
- Batch upload images to GitHub first
- Use raw URL for image display

---

**You're ready to start testing! 🎯**

For more details, open **SKILL.md** in your favorite editor.
