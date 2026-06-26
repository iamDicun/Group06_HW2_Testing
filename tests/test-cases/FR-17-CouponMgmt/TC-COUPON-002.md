# TC-COUPON-002: Apply expired coupon code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Expired coupon validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- The coupon "EXPIRED" exists in the database with `expired_at = 2020-01-01` (past date)
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `EXPIRED` |
| total_amount | 200000 |

## Test Steps
1. Navigate to the Checkout page
2. Enter `EXPIRED` into the coupon code input
3. Click the "Áp dụng" (Apply) button

## Expected Result
Error message displayed: "Mã giảm giá đã hết hạn" (Coupon has expired).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon code past its expiration date
- The expiry check runs after the minimum order check (server.js:380)
- The coupon passes min order check (200000 > 100000) but fails the expiry check
