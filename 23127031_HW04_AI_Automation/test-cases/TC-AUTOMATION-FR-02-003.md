# TC-AUTOMATION-FR-02-003

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập thất bại - email đúng, password sai

## Test Type
Negative

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/
- Tài khoản hợp lệ tồn tại trong hệ thống

## Test Data Requirements
- Email hợp lệ đã đăng ký
- Password sai

## Test Steps
1. Mở trang login
2. Nhập email hợp lệ vào trường Email
3. Nhập password sai vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra thông báo lỗi

## Expected Result
- Đăng nhập thất bại
- Hiển thị thông báo lỗi chung
- Không tiết lộ "mật khẩu không đúng"

## Automation Feasibility
Automatable

## Notes
- Thông báo lỗi phải giống nhau cho mọi loại sai thông tin
