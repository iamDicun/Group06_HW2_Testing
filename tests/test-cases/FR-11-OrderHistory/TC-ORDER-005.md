# TC-ORDER-005: Verify Newly Placed Order Renders Correctly in Order History (EP)

## Requirement ID
FR-11

## Feature
Order History

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- User has an active account and is logged into the website
- User has successfully placed a new order

## Test Data
| Field | Value |
|-------|-----------------------|
| Total Amount | `4.000.000 ₫` |
| Status Badge | `Chờ xử lý` (or Pending) |

## Test Steps
1. Navigate to the Login page and log in with the test account
2. Complete a standard checkout flow to create a fresh order with a total of 4.000.000 ₫
3. Navigate to `/profile` and look at section named "Lịch sử đơn hàng" (Order History)
4. Locate the topmost row/card in the transaction list
5. Verify the visible fields: Order ID, Creation Date, Total Price, and Order Status

## Expected Result
- The newly created order must instantly appear at the top of the history list without requiring a manual page hard-reload
- The displayed Order ID must match exactly, the total amount must show proper localized currency formatting (`4.000.000 ₫`), and the status badge must clearly render as "Chờ xác nhận" (or Pending) with correct theme colors

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: Valid standard active data partition layout render check
- UX Check: Verifies that the frontend fetches the fresh relational rows from the database successfully after a complete checkout redirection event