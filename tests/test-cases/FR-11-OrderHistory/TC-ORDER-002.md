# TC-ORDER-002: Order history date display and newest-first sorting (EP)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- User has an account with at least two (2) orders created at different times
- User is logged in and currently on the profile interface

## Test Data
| Field | Value |
|-------|-------|
| Order 1 created_at | `2026-06-25 10:00:00` (yesterday) |
| Order 2 created_at | `2026-06-26 15:43:06` (today) |

## Test Steps
1. Navigate to the Login page and login with the account
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) table
4. Verify the sorting order of the list
5. Observe the text format in date column for each order

## Expected Result
- Orders are sorted with the newest first, followed by the older order created yesterday
- Dates are formatted using the browser locale
- Time should also be displayed in the order date column

## Actual Result (filled after execution)
- Orders were sorted with the newest first, followed by the older order created yesterday with dates were displayed using the browser locale format
- The date column didn't display time

## Status
Fail

## Related Bugs
None

## Notes
- Partition: Valid chronological sorting algorithm verification
- Backend query: `ORDER BY id DESC` (server.js:314), ensuring higher incremental IDs are pushed to the top of the array
- Frontend: `new Date(o.created_at).toLocaleDateString()` (Profile.jsx:185), handles string rendering to present a human-readable date format on interface
