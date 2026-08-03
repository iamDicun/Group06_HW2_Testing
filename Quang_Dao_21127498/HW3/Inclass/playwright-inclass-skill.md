---
name: build-playwright-in-class-assignment
description: Design and implement a submission-ready Playwright automation assignment for exactly 1 web feature, with at least 12 test cases, external CSV/JSON test data, at least 3 assertion patterns, 3-browser execution (Chromium, Firefox, WebKit), and an HTML report visibly labeled with Student ID.
---

# Build Playwright In-Class Assignment (1 Feature)

## Requirements Checklist
- [ ] Choose exactly 1 feature from EShop specification (e.g., FR-02 Login).
- [ ] Design at least 12 distinct test cases for the selected feature.
- [ ] Store test data in an external JSON or CSV file under `test-data/`.
- [ ] Write maintainable Playwright TypeScript test script(s).
- [ ] Use at least 3 distinct assertion patterns (`toBeVisible`, `toHaveText`/`toContainText`, `toHaveURL`).
- [ ] Configure Playwright for 3 browsers: Chromium, Firefox, WebKit.
- [ ] Generate HTML report(s) visibly displaying "Run by: {StudentID}".

## Step-by-Step Execution Plan
1. **Analyze & Design**: Extract validation rules for the selected feature and define 12+ test cases.
2. **Externalize Data**: Create `test-data/<feature>.json` containing inputs and expected outputs.
3. **Implement Spec**: Create `tests/<feature>.spec.ts` loading test data dynamically.
4. **Configure Report & Browsers**: Update `playwright.config.ts` with Chromium, Firefox, WebKit, and HTML reporter title containing `Run by: {StudentID}`.
5. **Execute & Verify**: Run `npx playwright test` across all 3 browsers and inspect generated HTML reports.