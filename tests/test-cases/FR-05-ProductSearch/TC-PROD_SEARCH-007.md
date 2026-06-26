# TC-PROD_SEARCH-011: Search with Unicode / Vietnamese characters (EP)

## Requirement ID
FR-05

## Feature
Product Listing & Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Products are seeded in the database (5 products, including "Bàn phím cơ Keychron Q1")
- User is on the Home page

## Test Data
| Field | Value |
|-------|-------|
| Search | `phím` |

## Test Steps
1. Navigate to `http://localhost:5173/`
2. Enter `phím` (Vietnamese characters) into the search input
3. Click the "Tìm" (Search) button

## Expected Result
1 product is displayed: "Bàn phím cơ Keychron Q1". The Vietnamese characters are correctly handled by the SQLite LIKE query.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input with Unicode/Vietnamese characters
- SQLite handles UTF-8 characters correctly in LIKE queries
- Search term is URL-encoded by the browser before being sent to the API
