# TC-AUTOMATION-FR-02-009

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập khi tài khoản đang bị khóa

## Test Type
Negative

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/
- Tài khoản đã bị khóa (đăng nhập sai >= 3 lần trước đó)

## Test Data Requirements
- Email hợp lệ (tài khoản đang bị khóa)
- Password đúng

## Test Steps
1. Mở trang login
2. Nhập email hợp lệ vào trường Email
3. Nhập password đúng vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra phản hồi

## Expected Result
- Đăng nhập thất bại dù password đúng
- Hiển thị thông báo lỗi phù hợp

## Automation Feasibility
Partially Automatable

## Notes
- Cần thực hiện 3 lần đăng nhập sai trước để kích hoạt khóa
- Kiểm tra thông báo lockout trên UI
