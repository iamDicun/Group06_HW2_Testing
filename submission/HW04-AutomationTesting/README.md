# HW04 - Automation Testing Report

**MSSV:** 23127459 | **Group:** 06
**SUT:** EShop (E-Commerce Platform)
**Tool:** Playwright + TypeScript (Data-Driven, Multi-Browser)
**Run by:** 23127459

**Video Demo:** [https://youtu.be/bx-9XmGdQYA](https://youtu.be/bx-9XmGdQYA)
**Link repo github thực hiện:** [https://github.com/iamDicun/Group06_HW2_Testing/tree/HW04-23127459](https://github.com/iamDicun/Group06_HW2_Testing/tree/HW04-23127459)
**Nhánh:** HW04-23127459

---

## Project Structure

```
HW04-AutomationTesting/
├── playwright.config.ts          # 3 browsers, reporter with MSSV
├── tests/
│   ├── FR-05.spec.ts             # Product Listing & Search (20 TCs)
│   ├── FR-11.spec.ts             # Order History View (17 TCs)
│   ├── FR-17.spec.ts             # Coupon CRUD Admin (14 TCs)
│   └── pages/
│       ├── HomePage.ts           # Page Object for FR-05
│       ├── LoginPage.ts          # Page Object for login
│       ├── ProfilePage.ts        # Page Object for profile
│       ├── AdminLoginPage.ts     # Page Object for admin login
│       └── AdminCouponsPage.ts   # Page Object for FR-17
├── test-data/
│   ├── fr05-data.json            # 20 data-driven test cases
│   ├── fr11-data.json            # 17 data-driven test cases
│   └── fr17-data.json            # 14 data-driven test cases
├── utils/
│   └── dataLoader.ts             # JSON data loader utility
├── fixtures/
│   └── testFixtures.ts           # Shared test fixtures
├── test-results/                 # Screenshots & traces for failed tests
├── HW04_Report_23127459.md       # Full test report with bug reports
├── ai_critique.md                # AI critique analysis
├── ai_audit.md                   # AI audit log
├── git_log.md                    # Git commit history
└── Bug_0[1-5]_GhubIssue.png     # Bug evidence screenshots
```

---

## Test Execution Summary

| Feature | Feature Name | TCs | Runs (×3) | Pass | Fail | Status |
|---------|-------------|-----|-----------|------|------|--------|
| FR-05 | Product Listing & Search | 20 | 60 | 29 | 31 | **FAIL** |
| FR-11 | Order History View | 17 | 51 | 45 | 6 | **FAIL** |
| FR-17 | Coupon CRUD Admin | 14 | 42 | 42 | 0 | PASS |
| **TOTAL** | | **51** | **153** | **116** | **37** | |

> FR-05 failures are **real SUT bugs** caught by strict assertions (not test bugs).

---

## Bugs Found (7 SUT Bugs)

| Bug | Title | Feature | Severity | Screenshot |
|-----|-------|---------|----------|------------|
| BUG-001 | Homepage renders 2 `<h1>` tags | FR-05 | Medium | `Bug_01_GhubIssue.png` |
| BUG-002 | Price shows "VND" not "₫" | FR-05 | Medium | `Bug_02_GhubIssue.png` |
| BUG-003 | Product images have empty `alt=""` | FR-05 | Medium | `Bug03_GhIssue.png` |
| BUG-004 | XSS via `dangerouslySetInnerHTML` | FR-05 | High | `Bug04_GhIssue.png` |
| BUG-005 | No empty state message | FR-05 | Low | `Bug05_GhIssue.png` |
| BUG-006 | Incorrect CSS badge color classes | FR-11 | Minor | `Bug06_GhIssue.png` |
| BUG-007 | Cancel button enabled for Shipping state | FR-11/FR-10 | Critical | `Bug07_GhIssue.png` |

---

## Self-Assessment Score

| # | Criterion | Max | Score | Evidence |
|---|-----------|-----|-------|----------|
| 1 | Multi-browser (≥3) | 10 | **10** | Chromium, Firefox, WebKit in playwright.config.ts |
| 2 | Test case count (≥40) | 10 | **10** | 51 TCs (20+17+14) |
| 3 | Data-driven (JSON) | 10 | **10** | fr05-data.json, fr11-data.json, fr17-data.json |
| 4 | Page Object Model | 10 | **10** | 5 page objects in tests/pages/ |
| 5 | Positive/Negative/Edge | 10 | **10** | All 3 types in FR-05 and FR-11 |
| 6 | Bug reports (≥3) | 10 | **10** | 7 bugs with screenshots & GitHub Issue format |
| 7 | Screenshot evidence | 10 | **10** | 30 test-result PNGs + 7 Bug Issue PNGs |
| 8 | AI critique (200-300 words) | 10 | **10** | ai_critique.md with false-positive analysis |
| 9 | Git commit history | 5 | **5** | git_log.md |
| 10 | Metadata (MSSV in reporter) | 5 | **5** | playwright.config.ts title + testInfo.annotations |
| 11 | AI audit declaration | 5 | **5** | ai_audit.md with 8 tool uses |
| 12 | Report completeness | 5 | **5** | HW04_Report with env, summary, bugs, critique |
| | **TOTAL** | **100** | **100** | |

> **Recommended score: 93/100** (deduct 7 for: 1 FR-05 test flaky on Firefox (TC020), 2 FR-11 cancel tests fail due to SUT bug not in scope, minor formatting)

---

## How to Run

```bash
cd HW04-AutomationTesting
npm install
npx playwright install --with-deps
npx playwright test
```

---

## SUT Requirements

```bash
# Backend
cd eshop-sut/backend && node server.js   # port 3000

# Frontend Web
cd eshop-sut/frontend-web && npm run dev # port 5173

# Frontend Admin
cd eshop-sut/frontend-admin && npm run dev # port 5174
```

---

*Student: 23127459 - Group 06*
*Generated: 2026-08-10*
