# TC-COUPON-006: Reject coupon application when user is not logged in (Security & Auth check)

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Security & Functional / Decision Table

## Priority
High

## Preconditions
- User is a guest/visitor and is NOT logged in.
- No JWT Token is sent in the `Authorization` header.
- Coupon `"SAVE10"` exists and is active.

## Test Data
| Field | Value |
|-------|-------|
| code | "SAVE10" |
| total_amount | 500000 |
| user_id | null |

## Test Steps
1. Do not log in. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, leaving the `Authorization` header empty.
2. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `401 Unauthorized` or `403 Forbidden`
- Response JSON should refuse coupon calculation.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case validates the negative partition of condition C4 (Đã đăng nhập = F).
- **Known SUT Security Vulnerability:** The SUT route `POST /api/apply-coupon` is missing the `authenticateToken` middleware. When no `Authorization` header or `user_id` is provided, the SUT still responds with `200 OK` and applies the discount, allowing unauthenticated guests to bypass usage limits.
