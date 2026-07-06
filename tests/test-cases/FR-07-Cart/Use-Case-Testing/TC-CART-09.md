# TC-CART-09: Minimum quantity limited to 1 (UC-09)

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
- Action: Attempt to decrease quantity below 1

## Test Steps
1. Navigate to the cart page
2. Locate iPhone 16 Pro Max row
3. Attempt to set quantity below 1 (either via "−" button or dropdown)

## Expected Result
- The quantity must not go below 1
- The "−" button should be disabled when quantity = 1 (or the dropdown should not include values < 1)
- If a delete is intended, the user must use the delete icon instead

## Actual Result (filled after execution)
- Cart uses a dropdown for quantity. The dropdown offers values 1 through 10. Value 1 is the minimum available; cannot go below 1. Correct behavior preserved.

## Status
Failed

## Related Bugs
- BUG-01 (no +/- buttons), BUG-09 (missing ₫ symbol)

## Notes
- Quantity is correctly bounded at minimum 1 via the dropdown. However, the design specifies +/- buttons, not a dropdown.
