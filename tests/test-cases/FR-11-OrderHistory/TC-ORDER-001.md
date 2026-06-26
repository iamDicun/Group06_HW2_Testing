# TC-ORDER-001: Order history empty state — user has 0 orders (EP)

## Requirement ID
FR-11

## Feature
Order History — Empty state display

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- User is logged in (e.g., `test@eshop.com` / `Test1234!`)
- User has never placed any orders

## Test Data
| Field | Value |
|-------|-------|
| Orders count | 0 |

## Test Steps
1. Log in as a user with no orders
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) section

## Expected Result
The message "Bạn chưa có đơn hàng nào." (You have no orders yet) is displayed. No table or order rows are rendered.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: zero orders (empty list)
- Frontend condition: `orders.length === 0` renders empty state paragraph (Profile.jsx:169)
- Backend returns `[]` from `GET /api/orders/my-orders`
