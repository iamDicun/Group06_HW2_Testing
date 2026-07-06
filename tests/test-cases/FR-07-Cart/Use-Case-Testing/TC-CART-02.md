# TC-CART-02: Add new product to cart (UC-02)

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
- User is on the Home page
- Cart already contains iPhone 16 Pro Max (qty 2)

## Test Data
- Existing item in cart: iPhone 16 Pro Max (qty 2)
- New product to add: AirPods Pro (5.490.000₫)

## Test Steps
1. Navigate to Home page
2. Click "Mua ngay" on AirPods Pro
3. Observe any notification (toast/alert)
4. Click the cart icon on the navbar
5. Verify the cart page shows both products

## Expected Result
- A toast notification appears: "Đã thêm AirPods Pro vào giỏ hàng!"
- The navbar cart badge updates to reflect the new count
- Clicking the cart icon navigates to the cart page
- The cart page shows both iPhone 16 Pro Max (qty 2) and AirPods Pro (qty 1)

## Actual Result (filled after execution)
- Clicked "Mua ngay" on AirPods Pro. No toast notification appeared. Cart badge did not update. Navigated to cart page: both iPhone and AirPods Pro were present. AirPods was shown with correct quantity (1).

## Status
Failed

## Related Bugs
- BUG-06 (no badge), BUG-08 (no toast, need 2 clicks)

## Notes
- Product was added successfully but without UI feedback (toast, badge update).
