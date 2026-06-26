# TC-ORDER-008: Prevent cancellation when order is "Đã hủy" (canceled) (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel already-canceled order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is logged in
- User has at least 1 order with status "canceled" ("Đã hủy")

## Test Data
| Field | Value |
|-------|-------|
| Order status | `canceled` |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Locate the canceled order in the order history table
4. Observe the "Thao tác" (Actions) column

## Expected Result
The "Hủy đơn" (Cancel) button is **not** displayed for the already-canceled order. The actions cell is empty.

Additionally, if the cancel API is called directly:
`PUT /api/orders/{id}/cancel` → returns `{"error":"Cannot cancel this order."}` with HTTP 400.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order with "canceled" status
- Frontend condition: button hidden when `status === "canceled"` (Profile.jsx:198)
- Backend condition: blocks cancellation when `status === "canceled"` (server.js:329)
- Both frontend and backend consistently prevent re-cancellation
