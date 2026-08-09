# TC-AUTOMATION-FR-08-005

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Tổng tiền không cho phép chỉnh sửa (readonly/disabled)

## Test Type
Negative

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ
3. Navigate tới checkout
4. Kiểm tra total amount field không editable

## Expected Result
- Total amount hiển thị nhưng không thể chỉnh sửa
- Field readonly, disabled, hoặc không phải input editable

## Automation Feasibility
Automatable

## Notes
- Kiểm tra attribute readonly/disabled hoặc element type
