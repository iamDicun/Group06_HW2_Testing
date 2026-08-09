# TC-AUTOMATION-FR-02-013

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Token JWT được lưu và gửi kèm request xác thực

## Test Type
Positive

## Priority
High

## Preconditions
- Trang login hiển thị tại http://localhost:5173/
- Tài khoản hợp lệ tồn tại trong hệ thống
- Có endpoint yêu cầu xác thực để test

## Test Data Requirements
- Email hợp lệ đã đăng ký
- Password đúng tương ứng

## Test Steps
1. Mở trang login
2. Đăng nhập với email + password hợp lệ
3. Kiểm tra JWT token được lưu trong storage
4. Thực hiện request đến endpoint cần xác thực
5. Kiểm tra header Authorization được gửi kèm

## Expected Result
- JWT Token được lưu sau đăng nhập
- Token được gửi trong header `Authorization: Bearer <token>`
- Request xác thực thành công

## Automation Feasibility
Partially Automatable

## Notes
- Cần có endpoint cần xác thực để test đầy đủ
- Kiểm tra token presence trong storage là bước cơ bản
- Kiểm tra header request cần network interception