# TC-PROD_SEARCH-006: Search with SQL Injection and XSS payload (EP)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
PROD_SEARCH / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- Products are seeded in the database (5 products)
- User is on the Home page with the search bar is visible

## Test Data
| Field | Value | Type |
|-------|-------|
| Search | `' OR '1'='1` | SQL Injection Payload |
| Search | `<script>alert(1)</script>` | XSS Payload |

## Test Steps
For each specific payload value in the Test Data table:
1. Navigate to the Home page
2. Clear the search input
3. Enter the specific payload into the search input
4. Click the "Tìm" (Search) button or press Enter
5. Observe the system behavior and the results displayed on the screen

## Expected Result
- For SQL Injection Payload: The backend must handle the input strictly as a literal text string. The system should not execute the raw SQL command or bypass the `WHERE` clause logic. In this case, the system must return an empty list
- For XSS Payload: The system must properly sanitize or HTML-encode the input. It should not execute the Javascript code on the browser. The payload must either be rendered safely as plain test and return empty list as search result

## Actual Result (filled after execution)
- For SQL Injection: The result returned all 5 products
- For XSS Payload: The search returned 0 result with keyword is indicated as empty

## Status
Fail

## Related Bugs
None

## Notes
- Partition: Security testing/ Malicious payload input
- Backend Vulnerability: The backend currently constructs the database query using unsafe string interpolation (`server.js:144`): `` `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'` ``. This represents a critical security vulnerability due to the total lack of parameterized queries.
- Frontend Vulnerability: The frontend (`Home.jsx:64`) reflects the search term on the interface using `dangerouslySetInnerHTML` without any prior sanitization or encoding. 
- Security Audit Note: Although this input is handled as client-side React state (making a full Reflected XSS attack harder to exploit standalone without URL parameter binding), using `dangerouslySetInnerHTML` without sanitization is an extremely dangerous coding practice (Bad Practice) that should be refactored.