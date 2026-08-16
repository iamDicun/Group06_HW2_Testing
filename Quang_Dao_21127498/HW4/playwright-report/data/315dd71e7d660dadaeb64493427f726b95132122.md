# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> FR-01 - Đăng ký tài khoản >> FR01-TC-003 - Kiểm tra hệ thống từ chối khi bỏ trống họ tên.
- Location: tests\register.spec.ts:201:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Mật khẩu quá yếu!/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Mật khẩu quá yếu!/i)

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Đăng Ký Tài Khoản" [level=2]
  - text: Họ Tên
  - textbox
  - text: Email
  - textbox: new.user03@example.com
  - text: Mật khẩu
  - textbox: Password123!
  - paragraph: "Yêu cầu: Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
  - button "Đăng Ký"
  - text: Đã có tài khoản?
  - link "Đăng nhập":
    - /url: /login
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  112 |     throw new Error(`Cannot find test data file at ${registerCsvPath}`);
  113 |   }
  114 | 
  115 |   const rawCases = parseCsv(fs.readFileSync(registerCsvPath, 'utf8'));
  116 |   const duplicateCaseIds = rawCases
  117 |     .map((record) => record.case_id)
  118 |     .filter((caseId, index, caseIds) => caseIds.indexOf(caseId) !== index);
  119 | 
  120 |   if (duplicateCaseIds.length > 0) {
  121 |     throw new Error(`register.csv contains duplicate case IDs: ${[...new Set(duplicateCaseIds)].join(', ')}`);
  122 |   }
  123 | 
  124 |   if (rawCases.length < 12) {
  125 |     throw new Error(`register.csv must contain at least 12 records, found ${rawCases.length}`);
  126 |   }
  127 | 
  128 |   return rawCases.map((record) => {
  129 |     const category = record.category as Category;
  130 |     if (!['Positive', 'Negative', 'Boundary/Edge case'].includes(category)) {
  131 |       throw new Error(`Unsupported category "${record.category}" in case ${record.case_id}`);
  132 |     }
  133 | 
  134 | 
  135 | 
  136 |     const optionalColumns = [
  137 |   'expected_error_field',
  138 |   'expected_validation_key',
  139 |   'expected_route',
  140 |   'full_name',
  141 |   'email',
  142 |   'password',
  143 |   'confirm_password'
  144 | ];
  145 | 
  146 | const missingRequiredFields = requiredColumns.filter(
  147 |   (column) => record[column]?.trim() === '' && !optionalColumns.includes(column)
  148 | );
  149 |     if (missingRequiredFields.length > 0) {
  150 |       throw new Error(`Case ${record.case_id} is missing required fields: ${missingRequiredFields.join(', ')}`);
  151 |     }
  152 | 
  153 |     return {
  154 |       case_id: record.case_id,
  155 |       category,
  156 |       purpose: record.purpose,
  157 |       preconditions: record.preconditions,
  158 |       test_steps: record.test_steps,
  159 |       expected_result: record.expected_result,
  160 |       full_name: record.full_name,
  161 |       email: record.email,
  162 |       password: record.password,
  163 |       confirm_password: record.confirm_password,
  164 |       expected_route: record.expected_route,
  165 |       expected_error_field: record.expected_error_field,
  166 |       expected_validation_key: record.expected_validation_key,
  167 |     };
  168 |   });
  169 | }
  170 | 
  171 | function getFieldLocator(page: Page, index: number) {
  172 |   return page.getByRole('textbox').nth(index);
  173 | }
  174 | 
  175 | async function fillRegisterForm(page: Page, registerCase: RegisterCase) {
  176 |   const fullNameInput = getFieldLocator(page, 0);
  177 |   const emailInput = getFieldLocator(page, 1);
  178 |   const passwordInput = getFieldLocator(page, 2);
  179 | 
  180 |   await fullNameInput.fill(registerCase.full_name);
  181 |   await emailInput.fill(registerCase.email);
  182 |   await passwordInput.fill(registerCase.password);
  183 | 
  184 |   await expect(fullNameInput).toHaveValue(registerCase.full_name);
  185 |   await expect(emailInput).toHaveValue(registerCase.email);
  186 |   await expect(passwordInput).toHaveValue(registerCase.password);
  187 | }
  188 | 
  189 | function getValidationMessage(registerCase: RegisterCase): string {
  190 |   if (registerCase.expected_validation_key && validationMessageByKey[registerCase.expected_validation_key]) {
  191 |     return validationMessageByKey[registerCase.expected_validation_key];
  192 |   }
  193 | 
  194 |   return registerCase.expected_error_field;
  195 | }
  196 | 
  197 | const registerCases = loadRegisterCases();
  198 | 
  199 | test.describe('FR-01 - Đăng ký tài khoản', () => {
  200 |   for (const registerCase of registerCases) {
  201 |     test(`${registerCase.case_id} - ${registerCase.purpose}`, async ({ page }) => {
  202 |       await page.goto(registerPageUrl);
  203 | 
  204 |       await expect(page.getByRole('heading', { name: /Đăng Ký Tài Khoản/i })).toBeVisible();
  205 | 
  206 |       await fillRegisterForm(page, registerCase);
  207 | 
  208 |       await page.locator('form').evaluate((form) => (form as HTMLFormElement).requestSubmit());
  209 | 
  210 |       await expect(page).toHaveURL(/\/register(?:\?.*)?$/);
  211 |       await expect(page.getByRole('heading', { name: /Đăng Ký Tài Khoản/i })).toBeVisible();
> 212 |       await expect(page.getByText(/Mật khẩu quá yếu!/i)).toBeVisible();
      |                                                          ^ Error: expect(locator).toBeVisible() failed
  213 |     });
  214 |   }
  215 | });
```