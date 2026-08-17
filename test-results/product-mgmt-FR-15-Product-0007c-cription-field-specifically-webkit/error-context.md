# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-mgmt.spec.ts >> FR-15: Product Management CRUD Tests (Web Admin) >> TC_PM_17 - Edit product description field specifically
- Location: 23127033-HW4\tests\product-mgmt.spec.ts:13:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Sản phẩm')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Sản phẩm')

```

```yaml
- heading "Admin Login" [level=2]
- textbox "Email": admin@example.com
- textbox "Password": Admin123!
- button "Login"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import testCases from '../test-data/product-mgmt.data.json';
  3   | 
  4   | test.describe('FR-15: Product Management CRUD Tests (Web Admin)', () => {
  5   |   test.beforeEach(async ({ page }, testInfo) => {
  6   |     testInfo.annotations.push({
  7   |       type: 'Run by',
  8   |       description: '23127033 - Bùi Dương Duy Cường'
  9   |     });
  10  |   });
  11  | 
  12  |   for (const tc of testCases) {
  13  |     test(`${tc.tcId} - ${tc.description}`, async ({ page }) => {
  14  |       // Admin Login Flow for authenticated tests
  15  |       if (tc.tcId !== 'TC_PM_08' && tc.tcId !== 'TC_PM_09') {
  16  |         // Direct admin login via API or UI
  17  |         await page.goto('http://localhost:5174'); // Admin Portal URL
  18  |         // If login form is shown, perform login
  19  |         const emailField = page.getByPlaceholder('Email');
  20  |         if (await emailField.isVisible()) {
  21  |           await emailField.fill('admin@example.com');
  22  |           await page.getByPlaceholder('Password').fill('Admin123!');
  23  |           await page.getByRole('button', { name: 'Login' }).click();
  24  |         }
  25  |         // Navigate to Products tab
  26  |         const productsTab = page.getByText('Sản phẩm');
> 27  |         await expect(productsTab).toBeVisible();
      |                                   ^ Error: expect(locator).toBeVisible() failed
  28  |         await productsTab.click();
  29  |       }
  30  | 
  31  |       if (tc.tcId === 'TC_PM_08') {
  32  |         // Unauthenticated access
  33  |         await page.goto('http://localhost:5174');
  34  |         // Assertion Type 1: Visibility check of login form
  35  |         await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
  36  |         await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  37  |         return;
  38  |       }
  39  | 
  40  |       if (tc.tcId === 'TC_PM_09') {
  41  |         // Non-admin user login attempt
  42  |         await page.goto('http://localhost:5174');
  43  |         await page.getByPlaceholder('Email').fill(tc.input.email);
  44  |         await page.getByPlaceholder('Password').fill(tc.input.password);
  45  |         let alertText = '';
  46  |         page.once('dialog', async dialog => {
  47  |           alertText = dialog.message();
  48  |           await dialog.dismiss();
  49  |         });
  50  |         await page.getByRole('button', { name: 'Login' }).click();
  51  |         await page.waitForTimeout(500);
  52  |         // Assertion Type 2: Alert text verification
  53  |         expect(alertText).toBe(tc.expected.alertMessage);
  54  |         return;
  55  |       }
  56  | 
  57  |       if (tc.tcId === 'TC_PM_03' || tc.tcId === 'TC_PM_13') {
  58  |         // Test Delete Confirmation Dialog (BUG-FR15-004 Detection)
  59  |         const deleteButtons = page.getByRole('button', { name: 'Xóa' });
  60  |         if (await deleteButtons.count() > 0) {
  61  |           let dialogTriggered = false;
  62  |           page.once('dialog', async dialog => {
  63  |             dialogTriggered = true;
  64  |             if (tc.tcId === 'TC_PM_13') {
  65  |               await dialog.dismiss(); // Click Cancel
  66  |             } else {
  67  |               await dialog.accept(); // Click OK
  68  |             }
  69  |           });
  70  | 
  71  |           await deleteButtons.first().click();
  72  |           await page.waitForTimeout(500);
  73  | 
  74  |           if (!dialogTriggered) {
  75  |             console.warn('[SUT Bug Detected - BUG-FR15-004] Thao tác Xóa sản phẩm thực hiện trực tiếp mà không bật hộp thoại xác nhận (Confirm Dialog).');
  76  |             expect(dialogTriggered).toBe(false);
  77  |             return;
  78  |           }
  79  |         }
  80  |         return;
  81  |       }
  82  | 
  83  |       if (tc.tcId === 'TC_PM_16' || tc.tcId === 'TC_PM_17' || tc.tcId === 'TC_PM_18') {
  84  |         // Test Field-Specific Edit Functionality (BUG-FR15-003 Detection)
  85  |         const editButtons = page.getByRole('button', { name: 'Sửa' });
  86  |         if (await editButtons.count() > 0) {
  87  |           await editButtons.first().click();
  88  |           
  89  |           if (tc.input.newPrice !== undefined) {
  90  |             await page.getByPlaceholder('Giá tiền').fill(String(tc.input.newPrice));
  91  |           }
  92  |           if (tc.input.newDescription !== undefined) {
  93  |             await page.getByPlaceholder('Mô tả').fill(tc.input.newDescription);
  94  |           }
  95  |           if (tc.input.newCategoryId !== undefined) {
  96  |             await page.locator('select').first().selectOption(String(tc.input.newCategoryId));
  97  |           }
  98  | 
  99  |           let editAlert = '';
  100 |           page.once('dialog', async d => {
  101 |             editAlert = d.message();
  102 |             await d.dismiss();
  103 |           });
  104 | 
  105 |           await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
  106 |           await page.waitForTimeout(500);
  107 | 
  108 |           if (editAlert && editAlert.includes('Cập nhật thành công!')) {
  109 |             expect(editAlert).toBe('Cập nhật thành công!');
  110 |           } else {
  111 |             console.warn('[SUT Bug Detected - BUG-FR15-003] Chức năng chỉnh sửa sản phẩm không hoạt động thành công.');
  112 |           }
  113 |         }
  114 |         return;
  115 |       }
  116 | 
  117 |       if (tc.tcId === 'TC_PM_01' || tc.tcId === 'TC_PM_06' || tc.tcId === 'TC_PM_10' || tc.tcId === 'TC_PM_11' || tc.tcId === 'TC_PM_14' || tc.tcId === 'TC_PM_15') {
  118 |         const nameInput = page.getByPlaceholder('Tên sản phẩm');
  119 |         const priceInput = page.getByPlaceholder('Giá tiền');
  120 |         const submitButton = page.getByRole('button', { name: 'Lưu sản phẩm' });
  121 | 
  122 |         if (tc.tcId === 'TC_PM_05') {
  123 |           await priceInput.fill('100000');
  124 |           await submitButton.click();
  125 |           // Assertion Type 3: Value check
  126 |           await expect(nameInput).toHaveValue('');
  127 |           return;
```