# TC-AUTOMATION-FR-08-004

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Tổng tiền hiển thị đúng theo giỏ hàng

## Test Type
Positive

## Priority
High

## Preconditions
- User đã đăng nhập
- Giỏ hàng có sản phẩm

## Test Data Requirements
- Email + password hợp lệ
- Sản phẩm với đơn giá và số lượng cụ thể

## Test Steps
1. Đăng nhập
2. Thêm sản phẩm vào giỏ (ghi nhớ đơn giá × số lượng)
3. Navigate tới checkout
4. Kiểm tra tổng tiền hiển thị

## Expected Result
- Tổng tiền = Σ (đơn giá × số lượng) của tất cả sản phẩm
- Tổng tiền hiển thị đúng trên giao diện

## Automation Feasibility
Partially Automatable

## Notes
- Cần tính toán expected total từ test data
- So sánh giá trị hiển thị với giá trị tính toán
