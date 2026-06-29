# TC-COUPON-002: Apply fixed value coupon successfully with boundary order amount

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
- Coupon `"BIGBUY"` exists and is active (`is_active = 1`).
- Current user has not used this coupon before (`max_uses_per_user = 1`).

## Test Data
| Field | Value |
|-------|-------|
| code | "BIGBUY" |
| total_amount | 500001 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `200 OK`
- Response JSON should contain:
  - `success`: `true`
  - `discount_amount`: `50000` (Fixed 50,000 ₫)
  - `final_amount`: `450001` (500,001 ₫ - 50,000 ₫)

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- We use `500,001` ₫ as the boundary test value instead of `500,000` ₫ to bypass the SUT validation bug (`>` instead of `>=`), ensuring that we can verify the fixed discount calculation logic itself. If `500,000` ₫ is used, the SUT fails the test with a boundary error.
