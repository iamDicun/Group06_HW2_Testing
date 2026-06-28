# TC-COUPON-007: Apply coupon with leading/trailing spaces (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Whitespace handling

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The coupon "SAVE10" exists in the database
- User is on the Checkout page
- User has an account, is logged in, and has added valid product(s) to the cart

## Test Data
| Field | Value |
|-------|-------|
| Coupon code | ` SAVE10` (leading space) |
| Direct API Payload | `{"code": "SAVE10 "}` |
| Cart total_amount | `4000000` |

## Test Steps
1. Navigate to Log in page and log in with the test account.
2. Add products to the cart until the total amount displays a valid number (e.g., 30.000.000 ₫).
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button.
4. Verify that the system successfully navigates you to the Checkout page (`/checkout`).
5. Locate the Coupon Code input text box and enter ` SAVE10` with a leading space into the coupon code input
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen
8. (API Verification): create a direct `POST` request to send the code `SAVE10 ` directly to `http://localhost:3000/api/coupons/apply` backend, including the auth token in Headers, and pass the raw trailing space body: `{"code": "SAVE10 "}` and click SEND and observe response

## Expected Result
- UI Execution (Via Web Browser): The coupon application must succeed. The frontend mechanism must automatically strip away any outer accidental whitespaces. The screen displays: "Áp dụng thành công!", and the final total calculation drops accordingly.
- Direct API Execution: To ensure maximum data sanitization and robustness across all platforms, the backend system must also succeed. It should internally clean/trim the incoming code string before querying the database, returning an HTTP `200 OK` response status along with the applied discount payload.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon code with leading or trailing whitespace
- Frontend (Checkout.jsx) applies `.trim()` before sending to API
- Backend (server.js:370) does NOT trim — the exact string including spaces is used in the SQL query
- Users with accidental spaces will still succeed via the frontend
- Direct API consumers are affected by the lack of backend trimming
