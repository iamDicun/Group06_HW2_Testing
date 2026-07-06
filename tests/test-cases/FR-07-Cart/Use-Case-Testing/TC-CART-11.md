# TC-CART-11: Empty cart access (UC-11)

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
- Cart is empty (no products)

## Test Steps
1. Click the cart icon on the navigation bar
2. Observe the cart page

## Expected Result
- The cart page displays an empty state with:
  - A message: "Không có sản phẩm nào trong giỏ hàng"
  - An illustration graphic
  - A button or link to continue shopping

## Actual Result (filled after execution)
- Cart page displayed the text "Không có sản phẩm nào trong giỏ hàng" but no illustration graphic was shown. No "continue shopping" button was visible on the empty cart page.

## Status
Failed

## Related Bugs
- BUG-05 (no empty state illustration)

## Notes
- Empty state lacks visual illustration as specified.
