# TC-PROD_SEARCH-009: Search with special characters (EP)

## Requirement ID
FR-05

## Feature
Product Listing & Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Products are seeded in the database (5 products)
- User is on the Home page

## Test Data
| Field | Value |
|-------|-------|
| Search | `<script>alert(1)</script>` |

## Test Steps
1. Navigate to `http://localhost:5173/`
2. Enter `<script>alert(1)</script>` into the search input
3. Click the "Tìm" (Search) button

## Expected Result
Empty product list is displayed. The special characters are treated as a literal search string; no product name matches, and no script executes (no stored XSS since the value is only sent to the API and not persisted).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input with HTML/script special characters
- The frontend reflects the search term via `dangerouslySetInnerHTML` (Home.jsx:64), but this is client-side only and the script tag is only in React state, not a stored payload
- No sanitization or encoding is applied, but no XSS vulnerability is exploitable via search alone
