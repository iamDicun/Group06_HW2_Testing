# TC-AUTOMATION-FR-08-010

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Thanh toán với sản phẩm có số lượng > 1

## Test Type
Positive

## Priority
Medium

## Preconditions
- User đã đăng nhập
- Sản phẩm trong giỏ có số lượng > 1

## Test Data Requirements
- Email + password hợp lệ
- Sản phẩm với số lượng >=2

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm với số lượng > 1 vào giỏ
3. Navigate tới checkout
4. Kiểm tra tổng tiền = đơn giá × số lượng
5. Thanh toán thành công

## Expected Result
- Tổng tiền tính đúng theo số lượng
- Đơn giá hiển thị × số lượng = thành tiền

## Automation Feasibility
Automatable

## Notes
- Verify quantity multiplication trong total
