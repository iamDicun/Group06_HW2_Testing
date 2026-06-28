# TC-ORDER-001: View Order History with 0 Order (BVA - Minimum Boundary)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Boundary Value Analysis (BVA)

## Priority
High

## Preconditions
- User is logged in and currently on the profile interface
- A user account exists with exactly zero(0) orders in the database

## Test Data
| Field | Boundary | Value |
|-------|-------|-------|
| Total Orders | Minimum valid order | `0` |

## Test Steps
1. Navigate to the Login page
2. Log in with the 0-order account
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) section

## Expected Result
- The message "Bạn chưa có đơn hàng nào." (You have no orders yet) is displayed. No table or order rows are rendered.
- The interface must not show any broken tables, or blank white screens left hanging

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: zero orders (empty list)
- Technical insight: The backend returns an empty array `[]` via `GET /api/orders/my-orders`. The frontend (`Profile.jsx:169`) detects `orders.length === 0` to trigger conditional rendering for this empty state paragraph instead of rendering the order history table rows.