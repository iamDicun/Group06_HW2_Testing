# TC-PROD_SEARCH-001: Search with boundary values for query length (Boundary Value Analysis)

## Requirement ID
FR-05

## Feature
Product Listing & Search — Query length boundaries

## Module / Test Type / Technique
Product Search / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- Products are seeded in the database (5 products: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, AirPods Pro 2, Keychron Q1)
- User is on the Home page

## Test Data
| Field | Boundary | Value |
|-------|----------|-------|
| Search | Length 0 (empty) | `` (empty string) |
| Search | Length 1 (minimum meaningful) | `a` |
| Search | Length 2 (min+1) | `ai` |
| Search | Length 3 | `Pro` |
| Search | Long string | `a` repeated 500 times |
| Search | Number | `15` |
| Search | Character with number | `S24` |

## Test Steps
For each boundary value above:
1. Navigate to the Home page
2. Clear the search input
3. Enter the boundary value into the search input
4. Click the "Tìm" (Search) button
5. Observe the result

## Expected Result
- `Length 0` (empty): All 5 products displayed (no filtering applied)
- `Length 1` (`a`): 4 products displayed (iPhone, Samsung, MacBook, AirPods — names containing 'a')
- `Length 2` (`ai`): 1 product displayed (Tai nghe AirPods Pro 2 — "ai" match in name)
- `Length 3` (`Pro`): 3 products displayed (iPhone 15 Pro Max, MacBook Pro M3, AirPods Pro 2)
- `Long string` (500×`a`): Empty product list (no match), no error occured
- `Number` (`15`): 1 product displayed (iPhone 15 Pro Max)
- `Character with number` (`S24`): 1 product displayed (Samsung Galaxy S24 Ultra)

## Actual Result (filled after execution)
- `Length 0` (empty): All 5 products displayed
- `Length 1` (`a`): 4 products displayed in total (iPhone 15 Pro Max, Samsung Galaxy S24 Ultra)
- `Length 2` (`ai`): 1 product displayed (Tai nghe AirPods Pro 2)
- `Length 3` (`Pro`): 3 products displayed (iPhone 15 Pro Max, MacBook Pro M3, AirPods Pro 2)
- `Long string` (500×`a`): Empty product list (no match) with no error
- `Number` (`15`): 1 product displayed (iPhone 15 Pro Max)
- `Character with number` (`S24`): 1 product displayed (Samsung Galaxy S24 Ultra)

## Status
Not Run

## Related Bugs
None

## Notes
- No minimum or maximum length validation is enforced by either frontend or backend
- The search input has no `minlength` or `maxlength`
- Empty string skips the WHERE clause entirely (server.js:152)
- Long strings (500+ chars) are accepted without truncation or error
