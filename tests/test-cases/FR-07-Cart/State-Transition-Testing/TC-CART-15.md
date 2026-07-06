# TC-CART-15: S2 → S2 delete product with confirmation (ST-04)

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
- Cart is in state S2 (has items) with iPhone 16 Pro Max and AirPods Pro

## Test Data
- Product to delete: AirPods Pro

## State Transition
S2 (has items) → [Delete with confirm] → S2 (still has items)

## Test Steps
1. Navigate to the cart page
2. Click the delete icon on AirPods Pro row
3. Observe confirmation dialog
4. Click "Có" to confirm
5. Verify AirPods Pro is removed

## Expected Result
- Confirmation dialog: "Bạn có muốn xoá sản phẩm này?"
- After "Có", AirPods Pro is removed from cart
- iPhone 16 Pro Max remains
- System stays in S2

## Actual Result (filled after execution)
- Clicked delete icon on AirPods Pro. No confirmation dialog appeared. Item was deleted immediately. iPhone 16 Pro Max remained. System stayed in S2.

## Status
Failed

## Related Bugs
- BUG-02 (no delete confirmation)

## Notes
- Delete executes without confirmation. State transition S2 → S2 is correct functionally.
