# TC-PROD_SEARCH-002: Search with leading spaces (EP)

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
| Search | ` iPhone` (1 leading space before "iPhone") |
| Search | `  iPhone` (2 leading spaces bẻo "iPhone") |

## Test Steps
For each value in the Test Data table:
1. Navigate to the Home page
2. Clear the search input
3. Enter the value into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
Exactly 1 matching product (iPhone 15 Pro Max) is displayed. The system ignores leading whitespace(s) before performing the search.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input with leading whitespace
- Backend does not trim the search query before building the SQL LIKE pattern
- Leading spaces act as significant characters in the search