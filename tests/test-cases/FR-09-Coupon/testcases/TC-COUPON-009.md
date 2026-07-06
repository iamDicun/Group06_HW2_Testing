# TC-COUPON-009: Pairwise Case 2 — Reject when expired, below threshold, not logged in, and exceeded limit

## Requirement ID
FR-09

## Feature
Discount Coupons

## Module / Test Type / Technique
Coupon / Functional / Pairwise Testing (Domain Testing)

## Priority
Medium

## Preconditions
- User is a guest/visitor and is NOT logged in.
- No JWT Token is sent in the `Authorization` header.
- Coupon `"EXPIRED"` exists in database (expired_at: `2020-01-01`, min_order_amount = 100,000 ₫).
- Current user has already used this coupon once (simulated by having a record in `coupon_usage` table for coupon_id and user_id).

## Test Data
| Field | Value |
|-------|-------|
| code | "EXPIRED" |
| total_amount | 50000 |
| user_id | 1 |

## Test Steps
1. Do not log in. Leave the `Authorization` header empty.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `400 Bad Request` or `401 Unauthorized` (Reject - A3)
- Response JSON should indicate a failure (either unauthorized, order amount below minimum, or expired).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This is Pairwise Case 2: C1=T, C2=F, C3=F, C4=F, C5=F, C6=fixed.
- **SUT Execution Notes:** SUT checks `total_amount > min_order_amount` before `expired_at` checking, so it will return `"Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này"`. It also does not require authorization for applying coupons.
