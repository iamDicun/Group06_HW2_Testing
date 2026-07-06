# TC-CART-03: Add duplicate product to cart (UC-03)

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / Use Case Testing

## Priority
High

## Preconditions
- User is logged in with a valid account
- Cart already contains AirPods Pro (qty 1)

## Test Data
- Existing item in cart: AirPods Pro (qty 1)
- Same product to add again: AirPods Pro

## Test Steps
1. Navigate to Home page
2. Click "Mua ngay" on AirPods Pro (same product already in cart)
3. Click the cart icon on the navbar
4. Check the quantity of AirPods Pro in the cart

## Expected Result
- The system should merge the duplicate: quantity of AirPods Pro should increase from 1 to 2 (not create a separate line item)
- Expected behavior: addToCart should find existing item and increment quantity

## Actual Result (filled after execution)
- Clicked "Mua ngay" on AirPods Pro (already in cart). Navigated to cart page: AirPods Pro appeared as a new separate line item instead of merging. Two rows showed AirPods Pro (qty 1 each) instead of one row (qty 2).

## Status
Failed

## Related Bugs
- BUG-04 (no merge on add duplicate)

## Notes
- addToCart does not check for existing items before adding. Each "Mua ngay" creates a new cart entry.
