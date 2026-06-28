# TC-ORDER-004: Order history pagination (EP)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Low

## Preconditions
- User is logged in and currently on the Profile interface
- User has an account with more than 10 orders (e.g., 15 orders placed)

## Test Data
| Field | Value |
|-------|-------|
| Number of orders | `15` |

## Test Steps
1. Navigate to the Login page and log in with test account
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) section

## Expected Result
All 15 orders are displayed in a single table without any data truncation. There is no limit, page selector, "Load more" button, or scroll pagination.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: valid high-volume order list with more items than a typical page threshold (10+)
- The frontend (Profile.jsx) does not implement pagination UI
- The backend (`GET /api/orders/my-orders`, server.js:311-319) does not implement LIMIT/OFFSET
- The server naturally fetches and delivers all records in one response
