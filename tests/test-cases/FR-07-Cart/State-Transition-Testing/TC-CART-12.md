# TC-CART-12: S1 → S2 add product to cart (ST-01)

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

## Test Data
- Product to add: AirPods Pro (5.490.000₫)

## State Transition
S1 (empty) → [Add product] → E1 (add to cart) → S2 (has items)

## Test Steps
1. On the Home page, click "Mua ngay" on AirPods Pro
2. Observe any toast notification
3. Click the cart icon on the navbar
4. Verify the cart page loads with the product

## Expected Result
- Toast notification: "Đã thêm AirPods Pro vào giỏ hàng!"
- Navbar cart badge shows 1
- Clicking cart icon navigates to /cart
- Cart page shows AirPods Pro with quantity = 1, unit price = 5.490.000₫
- System transitions from S1 (empty cart) to S2 (cart has items)

## Actual Result (filled after execution)
- Clicked "Mua ngay" on AirPods Pro. No toast notification appeared. Cart badge did not show. Clicked cart icon — required double-click (first click did nothing). Cart page loaded showing AirPods Pro, qty 1, price 5.490.000₫. The system functionally transitioned from S1 to S2.

## Status
Passed

## Related Bugs
- BUG-06 (no badge), BUG-08 (need 2 clicks)

## Notes
- State transition S1 → S2 is functionally correct. UI feedback (toast, badge) is missing.
