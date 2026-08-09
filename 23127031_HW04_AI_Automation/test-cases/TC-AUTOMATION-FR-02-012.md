# TC-AUTOMATION-FR-02-012

Student ID: 23127031
Generated At: 2026-08-09T21:30:54+00:00

## Functional Requirement
FR-02

## Test Case Name
Kiểm tra field email có type="email"

## Test Type
Positive

## Priority
Medium

## Preconditions
- Trang login hiển thị tại http://localhost:5173/

## Test Data Requirements
- Không cần test data cụ thể

## Test Steps
1. Mở trang login
2. Tìm field Email trên form
3. Kiểm tra attribute type của field Email

## Expected Result
- Field Email có attribute type="email"
- Browser áp dụng HTML5 email validation khi submit

## Automation Feasibility
Automatable

## Notes
- Kiểm tra DOM attribute trực tiếp
- Đảm bảo tuân thủ yêu cầu HTML5 specification
