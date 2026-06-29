# TC-MOBILE-FR05-006: Product Search on mobile – special characters (HTML injection)

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
Mobile App / Functional / Equivalence Partitioning

## Priority
High

## Preconditions
- The user is on the mobile search page
- Viewport is set to 375×812 (iPhone SE) via Chrome DevTools device emulation

## Test Data
| Field | Value |
|-------|-------|
| Search input | `<script>alert(1)</script>` |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type `<script>alert(1)</script>` into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- The product grid area shows an empty state. A message "Không tìm thấy sản phẩm nào" or similar empty-state text is displayed
- No product cards are rendered. No JavaScript dialog (alert box) appears. No error toast or alert message is shown. The page does not redirect or break

## Actual Result (filled after execution)
The product grid area showed an empty state with the message "Không tìm thấy sản phẩm nào." No product cards were rendered. No JavaScript dialog (alert box) appeared. The page did not redirect or break. The `<script>` tag was treated as a literal search string by the backend and matched zero products. No error toast or alert message was shown

## Status
Pass

## Related Bugs
Bug-006 – XSS due to dangerouslySetInnerHTML on search results

## Notes
- Partitions: Malicious script injection / Cross-Site Scripting (XSS) payload
- Backend endpoint: GET /api/products?search=%3Cscript%3Ealert(1)%3C%2Fscript%3E
- Backend returns 0 results because no product name matches the literal `<script>alert(1)</script>` string (the SQL LIKE treats `<`, `>` as literal characters).
- Although 0 results are returned, the frontend renders the search term via `dangerouslySetInnerHTML` when results exist — this is a latent XSS vulnerability (Bug-006). However, with 0 results the search term is not rendered via that code path
- No server-side input sanitization or escaping is performed on the search term
- Even with 0 results returned, if the frontend echoes back the search term inside the "No products found for..." label using `dangerouslySetInnerHTML`, the XSS payload will still execute directly on the browser