# TC-CART-16: S2 → S1 delete last product (ST-05)

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
- Cart is in state S2 (has items) with iPhone 16 Pro Max (qty 1)

## Test Data
- Product to delete: iPhone 16 Pro Max (last item)

## State Transition
S2 (has items) → [Delete last item] → S1 (empty cart)

## Test Steps
1. Navigate to the cart page
2. Click the delete icon on iPhone 16 Pro Max
3. Observe confirmation dialog
4. After deletion, observe the cart page

## Expected Result
- Confirmation dialog appears (or item deleted)
- After deletion, cart shows empty state with message and illustration
- Navbar badge disappears or shows 0
- System transitions from S2 to S1

## Actual Result (filled after execution)
- Clicked delete icon on iPhone 16 Pro Max. No confirmation dialog. Item deleted immediately. Cart shows "Không có sản phẩm nào trong giỏ hàng" (text only, no illustration). No navbar badge.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation), BUG-05 (no empty state illustration)

## Notes
- State transition S2 → S1 is functionally correct. Missing UI elements.
