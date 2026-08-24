# CI/CD Report — HW06 API Testing

## 1. Pipeline Configuration

**File:** `api-tests.yml`  
**Platform:** GitHub Actions  
**Trigger:** Push to `HW6-23127031` branch

```yaml
name: API Tests (Newman)

on:
  push:
    branches: [ main, master, HW6-23127031 ]
  pull_request:
    branches: [ main, master ]

jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Newman + HTML reporter
        run: npm install -g newman newman-reporter-htmlextra

      - name: Clone SUT (eShop backend)
        run: |
          git clone https://github.com/nguyenngoc-minhchau/eshop-sut.git /tmp/eshop-sut
          cd /tmp/eshop-sut/backend
          npm install

      - name: Start SUT (backend) in background
        run: |
          cd /tmp/eshop-sut/backend
          node server.js &
          sleep 3
          curl -s http://localhost:3000/api/products > /dev/null && echo "SUT is running" || echo "SUT failed to start"

      - name: Run Postman collection with Newman
        run: |
          mkdir -p newman-report
          newman run 23127031_HW06_AI_API_090/HW06_collection.json \
            -e 23127031_HW06_AI_API_090/HW06_environment.json \
            --reporters cli,htmlextra \
            --reporter-htmlextra-export newman-report/report.html \
            --reporter-htmlextra-title "HW06 API Test Report - 23127031"

      - name: Upload Newman HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-html-report
          path: newman-report/
```

---

## 2. Sample Run 1 — All Passing

**Status:** PASSED

### Screenshot
![CI/CD Pass](screenshots/cicd_pass.png)

### Artifacts
- **Run Link:** [GitHub Actions Run #5](https://github.com/iamDicun/Group06_HW2_Testing/actions/runs/32673310594)
- **Newman Report:** Uploaded as artifact `newman-html-report`

---

## 3. Sample Run 2 — With Failing Test Case

**Status:** FAILED

### Screenshot
![CI/CD Fail](screenshots/cicd_fail.png)

### Failure Reason
Workflow fail tại bước **Clone SUT** — repo `eshop-sut` là private nên GitHub Actions không clone được:
```
fatal: could not read Username for 'https://github.com': No such device or address
Error: Process completed with exit code 128.
```
Newman không chạy được vì SUT không start.

### Artifacts
- **Run Link:** [GitHub Actions Run #4](https://github.com/iamDicun/Group06_HW2_Testing/actions/runs/32672925606)

---

## 4. Ghi chú
- SUT clone từ repo public `nguyenngoc-minhchau/eshop-sut`
- Newman reporter: `htmlextra` (HTML) + `cli` (terminal).
- Artifact vẫn được tải lên ngay cả khi pipeline thất bại nhờ `if: always()`.
