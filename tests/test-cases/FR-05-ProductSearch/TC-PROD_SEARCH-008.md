# TC-PROD_SEARCH-008: Search with uppercase/lowercase variation (EP)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- Products are seeded in the database (5 products, including "iPhone 15 Pro Max")
- User is on the Home page with the search bar is visible

## Test Data
| Field | Case Variation | Value |
|-------|----------------|-------|
| Search | All lowercase | `iphone` |
| Search | All uppercase | `IPHONE` |
| Search | Mixed case | `iPhONe` |

## Test Steps
For each value in the Test Data table:
1. Navigate to the Home page
2. Clear the search input
3. Enter the case variation value
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
All three case variations (`iphone`, `IPHONE`, `iPhONe`) return exactly 1 product: iPhone 15 Pro Max. The search must be case-insensitive

## Actual Result (filled after execution)
All three case variations (`iphone`, `IPHONE`, `iPhONe`) returned exactly 1 product: iPhone 15 Pro Max

## Status
Pass

## Related Bugs
None

## Notes
- SQLite LIKE is case-insensitive for ASCII characters by default
- The product name "iPhone 15 Pro Max" uses mixed case in the database
- All case permutations of the same letters produce identical results