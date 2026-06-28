# TC-MOBILE-FR05-009: Product Search on mobile – uppercase / lowercase (case sensitivity)

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
- A product named "iPhone 15 Pro Max" exists in the database (mixed case)

## Test Data
| Field | Value |
|-------|-------|
| Search input | `IPHONE` |
| Search input | `iphone` |
| Search input | `iPhONe` |

## Test Steps
For each test data value:
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type the data value into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- A product grid appears in a single-column layout. One product card is visible: "iPhone 15 Pro Max" showing product image, name, price in "X,XXX,XXX ₫" format, and buttons "Xem chi tiết" and "Thêm vào giỏ"
- Below the grid the text "Hiển thị 1 sản phẩm" is displayed. No error messages appear

## Actual Result (filled after execution)

## Status
Not Run

## Related Bugs
Bug-006 – XSS vulnerability detected due to dangerouslySetInnerHTML handling on search response layers

## Notes
- Parritions: ext casing format validation (Case-insensitivity stability check)
- Backend endpoint: GET /api/products?search=IPHONE
The SQL query `SELECT * FROM products WHERE name LIKE '%IPHONE%'` matches "iPhone 15 Pro Max" because MySQL's default collation `utf8mb4_unicode_ci` is case-insensitive
- The backend search is case-insensitive, which is expected user-facing behaviour
- The frontend renders the original product name (with original casing) in search results.
