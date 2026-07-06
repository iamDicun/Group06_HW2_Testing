# TC-CART-14: S2 → S2 add duplicate product (ST-03)

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / State Transition Testing

## Priority
High

## Preconditions
- User is logged in with a valid account
- Cart is in state S2 (has items) with AirPods Pro (qty 1)

## Test Data
- Product to add: AirPods Pro (already in cart)

## State Transition
S2 (has items) → [Add duplicate] → S2 (quantity should increase)

## Test Steps
1. On the Home page, click "Mua ngay" on AirPods Pro
2. Navigate to the cart page
3. Check the quantity of AirPods Pro

## Expected Result
- Quantity of AirPods Pro should increase from 1 to 2 (merge duplicate)
- No duplicate line item should appear
- System stays in S2

## Actual Result (filled after execution)
- Clicked "Mua ngay" on AirPods Pro (already in cart). Navigated to cart page: AirPods Pro appeared as two separate line items (qty 1 each) instead of merging into qty 2. System stays in S2 but with incorrect item representation.

## Status
Failed

## Related Bugs
- BUG-04 (no merge on add duplicate)

## Notes
- addToCart does not merge duplicates. Each click creates a new cart entry.
