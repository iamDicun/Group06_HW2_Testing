# TC-COUPON-002: Apply expired coupon code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Expired coupon validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- A coupon `EXPIRED` exists in the database with an expiration timestamp set in the past (e.g.,`expired_at = 2020-01-01`)
- User has an account, is logged in, and has added valid product(s) to the cart
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Coupon Input | `EXPIRED` |
| Cart total_amount | `30000000 ` |

## Test Steps
1. Navigate to the Login page and log in with the test account
2. Add product(s) to cart until the total amount displays a valid number
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button
4. Verify that the system successfully navigates to the Checkout page (`/checkout`)
5. Locate the Coupon Code input text box and enter `EXPIRED` into the coupon code input
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen

## Expected Result
- The coupon is rejected, a friendly error validation message displayed on the screen: "Mã giảm giá đã hết hạn" (Coupon has expired).
- The final checkout calculation fields must not trigger any discount deductions, the total remains exactly the same as before applying the code

## Actual Result (filled after execution)
- The message: "Mã giảm giá đã hết hạn" was displayed and the final checkout calculation remained exactly the same

## Status
Pass

## Related Bugs
None

## Notes
- Partition: Invalid outdated system entity data verification
- The expiry check runs after the minimum order check (server.js:380)
- The coupon passes min order check (3000000 > 100000) but fails the expiry check
