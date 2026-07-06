# TC-CART-04: Delete product with confirmation "Có" (UC-04)

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
- Cart contains at least 2 products (e.g., iPhone 16 Pro Max, AirPods Pro)

## Test Data
- Product to delete: iPhone 16 Pro Max

## Test Steps
1. Navigate to the cart page
2. Click the delete (thùng rác) icon on iPhone 16 Pro Max row
3. Observe whether a confirmation dialog appears
4. If a dialog appears, click "Có" (Yes) to confirm deletion
5. Verify the item is removed from the cart

## Expected Result
- A confirmation dialog appears: "Bạn có muốn xoá sản phẩm này?"
- After clicking "Có", the product is removed from the cart
- The remaining products, total, and cart count update correctly

## Actual Result (filled after execution)
- Clicked the delete icon on iPhone 16 Pro Max. No confirmation dialog appeared. The item was deleted immediately. Remaining item (AirPods Pro) and total updated.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation)

## Notes
- Delete action executes without any user confirmation. Risk of accidental deletion.
