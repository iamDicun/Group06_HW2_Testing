# TC-COUPON-007: Reject coupon application when user has exceeded usage limit

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Decision Table

## Priority
High

## Preconditions
- User is logged in to a valid customer account (e.g., `test@eshop.com` / `Test1234!`).
- Active JWT Token is present in the `Authorization` header.
- Coupon `"SAVE10"` exists and is active with `max_uses_per_user` = 1.
- Current user has already checked out an order using this coupon before (simulated by having a record in `coupon_usage` table for coupon_id and user_id).

## Test Data
| Field | Value |
|-------|-------|
| code | "SAVE10" |
| total_amount | 500000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Ensure there is a recorded usage for this coupon by the user (either by performing a checkout with this coupon first, or by verifying the mock database has a row in `coupon_usage`).
3. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
4. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `400 Bad Request`
- Response JSON should contain:
  - `error`: `"Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case validates the negative partition of condition C5 (Chưa dùng hết lượt = F).
