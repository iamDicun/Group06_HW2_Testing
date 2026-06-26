# TC-ORDER-011: Cancel non-existent order (EP)

## Requirement ID
FR-11

## Feature
Order History — Cancel non-existent order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- User is logged in
- The order ID 9999 does not exist in the database

## Test Data
| Field | Value |
|-------|-------|
| Order ID | 9999 |

## Test Steps
1. Log in to the application
2. Send a PUT request to `http://localhost:3000/api/orders/9999/cancel` with the auth token
3. Observe the response

## Expected Result
The API returns: `{"error":"Order not found"}` with HTTP 404. No order is modified.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: cancel action on an order ID that does not exist
- Backend (server.js:325): `if (!order) return res.status(404).json({ error: "Order not found" })`
- The frontend does not have a UI path to cancel a non-existent order directly
