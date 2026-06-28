# TC-REGISTER-003: Đăng ký tài khoản với Họ Tên rỗng

## Requirement ID
FR-01

## Feature
Đăng ký tài khoản

## Module / Test Type / Technique
Register / Functional / Negative / Boundary Value Analysis

## Priority
High

## Preconditions
- Người dùng đang ở trang Đăng ký tài khoản.

## Test Data
| Field | Value |
|---|---|
| name | "" |
| email | newuser_003@domain.com |
| password | Password123! |
| confirm_password | Password123! |

## Test Steps
1. Truy cập trang Đăng ký tài khoản.
2. Nhập Họ Tên: "" (để trống hoặc chỉ chứa khoảng trắng).
3. Nhập Email: "newuser_003@domain.com"
4. Nhập Mật khẩu: "Password123!"
5. Nhập Xác nhận mật khẩu: "Password123!"
6. Nhấn nút "Đăng ký".

## Expected Result
- Hệ thống chặn hành động và hiển thị thông báo lỗi yêu cầu nhập Họ Tên ở trên nút submit.
- Phản hồi từ Backend API (nếu được gửi) là mã lỗi HTTP 400 Bad Request kèm thông điệp báo lỗi.

## Actual Result (filled after execution)
- Chưa thực thi.

## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm tra biên dưới độ dài Họ Tên (length = 0).
