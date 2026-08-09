# TC-AUTOMATION-FR-02-008

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Tài khoản bị khóa sau 3 lần đăng nhập sai liên tiếp

## Test Type
Negative

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/
- Tài khoản chưa bị khóa
- Bộ đếm failed login = 0

## Test Data Requirements
- Email hợp lệ đã đăng ký
- Password sai (dùng cho 3 lần liên tiếp)

## Test Steps
1. Mở trang login
2. Nhập email hợp lệ vào trường Email
3. Nhập password sai vào trường Password
4. Nhấn nút "Đăng nhập" — lần 1
5. Nhập password sai vào trường Password
6. Nhấn nút "Đăng nhập" — lần 2
7. Nhập password sai vào trường Password
8. Nhấn nút "Đăng nhập" — lần 3
9. Kiểm tra thông báo tài khoản bị khóa

## Expected Result
- Sau lần thứ 3 đăng nhập sai, tài khoản bị khóa
- Hiển thị thông báo lỗi phù hợp
- Không thể đăng nhập lại trong thời gian khóa

## Automation Feasibility
Automatable

## Notes
- Chỉ kiểm tra hành vi khóa tài khoản sau 3 lần sai
- Kiểm tra thông báo hiển thị trên UI