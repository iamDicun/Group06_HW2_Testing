# TC-AUTOMATION-FR-14-003

Student ID: 23127031
Generated At: 2026-08-10T02:31:54+00:00

## Functional Requirement
FR-14

## Test Case Name
Thêm danh mục với tên rỗng — bị từ chối

## Test Type
Negative

## Priority
High

## Preconditions
- Admin đã đăng nhập
- Trang quản lý danh mục hiển thị

## Test Data Requirements
- Tên danh mục: empty string ""

## Test Steps
1. Đăng nhập admin
2. Navigate tới trang quản lý danh mục
3. Để trống trường tên danh mục
4. Click nút "Thêm" / "Add"
5. Kiểm tra thông báo lỗi hoặc validation

## Expected Result
- Không thêm được danh mục rỗng
- Hiển thị thông báo lỗi validation
- Danh sách danh mục không thay đổi

## Automation Feasibility
Automatable
