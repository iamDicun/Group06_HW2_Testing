# TC-AUTOMATION-FR-14-008

Student ID: 23127031
Generated At: 2026-08-10T02:31:54+00:00

## Functional Requirement
FR-14

## Test Case Name
Thêm danh mục chỉ chứa khoảng trắng — bị từ chối

## Test Type
Negative

## Priority
Medium

## Preconditions
- Admin đã đăng nhập

## Test Data Requirements
- Tên danh mục: "   " (spaces only)

## Test Steps
1. Đăng nhập admin
2. Navigate tới trang quản lý danh mục
3. Nhập tên danh mục chỉ có khoảng trắng
4. Click nút "Thêm"
5. Kiểm tra validation

## Expected Result
- Không thêm được danh mục
- Hiển thị lỗi validation tên không được để trống

## Automation Feasibility
Automatable
