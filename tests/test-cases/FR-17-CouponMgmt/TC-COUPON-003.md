# TC-COUPON-003: Apply coupon exceeded usage limit (EP)

## Requirement ID
FR-17

## Feature
Coupon Management

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- The coupon "SAVE10" has `max_uses_per_user = 1` in the database
- User has already used coupon "SAVE10" once (record exists in coupon_usage table for this user)
- User has an account, is logged in, and has added valid product(s) to the cart
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Coupon input | `SAVE10` |
| Cart total_amount | `30000000` |
| user_id | 1 |

## Test Steps
1. Navigate to the Login page and log in with the test account.
2. Add products to the cart until the total amount displays a valid number (e.g., 30.000.000 ₫).
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button.
4. Verify that the system successfully navigates you to the Checkout page (`/checkout`).
5. Locate the Coupon Code input text box and enter `SAVE10` into the coupon code input.
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen

## Expected Result
- The coupon is rejected, a friendly error validation message displayed on the screen: "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)" (You have used this code 1 time, reached the limit)
- The final checkout calculation fields must not trigger any discount deductions, the total remains exactly the same as before applying the code

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: Invalid multi-user constraint validation check for a single user
- Usage check only runs if `user_id` is provided in the request (server.js:386-414)
- If no `user_id` is provided, the usage limit is not enforced
