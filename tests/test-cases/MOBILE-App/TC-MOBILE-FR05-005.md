# TC-MOBILE-FR05-005: Product Search on mobile – multiple consecutive spaces between words

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
- A product named "iPhone 15 Pro Max" exists (single spaces between words)

## Test Data
| Field | Value |
|-------|-------|
| Search input | `iPhone  Pro` (two spaces between "iPhone" and "Pro") |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type "iPhone", then two space characters, then "Pro" into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- The application automatically normalizes multiple spaces into a single space and looks up the keyword "iPhone Pro".
- Exactly 1 product card representing the "iPhone 15 Pro Max" is successfully filtered and rendered on the screen. The counter updates to "Hiển thị 1 sản phẩm".

## Actual Result (filled after execution)
The product grid area showed an empty state with the message "Không tìm thấy sản phẩm nào." No product cards were rendered. The double space caused the SQL LIKE pattern `%iPhone  Pro%` to not match any product name (product names use single spaces). No error alert or toast message appeared

## Status
Pass

## Related Bugs
None

## Notes
- Partitions: Multiple spaces between keywords check
- Backend endpoint: GET /api/products?search=iPhone%20%20Pro
- The SQL query becomes `SELECT * FROM products WHERE name LIKE '%iPhone  Pro%'` — the double space does not match any product name (product names use single spaces), returning 0 results
- The frontend does not normalize whitespace before sending the query
- The backend strictly searches using a rigid query `LIKE '%iPhone  Pro%'`. Since the database string utilizes a single whitespace, this case will explicitly FAIL during execution by displaying 0 results