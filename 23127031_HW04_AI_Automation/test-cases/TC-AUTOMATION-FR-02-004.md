# TC-AUTOMATION-FR-02-004

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập - email để trống

## Test Type
Negative

## Priority
Medium

## Preconditions
- Trang login hiển thị tại http://localhost:5173/

## Test Data Requirements
- Email: empty string
- Password: bất kỳ

## Test Steps
1. Mở trang login
2. Để trống trường Email
3. Nhập password bất kỳ vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra thông báo lỗi hoặc validation

## Expected Result
- Không cho phép đăng nhập
- Hiển thị thông báo lỗi hoặc HTML5 validation message
- Field Email hiển thị validation error

## Automation Feasibility
Automatable

## Notes
- Kiểm tra cả HTML5 required attribute và thông báo lỗi UI
