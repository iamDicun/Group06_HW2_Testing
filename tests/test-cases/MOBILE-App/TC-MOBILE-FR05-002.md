# TC-MOBILE-FR05-002: Product Search on mobile – standard valid string (EP)

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
- Products exist with names containing "Pro": "iPhone 15 Pro Max", "MacBook Pro M3", "Tai nghe AirPods Pro 2"

## Test Data
| Field | Value |
|-------|-------|
| Search input | `Pro` |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type "Pro" into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- A product grid appears in a single-column layout. Three product cards are visible: "iPhone 15 Pro Max", "MacBook Pro M3", and "Tai nghe AirPods Pro 2". Each card shows a product image, name, price in "X,XXX,XXX ₫" format, and buttons "Xem chi tiết" and "Thêm vào giỏ"
- Below the grid the text "Hiển thị 3 sản phẩm" is displayed. No error messages appear

## Actual Result (filled after execution)

## Status
Not Run

## Related Bugs
Bug-006 – XSS due to dangerouslySetInnerHTML on search results

## Notes
- Backend endpoint: GET /api/products?search=Pro
The backend uses `SELECT * FROM products WHERE name LIKE '%Pro%'` (case-insensitive MySQL default for `VARCHAR` with `utf8mb4_unicode_ci` collation)
- The search term "Pro" is rendered in the frontend via `dangerouslySetInnerHTML`, highlighting matched substrings in bold (`<b>Pro</b>`)
- On mobile the Tailwind grid uses `grid-cols-1` so all 3 products stack vertically
