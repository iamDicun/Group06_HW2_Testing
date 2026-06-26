# TC-COUPON-003: Apply coupon exceeded usage limit (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Usage limit validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- The coupon "SAVE10" has `max_uses_per_user = 1` in the database
- User has already used coupon "SAVE10" once (record exists in coupon_usage table for this user)
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `SAVE10` |
| total_amount | 500000 |
| user_id | 1 |

## Test Steps
1. Navigate to the Checkout page
2. Enter `SAVE10` into the coupon code input
3. Click the "Áp dụng" (Apply) button

## Expected Result
Error message displayed: "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)" (You have used this code 1 time, reached the limit).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon usage count at or above max_uses_per_user
- Usage check only runs if `user_id` is provided in the request (server.js:386-414)
- If no `user_id` is provided, the usage limit is not enforced
