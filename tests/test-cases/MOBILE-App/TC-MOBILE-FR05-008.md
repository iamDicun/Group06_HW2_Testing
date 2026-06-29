# TC-MOBILE-FR05-008: Product Search on mobile – Unicode / Vietnamese characters

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
- A product named "Bàn phím cơ Keychron Q1" exists in the database

## Test Data
| Field | Value |
|-------|-------|
| Search input | `phím` |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type "phím" into the search input field (using a Vietnamese keyboard)
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- A product grid appears in a single-column layout. One product card is visible: "Bàn phím cơ Keychron Q1" showing product image, name, price in "X,XXX,XXX ₫" format, and buttons "Xem chi tiết" and "Thêm vào giỏ"
- Below the grid the text "Hiển thị 1 sản phẩm" is displayed
- The accented character "í" in the search term is rendered correctly on screen

## Actual Result (filled after execution)
A product grid appeared in a single-column layout. One product card was visible: "Bàn phím cơ Keychron Q1" (4,000,000 ₫) showing product image, name, price in "X,XXX,XXX ₫" format, and buttons "Xem chi tiết" and "Thêm vào giỏ". Below the grid the text "Hiển thị 1 sản phẩm" was displayed. The accented character "í" was rendered correctly on screen. No error messages appeared

## Status
Pass

## Related Bugs
None

## Notes
- Partitions: Vietnamese characters
- Backend endpoint: GET /api/products?search=ph%C3%ADm
- The database uses `utf8mb4_unicode_ci` collation, which supports Unicode characters including Vietnamese diacritics
- The SQL query `SELECT * FROM products WHERE name LIKE '%phím%'` matches "Bàn phím cơ Keychron Q1".
- The frontend sends the URL-encoded Unicode string and the browser natively handles UTF-8 input and display
