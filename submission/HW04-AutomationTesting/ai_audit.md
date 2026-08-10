# AI Audit Log Report

**Student:** 23127459 - Group 06
**Assignment:** HW04 - Automation Testing
**SUT:** EShop

---

**Declaration:** "I use AI tools for the following tasks"

| # | AI Tool | Date & Time | Prompt Input | AI Output Summary |
|---|---------|-------------|--------------|-------------------|
| 1 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-08 10:00 | Design Playwright test framework for EShop FR-05, FR-11, FR-17 with DDT, multi-browser, page objects | Generated complete project structure: playwright.config.ts, 3 spec files, page objects, data loader utility, fixtures, test data JSON files |
| 2 | OpenCode (MiMo V2.5) | 2026-08-08 11:30 | Create test data JSON files for FR-05 (14 cases), FR-11 (17 cases), FR-17 (14 cases) with positive, negative, edge cases | Generated fr05-data.json, fr11-data.json, fr17-data.json with data-driven test cases including timestamp substitution |
| 3 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-08 14:00 | Write page object models for HomePage, LoginPage, ProfilePage, AdminLoginPage, AdminCouponsPage with Playwright locators | Generated 5 page object classes with typed locators and helper methods |
| 4 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-08 15:30 | Create API seeding utility for test data setup - register users, create orders, set order status via API | Generated apiSeed.ts with functions for user registration, login, order creation, and status transitions |
| 5 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-09 09:00 | Analyze FR-11 test failure - shipping order shows cancel button when it should not | Identified root cause: Frontend renders cancel button for all non-final states, violating FR-10 state machine spec |
| 6 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-09 10:00 | Refactor FR-05 test: h1 count fails due to 2 h1 tags in SUT, replace waitForTimeout with proper assertions | Provided refactored code: h1:visible selector, removed hardcoded waits, improved badge selector specificity |
| 7 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-09 11:00 | Write GitHub Issue format bug report for FR-11-TC014 shipping cancel button violation | Generated structured bug report with Title, Environment, Severity, Steps to Reproduce, Expected/Actual results |
| 8 | OpenCode (MiMo V2.5) OpenCode (MiMo V2.5) | 2026-08-09 14:00 | Write 200-300 word AI critique analyzing where AI got things wrong and lessons learned | Generated reflective critique covering DOM reasoning limitations, anti-pattern usage, and human-AI collaboration principles |

---

