# TC-CART-20: S2 → S2 continue shopping (ST-09)

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
- Cart is in state S2 (has items) with iPhone 16 Pro Max (qty 2)

## State Transition
S2 (has items) → [Continue shopping] → S2 (still has items)

## Test Steps
1. Navigate to the cart page
2. Click the "← Mua tiếp" button
3. Observe the redirect
4. Browse the Home page
5. Click the cart icon
6. Verify cart still contains the same items

## Expected Result
- "← Mua tiếp" navigates to the Home page
- Cart contents remain unchanged
- Clicking cart icon returns to the cart page with all items intact
- Cart badge shows correct count on navbar
- System stays in S2

## Actual Result (filled after execution)
- Clicked "← Mua tiếp". Navigated to Home page. Cart icon badge not visible. Clicked cart icon → navigated to /cart with all items intact. Cart still showed iPhone 16 Pro Max (qty 2). Button label says "← Mua tiếp" instead of the expected "Tiếp tục mua sắm". No badge on navbar.

## Status
Failed

## Related Bugs
- BUG-06 (no badge), BUG-07 (wrong button label)

## Notes
- State transition S2 → S2 is correct. Cart items preserved. Label and badge issues.
