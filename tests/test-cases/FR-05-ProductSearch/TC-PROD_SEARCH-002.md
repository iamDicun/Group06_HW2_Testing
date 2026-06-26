# TC-PROD_SEARCH-006: Search with leading spaces (EP)

## Requirement ID
FR-05

## Feature
Product Listing & Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning (Domain Testing)

## Priority
Medium

## Preconditions
- Products are seeded in the database (5 products)
- User is on the Home page

## Test Data
| Field | Value |
|-------|-------|
| Search | ` iPhone` (leading space before "iPhone") |

## Test Steps
1. Navigate to the Home page
2. Enter a single space followed by `iPhone` into the search input
3. Click the "Tìm" (Search) button

## Expected Result
Exactly 1 matching product (iPhone 15 Pro Max) is displayed. The system ignores leading whitespace before performing the search.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input with leading whitespace
- Backend does not trim the search query before building the SQL LIKE pattern
- Leading spaces act as significant characters in the search
