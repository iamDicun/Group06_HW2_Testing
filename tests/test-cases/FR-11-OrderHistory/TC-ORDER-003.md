# TC-ORDER-003: Order history currency formatting (EP)

## Requirement ID
FR-11

## Feature
Order History — Currency display

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- User is logged in
- User has at least 1 order with a known total_amount (e.g., 131000000)

## Test Data
| Field | Value |
|-------|-------|
| total_amount | 131000000 |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Observe the "Tổng tiền" (Total) column in the order history table

## Expected Result
The total amount is formatted with locale-specific thousands separators and followed by " ₫". Example: `131,000,000 ₫` for en-US locale.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: total_amount with large value (>= 1 million)
- Frontend: `Number(o.total_amount || 0).toLocaleString() + " ₫"` (Profile.jsx:188)
- The `.toLocaleString()` output depends on the browser's locale setting
- For `total_amount = 0`: displays "0 ₫"
