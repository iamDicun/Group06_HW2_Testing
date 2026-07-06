# FR-15 Quản Lý Sản Phẩm - Bộ Test Case Black-box UI

**Tester:** Cường  
**Chức năng:** Product Management CRUD  
**Bề mặt kiểm thử:** Chỉ thao tác qua Web Admin UI  
**Trạng thái:** Đã chạy bởi Cường qua Web Admin UI

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Dữ liệu test | Kết quả mong đợi | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|--------------|------------------|------------|---------------|
| TC-PROD_MGMT-001 | EP | No | Admin mở danh sách sản phẩm | admin login | Danh sách sản phẩm hiển thị với các sản phẩm hiện có | Pass | None |
| TC-PROD_MGMT-002 | EP | No | User không phải admin không thể vào quản lý sản phẩm | user login | Bị từ chối truy cập hoặc redirect | Pass | None |
| TC-PROD_MGMT-003 | EP | No | Tạo sản phẩm với dữ liệu hợp lệ | name `Blackbox Product`, price 1000, category valid | Sản phẩm được tạo và xuất hiện trong danh sách | Pass | None |
| TC-PROD_MGMT-004 | BVA | Yes | Tạo sản phẩm với tên trống | empty name | Hệ thống từ chối name bắt buộc | Pass | None |
| TC-PROD_MGMT-005 | BVA | Yes | Tạo sản phẩm với name length 255 | 255 chars | Hệ thống chấp nhận name tại max boundary | Pass | None |
| TC-PROD_MGMT-006 | BVA | Yes | Tạo sản phẩm với name length 256 | 256 chars | Hệ thống từ chối name vượt max boundary | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-007 | BVA | Yes | Tạo sản phẩm với price 0 | price `0` | Hệ thống từ chối vì price phải > 0 | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-008 | BVA | Yes | Tạo sản phẩm với price 1 | price `1` | Hệ thống chấp nhận minimum positive price | Pass | None |
| TC-PROD_MGMT-009 | EP | No | Tạo sản phẩm không chọn category | no category selected | Hệ thống từ chối category bắt buộc | Blocked | None |
| TC-PROD_MGMT-010 | EP | No | Edit tên một sản phẩm | change one selected product | Chỉ sản phẩm được chọn thay đổi | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-011 | EP | No | Xóa sản phẩm và xác nhận | existing product | Sản phẩm bị xóa khỏi danh sách sau khi xác nhận | Fail | BUG-FR15-004 |
| TC-PROD_MGMT-012 | EP | No | Hủy thao tác xóa | existing product | Sản phẩm giữ nguyên | Blocked | BUG-FR15-004 |
| TC-PROD_MGMT-013 | EP | No | Edit price sản phẩm | change selected product price | Form/action edit hoạt động và chỉ price của sản phẩm được chọn thay đổi | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-014 | EP | No | Edit description sản phẩm | change selected product description | Form/action edit hoạt động và chỉ description của sản phẩm được chọn thay đổi | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-015 | EP | No | Edit category sản phẩm | change selected product category | Form/action edit hoạt động và chỉ category của sản phẩm được chọn thay đổi | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-016 | EP | No | Tạo sản phẩm với description dài | description 500 chars, valid name/price/category | Sản phẩm được tạo và description được lưu | Pass | None |
| TC-PROD_MGMT-017 | BVA | Yes | Tạo sản phẩm với price âm | price `-1` | Hệ thống từ chối vì price phải dương | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-018 | EP | No | Tạo sản phẩm với price không phải số | price `abc` nếu UI cho nhập | Hệ thống từ chối price không phải số | Pass | None |

## Ghi Chú

- BVA áp dụng cho độ dài name sản phẩm và biên price.
- BVA không áp dụng cho access control, category selection, edit isolation hoặc delete confirmation vì đó là kiểm thử trạng thái/phân vùng.

## Ghi Chú Thực Thi

- TC-PROD_MGMT-006 fail vì sản phẩm có name 256 ký tự vẫn tạo được.
- TC-PROD_MGMT-007 fail vì price `0` được chấp nhận.
- TC-PROD_MGMT-009 blocked vì dropdown category luôn có giá trị mặc định, nên không tạo được trạng thái không chọn category từ UI.
- TC-PROD_MGMT-010 fail vì nút/hành động edit không hoạt động.
- TC-PROD_MGMT-011 fail vì xóa xảy ra ngay, không có confirmation dialog.
- TC-PROD_MGMT-012 blocked vì không có confirmation dialog nên không có hành động Cancel để test.
- TC-PROD_MGMT-013, TC-PROD_MGMT-014 và TC-PROD_MGMT-015 reuse lỗi edit action đã confirmed vì nút/hành động edit không hoạt động cho mọi kịch bản edit theo field.
- TC-PROD_MGMT-016 pass vì description dài 500 ký tự submit được.
- TC-PROD_MGMT-017 fail vì price âm được chấp nhận và sản phẩm được tạo.
- TC-PROD_MGMT-018 pass vì input price không cho nhập `abc`.
