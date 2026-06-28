# TC-COUPON-005: Apply coupon with minimum order value boundaries (BVA)

## Requirement ID
FR-17

## Feature
Coupon Management — Minimum order value condition

## Module / Test Type / Technique
COUPON / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- The coupon "SAVE10" has `min_order_amount = 300000` in the database
- User has an account, is logged in, and is currently on the Checkout interface (`/checkout`) with valid added product(s)

## Test Data
| Field | Boundary | Value |
|-------|----------|-------|
| Code | Valid | `SAVE10` |
| total_amount | Below min (min-1) | 299999 |
| total_amount | At min (exact) | 300000 |
| total_amount | Above min (min+1) | 300001 |

## Test Steps
For each boundary value above:
1. Navigate to the Login page and log in with the test account.
2. Add products to the cart until the total amount displays a valid number (e.g., 30.000.000 ₫).
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button.
4. Verify that the system successfully navigates you to the Checkout page (`/checkout`).
5. Locate the Coupon Code input text box and enter `SAVE10` into the coupon code input
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen

## Expected Result
- `Below min` (299999): Error "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"
- `At min` (300000): Error "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"
- `Above min` (300001): Success — coupon applied

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- The condition is `total_amount > min_order_amount` (strictly greater than, server.js:378)
- This means the boundary at the exact minimum value is invalid
- For the coupon "BIGBUY" (min = 500000): 500000 fails, 500001 succeeds
