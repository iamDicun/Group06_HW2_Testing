# TC-PROD_SEARCH-004: Search with multiple consecutive spaces (EP)

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
- User is on the Home page with the search bar is visible

## Test Data
| Field | Value |
|-------|-------|
| Search | `iPhone  15` (double space between words) |

## Test Steps
1. Navigate to Home page
2. Clear the search input
3. Enter `iPhone` followed by two spaces then `15` into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
The system should automatically normalize the search query by collapsing multiple consecutive spaces into a single space (converting "iPhone  Pro" to "iPhone Pro"). And exactly 1 product displayed (iPhone 15 Pro Max)

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input containing multiple consecutive spaces between words
- Whitespace normalization is not applied before querying