# TC-COUPON-008: Apply a valid coupon (EP)

## Requirement ID
FR-17

## Feature
Coupon Management

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User has an account, is logged in, and has added valid products to the shopping cart
- The coupon `SAVE10` is never used by the account
- User is on the Checkout interface (`/checkout`)

## Test Data
| Field | Value |
|-------|-------|
| Coupon Input | `SAVE10` |
| Cart total_amount | `4,000,000` |

## Test Steps
1. Navigate to the Login page and log in with the test account
2. Add products to the cart until the total amount displays a valid number (e.g., 4.000.000 ₫)
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button
4. Verify that the system successfully navigates to the Checkout page (`/checkout`)
5. Locate the Coupon Code input text box and enter `SAVE10`
6. Click the "Áp dụng" button

## Expected Result
- A success toast or label displaying exactly: "Áp dụng thành công! Giảm 10%" appears on the checkout interface.
- The discount value is calculated correctly (400.000 ₫), and the final total payment dynamically updates from 4.000.000 ₫ down to exactly 3.600.000 ₫.

## Actual Result (filled after execution)
- A success message "Áp dụng thành công! Giảm 10%" was displayed on the checkout interface, but the discount calculation was incorrect

## Status
Fail

## Related Bugs
- Bug-009: Incorrect discount price calculation logic on Frontend checkout component

## Notes
- Partition: Valid coupon use check
- Frontend: Checkout.jsx checks `if (!couponCode.trim())`
- Backend: server.js:366 returns error if `!code`
- Backend Database Flow: The system executes a strict lookup `SELECT * FROM coupons WHERE code = 'SAVE10' AND status = 'active'`, validates that the expiration date is still valid, and safely returns the 10% discount payload to the frontend