# TC-MOBILE-FR05-003: Product Search on mobile – leading spaces

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
Mobile App / Functional / Equivalence Partitioning

## Priority
Medium

## Preconditions
- The user is on the mobile search page
- Viewport is set to 375×812 (iPhone SE) via Chrome DevTools device emulation
- Products exist whose names start without leading space

## Test Data
| Field | Value |
|-------|-------|
| Search input | "  iPhone" (two leading spaces before "iPhone") |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type two space characters followed by "iPhone" into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- TThe application client-side or backend controller must automatically apply a `.trim()` sanitization filter to strip away redundant leading whitespaces. It should look up the sanitized keyword "iPhone" and successfully filter out 1 product (iPhone 15 Pro Max)
- The single-column mobile product grid (`grid-cols-1`) must update dynamically to render exactly 1 matching item card representing the `iPhone 15 Pro Max`. The bottom counter text must update to: "Hiển thị 1 sản phẩm"

## Actual Result (filled after execution)

## Status
Not Run

## Related Bugs
Bug-006 – XSS vulnerability detected due to dangerouslySetInnerHTML handling on search response layers

## Notes
- Backend endpoint: GET /api/products?search=%20%20iPhone
- The SQL query becomes `SELECT * FROM products WHERE name LIKE '%  iPhone%'` — the leading space is treated as part of the search token and does not match any product name, returning 0 results
- The frontend likely does not trim the input before sending the request.
- No client-side validation warning about leading spaces is shown to the user
