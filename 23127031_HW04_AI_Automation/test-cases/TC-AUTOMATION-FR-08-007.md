# TC-AUTOMATION-FR-08-007

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Thanh toán thành công → giỏ hàng được xóa

## Test Type
Positive

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ
- Sản phẩm trong giỏ

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ
3. Navigate tới checkout
4. Xác nhận thanh toán
5. Kiểm tra giỏ hàng trống sau thanh toán

## Expected Result
- Thanh toán thành công
- Giỏ hàng được xóa (0 sản phẩm)
- Hiển thị xác nhận thanh toán

## Automation Feasibility
Automatable

## Notes
- Kiểm tra cart badge/counter = 0 hoặc cart page trống
