# TC-AUTOMATION-FR-08-009

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Thanh toán với nhiều sản phẩm (>=3)

## Test Type
Positive

## Priority
Medium

## Preconditions
- User đã đăng nhập
- Giỏ hàng có >=3 sản phẩm khác nhau

## Test Data Requirements
- Email + password hợp lệ
- >=3 sản phẩm với đơn giá và số lượng khác nhau

## Test Steps
1. Đăng nhập
2. Thêm >=3 sản phẩm vào giỏ
3. Navigate tới checkout
4. Kiểm tra danh sách sản phẩm đầy đủ
5. Kiểm tra tổng tiền đúng
6. Thanh toán thành công
7. Kiểm tra giỏ hàng trống

## Expected Result
- Tất cả sản phẩm hiển thị trên checkout
- Tổng tiền đúng = Σ (đơn giá × SL)
- Thanh toán thành công, giỏ hàng xóa

## Automation Feasibility
Automatable

## Notes
- Test coverage cho multi-item checkout
