# TC-PROD_SEARCH-001: Search with multiple partial keywords (EP)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
Product Search / Functional / Equivalence Paritioning

## Priority
Medium

## Preconditions
- Products are seeded in the database (5 products: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, AirPods Pro 2, Keychron Q1)
- User is on the Home page where the search bar is visible

## Test Data
| Field | Value | 
|-------|----------| 
| Search | `iphone pro` | 

## Test Steps
1. Navigate to the Home page
2. Clear the search input
3. Enter `iphone pro` into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
- Since the system only supports rigid database LIKE: The system looks for the literal string in database, since there are none it will return an empty list gracefully without throwing error

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: Valid input/ multi-keyword non-consecutive partial search
- This case explicitly tests the flexibility of the search algorithm. This helps determine the true capabilities of the backend implementation