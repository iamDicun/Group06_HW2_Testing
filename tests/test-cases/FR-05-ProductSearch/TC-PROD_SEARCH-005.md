# TC-PROD_SEARCH-005: Search with special characters (EP)

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
| Search | `@#$` |

## Test Steps
1. Navigate to the Home page
2. Clear the search input
3. Enter `@#$` into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
Empty product list is displayed. The special characters are treated as a literal search string; no product name matches

## Actual Result (filled after execution)
Empty product list was displayed. The special characters were treated as a literal search string; no product name matched

## Status
Pass

## Related Bugs
None

## Notes
- Partition: search input with special characters
- Verifies how system handles plain special characters. It should return an empty product list gracefully without throwing SQL errors