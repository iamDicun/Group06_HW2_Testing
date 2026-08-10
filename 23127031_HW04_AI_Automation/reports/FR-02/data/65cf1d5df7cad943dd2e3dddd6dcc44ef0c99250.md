# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-02.spec.ts >> FR-02: Đăng nhập & Khóa tài khoản >> TC-AUTOMATION-FR-02-012 - Kiểm tra field email có type="email"
- Location: tests\FR-02.spec.ts:217:7

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('input[type="text"]').first()
Expected: "email"
Received: "text"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('input[type="text"]').first()
    11 × locator resolved to <input value="" required="" type="text" class="w-full border p-2 rounded"/>
       - unexpected value "text"

```

```yaml
- textbox
```

# Test source

```ts
  122 |       const emailField = usernameField(page);
  123 |       await expect(emailField).toHaveAttribute('type', 'email');
  124 | 
  125 |       // Assertion: Enabled/Disabled — nút disabled do HTML5 validation
  126 |       const submitButton = page.getByRole('button', { name: 'Sign In' });
  127 |       await expect(submitButton).toBeDisabled();
  128 |     }
  129 |   });
  130 | 
  131 |   // ─── TC-AUTOMATION-FR-02-010: JWT Token hợp lệ (TRƯỚC lockout) ──────────
  132 |   test('TC-AUTOMATION-FR-02-010 - Đăng nhập thành công trả về JWT Token hợp lệ', async ({ page }) => {
  133 |     const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-010');
  134 |     await performLogin(page, tc.data.email, tc.data.password);
  135 | 
  136 |     // Assertion: Value — token có trong storage và đúng format JWT
  137 |     const token = await page.evaluate(() => {
  138 |       return localStorage.getItem('token') || sessionStorage.getItem('token');
  139 |     });
  140 | 
  141 |     expect(token).toBeTruthy();
  142 |     const parts = token!.split('.');
  143 |     expect(parts).toHaveLength(3);
  144 |   });
  145 | 
  146 |   // ─── TC-AUTOMATION-FR-02-013: Token gửi kèm request (TRƯỚC lockout) ─────
  147 |   test('TC-AUTOMATION-FR-02-013 - Token JWT được lưu và gửi kèm request xác thực', async ({ page }) => {
  148 |     const tc = testCases.find(
  149 |       (t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-013'
  150 |     );
  151 | 
  152 |     const loginResponsePromise = page.waitForResponse(
  153 |       response =>
  154 |         response.url().includes('/api/login') &&
  155 |         response.request().method() === 'POST'
  156 |     );
  157 | 
  158 |     await page.goto('/login');
  159 | 
  160 |     await usernameField(page).fill(tc.data.email);
  161 |     await passwordField(page).fill(tc.data.password);
  162 | 
  163 |     await page.getByRole('button', { name: 'Sign In' }).click();
  164 | 
  165 |     // Chờ login API hoàn thành
  166 |     const loginResponse = await loginResponsePromise;
  167 |     expect(loginResponse.ok()).toBeTruthy();
  168 | 
  169 |     // Kiểm tra token được lưu
  170 |     const token = await page.evaluate(() => {
  171 |       return localStorage.getItem('token');
  172 |     });
  173 | 
  174 |     expect(token).toBeTruthy();
  175 | 
  176 |     // Chờ request /me
  177 |     const meRequest = await page.waitForRequest(
  178 |       request =>
  179 |         request.url().includes('/api/users/me') &&
  180 |         request.method() === 'GET'
  181 |     );
  182 | 
  183 |     const authorization = meRequest.headers()['authorization'];
  184 | 
  185 |     // Kiểm tra Bearer token
  186 |     expect(authorization).toBeTruthy();
  187 |     expect(authorization).toMatch(/^Bearer\s+\S+$/);
  188 | 
  189 |     // Đảm bảo Bearer token chính là JWT đã lưu
  190 |     expect(authorization).toBe(`Bearer ${token}`);
  191 |   });
  192 | 
  193 |   // ─── TC-AUTOMATION-FR-02-011: Lỗi không lộ chi tiết ────────────────────
  194 |   test('TC-AUTOMATION-FR-02-011 - Thông báo lỗi không lộ chi tiết nguyên nhân', async ({ page }) => {
  195 |     const tc1 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'user@test.com');
  196 |     const tc2 = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-011' && t.data.email === 'nonexist@test.com');
  197 | 
  198 |     // Login with wrong password (existing email)
  199 |     await performLogin(page, tc1.data.email, tc1.data.password);
  200 |     const errorText1 = await page.getByText(/đăng nhập thất bại/i).textContent();
  201 | 
  202 |     // Login with non-existing email
  203 |     await performLogin(page, tc2.data.email, tc2.data.password);
  204 |     const errorText2 = await page.getByText(/đăng nhập thất bại/i).textContent();
  205 | 
  206 |     // Assertion: Text content — cùng message cho cả 2 trường hợp
  207 |     expect(errorText1).toBe(errorText2);
  208 | 
  209 |     // Verify forbidden keywords are NOT present
  210 |     const forbiddenKeywords = tc1.expected.forbiddenKeywords;
  211 |     for (const keyword of forbiddenKeywords) {
  212 |       expect(errorText1!.toLowerCase()).not.toContain(keyword.toLowerCase());
  213 |     }
  214 |   });
  215 | 
  216 |   // ─── TC-AUTOMATION-FR-02-012: Field email type="email" ──────────────────
  217 |   test('TC-AUTOMATION-FR-02-012 - Kiểm tra field email có type="email"', async ({ page }) => {
  218 |     await page.goto('/login');
  219 | 
  220 |     // Assertion: Attribute
  221 |     const emailField = usernameField(page);
> 222 |     await expect(emailField).toHaveAttribute('type', 'email');
      |                              ^ Error: expect(locator).toHaveAttribute(expected) failed
  223 |   });
  224 | 
  225 |   // ─── TC-AUTOMATION-FR-02-008: Khóa sau 3 lần sai (CUỐI CÙNG) ──────────
  226 |   test('TC-AUTOMATION-FR-02-008 - Tài khoản bị khóa sau 3 lần đăng nhập sai liên tiếp', async ({ page }) => {
  227 |     const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-008');
  228 |     const { email, password, attempts } = tc.data;
  229 | 
  230 |     for (let i = 0; i < attempts; i++) {
  231 |       await performLogin(page, email, password);
  232 |     }
  233 | 
  234 |     // Assertion: Visibility — lockout message hiển thị
  235 |     const lockoutMessage = page.getByText(/khóa|locked|tạm khóa|vui lòng thử lại sau/i);
  236 |     await expect(lockoutMessage).toBeVisible();
  237 |   });
  238 | 
  239 |   // ─── TC-AUTOMATION-FR-02-009: Đăng nhập khi đang bị khóa ────────────────
  240 |   test('TC-AUTOMATION-FR-02-009 - Đăng nhập khi tài khoản đang bị khóa', async ({ page }) => {
  241 |     const tc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-009');
  242 |     const lockTc = testCases.find((t: any) => t.testCaseId === 'TC-AUTOMATION-FR-02-008');
  243 | 
  244 |     // Trigger lockout first
  245 |     for (let i = 0; i < lockTc.data.attempts; i++) {
  246 |       await performLogin(page, lockTc.data.email, lockTc.data.password);
  247 |     }
  248 | 
  249 |     // Try to login with correct password while locked
  250 |     await performLogin(page, tc.data.email, tc.data.password);
  251 | 
  252 |     // Assertion: Visibility — lỗi vẫn hiển thị
  253 |     const errorMessage = page.getByText(/khóa|locked|thất bại|không chính xác/i);
  254 |     await expect(errorMessage).toBeVisible();
  255 | 
  256 |     // Assertion: URL — vẫn ở trang login
  257 |     await expect(page).toHaveURL('/login');
  258 |   });
  259 | });
```