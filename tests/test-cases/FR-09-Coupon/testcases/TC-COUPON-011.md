# TC-COUPON-011: Pairwise Case 4 — Reject fixed coupon when user is not logged in

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional & Security / Pairwise Testing (Domain Testing)

## Priority
High

## Preconditions
- User is NOT logged in (guest).
- No JWT Token is sent in the `Authorization` header.
- Coupon `"BIGBUY"` exists and is active (min_order_amount = 500,000 ₫, fixed).

## Test Data
| Field | Value |
|-------|-------|
| code | "BIGBUY" |
| total_amount | 500001 |
| user_id | null |

## Test Steps
1. Do not log in. Leave the `Authorization` header empty.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `401 Unauthorized` or `403 Forbidden` (Reject - A3)
- The application should deny applying the coupon.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This is Pairwise Case 4: C1=T, C2=T, C3=T, C4=F, C5=T, C6=fixed.
- **Known SUT Security Vulnerability:** The SUT route `POST /api/apply-coupon` is missing the `authenticateToken` middleware. When no `Authorization` header or `user_id` is provided, the SUT still responds with `200 OK` and applies the discount (A2 instead of A3), allowing guests to apply fixed coupons and bypass usage tracking.
