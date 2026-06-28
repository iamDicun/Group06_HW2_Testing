# TC-MOBILE-FR05-001: Product Search on mobile – empty string

## Requirement ID
FR-05

## Feature
Product Listing and Search

## Module / Test Type / Technique
Mobile App / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- The user is on the mobile search page
- Viewport is set to 375×812 (iPhone SE) via Chrome DevTools device emulation
- All 5 sample products are in the database

## Test Data
| Field | Boundary | Value |
|-------|-------|-------|
| Search input | min | (empty string) |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Leave the input empty
4. Click the "Tìm" button
5. Observe the interface and result

## Expected Result
- The system must refresh the product gallery layout in a single-column grid format (`grid-cols-1`) optimized for mobile screens. No error popups, toast notifications, or red validation hints should appear
- All 5 product cards are visible, each showing a product image, name, price in "X,XXX,XXX ₫" format, and action buttons "Xem chi tiết" and "Thêm vào giỏ"
- Below the grid the text "Hiển thị 5 sản phẩm" is displayed. No error messages or validation hints appear on the screen

## Actual Result (filled after execution)

## Status
Not Run

## Related Bugs
Bug-006 – XSS due to dangerouslySetInnerHTML on search results

## Notes
- Lower boundary validation check (Min length = 0)
- Backend endpoint: GET /api/products?search=
Returns all 5 products because the SQL query becomes `SELECT * FROM products WHERE name LIKE '%%'` which matches every row
- The input field has no `minlength` or `maxlength` attribute. No client-side validation is performed before sending the request
- On mobile viewport the page uses Tailwind `grid-cols-1` (single column)
