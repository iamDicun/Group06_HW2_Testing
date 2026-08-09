# TC-AUTOMATION-FR-02-002

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập thất bại - email không tồn tại

## Test Type
Negative

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/

## Test Data Requirements
- Email chưa đăng ký trong hệ thống
- Password bất kỳ

## Test Steps
1. Mở trang login
2. Nhập email chưa đăng ký vào trường Email
3. Nhập password bất kỳ vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra thông báo lỗi

## Expected Result
- Đăng nhập thất bại
- Hiển thị thông báo lỗi chung (không lộ nguyên nhân)
- Không tiết lộ "tài khoản không tồn tại"

## Automation Feasibility
Automatable

## Notes
- Thông báo lỗi phải chung chung, không phân biệt sai email hay sai password
