# TC-CART-19: S2 → S2 decrease quantity via "−" button (ST-08)

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / State Transition Testing

## Priority
Medium

## Preconditions
- User is logged in with a valid account
- Cart is in state S2 (has items) with iPhone 16 Pro Max (qty 3)

## Test Data
- Product: iPhone 16 Pro Max (32.990.000₫)
- Action: Decrease quantity from 3 to 2

## State Transition
S2 (qty=3) → [Click "−"] → S2 (qty=2)

## Test Steps
1. Navigate to the cart page
2. Locate iPhone 16 Pro Max row
3. Click the "−" button to decrease quantity
4. Verify quantity shows 2

## Expected Result
- A "−" button is available
- Clicking "−" decreases quantity from 3 to 2
- Line total updates to 32.990.000₫ × 2 = 65.980.000₫
- System remains in S2

## Actual Result (filled after execution)
- Cart row does not have a "−" button. A dropdown quantity selector is used instead. Changed quantity to 2 via dropdown. Line total and grand total updated correctly. No ₫ symbol on total.

## Status
Failed

## Related Bugs
- BUG-01 (no +/- buttons), BUG-09 (missing ₫ symbol)

## Notes
- Quantity decrease works via dropdown; spec requires "−" button.
