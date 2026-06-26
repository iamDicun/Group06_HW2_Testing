# TC-PROD_SEARCH-008: Search with multiple consecutive spaces (EP)

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
| Search | `iPhone  Pro` (double space between words) |

## Test Steps
1. Navigate to `http://localhost:5173/`
2. Enter `iPhone` followed by two spaces then `Pro` into the search input
3. Click the "Tìm" (Search) button

## Expected Result
Empty product list is displayed. No product name contains double consecutive spaces.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input containing multiple consecutive spaces between words
- Whitespace normalization is not applied before querying
