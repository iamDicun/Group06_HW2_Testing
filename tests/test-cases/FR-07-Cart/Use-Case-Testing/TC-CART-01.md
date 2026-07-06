# TC-CART-01: View cart with items (UC-01)

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
- Cart contains at least 2 products (e.g., iPhone 16 Pro Max, AirPods Pro) with quantities > 1
- User is on any page (e.g., Home)

## Test Data
- Products: iPhone 16 Pro Max (32.990.000₫ × 2), AirPods Pro (5.490.000₫ × 3)

## Test Steps
1. Click the cart icon on the navigation bar
2. Observe the cart page that loads
3. Verify each product row displays: product name, unit price, quantity selector, total per item, delete button
4. Verify the total amount at the bottom
5. Check for a "Tiến hành thanh toán" (Proceed to Checkout) button

## Expected Result
- The cart page displays all products with correct names, images, and prices
- Each row has +/- quantity buttons and a delete (thùng rác) icon
- The total shows "Tạm tính: X₫" with the ₫ symbol
- A prominent "Tiến hành thanh toán" button is visible
- The navbar cart badge displays the total item count

## Actual Result (filled after execution)
- Cart page loaded successfully displaying all products. However:
  - No +/- quantity buttons; used a dropdown instead
  - No delete confirmation dialog
  - Total label shows "Tổng tạm tính" (no ₫ symbol)
  - No badge count on navbar cart icon
  - Logout button shows "Thoát" instead of "Đăng xuất"

## Status
Failed

## Related Bugs
- BUG-01, BUG-02, BUG-03, BUG-06, BUG-09, BUG-10

## Notes
- All observations are documented as individual bugs in the bug report.
