# TC-AUTOMATION-FR-02-011

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Thông báo lỗi không lộ chi tiết nguyên nhân

## Test Type
Negative

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/

## Test Data Requirements
- Email hợp lệ đã đăng ký + password sai
- Email không tồn tại + password bất kỳ

## Test Steps
1. Mở trang login
2. Đăng nhập với email đúng + password sai
3. Kiểm tra nội dung thông báo lỗi
4. Đăng nhập với email không tồn tại + password bất kỳ
5. Kiểm tra nội dung thông báo lỗi
6. So sánh hai thông báo lỗi

## Expected Result
- Cả hai trường hợp hiển thị cùng một thông báo lỗi chung
- Thông báo không chứa: "sai mật khẩu", "tài khoản không tồn tại", "email không hợp lệ"
- Thông báo chung chung kiểu "Thông tin đăng nhập không chính xác"

## Automation Feasibility
Automatable

## Notes
- Kiểm tra text content của error message
- Đảm bảo tính nhất quán của thông báo lỗi