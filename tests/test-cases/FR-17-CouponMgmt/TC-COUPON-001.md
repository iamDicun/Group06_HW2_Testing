# TC-COUPON-001: Apply coupon with empty code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User has an account, is logged in, and has added valid products to the shopping cart
- User is on the Checkout interface (`/checkout`)

## Test Data
| Field | Value |
|-------|-------|
| Coupon Input | `` (empty string) |
| Cart total_amount | `4,000,000` |

## Test Steps
1. Navigate to the Login page and log in with the test account
2. Add products to the cart until the total amount displays a valid number (e.g., 4.000.000 ₫)
3. Open the Cart page (`/cart`) and click the "Tiến hành thanh toán" (Proceed to checkout) button
4. Verify that the system successfully navigates to the Checkout page (`/checkout`)
5. Locate the Coupon Code input text box and leave it completely empty
6. Observe the visual state of the "Áp dụng" (Apply) button located next to the input box
7. Attempt to click the "Áp dụng" button
8. API Verification: Bypass the frontend UI to send a direct `POST` request to `/api/coupons/apply` with an empty code payload `{"code": ""}`

## Expected Result
- The "Áp dụng" button is disabled (greyed out and unclickable) as long as the input fields contains zero valid alphanumeric character
- Clicking the disabled button yeild no response
- If sending an empty code directly via API, the backend returns: `{"error":"Vui lòng nhập mã giảm giá"}` with HTTP 400.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: Invalid blank user input validation check
- Frontend: Checkout.jsx checks `if (!couponCode.trim())` to dynamically inject `disabled` property onto the button element before server components are executed
- Backend: server.js:366 returns error if `!code`
