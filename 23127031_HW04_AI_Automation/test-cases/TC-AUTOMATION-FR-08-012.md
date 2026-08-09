# TC-AUTOMATION-FR-08-012

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Thanh toán với giỏ hàng trống

## Test Type
Negative

## Priority
Medium

## Preconditions
- User đã đăng nhập
- Giỏ hàng trống

## Test Data Requirements
- Email + password hợp lệ

## Test Steps
1. Đăng nhập
2. Đảm bảo giỏ hàng trống
3. Navigate tới checkout
4. Kiểm tra hành vi

## Expected Result
- Không cho phép thanh toán
- Hiển thị thông báo giỏ hàng trống hoặc redirect

## Automation Feasibility
Automatable

## Notes
- Kiểm tra empty cart state
