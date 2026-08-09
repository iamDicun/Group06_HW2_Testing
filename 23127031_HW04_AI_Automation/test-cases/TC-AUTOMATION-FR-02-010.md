# TC-AUTOMATION-FR-02-010

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập thành công trả về JWT Token hợp lệ

## Test Type
Positive

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/
- Tài khoản hợp lệ tồn tại trong hệ thống

## Test Data Requirements
- Email hợp lệ đã đăng ký
- Password đúng tương ứng

## Test Steps
1. Mở trang login
2. Nhập email hợp lệ vào trường Email
3. Nhập password đúng vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra JWT token được lưu trong client storage

## Expected Result
- Đăng nhập thành công
- JWT Token được lưu trong localStorage hoặc sessionStorage
- Token có cấu trúc hợp lệ (header.payload.signature)

## Automation Feasibility
Automatable

## Notes
- Kiểm tra token presence trong browser storage
- Không cần decode JWT, chỉ kiểm tra format cơ bản