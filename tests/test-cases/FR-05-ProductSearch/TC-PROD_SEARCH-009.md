# TC-PROD_SEARCH-009: Search with valid partial keyword (EP)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
Product Search / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Products are seeded in the database (5 products: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, AirPods Pro 2, Keychron Q1)
- User is on the Home page where the search bar is visible

## Test Data
| Field | Value |
|-------|----------|
| Search | `Pro` |
| Search | `15` |
| Search | `S24` |

## Test Steps
For each value in the Test Data table:
1. Navigate to the Home page
2. Clear the search input
3. Enter the specific value into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the result

## Expected Result
- Searching `pro` or `15` must display the "iPhone 15 Pro Max"
- Searching `s24` must display the "Samsung Galaxy S24 Ultra"
The system should not require the exact full name to return the relevant products

## Actual Result (filled after execution)
- Searching `pro` or `15` displayed the "iPhone 15 Pro Max"
- Searching `s24` displayed the "Samsung Galaxy S24 Ultra"

## Status
Pass

## Related Bugs
- Bug-006: Stored/Reflected XSS via dangerouslySetInnerHTML on search views
- Bug-007: Critical SQL Injection vulnerability due to raw string interpolation

## Notes
- Valid input/ Partial match string (covers alphanumeric, numeric, and text sub-strings)
- Verifies that SQL query uses the correct wildcard format instead of an exact match