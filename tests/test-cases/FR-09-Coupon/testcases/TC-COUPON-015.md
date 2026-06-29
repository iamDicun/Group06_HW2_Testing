# TC-COUPON-015: Pairwise Case 8 — Reject non-existent expired percent coupon

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Pairwise Testing (Domain Testing)

## Priority
Medium

## Preconditions
- User is logged in to a valid customer account (e.g., `test@eshop.com` / `Test1234!`).
- Active JWT Token is present in the `Authorization` header.

## Test Data
| Field | Value |
|-------|-------|
| code | "INVALID99" |
| total_amount | 400000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `404 Not Found` (Reject - A3)
- Response JSON should contain:
  - `error`: `"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This is Pairwise Case 8: C1=F, C2=F, C3=T, C4=T, C5=T, C6=percent.
- Since the coupon does not exist, the SUT will reject it immediately with a `404 Not Found` error.
