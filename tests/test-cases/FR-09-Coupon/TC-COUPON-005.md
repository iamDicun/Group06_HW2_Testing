# TC-COUPON-005: Reject coupon application when order amount is below minimum threshold

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
- Coupon `"SAVE10"` exists and is active with `min_order_amount` = 300,000 ₫.

## Test Data
| Field | Value |
|-------|-------|
| code | "SAVE10" |
| total_amount | 299999 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `400 Bad Request`
- Response JSON should contain:
  - `error`: `"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case validates the negative partition of condition C3 (Đủ ngưỡng đơn hàng = F) using the boundary value of `299,999` ₫ (which is `min_order_amount - 1`).
