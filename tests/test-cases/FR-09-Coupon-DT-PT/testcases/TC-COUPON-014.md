# TC-COUPON-014: Pairwise Case 7 — Reject non-existent percent coupon when user is not logged in

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional & Security / Pairwise Testing (Domain Testing)

## Priority
Medium

## Preconditions
- User is NOT logged in.
- No JWT Token is sent in the `Authorization` header.

## Test Data
| Field | Value |
|-------|-------|
| code | "INVALID99" |
| total_amount | 400000 |
| user_id | null |

## Test Steps
1. Do not log in. Leave the `Authorization` header empty.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body.
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
- This is Pairwise Case 7: C1=F, C2=T, C3=T, C4=F, C5=T, C6=percent.
- Although C4=F (not logged in), the coupon code does not exist in the database (C1=F). In the SUT, the exist check occurs first, resulting in the `"Mã giảm giá không tồn tại..."` error.
