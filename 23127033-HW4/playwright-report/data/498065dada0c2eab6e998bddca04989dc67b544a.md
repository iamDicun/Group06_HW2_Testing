# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coupons.spec.ts >> FR-09: Discount Coupons Tests >> TC_CP_06 - Apply coupon when total order amount is below min_order_amount
- Location: 23127033-HW4\tests\coupons.spec.ts:15:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('p.text-red-600')
Expected substring: "Giá trị đơn hàng chưa đủ điều kiện áp dụng mã"
Received string:    "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('p.text-red-600')
    14 × locator resolved to <p class="mt-2 text-red-600 text-sm">Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa</p>
       - unexpected value "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"

```

```yaml
- paragraph: Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import testCases from '../test-data/coupons.data.json';
  3   | 
  4   | test.describe('FR-09: Discount Coupons Tests', () => {
  5   |   test.beforeEach(async ({ page }, testInfo) => {
  6   |     testInfo.annotations.push({
  7   |       type: 'Run by',
  8   |       description: '23127033 - Bùi Dương Duy Cường'
  9   |     });
  10  |     // Navigate directly to checkout
  11  |     await page.goto('/checkout');
  12  |   });
  13  | 
  14  |   for (const tc of testCases) {
  15  |     test(`${tc.tcId} - ${tc.description}`, async ({ page }) => {
  16  |       const couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
  17  |       const applyButton = page.getByRole('button', { name: 'Áp dụng' });
  18  |       const editableTotalInput = page.locator('input[type="number"]');
  19  | 
  20  |       // Assertion Type 1: Visibility Check
  21  |       await expect(page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })).toBeVisible();
  22  | 
  23  |       if (tc.tcId === 'TC_CP_08') {
  24  |         // Assertion Type 2: State check (Disabled button when empty)
  25  |         await expect(couponInput).toHaveValue('');
  26  |         await expect(applyButton).toBeDisabled();
  27  |         return;
  28  |       }
  29  | 
  30  |       if (tc.input.totalAmount !== undefined) {
  31  |         await editableTotalInput.fill(String(tc.input.totalAmount));
  32  |       }
  33  | 
  34  |       if (tc.input.couponCode !== undefined) {
  35  |         await couponInput.fill(tc.input.couponCode);
  36  |       }
  37  | 
  38  |       if (tc.tcId === 'TC_CP_11') {
  39  |         // Apply code first
  40  |         await applyButton.click();
  41  |         await expect(page.locator('text=Tiết kiệm:')).toBeVisible();
  42  |         // Modify total amount field to trigger coupon reset
  43  |         await editableTotalInput.fill('150000');
  44  |         // Assertion Type 3: Reset check
  45  |         await expect(page.locator('text=Tiết kiệm:')).toBeHidden();
  46  |         return;
  47  |       }
  48  | 
  49  |       if (tc.tcId === 'TC_CP_16') {
  50  |         // Test applying coupon when logged out (BUG-FR09-003 Detection)
  51  |         await applyButton.click();
  52  |         await page.waitForTimeout(500);
  53  |         
  54  |         const successMsg = page.locator('div.text-green-700');
  55  |         const isCouponApplied = await successMsg.isVisible();
  56  |         
  57  |         if (isCouponApplied) {
  58  |           console.warn('[SUT Bug Detected - BUG-FR09-003] Người dùng chưa đăng nhập vẫn áp dụng thành công mã coupon.');
  59  |           // Validate empirical bug state on SUT
  60  |           expect(isCouponApplied).toBe(true);
  61  |           return;
  62  |         }
  63  |       }
  64  | 
  65  |       await applyButton.click();
  66  | 
  67  |       if (tc.expected.errorText) {
  68  |         // Assertion Type 4: Error text check
  69  |         const errorMsg = page.locator('p.text-red-600');
  70  |         await expect(errorMsg).toBeVisible();
> 71  |         await expect(errorMsg).toContainText(tc.expected.errorText);
      |                                ^ Error: expect(locator).toContainText(expected) failed
  72  |       }
  73  | 
  74  |       if (tc.expected.success) {
  75  |         // Assertion Type 4: Text Content / Value assertion
  76  |         const successMsg = page.locator('div.text-green-700');
  77  |         await expect(successMsg).toBeVisible();
  78  |         
  79  |         if (tc.expected.discountAmount !== undefined) {
  80  |           const successText = await successMsg.textContent();
  81  |           // Detect BUG-FR09-002 if discount amount formula calculation fails
  82  |           const expectedDiscountStr = tc.expected.discountAmount.toLocaleString();
  83  |           if (successText && !successText.includes(expectedDiscountStr)) {
  84  |             console.warn(`[SUT Bug Detected - BUG-FR09-002] Công thức tính mã SAVE10 bị sai. Kỳ vọng giảm ${expectedDiscountStr} ₫ nhưng thực tế: ${successText}`);
  85  |           }
  86  |           await expect(successMsg).toContainText(expectedDiscountStr);
  87  |         }
  88  | 
  89  |         if (tc.expected.finalAmount !== undefined) {
  90  |           await expect(successMsg).toContainText(tc.expected.finalAmount.toLocaleString());
  91  |         }
  92  |       }
  93  | 
  94  |       if (tc.tcId === 'TC_CP_04') {
  95  |         const checkoutButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
  96  |         await checkoutButton.click();
  97  |         // Assertion Type 5: Success screen confirmation
  98  |         await expect(page.getByRole('heading', { name: 'Thanh toán thành công!' })).toBeVisible();
  99  |       }
  100 |     });
  101 |   }
  102 | });
  103 | 
```