# TC-PROD_SEARCH-003: Search with trailing spaces (EP)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Products are seeded in the database (5 products)
- User is on the Home page where the search bar is visible

## Test Data
| Field | Value |
|-------|-------|
| Search | `iPhone ` (1 trailing space after "iPhone") |
| Search | `iPhone  ` (2 trailing spaces after "iPhone") |

## Test Steps
For each value in the Test Data table:
1. Navigate to the Home page
2. Clear the search input
3. Enter the value into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
1 product is displayed (iPhone 15 Pro Max). The system ignores trailing whitespace(s) before performing the search

## Actual Result (filled after execution)
1 product was displayed (iPhone 15 Pro Max). The system ignored trailing whitespace(s) before performing the search

## Status
Pass

## Related Bugs
None

## Notes
- Partition: search input with trailing whitespace
- Backend does not trim the search query before building the SQL LIKE pattern
- Trailing spaces act as significant characters in the search