# TC-CART-10: Continue shopping (UC-10)

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / Use Case Testing

## Priority
Medium

## Preconditions
- User is logged in with a valid account
- Cart contains at least 1 product
- User is on the cart page

## Test Steps
1. On the cart page, click the "← Mua tiếp" (Continue Shopping) button
2. Observe the navigation
3. Browse the Home page and add another product to cart
4. Return to the cart page

## Expected Result
- Clicking "← Mua tiếp" navigates to the Home page
- The user can continue browsing and add products to cart
- The cart badge should update when new products are added

## Actual Result (filled after execution)
- Clicked "← Mua tiếp". Navigated to Home page. Added a new product. No toast notification. Badge did not update. Navigated back to cart page: new product was present. Badge still missing from navbar.

## Status
Failed

## Related Bugs
- BUG-06 (no badge), BUG-07 (button label "← Mua tiếp" is wrong), BUG-08 (no toast)

## Notes
- Navigation works but cart badge and button label do not meet specification.
