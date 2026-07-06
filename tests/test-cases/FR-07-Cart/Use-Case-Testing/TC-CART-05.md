# TC-CART-05: Delete product with confirmation "Huỷ" (UC-05)

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
- Product to attempt deletion: iPhone 16 Pro Max

## Test Steps
1. Navigate to the cart page
2. Click the delete (thùng rác) icon on iPhone 16 Pro Max row
3. Observe whether a confirmation dialog appears
4. If a dialog appears, click "Huỷ" (Cancel) to cancel deletion
5. Verify the item is still in the cart

## Expected Result
- A confirmation dialog appears: "Bạn có muốn xoá sản phẩm này?"
- After clicking "Huỷ", the item remains in the cart
- The cart display is unchanged

## Actual Result (filled after execution)
- Clicked the delete icon on iPhone 16 Pro Max. No confirmation dialog appeared. The item was deleted immediately. The cancel flow cannot be tested. This test case is blocked by BUG-02.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation)

## Notes
- Without a confirmation dialog, the cancel flow cannot be verified.
