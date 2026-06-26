# TC-ORDER-006: Cancel order — state changes to "Đã hủy" and button hidden (EP)

## Requirement ID
FR-11

## Feature
Order History — State change after cancellation

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
| Order status before | `pending` → label "Chờ xác nhận" |
| Order status after | `canceled` → label "Đã hủy" |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Cancel a pending order by clicking "Hủy đơn"
4. After the alert confirms success, observe the updated order list

## Expected Result
1. The cancelled order's status label changes from "Chờ xác nhận" to "Đã hủy"
2. The status badge color changes from yellow (`bg-yellow-100 text-yellow-800`) to red (`bg-red-100 text-red-800`)
3. The "Hủy đơn" button is no longer displayed for that order
4. Attempting to cancel the same order again via API returns: `{"error":"Cannot cancel this order."}`

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: state transition from "pending" to "canceled"
- Status label mapping (Profile.jsx:96-105): `pending → "Chờ xác nhận"`, `canceled → "Đã hủy"`
- Status style mapping (Profile.jsx:82-92): `pending → yellow`, `canceled → red`
- Frontend hides the cancel button when `status === "canceled"` (Profile.jsx:198)
- Backend blocks re-cancellation of already canceled orders (server.js:329)
