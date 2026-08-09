# TC-AUTOMATION-FR-08-006

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Backend bỏ qua total_amount do client gửi lên

## Test Type
Negative

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ
- total_amount giả mạo (khác với thực tế)

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ
3. Navigate tới checkout
4. Interceptor request thanh toán, sửa total_amount
5. Gửi request với total_amount giả mạo
6. Kiểm tra backend xử lý

## Expected Result
- Backend bỏ qua total_amount từ client
- Backend tự tính lại tổng tiền đúng
- Thanh toán thành công với đúng tổng tiền thực tế

## Automation Feasibility
Partially Automatable

## Notes
- Cần network interception để sửa request payload
