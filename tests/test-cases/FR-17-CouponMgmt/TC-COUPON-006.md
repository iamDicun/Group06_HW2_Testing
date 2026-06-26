# TC-COUPON-006: Apply coupon with case sensitivity (EP)

## Requirement ID
FR-17

## Feature
Coupon Management — Case sensitivity

## Module / Test Type / Technique
COUPON / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The coupon "SAVE10" exists in the database (uppercase)
- User is on the Checkout page

## Test Data
| Field | Value |
|-------|-------|
| Code | `save10` (all lowercase) |
| total_amount | 500000 |

## Test Steps
1. Navigate to the Checkout page using the browser (not via direct API)
2. Enter `save10` (lowercase) into the coupon code input
3. Click the "Áp dụng" (Apply) button

## Expected Result
Success — coupon applied. The frontend automatically converts the code to uppercase via `.toUpperCase()` before sending to the API.

However, if the lowercase code `save10` is sent directly to the API (bypassing frontend), the backend returns: `{"error":"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"}` because the backend lookup is case-sensitive.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: coupon code in different case than stored value
- Frontend (Checkout.jsx) applies `.trim().toUpperCase()` before sending
- Backend (server.js:370) uses exact match: `WHERE code = ?` — case-sensitive
- Users typing lowercase codes will still succeed via the frontend
- Direct API consumers are affected by backend case sensitivity
