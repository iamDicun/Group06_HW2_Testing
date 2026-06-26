# TC-PROD_SEARCH-010: Search with SQL Injection payload (EP)

## Requirement ID
FR-05

## Feature
Product Listing & Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Products are seeded in the database (5 products)
- User is on the Home page

## Test Data
| Field | Value |
|-------|-------|
| Search | `' OR '1'='1` |

## Test Steps
1. Navigate to `http://localhost:5173/`
2. Enter `' OR '1'='1` into the search input
3. Click the "Tìm" (Search) button

## Expected Result
All 5 products are displayed. The SQL injection payload breaks out of the LIKE string and injects `OR '1'='1'`, making the WHERE clause always true and returning all rows.

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Partition: search input containing SQL injection payload
- Backend constructs query via string interpolation (server.js:144): `` `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'` ``
- This is a **critical security vulnerability** — no input sanitization or parameterized queries
- Other SQL injection variants (`' OR 1=1--`, `'; DROP TABLE --`) also work
