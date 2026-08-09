# TC-AUTOMATION-FR-14-009

Student ID: 23127031
Generated At: 2026-08-10T02:31:54+00:00

## Functional Requirement
FR-14

## Test Case Name
Thêm danh mục với tên dài (boundary)

## Test Type
Edge

## Priority
Low

## Preconditions
- Admin đã đăng nhập

## Test Data Requirements
- Tên danh mục rất dài (100+ ký tự)

## Test Steps
1. Đăng nhập admin
2. Navigate tới trang quản lý danh mục
3. Nhập tên danh mục dài (100+ ký tự)
4. Click nút "Thêm"
5. Kiểm tra kết quả

## Expected Result
- Nếu chấp nhận: danh mục được thêm
- Nếu từ chối: hiển thị lỗi validation độ dài

## Automation Feasibility
Automatable
