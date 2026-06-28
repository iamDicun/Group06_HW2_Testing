# TC-PROD_SEARCH-001: Search with boundary values for query length (Boundary Value Analysis)

## Requirement ID
FR-05

## Feature
Product Listing and Search — Query length boundaries

## Module / Test Type / Technique
Product Search / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- Products are seeded in the database (5 products: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, AirPods Pro 2, Keychron Q1)
- User is on the Home page where the search bar is visible

## Test Data
| Field | Boundary | Value |
|-------|----------|-------|
| Search | Length 0 (empty) | `` (empty string) |

## Test Steps
For each boundary value above:
1. Navigate to the Home page
2. Clear the search input
3. Leave the search input completely empty
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
- The page shows all products by default without any errors and filter

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Boundary: The minimum posible length is 0 character
- Used to verify if the system can handle empty input gracefully without throwing an error