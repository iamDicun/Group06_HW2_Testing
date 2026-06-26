# TC-ORDER-002: Order history date formatting and sorting (EP & BVA)

## Requirement ID
FR-11

## Feature
Order History — Date display and sort order

## Module / Test Type / Technique
ORDER / Functional / Equivalence Partitioning & Boundary Value Analysis

## Priority
Medium

## Preconditions
- User is logged in
- User has at least 2 orders created on different dates (e.g., one today and one yesterday)

## Test Data
| Field | Value |
|-------|-------|
| Order 1 created_at | `2026-06-25 10:00:00` (yesterday) |
| Order 2 created_at | `2026-06-26 15:43:06` (today) |

## Test Steps
1. Log in to the application
2. Navigate to `/profile`
3. Observe the "Lịch sử đơn hàng" (Order History) table

## Expected Result
1. Orders are sorted with the newest first (descending by `ORDER BY id DESC`)
2. Dates are formatted using the browser locale (e.g., `new Date("2026-06-26 15:43:06").toLocaleDateString()` → e.g., "6/26/2026" for en-US or "26/6/2026" for vi-VN)
3. The date column displays only the date portion (no time)

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- EP: date displayed as locale date string
- EP: sorting by newest first
- BVA: orders on the same day — the one with higher ID (newer) appears first
- Backend query: `ORDER BY id DESC` (server.js:314)
- Frontend: `new Date(o.created_at).toLocaleDateString()` (Profile.jsx:185)
