# TC-CART-17: S2 → S2 delete product with cancel (ST-06)

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
- Cart is in state S2 (has items) with iPhone 16 Pro Max and AirPods Pro

## Test Data
- Product for attempted deletion: AirPods Pro

## State Transition
S2 (has items) → [Delete with cancel] → S2 (unchanged)

## Test Steps
1. Navigate to the cart page
2. Click the delete icon on AirPods Pro row
3. Observe whether a confirmation dialog appears
4. Click "Huỷ" to cancel deletion
5. Verify AirPods Pro is still in the cart

## Expected Result
- Confirmation dialog: "Bạn có muốn xoá sản phẩm này?"
- After "Huỷ", AirPods Pro remains in cart
- System stays in S2 with no changes

## Actual Result (filled after execution)
- Clicked delete icon on AirPods Pro. No confirmation dialog appeared. Item was deleted immediately. The cancel flow cannot be tested. This test case is blocked by BUG-02.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation)

## Notes
- Without a confirmation dialog, the cancel (S2 → S2) flow cannot be verified.
