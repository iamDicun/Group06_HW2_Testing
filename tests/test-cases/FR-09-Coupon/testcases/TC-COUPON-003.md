# TC-COUPON-003: Reject coupon application when coupon code does not exist or is inactive

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

## Test Data
| Field | Value |
|-------|-------|
| code | "INVALID99" |
| total_amount | 300000 |
| user_id | 1 |

## Test Steps
1. Log in to get the JWT Token.
2. Send a `POST` request to `/api/apply-coupon` with the test data in the JSON body, including the `Authorization: Bearer <token>` header.
3. Verify the HTTP response status code and JSON payload.

## Expected Result
- HTTP Status Code: `404 Not Found`
- Response JSON should contain:
  - `error`: `"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This test case validates the negative partition of condition C1 (Mã tồn tại và hoạt động = F) using a non-existent code (`"INVALID99"`).
