# TC-ORDER-010: Cancel order with "Đang giao" (shipping) status (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel shipping order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User is logged in
- User has at least 1 order with status "shipping" ("Đang giao")

## Test Data
| Field | Value |
|-------|-------|
| Order status | `shipping` |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Locate the shipping order in the order history table
4. Observe the "Hủy đơn" button is visible
5. Click the "Hủy đơn" button

## Expected Result
The cancellation succeeds: alert "Hủy đơn thành công!" is shown and the order status changes to "Đã hủy". Shipping orders can be cancelled (backend only blocks "delivered" and "canceled").

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order with "shipping" status
- Frontend shows the cancel button for shipping orders (Profile.jsx:198)
- Backend allows cancellation for shipping orders (server.js:329)
- Code comment (server.js:328) suggests the intended restriction should be stricter: cancellation should only be allowed for "pending" and "confirmed", not for "shipping" — this is a **potential bug** where the backend is more permissive than intended
