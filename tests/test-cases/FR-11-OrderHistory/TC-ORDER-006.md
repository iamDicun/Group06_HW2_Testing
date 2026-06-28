# TC-ORDER-006: Ensure Incomplete/Abandoned Checkout Carts Do Not Render in Order History (EP)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User has an active account and is logged into the application
- User has items added inside the shopping cart page (`/cart`) but has NOT clicked the final payment confirmation button

## Test Data
| Field | Action State | Context |
|-------|--------------|---------|
| Checkout State | `Abandoned / Incomplete` | User closed browser or left checkout midway |

## Test Steps
1. Navigate to the Login page and log in with the test account
2. Add a product worth 4.000.000 ₫ into the shopping cart
3. Click "Tiến hành thanh toán" to enter the `/checkout` interface layout
4. Immediately navigate to `/profile` and look at the section "Lịch sử đơn hàng" (Order History)
5. Scan the complete list of orders rendered on the screen.

## Expected Result
- The abandoned/incomplete checkout session must not create a record in the Order History screen.
- The history list must only display past successfully placed orders. No dummy, zero-id rows, or pending draft orders from the active session should populate this UI grid.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: Invalid data partition validation check (Ensuring temporary session data does not leak into finalized transaction databases)
- Backend Guardrail: This test verifies that the server-side database insertion query is strictly isolated inside the final checkout commit controller, preventing phantom ghost orders from cluttering the customer profile