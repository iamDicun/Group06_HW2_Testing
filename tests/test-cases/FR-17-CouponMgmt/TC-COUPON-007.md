# TC-COUPON-007: Apply coupon with leading/trailing spaces (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Whitespace handling

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The coupon "SAVE10" exists in the database
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | ` SAVE10` (leading space) |
| total_amount | 500000 |

## Test Steps
1. Navigate to the Checkout page using the browser (not via direct API)
2. Enter ` SAVE10` with a leading space into the coupon code input
3. Click the "Áp dụng" (Apply) button

## Expected Result
Success — coupon applied. The frontend trims whitespace via `.trim().toUpperCase()` before sending, converting ` SAVE10` → `SAVE10`.

However, if a code with leading spaces is sent directly to the API (bypassing frontend), the backend returns: `{"error":"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"}` because the backend does not trim the code before querying.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon code with leading or trailing whitespace
- Frontend (Checkout.jsx) applies `.trim()` before sending to API
- Backend (server.js:370) does NOT trim — the exact string including spaces is used in the SQL query
- Users with accidental spaces will still succeed via the frontend
- Direct API consumers are affected by the lack of backend trimming
