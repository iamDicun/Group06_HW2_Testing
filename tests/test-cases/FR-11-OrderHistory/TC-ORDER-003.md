# TC-ORDER-003: Order history currency formatting (EP)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- User is logged in and currently on the Profile interface
- User has an account with at least 1 order with a known total_amount (e.g., 131000000)

## Test Data
| Field | Value |
|-------|-------|
| total_amount | `131000000` |

## Test Steps
1. navigate to Login page and log in with the test account
2. Navigate to `/profile`
3. Observe the "Tổng tiền" (Total) column in the order history table

## Expected Result
- The total amount must be beautifully formatted with appropriate thousand separators
- The currency unit symbol `₫` must be appended clearly after numeric digits

## Actual Result (filled after execution)
- The total amount was displayed appropriate thousand separators with currency unit symbol was appended correctly

## Status
Pass

## Related Bugs
None

## Notes
- Partition: valid large numeric data
- Frontend: converts raw integer using `Number(o.total_amount || 0).toLocaleString() + " ₫"` (Profile.jsx:188)
- The `.toLocaleString()` output depends on the browser's current active locale setting
- For `total_amount = 0`: displays "0 ₫"
