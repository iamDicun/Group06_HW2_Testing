# TC-AUTOMATION-FR-02-007

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Đăng nhập - email không đúng format HTML5

## Test Type
Negative

## Priority
Medium

## Preconditions
- Trang login hiển thị tại http://localhost:5173/

## Test Data Requirements
- Email không hợp lệ (ví dụ: "invalid-email", "test@", "@test.com", "test.com")
- Password: bất kỳ

## Test Steps
1. Mở trang login
2. Nhập email không đúng format vào trường Email (ví dụ: "invalid-email")
3. Nhập password bất kỳ vào trường Password
4. Nhấn nút "Đăng nhập"
5. Kiểm tra HTML5 email validation

## Expected Result
- Không cho phép đăng nhập
- Field Email có type="email"
- HTML5 browser validation chặn submit với email không hợp lệ

## Automation Feasibility
Automatable

## Notes
- Kiểm tra HTML5 validation message từ browser
