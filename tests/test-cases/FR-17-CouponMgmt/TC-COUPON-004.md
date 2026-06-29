# TC-COUPON-004: Apply non-existent or invalid coupon code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is on the Checkout page
- User has an account, is logged in, and has added valid product(s) to the cart
- The coupon `NONEXISTENT` is not in the database

## Test Data
| Field | Value |
|-------|-------|
| Coupon input | `NONEXISTENT` |
| Cart total_amount | `30000000` |

## Test Steps
1. Navigate to the Login page and log in with the test account.
2. Add products to the cart until the total amount displays a valid number (e.g., 30.000.000 ₫).
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button.
4. Verify that the system successfully navigates you to the Checkout page (`/checkout`).
5. Locate the Coupon Code input text box and enter a non-existent coupon code (e.g., `NONEXISTENT`) into the input
6. Click the "Áp dụng" (Apply) button
7. Observe the layout, error messages, and calculation fields displayed on the screen

## Expected Result
- The coupon is rejected, a friendly error validation message displayed on the screen: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" (Coupon code does not exist or has been deactivated)
- The final checkout calculation fields must not trigger any discount deductions, the total remains exactly the same as before applying the code

## Actual Result (filled after execution)
- The message: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" was displayed and the total remained exactly the same

## Status
Pass

## Related Bugs
None

## Notes
- Partition: Non-existent coupon code
- Same error is returned for deactivated coupons (`is_active = 0`)
- Any string that doesn't match an active coupon code in the DB falls into this partition
- Special characters (e.g., `<script>`, `SAVE10!`) are treated as non-existent codes, not sanitized differently
