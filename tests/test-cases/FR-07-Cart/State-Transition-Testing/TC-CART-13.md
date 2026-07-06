# TC-CART-13: S1 empty cart without items (ST-02)

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
- Cart is in state S1 (empty cart)
- User is on the Home page

## State Transition
S1 (empty) → [Do nothing] → S1 (stay in empty)

## Test Steps
1. Click the cart icon on the navbar
2. Observe the empty cart page
3. Click the logout menu item on the navbar
4. In the confirmation dialog, click "Có"
5. Verify redirect to login
6. Try to access /cart directly while logged out

## Expected Result
- Empty cart page shows: "Không có sản phẩm nào trong giỏ hàng" with an illustration
- Logout dialog: "Bạn có muốn thoát không?"; clicking "Có" redirects to /login
- Accessing /cart while logged out redirects to /login
- System stays in S1

## Actual Result (filled after execution)
- Cart page showed "Không có sản phẩm nào trong giỏ hàng" (text only, no illustration). Logout dialog appeared: "Bạn có muốn thoát không?". Clicked "Có" → redirected to /login. Accessed /cart → redirected to /login.

## Status
Failed

## Related Bugs
- BUG-05 (no empty state illustration), BUG-10 (logout label "Thoát")

## Notes
- State transition S1 → S1 is correct. Empty text and logout flow work. Missing illustration.
