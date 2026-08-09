# TC-AUTOMATION-FR-14-011

Student ID: 23127031
Generated At: 2026-08-10T02:31:54+00:00

## Functional Requirement
FR-14

## Test Case Name
Thêm danh mục với ký tự đặc biệt

## Test Type
Edge

## Priority
Low

## Preconditions
- Admin đã đăng nhập

## Test Data Requirements
- Tên danh mục chứa ký tự đặc biệt: "Danh mục @#$%"

## Test Steps
1. Đăng nhập admin
2. Navigate tới trang quản lý danh mục
3. Nhập tên danh mục chứa ký tự đặc biệt
4. Click nút "Thêm"
5. Kiểm tra danh mục được thêm hoặc bị từ chối

## Expected Result
- Nếu chấp nhận: danh mục xuất hiện đúng với ký tự đặc biệt
- Nếu từ chối: hiển thị lỗi validation hợp lệ

## Automation Feasibility
Automatable
