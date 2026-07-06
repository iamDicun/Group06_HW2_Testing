# TC-CART-08: Decrease product quantity (UC-08)

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
- Cart contains iPhone 16 Pro Max with quantity 3

## Test Data
- Product: iPhone 16 Pro Max (32.990.000₫)
- Action: Decrease quantity from 3 to 1

## Test Steps
1. Navigate to the cart page
2. Locate iPhone 16 Pro Max row
3. Click the "−" button to decrease quantity
4. Repeat until quantity reads 1
5. Verify the total updates accordingly

## Expected Result
- A "−" button should be available next to the quantity display
- Clicking "−" decreases the quantity by 1 each time
- The line total updates: 32.990.000₫ × 1 = 32.990.000₫
- The cart grand total updates accordingly

## Actual Result (filled after execution)
- Cart row does not have +/- buttons. Used dropdown to decrease from 3 to 1. Line total and grand total updated correctly. No ₫ symbol on total.

## Status
Failed

## Related Bugs
- BUG-01 (no +/- buttons), BUG-09 (missing ₫ symbol)

## Notes
- Quantity decrease works via dropdown; spec requires +/- buttons.
