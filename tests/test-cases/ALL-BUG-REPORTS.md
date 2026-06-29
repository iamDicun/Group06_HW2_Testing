> Đây là template tham khảo để điền nội dung bug. Còn template trên GitHub Issues nằm ở `.github/ISSUE_TEMPLATE/bug-report.md`.

# [BUG][Product Search] Reflected XSS via dangerouslySetInnerHTML on search views

## Found by Test Case
TC-PROD_SEARCH-006, TC-PROD_SEARCH-007, TC-PROD_SEARCH-008, TC-PROD_SEARCH-009, TC-PROD_SEARCH-010, TC-MOBILE-FR05-001, TC-MOBILE-FR05-002, TC-MOBILE-FR05-006, TC-MOBILE-FR05-007

## Requirement Related
FR-05

## Severity / Priority
Critical / P0

## Environment
- **Browser:** Chrome 
- **OS:** Windows 
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** N/A

## Steps to Reproduce
1. Open the search page (Home page) at http://localhost:5173
2. Type an XSS payload such as `<img src=x onerror=alert(1)>` or `<script>alert(1)</script>` into the search input
3. Click the "Tìm" button
4. Observe the page behaviour
5. Note: if the search term matches at least one product name, the payload is rendered unsanitised via `dangerouslySetInnerHTML` in the result area

## Expected Result
The search term must be HTML-encoded or sanitised before being rendered on the page. No JavaScript code from user input should execute in the browser.

## Actual Result
The frontend (`Home.jsx:64`) renders the search term using `dangerouslySetInnerHTML` without any sanitization or encoding. If a product name happens to contain the search term, the payload is injected directly into the DOM, leading to a Reflected XSS vulnerability.

## Evidence
- Code reference: `Home.jsx:64` (dangerouslySetInnerHTML)
- The search term is reflected in the UI with matched substrings highlighted in bold, using raw HTML insertion

## Labels
- `type: bug`
- `module: product-search`
- `severity: critical`
- `priority: p0`
- `status: new`
- `found-by: test-case`

---

# [BUG][Product Search] Critical SQL Injection vulnerability due to raw string interpolation

## Found by Test Case
TC-PROD_SEARCH-006, TC-MOBILE-FR05-007

## Requirement Related
FR-05

## Severity / Priority
Critical / P0

## Environment
- **Browser:** N/A (backend API)
- **OS:** Windows 
- **URL:** http://localhost:3000/api/products?search=...
- **Version/Commit:** N/A
- **Test Account:** N/A

## Steps to Reproduce
1. Send a GET request to `http://localhost:3000/api/products?search=' OR '1'='1`
2. Observe that all products are returned instead of zero

## Expected Result
The search input must be parameterized or sanitised. The SQL injection payload must not alter the SQL query logic. The query should return zero results.

## Actual Result
The backend (`server.js:144`) constructs the query using unsafe string interpolation: `` `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'` ``. The payload `' OR '1'='1` transforms the query to `SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'` which evaluates to TRUE for every row, returning all 5 products. This confirms a critical SQL injection vulnerability.

## Evidence
- API response for `search=' OR '1'='1`: returned all 5 products (HTTP 200)
- Code reference: `server.js:144`

## Labels
- `type: bug`
- `module: product-search`
- `severity: critical`
- `priority: p0`
- `status: new`
- `found-by: test-case`

# [BUG][Coupon Management] Incorrect discount price calculation logic

## Found by Test Case
TC-COUPON-006, TC-COUPON-007, TC-COUPON-008

## Requirement Related
FR-17

## Severity / Priority
Critical / P1

## Environment
- **Browser:** Chrome 
- **OS:** Windows 
- **URL:** http://localhost:5173/checkout
- **Version/Commit:** N/A
- **Test Account:** test01@eshop.com / Pass 1234

## Steps to Reproduce
1. Log in and add products to cart until total_amount displays a valid number (e.g., 4,000,000 ₫)
2. Navigate to the Checkout page
3. Enter `SAVE10` (10% discount) into the coupon code input
4. Click "Áp dụng"
5. Observe the discount_amount and final_total displayed

## Expected Result
For a 10% discount on total_amount = 4,000,000 ₫:
- discount_amount = 400,000 ₫ (10% of 4,000,000)
- final_total = 3,600,000 ₫

## Actual Result
The discount_amount displayed was -36,000,000 ₫ (negative) and the final_total was 40,000,000 ₫. The frontend uses the formula `total_amount * (1 - discount_value)` which computes `4,000,000 * (1 - 10) = 4,000,000 * (-9) = -36,000,000`. The correct formula should be `total_amount * (discount_value / 100)`.

## Evidence
- API response for `POST /api/apply-coupon {"code":"SAVE10","user_id":2,"total_amount":4000000}`:
  `{"success":true,"coupon_id":1,"discount_amount":-36000000,"final_amount":40000000,"message":"Áp dụng thành công! Giảm 10%"}`
- Code reference: `Checkout.jsx` coupon calculation logic (also `server.js:398-400` and `server.js:418-420`)

## Labels
- `type: bug`
- `module: coupon-management`
- `severity: critical`
- `priority: p1`
- `status: new`
- `found-by: test-case`

---

# [BUG][Product Search] Search input not trimmed — leading spaces cause zero results

## Found by Test Case
TC-PROD_SEARCH-002, TC-MOBILE-FR05-003

## Requirement Related
FR-05

## Severity / Priority
Minor / P3

## Environment
- **Browser:** Chrome 
- **OS:** Windows 
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** N/A

## Steps to Reproduce
1. Open the search page at http://localhost:5173
2. Type one or more leading space characters followed by a product name (e.g., `  iPhone`)
3. Click the "Tìm" button
4. Observe that no products are found

## Expected Result
Leading spaces should be trimmed before performing the search. Searching `  iPhone` should return the same results as searching `iPhone`.

## Actual Result
The system does not trim the search input. The SQL query becomes `SELECT * FROM products WHERE name LIKE '%  iPhone%'`, which matches no product names because no product name starts with spaces. Zero results are returned.

## Evidence
- TC-PROD_SEARCH-002 status: Fail
- API response for `search=%20%20iPhone`: 0 results
- API response for `search=iPhone`: 1 result (iPhone 15 Pro Max)

## Labels
- `type: bug`
- `module: product-search`
- `severity: minor`
- `priority: p3`
- `status: new`
- `found-by: test-case`

---

# [BUG][Product Search] Multiple consecutive spaces not normalized before search

## Found by Test Case
TC-PROD_SEARCH-004, TC-MOBILE-FR05-005

## Requirement Related
FR-05

## Severity / Priority
Minor / P3

## Environment
- **Browser:** Chrome 
- **OS:** Windows 
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** N/A

## Steps to Reproduce
1. Open the search page at http://localhost:5173
2. Type a product name with multiple consecutive spaces between words (e.g., `iPhone  15`)
3. Click the "Tìm" button
4. Observe that no products are found

## Expected Result
Multiple consecutive spaces should be collapsed into a single space before the search query is sent. Searching `iPhone  15` should return the same results as searching `iPhone 15`.

## Actual Result
The system does not normalize whitespace. The SQL query becomes `SELECT * FROM products WHERE name LIKE '%iPhone  15%'`, which matches no product names because product names use single spaces between words. Zero results are returned.

## Evidence
- TC-PROD_SEARCH-004 status: Fail
- API response for `search=iPhone%20%2015`: 0 results

## Labels
- `type: bug`
- `module: product-search`
- `severity: minor`
- `priority: p3`
- `status: new`
- `found-by: test-case`

---

# [BUG][Order History] Date column does not display time

## Found by Test Case
TC-ORDER-002

## Requirement Related
FR-11

## Severity / Priority
Major / P2

## Environment
- **Browser:** Chrome 
- **OS:** Windows 
- **URL:** http://localhost:5173/profile
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has multiple orders created at different times
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) table
4. Look at the date column for each order

## Expected Result
Both the date and the time (hours:minutes) should be displayed in the order date column, so users can distinguish orders placed on the same day.

## Actual Result
Only the date portion is displayed (e.g., "6/26/2026") without any time. The frontend (`Profile.jsx:185`) uses `new Date(o.created_at).toLocaleDateString()` which drops the time component. This makes it impossible to distinguish orders created on the same day.

## Evidence
- TC-ORDER-002 status: Fail
- Code reference: `Profile.jsx:185` — uses `.toLocaleDateString()` instead of `.toLocaleString()` or custom date-time formatting

## Labels
- `type: bug`
- `module: order-history`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

