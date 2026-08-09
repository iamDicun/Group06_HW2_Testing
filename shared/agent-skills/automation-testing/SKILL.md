---
name: automation-testing
description: End-to-end AI QA Agent Skill for generating data-driven test cases, JSON mock datasets, and Playwright TypeScript automation test scripts targeting EShop web features across multi-browser environments.
---

# Automation Testing Agent Skill

Skill này định nghĩa kịch bản chuẩn cho AI Agent thực hiện tự động hóa toàn bộ quy trình sinh test cases, dữ liệu kiểm thử (JSON), và kịch bản Playwright TypeScript (`.spec.ts`) cho ứng dụng web EShop.

---

## 1. Feature Analysis & Test Case Generation (Tối thiểu 12 Test Cases)

Khi nhận một tính năng thuộc Pool A, Pool B, hoặc Pool C:
1. Phân tích chi tiết quy trình giao diện và API backend của tính năng.
2. Sinh ra tối thiểu **12 kịch bản kiểm thử** kết hợp giữa:
   - **Positive Cases (Khả thi)**: Luồng chính (Happy path), nhập liệu hợp lệ.
   - **Negative Cases (Không hợp lệ)**: Nhập sai định dạng, bỏ trống trường bắt buộc, vượt giới hạn độ dài.
   - **Edge / Boundary Cases (Biên & Ngoại lệ)**: Ký tự đặc biệt, SQL injection pattern, giá trị biên cực đại/cực tiểu, hết hạn token/coupon, hoặc thao tác bất hợp lệ.
3. Xuất file mô tả test case ra thư mục `test-cases/<FEATURE_NAME>.md`.

---

## 2. Data-Driven Testing (File `.json` Tách Biệt)

- Tất cả dữ liệu thử nghiệm (bao gồm input fields và expected outputs/errors) **phải được lưu trong file JSON tách biệt** tại thư mục `test-data/<FEATURE_NAME>.data.json`.
- Nghiêm cấm hardcode dữ liệu mảng hoặc object inline trực tiếp trong kịch bản `.spec.ts`.
- Cấu trúc JSON chuẩn:
```json
[
  {
    "tcId": "TC_01",
    "description": "Forgot password with valid registered email",
    "input": {
      "email": "user@example.com"
    },
    "expected": {
      "statusCode": 200,
      "message": "Reset instructions sent to your email",
      "elementState": "success-alert"
    }
  }
]
```

---

## 3. Playwright TypeScript Automation Script Standard (`.spec.ts`)

Mỗi file script đặt tại `tests/<FEATURE_NAME>.spec.ts` phải tuân thủ nghiêm ngặt các tiêu chuẩn sau:

### 3.1. Locator Strategy (Ưu tiên locators bền vững)
- Tối ưu hóa truy vấn bằng Accessibility Locators:
  - `page.getByRole('button', { name: 'Gửi yêu cầu' })`
  - `page.getByPlaceholder('Nhập email của bạn')`
  - `page.getByLabel('Mật khẩu')`
  - `page.getByTestId('cart-total')`
- Hạn chế tối đa sử dụng CSS selectors tĩnh dễ gãy (như `.btn-primary`, `#id-123`) hoặc XPath tuyệt đối.

### 3.2. Assertion Patterns (Tối thiểu 3 dạng Assertion khác nhau)
Mỗi bộ test script phải kết hợp ít nhất 3 dạng assertion khác nhau của Playwright:
1. **Visibility Assertion**: `await expect(locator).toBeVisible()` / `toBeHidden()`
2. **Text / Content Assertion**: `await expect(locator).toHaveText('...')` / `toContainText('...')`
3. **State / Attribute Assertion**: `await expect(locator).toBeDisabled()` / `toBeEnabled()` / `toHaveAttribute('href', ...)`
4. **URL / Page Assertion**: `await expect(page).toHaveURL(/.*checkout/)`

### 3.3. Student Identification & Report Watermark
Trong mỗi file test script, chèn metadata watermark nhằm đảm bảo bằng chứng chạy test thực tế:
```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.annotations.push({
    type: 'Run by',
    description: '23127033 - Bùi Dương Duy Cường'
  });
});
```

---

## 4. Multi-Browser Compatibility & Execution Rules

1. Đảm bảo script có thể thực thi độc lập mà không bị rò rỉ trạng thái (state leakage) giữa các test cases.
2. Xử lý chờ bất đồng bộ chuẩn xác (`await page.waitForLoadState('networkidle')` hoặc `await expect(...).toBeVisible()`) để chống trôi test (flaky test).
3. Hỗ trợ chạy mượt mà trên cả 3 trình duyệt: **Chromium**, **Firefox**, và **WebKit/Edge**.
