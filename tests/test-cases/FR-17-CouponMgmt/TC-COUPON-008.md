# TC-COUPON-008: Apply coupon with non-numeric total_amount (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — total_amount validation

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The coupon "SAVE10" exists in the database
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `SAVE10` |
| total_amount | `abc` (non-numeric string) |

## Test Steps
1. Send a POST request to `http://localhost:3000/api/apply-coupon` with the above test data (bypassing frontend)
2. Observe the response

## Expected Result
The backend returns: `{"error":"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"}`. The comparison `"abc" > 300000` evaluates to `false` in JavaScript, so it falls to the minimum-order error.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: non-numeric total_amount value
- No type validation is performed on total_amount before the comparison
- The same behavior occurs for: missing total_amount, null, undefined, negative values
- Frontend uses `<input type="number">` which prevents non-numeric input at the browser level
