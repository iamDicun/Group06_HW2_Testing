# TC-COUPON-010: Pairwise Case 3 — Reject when order amount is below minimum threshold and usage limit is exceeded

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
- Coupon `"SAVE10"` exists and is active (min_order_amount = 300,000 ₫, percent).
- Current user has already used this coupon once.

## Test Data
| Field | Value |
|-------|-------|
| code | "SAVE10" |
| total_amount | 200000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `400 Bad Request` (Reject - A3)
- Response JSON should contain:
  - `error`: `"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This is Pairwise Case 3: C1=T, C2=T, C3=F, C4=T, C5=F, C6=percent.
- **SUT Execution Notes:** The SUT validates order threshold (`C3`) before checking usage limit (`C5`), hence the expected message is about the order amount threshold.
