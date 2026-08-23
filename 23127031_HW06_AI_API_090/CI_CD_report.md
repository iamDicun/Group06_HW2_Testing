# CI/CD Report — HW06 API Testing

## 1. Pipeline Configuration

**File:** `api-tests.yml`  
**Platform:** GitHub Actions  
**Trigger:** Push to `HW6-23127031` branch

```yaml
name: HW06 API Tests

on:
  push:
    branches: [ "HW6-23127031" ]
  pull_request:
    branches: [ "HW6-23127031" ]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Clone SUT
        run: git clone https://github.com/iamDicun/eshop-sut.git

      - name: Install SUT dependencies
        run: cd eshop-sut/backend && npm install

      - name: Start SUT server
        run: cd eshop-sut/backend && node server.js &
        env:
          PORT: 3000

      - name: Wait for server
        run: sleep 5

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API Tests
        run: |
          newman run 23127031_HW06_AI_API_090/HW06_collection.json \
            -e 23127031_HW06_AI_API_090/HW06_environment.json \
            --reporters htmlextra cli \
            --reporter-htmlextra-export newman-report.html

      - name: Upload Newman Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: newman-report
          path: newman-report.html
```

---

## 2. Sample Run 1 — All Passing ✅

**Commit:** `d533fcb` — feat(CI/CD): update pipeline  
**Branch:** `HW6-23127031`  
**Status:** ✅ PASSED

### Screenshot
![CI/CD Pass](screenshots/cicd_pass.png)

### Newman Summary
- **Requests:** 121
- **Assertions:** 37
- **Passed:** 37 (100%)
- **Failed:** 0
- **Skipped:** 0
- **Duration:** ~45s

### Artifacts
- **Run Link:** [GitHub Actions Run](https://github.com/iamDicun/Group06_HW2_Testing/actions)
- **Newman Report:** Uploaded as artifact `newman-report`

---

## 3. Sample Run 2 — With Failing Test Case ❌

**Commit:** `85b12a0` — test(API): add failing test for FR-02 login  
**Branch:** `HW6-23127031`  
**Status:** ❌ FAILED

### Screenshot
![CI/CD Fail](screenshots/cicd_fail.png)

### Newman Summary
- **Requests:** 151
- **Assertions:** 138
- **Passed:** 60 (43.5%)
- **Failed:** 78 (56.5%)
- **Skipped:** 0
- **Duration:** ~12.1s
- **Bugs found:** 13

### Failed Assertions (sample)
```
✗ [FR-02][ST-02] Sau 1 lan sai, login van thanh cong (401)
  AssertionError: expected 403 to equal 401

✗ [FR-02][ST-06] Khoi phuc sau 30 giay
  AssertionError: expected 403 to equal 200

✗ [FR-14][DP-02] POST categories voi ten trong → 400
  AssertionError: expected 200 to equal 400
```

### Artifacts
- **Run Link:** [GitHub Actions Run](https://github.com/iamDicun/Group06_HW2_Testing/actions)
- **Newman Report:** Uploaded as artifact `newman-report`

---

## 4. Notes

- SUT server auto-starts in CI using `node server.js &`
- Database resets on every CI run (server creates fresh SQLite DB)
- Newman reporter: `htmlextra` for HTML + `cli` for terminal output
- Artifacts uploaded even on failure (`if: always()`)
