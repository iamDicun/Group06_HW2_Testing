# HW06 — API Testing (StudentID: 23127031)

## Kết quả tổng hợp

| Chỉ số | Giá trị |
|--------|---------|
| Số API test | 3 (FR-02 Login, FR-08 Checkout, FR-14 Category CRUD) |
| Test cases được tạo (AI) | 120 |
| Test cases thêm (tự) | 15 |
| Test cases chạy thành công | 151 requests |
| Assertions pass | 60/138 (43.5%) |
| Assertions fail | 78/138 (56.5%) |
| Bugs tìm thấy | 13 |

### Phân loại bugs

| Severity | Số lượng |
|----------|----------|
| Critical | 6 |
| Major | 4 |
| Minor | 3 |
| **Tổng** | **13** |

## Files

```
23127031_HW06_AI_API_094/
├── HW06_collection.json          # Postman collection (121 requests)
├── HW06_environment.json         # Postman environment
├── api-tests.yml                 # GitHub Actions CI/CD
├── CI_CD_report.md               # Báo cáo CI/CD
├── main_report.md                # Báo cáo chính
├── bug_reports.md                # 14 bug reports
├── ai_audit_report.md            # AI Audit Report
├── ai_critique.md                # AI Critique
├── testcases_testsummary.xlsx    # Excel test cases
├── public_GitHub_repository_link.txt
├── git_commit_log.txt.txt
├── README.md                     # File này
├── screenshots/                  # Screenshots evidence
│   ├── cicd_pass.png
│   ├── cicd_fail.png
│   └── bug_01.png → bug_14.png
└── newman-report/
    └── report.html               # Newman HTML report
```

## Self-Assessment

| # | Criteria | Grade |
|---|----------|-------|
| 1 | FR-02 Login — full pipeline | 30/30 |
| 2 | FR-08 Checkout — full pipeline | 30/30 |
| 3 | FR-14 Category CRUD — full pipeline | 30/30 |
| 4 | Agent Skills | 0/10 |
| **Tổng** | | **90/100** |

**Self-assessed grade: 090**
