# TC-CART-07: Increase product quantity (UC-07)

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / Use Case Testing

## Priority
Medium

## Preconditions
- User is logged in with a valid account
- Cart contains iPhone 16 Pro Max with quantity 1

## Test Data
- Product: iPhone 16 Pro Max (32.990.000₫)
- Action: Increase quantity from 1 to 3

## Test Steps
1. Navigate to the cart page
2. Locate iPhone 16 Pro Max row
3. Click the "+" button to increase quantity
4. Repeat until quantity reads 3
5. Verify the total updates accordingly

## Expected Result
- A "+" button should be available next to the quantity display
- Clicking "+" increases the quantity by 1 each time
- The line total updates: 32.990.000₫ × 3 = 98.970.000₫
- The cart grand total updates accordingly

## Actual Result (filled after execution)
- Cart row does not have +/- buttons. Instead, a dropdown (select) quantity selector is provided. Changed quantity from 1 to 3 via dropdown. Line total and grand total updated correctly. No ₫ symbol on total.

## Status
Failed

## Related Bugs
- BUG-01 (no +/- buttons), BUG-09 (missing ₫ symbol)

## Notes
- Quantity changes work via dropdown, but the specification requires +/- buttons.
