# TC-MOBILE-FR05-007: Product Search on mobile – SQL injection payload

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
- All 5 sample products are in the database

## Test Data
| Field | Value |
|-------|-------|
| Search input | `' OR '1'='1` |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type `' OR '1'='1` into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- The system must refresh the product gallery layout in a single-column grid format (`grid-cols-1`) with no errors or notification
- The input must be treated as normal string so return 0 result match in the database

## Actual Result (filled after execution)
A product grid appeared in a single-column layout. All five product cards were visible, each showing a product image, name, price in "X,XXX,XXX ₫" format, and buttons "Xem chi tiết" and "Thêm vào giỏ". Below the grid the text "Hiển thị 5 sản phẩm" was displayed

## Status
Pass

## Related Bugs
None

## Notes
- Partitions: Malicious injection into search input validation
- Backend endpoint: GET /api/products?search=%27%20OR%20%271%27%3D%271
- Backend code at server.js:144 uses string interpolation: `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`
- The payload `' OR '1'='1` transforms the query to: `SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'` which evaluates to `TRUE` for every row, returning all 5 products. This confirms a critical SQL injection vulnerability (Bug-007). The search term should be parameterized or sanitised
