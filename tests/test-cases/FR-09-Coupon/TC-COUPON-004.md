# TC-COUPON-004: Reject coupon application when coupon is expired

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Decision Table & Boundary Value Analysis

## Priority
High

## Preconditions
- User is logged in to a valid customer account (e.g., `test@eshop.com` / `Test1234!`).
- Active JWT Token is present in the `Authorization` header.
- Coupon `"EXPIRED"` exists in database with an expiration date in the past (`expired_at` = 2020-01-01).

## Test Data
| Field | Value |
|-------|-------|
| code | "EXPIRED" |
| total_amount | 200000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `400 Bad Request`
- Response JSON should contain:
  - `error`: `"Mã giảm giá đã hết hạn"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case validates the negative partition of condition C2 (Còn hạn sử dụng = F) using the coupon code `"EXPIRED"`.
- The order amount of `200,000` ₫ is chosen because it exceeds the coupon's threshold (`100,000` ₫), isolating the expiration rule from the minimum order amount rule.
