# TC-COUPON-004: Apply non-existent or invalid coupon code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Invalid code validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `NONEXISTENT` |
| total_amount | 500000 |

## Test Steps
1. Navigate to the Checkout page
2. Enter a non-existent coupon code (e.g., `NONEXISTENT`) into the input
3. Click the "Áp dụng" (Apply) button

## Expected Result
Error message displayed: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" (Coupon code does not exist or has been deactivated).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon code that does not exist in the database
- Same error is returned for deactivated coupons (`is_active = 0`)
- Any string that doesn't match an active coupon code in the DB falls into this partition
- Special characters (e.g., `<script>`, `SAVE10!`) are treated as non-existent codes, not sanitized differently
