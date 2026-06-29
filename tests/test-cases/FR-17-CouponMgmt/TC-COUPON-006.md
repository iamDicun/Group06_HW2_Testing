# TC-COUPON-006: Apply coupon with case sensitivity (EP)

## Requirement ID
FR-17

## Feature
Coupon Management

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The coupon "SAVE10" exists in the database (uppercase)
- User has an account, is logged in, and has added valid product(s) to the cart
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `save10` (all lowercase) |
| total_amount | 500000 |

## Test Steps
1. Navigate to the Login page and log in with the test account.
2. Add products to the cart until the total amount displays a valid number (e.g., 30.000.000 ₫).
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button.
4. Verify that the system successfully navigates you to the Checkout page (`/checkout`).
5. Locate the Coupon Code input text box and enter `save10` (lowercase) into the coupon code input
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen
8. (API Verification): send the lowercase code `save10` directly to backend

## Expected Result
- UI Execution (Via Web Browser): The coupon application must succeed. The frontend mechanism must automatically strip away any outer accidental whitespaces. The screen displays: "Áp dụng thành công!", and the final total calculation drops accordingly.
- Direct API Execution: To ensure maximum data sanitization and robustness across all platforms, the backend system must also succeed. It should internally clean/trim the incoming code string before querying the database, returning an HTTP `200 OK` response status along with the applied discount payload.

## Actual Result (filled after execution)
- The message: "Áp dụng thành công!" was displayed but the price was total incorrectly
- If the lowercase code `save10` is sent directly to the API returns: `{"error":"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"}`

## Status
Fail

## Related Bugs
- Bug-008: Inconsistent case-sensitivity validation between Frontend and Backend API layout
- Bug-009: Incorrect discount price calculation logic on Frontend checkout component

## Notes
- Partition: coupon code in different case than stored value in database
- Frontend (Checkout.jsx) applies `.trim().toUpperCase()` before sending
- Backend (server.js:370) uses exact match: `WHERE code = ?` — case-sensitive
- Users typing lowercase codes will still succeed via the frontend
- Direct API consumers are affected by backend case sensitivity
