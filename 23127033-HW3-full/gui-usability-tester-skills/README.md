# GUI Usability Tester Skill

## 📚 Giới Thiệu

**GUI Usability Tester** là một Custom AI Agent Skill toàn diện dành cho kỹ sư kiểm thử, giúp tự động hóa quy trình kiểm thử khả dụng (usability) giao diện người dùng (GUI).

Skill này hỗ trợ:
- ✅ Thiết kế Checklist WCAG (60 mục tiêu IA-01 → IA-04)
- ✅ Lên kịch bản E2E Usability Testing chi tiết
- ✅ Tính điểm SUS (System Usability Scale)
- ✅ Phân loại lỗi theo mức độ nghiêm trọng (Blocker/Major/Minor)
- ✅ Đóng dấu Watermark tự động vào ảnh
- ✅ Đồng bộ Issues lên GitHub tự động

---

## 🚀 Cấu Trúc Thư Mục

```
gui-usability-tester/
├── SKILL.md                           # File Skill chính (đọc này trước)
├── README.md                          # File này
├── scripts/
│   ├── add_watermark.ps1             # Script đóng dấu watermark
│   └── sync_github_issues.ps1        # Script đồng bộ GitHub Issues
└── templates/
    ├── checklist_wcag_60items_TEMPLATE.csv    # Template checklist 60 mục
    └── sample_bugs_found.md                   # Ví dụ bugs_found.md
```

---

## 🎯 Cách Sử Dụng

### 1️⃣ Tạo Checklist WCAG (60 Mục)

#### Step 1: Tạo CSV file từ template
```bash
cp templates/checklist_wcag_60items_TEMPLATE.csv checklist_wcag_my_project.csv
```

#### Step 2: Điền kết quả kiểm thử
- Column `Status`: Chọn ☐ Pass hoặc ☐ Fail
- Column `Severity`: Chọn mức độ (Minor, Major, Blocker)
- Column `Evidence_URL`: Nhập đường dẫn ảnh chứng minh

#### Step 3: Phân tích kết quả
```
Total: 60 mục
- Pass: 45 (75%)
- Fail: 15 (25%)
```

---

### 2️⃣ Lên Kịch Bản E2E Usability Testing

#### Template YAML:
```yaml
Test_ID: USE-001
Title: "Người dùng mới có thể tạo tài khoản trong 5 phút"

Pre-condition: |
  - Browser trên Windows/Mac/Linux
  - Không có account
  - Internet OK

Steps:
  - Step 1: Mở trang chủ
    Expected_Result: Thấy button "Sign Up"
    Evidence: screenshot_1.png
    Duration_Seconds: 5

Usability_Metrics:
  - Task_Completion_Rate: 100%
  - Error_Rate: 0%
  - Time_on_Task: 240 seconds
  - Satisfaction_Rating: 4.5/5
```

#### 5 Kịch Bản Chuẩn:
1. **USE-001**: Onboarding & Registration
2. **USE-002**: Navigation & Search
3. **USE-003**: Form Submission
4. **USE-004**: Error Handling
5. **USE-005**: Accessibility & Mobile

---

### 3️⃣ Tính Điểm SUS (System Usability Scale)

#### 10 Câu Hỏi Tiêu Chuẩn:
```
Q1: Hệ thống này hữu ích [1-5]
Q2: Hệ thống này phức tạp [1-5] [REVERSED]
Q3: Dễ sử dụng [1-5]
...
Q10: Phải học nhiều [1-5] [REVERSED]
```

#### Tính Toán SUS Score:
```python
# Reversed: Q2, Q4, Q6, Q8, Q10 = 5 - Response

scores = [4, 2, 4, 1, 5, 2, 4, 2, 4, 1]
# Adjusted: 3 + 3 + 3 + 4 + 4 + 3 + 3 + 3 + 3 + 4 = 33
# SUS = 33 × 2.5 = 82.5 (Good)
```

#### Interpretation:
- **0-25**: Unacceptable
- **26-50**: Poor  
- **51-72**: Acceptable
- **73-85**: Good ✅
- **86-100**: Excellent

---

### 4️⃣ Phân Loại Lỗi

#### Severity Levels:

| Level | Icon | Description | Example | SLA |
|-------|------|---|---|---|
| BLOCKER | 🔴 | Người dùng không thể hoàn task | Submit button lỗi | 24-48h |
| MAJOR | 🟠 | Ảnh hưởng lớn, chậm UX | Thiếu labels, color-only errors | 3-5 ngày |
| MINOR | 🟡 | Ảnh hưởng nhỏ | Focus indicator weak, typo | 2 tuần |
| COSMETIC | ⚪ | Chỉ thẩm mỹ | Icon style khác | Tùy |

#### Format Bug Report:
```markdown
## Bug Report: [BUG-001]

**Title**: [Mô tả ngắn]
**Severity**: 🔴 BLOCKER
**Component**: [Form/Navigation/...]
**Related_IA**: [IA-01-002, IA-02-001]

### Description
[Mô tả chi tiết]

### Steps to Reproduce
1. [Bước 1]
2. [Bước 2]

### Evidence
- Screenshot: ![](evidence.png)
```

---

### 5️⃣ Đóng Dấu Watermark (Tuỳ Chọn)

#### Sử Dụng Script PowerShell:

```powershell
# Windows PowerShell
.\scripts\add_watermark.ps1 `
  -SourcePath "C:\screenshots" `
  -Email "student@university.edu" `
  -Name "Nguyễn Văn A" `
  -BackupOriginal $true

# Parameters:
# -SourcePath: Thư mục chứa PNG (quét đệ quy)
# -Email: Email để watermark
# -Name: Tên sinh viên
# -BackupOriginal: Lưu backup file gốc
# -FontSize: Kích thước font (mặc định: 12)
```

#### Output:
- Watermark được đặt ở **góc dưới bên trái**
- Format: `student@university.edu - Nguyễn Văn A`
- File gốc backup: `screenshot.png.bak`

---

### 6️⃣ Đồng Bộ Issues lên GitHub

#### Chuẩn Bị:
1. Tạo file `bugs_found.md` với danh sách lỗi
2. Tạo GitHub Personal Access Token (ghp_xxxxx)
3. Upload ảnh chứng minh lên `/evidence` folder

#### Chạy Script:

```powershell
.\scripts\sync_github_issues.ps1 `
  -Owner "myusername" `
  -Repo "my-project" `
  -IssuesFile "bugs_found.md" `
  -GitHubToken "ghp_xxxxxxxxxxxxx" `
  -ImageBasePath "./evidence"

# Parameters:
# -Owner: GitHub username
# -Repo: Repository name
# -IssuesFile: Đường dẫn file bugs_found.md
# -GitHubToken: GitHub Personal Access Token
# -ImageBasePath: Thư mục ảnh (tương đối)
# -CreateDraft: $true (tạo draft) hoặc $false (công khai)
```

#### Output:
- ✅ GitHub Issues được create tự động
- 🏷️ Labels: blocker/major/minor
- 📸 Ảnh được link với raw URL
- 📋 Log file: `github_issues_sync_yyyyMMdd_HHmmss.log`

---

## 📝 Ví Dụ Hoàn Chỉnh (Full Workflow)

### Scenario: Kiểm thử Web App Sign-Up

#### 1. Tạo Checklist
```bash
cp templates/checklist_wcag_60items_TEMPLATE.csv checklist_signup.csv
# Điền kết quả: 45 Pass, 15 Fail
```

#### 2. Thiết Kế Kịch Bản E2E
```yaml
- USE-001: Người dùng tạo account
- USE-002: Người dùng đăng nhập
- USE-003: Người dùng cập nhật profile
```

#### 3. Kiểm Thử với 5 Người Dùng
```
Phỏng vấn SUS sau mỗi scenario
Average SUS Score: 74.5 (Good)
```

#### 4. Phân Loại Lỗi Tìm Được
```
🔴 BLOCKER: 1 (Submit button lỗi)
🟠 MAJOR: 2 (Missing labels, color-only errors)
🟡 MINOR: 1 (Weak focus indicator)
```

#### 5. Watermark Screenshots
```powershell
.\scripts\add_watermark.ps1 `
  -SourcePath "./evidence" `
  -Email "tester@example.com" `
  -Name "Tester A"
```

#### 6. Đồng Bộ GitHub
```powershell
.\scripts\sync_github_issues.ps1 `
  -Owner "myteam" `
  -Repo "signup-app" `
  -IssuesFile "bugs_found.md" `
  -GitHubToken "ghp_xxxxx"
```

#### Result:
✅ 4 GitHub Issues created  
🏷️ Labels applied  
📸 Screenshots linked  
📊 SUS Score: 74.5 (Good)

---

## 🔧 Requirements & Setup

### PowerShell Requirements:
- **Windows**: PowerShell 5.0+
- **macOS/Linux**: PowerShell Core 7.0+

### Optional Dependencies:
- **Python 3.8+**: Để xử lý dữ liệu CSV (nếu cần analysis)
- **GitHub CLI**: Hoặc GitHub Personal Access Token

### GitHub Setup:
1. Tạo GitHub Personal Access Token:
   - GitHub Settings → Developer settings → Personal access tokens
   - Scope: `repo` (full control of private repositories)
   - Copy token: `ghp_xxxxxxxxxxxxx`

2. Tạo Repository (nếu chưa có):
   ```bash
   git init my-project
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

---

## 📊 Output Files

Sau khi chạy skill hoàn toàn, tạo ra:

```
my-project/
├── checklist_wcag_60items.csv         # 60 mục WCAG
├── usability_scenarios_e2e.yaml       # 5 kịch bản E2E
├── sus_score_results.json             # SUS data + Score
├── bugs_found.md                      # Danh sách lỗi
├── evidence/                          # Thư mục ảnh
│   ├── bug-001-screenshot.png
│   ├── bug-001-screenshot.png.bak     # Backup gốc
│   └── ...
├── github_issues_sync.log             # Log đồng bộ
└── report.html                        # HTML report (tuỳ chọn)
```

---

## 🤖 Gọi Skill từ AI Agent Khác

### Example Prompt:

```
Sử dụng "gui-usability-tester" skill để:

1. Tạo checklist WCAG 60 mục (IA-01 → IA-04)
   - Xuất CSV file

2. Thiết kế 3 kịch bản E2E usability testing
   - Onboarding/Registration
   - Form Submission
   - Error Handling

3. Tính SUS Score từ 5 người dùng:
   Người 1: [4, 2, 4, 1, 5, 2, 4, 2, 4, 1]
   Người 2: [3, 3, 3, 2, 4, 3, 3, 3, 3, 2]
   Người 3: [2, 4, 2, 4, 2, 4, 2, 4, 2, 4]
   Người 4: [5, 1, 5, 1, 5, 1, 5, 1, 5, 1]
   Người 5: [4, 2, 4, 2, 4, 2, 4, 2, 4, 2]

4. Phân loại 4 lỗi tìm được:
   - Submit button không respond (Blocker)
   - Missing form labels (Major)
   - Color-only error indication (Major)
   - Weak focus indicator (Minor)

5. Watermark ảnh:
   Email: tester@example.com
   Name: Tester A

6. Đồng bộ GitHub:
   Owner: myteam
   Repo: my-app
   Token: ghp_xxxxx
```

---

## 🐛 Troubleshooting

### PowerShell Script Errors:

#### Error: "cannot be loaded because running scripts is disabled"
```powershell
# Solution: Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Error: "GitHub API Error: 401 Unauthorized"
```powershell
# Solution: Verify token
# 1. Check token is valid (not expired)
# 2. Check token has 'repo' scope
# 3. Re-generate new token if needed
```

#### Error: "PNG files found: 0"
```powershell
# Solution: Check file path
# 1. Use full absolute path, not relative
# 2. Verify PNG files exist in directory
# 3. Check file permissions
```

---

## 📚 Resources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **SUS Scoring**: https://measuringu.com/sus/
- **GitHub API**: https://docs.github.com/en/rest
- **Accessibility Tools**: 
  - NVDA (free screen reader): https://www.nvaccess.org/
  - axe DevTools (browser extension)
  - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra SKILL.md (tài liệu chi tiết)
2. Xem ví dụ trong `templates/` folder
3. Chạy scripts với verbose flag: `-Verbose`

---

## 📄 License & Credits

**Version**: 1.0.0  
**Author**: Senior QA Engineer & AI Agent Specialist  
**Created**: 2026-08-03  
**Status**: ✅ Production Ready

---

**Happy Testing! 🚀**
