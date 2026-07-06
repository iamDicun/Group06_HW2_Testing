# TC-CART-06: Delete last product from cart (UC-06)

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
- Cart contains exactly 1 product (e.g., iPhone 16 Pro Max, qty 1)

## Test Data
- Product to delete: iPhone 16 Pro Max

## Test Steps
1. Navigate to the cart page
2. Click the delete (thùng rác) icon on the only product
3. Observe whether a confirmation dialog appears
4. Observe the cart page after deletion

## Expected Result
- A confirmation dialog appears (or item is deleted if auto-confirm)
- After deletion, the cart shows an empty state with a message and illustration
- The navbar cart badge disappears or shows 0

## Actual Result (filled after execution)
- Clicked the delete icon. No confirmation dialog. Item deleted immediately. Cart page shows text "Không có sản phẩm nào trong giỏ hàng" but no illustration graphic. No badge on navbar.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation), BUG-05 (no empty state illustration)

## Notes
- Empty state lacks visual illustration as specified in the design.
