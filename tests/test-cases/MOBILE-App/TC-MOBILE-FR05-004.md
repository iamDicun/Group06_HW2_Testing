# TC-MOBILE-FR05-004: Product Search on mobile – trailing spaces

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
- A product named "iPhone 15 Pro Max" exists in the database

## Test Data
| Field | Value |
|-------|-------|
| Search input | `iPhone  ` (two trailing space after "iPhone") |

## Test Steps
1. Open Chrome DevTools and activate responsive mode (375×812)
2. Navigate to the Home page where the search bar is visible
3. Type "iPhone" followed by two space character into the search input field
4. Click the "Tìm" button
5. Wait for results to load and observe

## Expected Result
- The application automatically trims the two trailing spaces and safely executes the filtered query for "iPhone"
- Exactly 1 product card representing the "iPhone 15 Pro Max" must be successfully rendered on the screen. The counter displays "Hiển thị 1 sản phẩm"

## Actual Result (filled after execution)

## Status
Not Run

## Related Bugs
None

## Notes
- Partitions: keyword with trailing spaces
- Backend endpoint: GET /api/products?search=iPhone%20
- The SQL query becomes `SELECT * FROM products WHERE name LIKE '%iPhone  %'` - return 0 result
- The trailing space is semantically meaningful in SQL LIKE patterns. The frontend does not trim the input before sending