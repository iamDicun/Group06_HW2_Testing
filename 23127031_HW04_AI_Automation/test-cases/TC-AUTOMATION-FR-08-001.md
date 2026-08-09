# TC-AUTOMATION-FR-08-001

Student ID: 23127031
Generated At: 2026-08-10T01:34:01+00:00

## Functional Requirement
FR-08

## Test Case Name
Chưa đăng nhập → không access checkout page

## Test Type
Negative

## Priority
High

## Preconditions
- User chưa đăng nhập
- Trang checkout có URL riêng (ví dụ: /checkout)

## Test Data Requirements
- Không cần (chưa login)

## Test Steps
1. Mở browser, chưa đăng nhập
2. Truy cập trực tiếp URL /checkout
3. Kiểm tra hành vi redirect

## Expected Result
- Không access được checkout page
- Redirect về trang login hoặc trang chủ

## Automation Feasibility
Automatable

## Notes
- Kiểm tra URL sau redirect
