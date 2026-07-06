---

# [BUG][Forgot Password] OTP is 4 digits instead of required 6 digits

## Found by Test Case
TC-FORGOT-01, TC-FORGOT-05, TC-FORGOT-06

## Requirement Related
FR-03

## Severity / Priority
Major / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Pass 1234

## Steps to Reproduce
1. Navigate to http://localhost:5173/forgot-password
2. Enter `test@eshop.com` into the email input
3. Click "Lấy mã OTP"
4. Observe the OTP displayed in the green message box

## Expected Result
FR-03 specifies a 6-digit OTP. The OTP should be exactly 6 digits long.

## Actual Result
Backend generates a 4-digit token (`Math.floor(1000 + Math.random() * 9000)` in `server.js:280`). The OTP is always 4 digits (e.g., `4249`).

## Evidence
- Code reference: `server.js:280` — generates `Math.floor(1000 + Math.random() * 9000)` (4-digit)
- Observed OTP values: 4249, 5601, 1234 (all 4 digits)

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Password requirement message mentions "KÝ TỰ ĐẶC BIỆT" but actually accepts whitespace

## Found by Test Case
TC-FORGOT-03, TC-FORGOT-04

## Requirement Related
FR-03

## Severity / Priority
Minor / P3

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Pass 1234

## Steps to Reproduce
1. Navigate to http://localhost:5173/forgot-password
2. Enter `test@eshop.com`, click "Lấy mã OTP"
3. Enter a valid OTP
4. Enter `Test123 4` (contains a space) as the new password
5. Click "Đặt lại mật khẩu"
6. Observe that the password is accepted

## Expected Result
The message says "KÝ TỰ ĐẶC BIỆT" (special character) — the password should require at least one special character like `@`, `#`, `$`, etc.

## Actual Result
The password `Test123 4` (which uses a space, not a special character) is accepted. The regex on the Forgot Password page checks for whitespace (`\s`) instead of special characters. This is inconsistent with the Register page which requires `@#$%!^&*=`.

## Evidence
- Forgot password alert message: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- Register page requirement: "ít nhất 1 ký tự đặc biệt như @#$%!^&*="
- Password `Test123 4` passes forgot password but would fail register

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: minor`
- `priority: p3`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Missing confirm password field on Step 2

## Found by Test Case
TC-FORGOT-02, TC-FORGOT-04

## Requirement Related
FR-03

## Severity / Priority
Major / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Pass 1234

## Steps to Reproduce
1. Navigate to http://localhost:5173/forgot-password
2. Enter `test@eshop.com`, click "Lấy mã OTP"
3. Observe the Step 2 form fields

## Expected Result
Step 2 should include three fields: "Mã OTP", "Mật khẩu mới", and "Xác nhận mật khẩu mới" (confirm password) to prevent typos.

## Actual Result
Step 2 only has two input fields: "Mã OTP (4 số)" and "Mật khẩu mới". There is no confirm password field. Users cannot verify they typed the intended password.

## Evidence
- Visual inspection of the Step 2 form
- TC-FORGOT-02 status: Failed

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Error message "User not found" displayed in English

## Found by Test Case
TC-FORGOT-08, TC-FORGOT-09

## Requirement Related
FR-03

## Severity / Priority
Minor / P3

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** N/A

## Steps to Reproduce
1. Navigate to http://localhost:5173/forgot-password
2. Enter a non-existent email (e.g., `nonexistent@test.com`)
3. Click "Lấy mã OTP"
4. Observe the error message

## Expected Result
Since the rest of the UI is in Vietnamese, the error message should be in Vietnamese: "Không tìm thấy người dùng".

## Actual Result
The backend returns `{"error":"User not found"}` and the frontend displays an alert: "Lỗi: User not found" — entirely in English.

## Evidence
- API response: HTTP 404 with `{"error":"User not found"}`
- Frontend alert: "Lỗi: User not found"
- TC-FORGOT-08, TC-FORGOT-09 status: Passed (functionally correct but language inconsistency)

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: minor`
- `priority: p3`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Missing +/- buttons on quantity selector

## Found by Test Case
TC-CART-01, TC-CART-07, TC-CART-08, TC-CART-09, TC-CART-18, TC-CART-19

## Requirement Related
FR-07

## Severity / Priority
High / P1

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Navigate to /cart
3. Observe the quantity selector on any product row

## Expected Result
Each product row should have "+" and "−" buttons flanking the quantity display for intuitive increment/decrement.

## Actual Result
Instead of +/- buttons, a dropdown (select) with values 1–10 is used. This is inconsistent with the design specification and less user-friendly.

## Evidence
- Visual inspection of cart page
- Code reference: likely uses `<select>` instead of button-based stepper
- TC-CART-07, TC-CART-08 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: high`
- `priority: p1`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] No confirmation dialog when deleting products

## Found by Test Case
TC-CART-01, TC-CART-04, TC-CART-05, TC-CART-06, TC-CART-15, TC-CART-16, TC-CART-17

## Requirement Related
FR-07

## Severity / Priority
High / P1

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Navigate to /cart
3. Click the delete (thùng rác) icon on any product

## Expected Result
A confirmation dialog should appear: "Bạn có muốn xoá sản phẩm này?" with "Có" and "Huỷ" buttons.

## Actual Result
The product is deleted immediately without any confirmation dialog. Accidental deletions cannot be prevented.

## Evidence
- TC-CART-04, TC-CART-05 status: Failed
- All delete operations execute silently without user confirmation

## Labels
- `type: bug`
- `module: cart`
- `severity: high`
- `priority: p1`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Wrong total label "Tổng tạm tính"

## Found by Test Case
TC-CART-01

## Requirement Related
FR-07

## Severity / Priority
Medium / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Navigate to /cart
3. Observe the label above the total amount

## Expected Result
The label should be "Tạm tính" (Subtotal) — a concise, standard e-commerce term.

## Actual Result
The label reads "Tổng tạm tính" — an unnatural and redundant phrasing.

## Evidence
- Visual inspection of cart page
- TC-CART-01 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: medium`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] addToCart does not merge duplicate products

## Found by Test Case
TC-CART-03, TC-CART-14

## Requirement Related
FR-07

## Severity / Priority
High / P1

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account whose cart contains AirPods Pro (qty 1)
2. On Home page, click "Mua ngay" on AirPods Pro again
3. Navigate to /cart

## Expected Result
The quantity of the existing AirPods Pro row should increase from 1 to 2.

## Actual Result
A new separate line item for AirPods Pro (qty 1) is created. The cart now has two AirPods Pro rows instead of one row with qty 2.

## Evidence
- TC-CART-03 status: Failed
- Visual: two identical AirPods Pro rows instead of one merged row

## Labels
- `type: bug`
- `module: cart`
- `severity: high`
- `priority: p1`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Empty cart has no illustration

## Found by Test Case
TC-CART-06, TC-CART-11, TC-CART-13, TC-CART-16

## Requirement Related
FR-07

## Severity / Priority
Medium / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has an empty cart
2. Navigate to /cart

## Expected Result
The empty cart page should display an illustration graphic alongside the text "Không có sản phẩm nào trong giỏ hàng".

## Actual Result
Only the text message is displayed. No illustration graphic is present.

## Evidence
- Visual inspection of empty cart page
- TC-CART-11 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: medium`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] No badge count on navbar cart icon

## Found by Test Case
TC-CART-01, TC-CART-02, TC-CART-10, TC-CART-12, TC-CART-20

## Requirement Related
FR-07

## Severity / Priority
Medium / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Observe the cart icon on the navigation bar

## Expected Result
The cart icon should display a badge with the total number of items (e.g., "2").

## Actual Result
No badge is displayed on the cart icon. Users cannot see their cart item count without navigating to the cart page.

## Evidence
- Visual inspection across pages (Home, Cart, Profile)
- TC-CART-01 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: medium`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Button label "← Mua tiếp" is inconsistent

## Found by Test Case
TC-CART-10, TC-CART-20

## Requirement Related
FR-07

## Severity / Priority
Low / P3

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Navigate to /cart
3. Observe the button at the bottom left

## Expected Result
The button label should be "Tiếp tục mua sắm" (Continue Shopping).

## Actual Result
The button label reads "← Mua tiếp" (← Buy more) — a non-standard and informal phrasing.

## Evidence
- Visual inspection of cart page
- TC-CART-10 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: low`
- `priority: p3`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Double-click required to navigate from navbar cart icon

## Found by Test Case
TC-CART-02, TC-CART-12

## Requirement Related
FR-07

## Severity / Priority
Medium / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Click the cart icon on the navigation bar once
3. Observe that nothing happens
4. Click the cart icon again

## Expected Result
A single click on the cart icon should navigate the user to /cart.

## Actual Result
The first click does nothing. A second click is required to navigate. This suggests an event handling issue (possibly a missing `onClick` or stale state).

## Evidence
- TC-CART-12 status: Passed (functionally works but UX issue noted)
- Observed behaviour: first click no response, second click navigates

## Labels
- `type: bug`
- `module: cart`
- `severity: medium`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Total amount missing ₫ currency symbol

## Found by Test Case
TC-CART-01, TC-CART-09, TC-CART-18, TC-CART-19

## Requirement Related
FR-07

## Severity / Priority
Medium / P2

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173/cart
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with an account that has items in the cart
2. Navigate to /cart
3. Observe the total amount display

## Expected Result
The total amount should include the ₫ symbol (e.g., "98.970.000₫") per Vietnamese currency display convention.

## Actual Result
The total amount is displayed as a plain number without any currency symbol (e.g., "98970000").

## Evidence
- Visual inspection of cart total area
- TC-CART-01 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: medium`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Cart] Logout label uses "Thoát" instead of "Đăng xuất"

## Found by Test Case
TC-CART-01, TC-CART-13

## Requirement Related
FR-07

## Severity / Priority
Low / P3

## Environment
- **Browser:** Microsoft Edge
- **OS:** Windows
- **URL:** http://localhost:5173
- **Version/Commit:** N/A
- **Test Account:** test01@gmail.com / Pass 1234

## Steps to Reproduce
1. Log in with any valid account
2. Observe the user menu on the navigation bar
3. Click the user menu / avatar

## Expected Result
The logout option should read "Đăng xuất" (Log out) — the standard Vietnamese term.

## Actual Result
The menu item reads "Thoát" (Exit) — an informal and non-standard label.

## Evidence
- Visual inspection of navbar user menu
- TC-CART-01 status: Failed

## Labels
- `type: bug`
- `module: cart`
- `severity: low`
- `priority: p3`
- `status: new`
- `found-by: test-case`
