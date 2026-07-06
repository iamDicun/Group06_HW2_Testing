# TC-COUPON-012: Pairwise Case 5 — Reject fixed coupon when user usage limit is exceeded

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Pairwise Testing (Domain Testing)

## Priority
High

## Preconditions
- User is logged in to a valid customer account (e.g., `test@eshop.com` / `Test1234!`).
- Active JWT Token is present in the `Authorization` header.
- Coupon `"BIGBUY"` exists and is active (min_order_amount = 500,000 ₫, fixed).
- Current user has already used this coupon once.

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
- HTTP Status Code: `400 Bad Request` (Reject - A3)
- Response JSON should contain:
  - `error`: `"Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This is Pairwise Case 5: C1=T, C2=T, C3=T, C4=T, C5=F, C6=fixed.
