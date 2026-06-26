# TC-PROD_SEARCH-007: Search with trailing spaces (EP)

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
| Search | `iPhone ` (trailing space after "iPhone") |

## Test Steps
1. Navigate to `http://localhost:5173/`
2. Enter `iPhone` followed by a space into the search input
3. Click the "Tìm" (Search) button

## Expected Result
1 product is displayed (iPhone 15 Pro Max). Unlike leading spaces, trailing spaces are tolerated because the product name starts with "iPhone" followed by a space, so `%iPhone %` still matches.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input with trailing whitespace
- SQLite LIKE pattern `%iPhone %` matches because the actual product name is "iPhone 15 Pro Max"
