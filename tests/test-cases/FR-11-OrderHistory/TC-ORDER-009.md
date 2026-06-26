# TC-ORDER-009: Cancel order with "Đã xác nhận" (confirmed) status (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel confirmed order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is logged in
- User has at least 1 order with status "confirmed" ("Đã xác nhận")

## Test Data
| Field | Value |
|-------|-------|
| Order status | `confirmed` |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Locate the confirmed order in the order history table
4. Observe the "Hủy đơn" button is visible
5. Click the "Hủy đơn" button

## Expected Result
The cancellation succeeds: alert "Hủy đơn thành công!" is shown and the order status changes to "Đã hủy". Confirmed orders can be cancelled (backend only blocks "delivered" and "canceled").

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order with "confirmed" status
- Frontend shows the cancel button for confirmed orders (Profile.jsx:198)
- Backend allows cancellation for confirmed orders (server.js:329) — only delivered/canceled are blocked
- There is a code comment (server.js:328): "Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')" suggesting the intended behavior was to block cancellation for non-pending/non-confirmed orders, but the actual implementation is more permissive
