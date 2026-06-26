# TC-ORDER-005: Cancel order with "Chờ xác nhận" (pending) status (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel pending order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is logged in
- User has at least 1 order with status "pending" ("Chờ xác nhận")

## Test Data
| Field | Value |
|-------|-------|
| Order status | `pending` |
| Order id | (any pending order ID) |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Locate the pending order in the order history table
4. Verify the "Hủy đơn" (Cancel) button is visible
5. Click the "Hủy đơn" button
6. Confirm the action in the alert dialog

## Expected Result
- The "Hủy đơn" button is visible for the pending order
- After clicking, an alert shows "Hủy đơn thành công!" (Cancel successful)
- The order status changes to "Đã hủy" (canceled)
- The "Hủy đơn" button is no longer visible for the canceled order

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order with "pending" status
- Frontend button visibility: shown when `status !== "delivered" && status !== "canceled"` (Profile.jsx:198)
- Backend: `PUT /api/orders/:id/cancel` sets status to "canceled" (server.js:334)
- The frontend re-fetches orders after cancel to refresh the list
