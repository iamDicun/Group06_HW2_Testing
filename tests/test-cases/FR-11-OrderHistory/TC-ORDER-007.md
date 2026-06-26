# TC-ORDER-007: Prevent cancellation when order is "Đã giao" (delivered) (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel delivered order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is logged in
- User has at least 1 order with status "delivered" ("Đã giao")

## Test Data
| Field | Value |
|-------|-------|
| Order status | `delivered` |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Locate the delivered order in the order history table
4. Observe the "Thao tác" (Actions) column

## Expected Result
The "Hủy đơn" (Cancel) button is **not** displayed for the delivered order. The actions cell is empty.

Additionally, if the cancel API is called directly:
`PUT /api/orders/{id}/cancel` → returns `{"error":"Cannot cancel this order."}` with HTTP 400.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order with "delivered" status
- Frontend condition: button hidden when `status === "delivered"` (Profile.jsx:198)
- Backend condition: blocks cancellation when `status === "delivered"` (server.js:329)
- Both frontend and backend consistently prevent cancellation of delivered orders
