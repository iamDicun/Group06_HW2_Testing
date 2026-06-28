# FR-15 Quản Lý Sản Phẩm - Báo Cáo Domain Testing

**Chức năng:** Product Management CRUD  
**Mã module:** `PROD_MGMT`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Web Admin UI

---

## Tóm Tắt Yêu Cầu

Admin có thể xem, tạo, sửa và xóa sản phẩm. Form sản phẩm phải validate name, price, category và delete phải có xác nhận trước khi xóa.

## Phân Vùng Đầu Vào

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Role | Admin | User thường |
| Name | 1..255 ký tự | Trống, 256 ký tự |
| Price | Số dương | 0, âm, không phải số |
| Category | Có category hợp lệ | Không chọn category |
| Edit action | Edit đúng sản phẩm được chọn | Edit không hoạt động hoặc sai sản phẩm |
| Delete action | Có confirm/cancel | Xóa ngay không confirm |

## Test Case Được Chọn

| Test Case ID | Phân vùng bao phủ | Kết quả | Bug liên quan |
|--------------|-------------------|---------|---------------|
| TC-PROD_MGMT-001..005 | Access/list/create hợp lệ và name boundary | Pass | |
| TC-PROD_MGMT-006..007 | Name 256 và price 0 | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-008 | Price 1 | Pass | |
| TC-PROD_MGMT-009 | Không chọn category | Blocked | |
| TC-PROD_MGMT-010, TC-PROD_MGMT-013..015 | Edit các field | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-011..012 | Delete confirm/cancel | Fail / Blocked | BUG-FR15-004 |
| TC-PROD_MGMT-016 | Description dài | Pass | |
| TC-PROD_MGMT-017 | Price âm | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-018 | Price không phải số | Pass | |

## Nhận Xét Human Review

Ba lỗi FR-15 đã được tái hiện qua Web Admin UI: dữ liệu sản phẩm không hợp lệ vẫn được chấp nhận, edit action không hoạt động, và delete không có confirmation dialog.
