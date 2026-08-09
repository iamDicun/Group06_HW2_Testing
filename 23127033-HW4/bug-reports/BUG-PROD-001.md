# Bug Report: BUG-PROD-001

**Mã Lỗi:** `BUG-PROD-001`  
**Tiêu Đề:** Lỗi cập nhật đồng loạt (Mass Update) tên toàn bộ sản phẩm trong Database khi Admin tiến hành sửa thông tin 1 sản phẩm  
**Chức Năng:** `FR-15` Product Management (CRUD)  
**Module:** Web Admin (`PROD_MGMT`)  
**Mức Độ Nghiêm Trọng (Severity):** Critical  
**Độ Ưu Tiên (Priority):** P0  
**Môi Trường:** Web Admin Portal (`http://localhost:5174`)  
**Trình Duyệt Bị Ảnh Hưởng:** Chromium, Firefox, WebKit  

---

## 1. Mô Tả Chi Tiết (Description)
Khi Admin tiến hành chỉnh sửa thông tin của 1 sản phẩm duy nhất (ví dụ: Sản phẩm ID 1) và bấm "Lưu sản phẩm", thay vì chỉ cập nhật sản phẩm ID 1, hệ thống ghi đè tên của sản phẩm ID 1 lên toàn bộ tất cả các sản phẩm khác đang có trong danh sách Database.

---

## 2. Các Bước Tái Hiện Lỗi (Steps to Reproduce)
1. Đăng nhập Admin Portal, chọn tab "Sản phẩm" (Đang có danh sách các sản phẩm: iPhone, Samsung, MacBook...).
2. Bấm nút "Sửa" sản phẩm iPhone.
3. Đổi tên thành: `iPhone 16 Pro Max Special`.
4. Bấm nút "Lưu sản phẩm".

---

## 3. Kết Quả Thực Tế (Actual Result)
Toàn bộ tất cả các dòng sản phẩm trong bảng danh sách (Samsung, MacBook...) đều bị biến thành tên `iPhone 16 Pro Max Special`.

---

## 4. Kết Quả Kỳ Vọng (Expected Result)
Chỉ duy nhất dòng sản phẩm được chọn sửa bị thay đổi tên, các sản phẩm khác trong danh sách giữ nguyên thông tin.
