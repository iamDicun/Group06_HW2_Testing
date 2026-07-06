# TC-COUPON-001: Apply percent coupon successfully with boundary order amount

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Decision Table & Boundary Value Analysis

## Priority
Medium

## Preconditions
- User is logged in to a valid customer account (e.g., `test@eshop.com` / `Test1234!`).
- Active JWT Token is present in the `Authorization` header.
- Coupon `"SAVE10"` exists and is active (`is_active = 1`).
- Current user has not used this coupon before (`max_uses_per_user = 1`).

## Test Data
| Field | Value |
|-------|-------|
| code | "SAVE10" |
| total_amount | 300000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `200 OK`
- Response JSON should contain:
  - `success`: `true`
  - `discount_amount`: `30000` (10% of 300,000 ₫)
  - `final_amount`: `270000` (300,000 ₫ - 30,000 ₫)

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case tests the boundary value of the minimum order amount (`min_order_amount` = 300,000 ₫).
- **Known SUT Bugs:** 
  1. The SUT has a calculation bug for percent coupons: `discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))`. Since `discount_value` is `10`, it evaluates to `300,000 * -9 = -2,700,000` ₫, which results in `final_amount = 3,000,000` ₫ (increases price tenfold).
  2. The SUT uses `total_amount > min_order_amount` in its validation instead of `>=`, which fails the test case at the boundary.
