# TC-AUTOMATION-FR-08-003

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Hiển thị danh sách sản phẩm đặt mua trên checkout

## Test Type
Positive

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ
- Ít nhất 1 sản phẩm trong giỏ

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ
3. Navigate tới checkout
4. Kiểm tra danh sách sản phẩm hiển thị

## Expected Result
- Danh sách sản phẩm hiển thị đầy đủ
- Mỗi sản phẩm có tên, số lượng, đơn giá

## Automation Feasibility
Automatable

## Notes
- Kiểm tra DOM elements cho từng sản phẩm
