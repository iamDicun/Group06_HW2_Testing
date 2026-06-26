# TC-COUPON-001: Apply coupon with empty code (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Empty coupon code validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `` (empty string) |
| total_amount | 500000 |

## Test Steps
1. Navigate to the Checkout page
2. Leave the coupon code input empty
3. Click the "Áp dụng" (Apply) button

## Expected Result
The "Áp dụng" button is disabled (frontend validation: `!couponCode.trim()` returns true). No API call is made.

Alternatively, if sending an empty code directly via API, the backend returns: `{"error":"Vui lòng nhập mã giảm giá"}` with HTTP 400.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Frontend: Checkout.jsx checks `if (!couponCode.trim()) return;` before calling the API
- Backend: server.js:366 returns error if `!code`
- Partition: empty/whitespace-only coupon code
