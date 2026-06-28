# FR-15 Quản Lý Sản Phẩm - AI Gap Analysis

**Chức năng:** Product Management CRUD  
**Trạng thái:** Đã review và chỉnh sửa theo Web Admin UI

---

## Các Gap Trong Output AI

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Nguyên nhân | Cách Cường sửa |
|--------|--------------|-------------------|-------------|----------------|
| FR15-GAP-01 | Dễ suy luận từ API thay vì Admin UI | Bug phải được xác nhận bằng UI | AI thường dựa vào endpoint behavior | Chuyển sang các thao tác Admin UI |
| FR15-GAP-02 | Thiếu boundary name 255/256 | Validate length là BVA chính | AI chọn giá trị chung chung | Thêm TC-PROD_MGMT-005..006 |
| FR15-GAP-03 | Thiếu price 0/-1/1/non-numeric | Price là boundary quan trọng | AI không đủ dữ liệu biên | Thêm TC-PROD_MGMT-007, 008, 017, 018 |
| FR15-GAP-04 | Thiếu delete confirmation/cancel | Xóa là thao tác destructive | AI chỉ kiểm tra delete success | Thêm TC-PROD_MGMT-011..012 |
| FR15-GAP-05 | Chưa mở rộng edit theo từng field | Edit phải hoạt động cho các field khác nhau | AI chỉ test một edit path | Thêm TC-PROD_MGMT-013..015 |

## Bài Học

FR-15 cho thấy CRUD testing cần kiểm tra validate input, quyền truy cập, edit action và delete confirmation qua UI. AI hữu ích để khởi tạo partition nhưng cần human review để bổ sung boundary và hành vi destructive.
