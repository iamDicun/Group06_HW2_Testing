# TC-AUTOMATION-FR-08-011

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Gửi total_amount = 0 → backend tính lại đúng

## Test Type
Negative

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ
- total_amount = 0 (giả mạo)

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ
3. Navigate tới checkout
4. Interceptor request, sửa total_amount thành 0
5. Gửi request thanh toán
6. Kiểm tra kết quả

## Expected Result
- Backend bỏ qua total_amount = 0
- Backend tự tính lại tổng tiền đúng
- Thanh toán thành công với đúng số tiền

## Automation Feasibility
Partially Automatable

## Notes
- Network interception cần thiết
