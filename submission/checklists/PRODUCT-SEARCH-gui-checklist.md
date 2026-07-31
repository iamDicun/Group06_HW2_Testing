# GUI Testing Checklist — FR-05: Product Listing and Search

## 1. Phạm vi & nguồn thông tin

- **Màn hình / Chức năng**: Trang danh sách & tìm kiếm sản phẩm (FR-05).
- **Nguồn tài liệu**: 
  - HW03 GUI Usability Spec (`2026.HW03.GUI Usability_En.pdf`)
  - EShop System Specification (`application/README.md`)
- **Phương pháp kiểm thử**: Black-box Testing (Kiểm thử hộp đen dựa trên trải nghiệm & giao diện người dùng)
- **Các Interface Aspects bao phủ**: IA-01 (Tiêu chuẩn chung), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback & State).
- **Thiết bị & Trình duyệt mục tiêu**: Desktop (Chrome, Firefox), Mobile (Safari iOS, Chrome Android).

## 2. Danh sách thành phần UI

| Thành phần | Loại | Ghi chú |
|---|---|---|
| Tiêu đề chính | Tiêu đề trang | Hiển thị "Danh sách sản phẩm" |
| Form Tìm kiếm | Khung nhập liệu | Ô nhập từ khóa `placeholder="Tìm kiếm..."`, Nút "Tìm" màu xanh |
| Thông báo từ khóa tìm kiếm | Dòng thông báo | Hiển thị "Kết quả tìm kiếm cho: [từ khóa]" |
| Lưới sản phẩm | Lưới hiển thị danh sách | 1 cột trên điện thoại, 2 cột trên máy tính bảng, 3 cột trên máy tính |
| Khung ô sản phẩm | Thẻ thông tin sản phẩm | Bao gồm: Hình ảnh, Tên sản phẩm, Giá tiền, Nút "Xem chi tiết", Nút "Thêm vào giỏ" |
| Ảnh sản phẩm | Hình ảnh minh họa | Kích thước khung ảnh vừa vặn, không méo hình |
| Tên sản phẩm | Nhãn tên sản phẩm | Hiển thị dấu ba chấm (...) nếu tên quá dài |
| Giá sản phẩm | Văn bản hiển thị giá | Nổi bật màu đỏ, có phân cách hàng nghìn |
| Nút Xem chi tiết | Nút chuyển trang | Chuyển hướng sang trang thông tin chi tiết sản phẩm |
| Nút Thêm vào giỏ | Nút hành động | Thêm sản phẩm vào giỏ hàng |
| Bộ đếm sản phẩm | Dòng thống kê số lượng | Hiển thị "Hiển thị X sản phẩm" ở cuối trang |

## 3. Checklist

### 3.1 Bố cục & Hiển thị (LAY)

- [ ] GUI-LAY-01: Tiêu đề chính của trang chỉ hiển thị duy nhất 1 tiêu đề chính ở đầu trang theo quy định FR-05 / FR-21.
- [ ] GUI-LAY-02: Các ô sản phẩm trên lưới được căn chỉnh khoảng cách đều đặn, cân đối trên màn hình.
- [ ] GUI-LAY-03: Ảnh sản phẩm có tỷ lệ khung hình đồng nhất, không bị vỡ hoặc méo hình khi ảnh gốc có kích thước khác nhau.

### 3.2 Nội dung & Ngôn ngữ (CON)

- [ ] GUI-CON-01: Toàn bộ chữ trên trang (tiêu đề, nhãn tìm kiếm, nút bấm) sử dụng tiếng Việt nhất quán (FR-21).
- [ ] GUI-CON-02: Giá sản phẩm hiển thị đúng ký hiệu đơn vị tiền tệ `₫` và có dấu phân cách hàng nghìn theo FR-21.
- [ ] GUI-CON-03: Tên sản phẩm quá dài được tự động thu ngắn và hiển thị dấu ba chấm (...) ở cuối.

### 3.3 Chức năng thành phần UI (FUN)

- [ ] GUI-FUN-01: Ô tìm kiếm cho phép nhập từ khóa và bấm nút "Tìm" để lọc danh sách sản phẩm tương ứng.
- [ ] GUI-FUN-02: Bấm nút "Thêm vào giỏ" trên ô sản phẩm thêm đúng 1 đơn vị sản phẩm đó vào giỏ hàng.
- [ ] GUI-FUN-03: Bấm nút "Xem chi tiết" chuyển sang trang thông tin chi tiết của đúng sản phẩm đó.

### 3.4 Điều hướng & Luồng (NAV)

- [ ] GUI-NAV-01: Khi dùng phím Tab trên bàn phím, con trỏ di chuyển lần lượt qua ô tìm kiếm, nút Tìm, và các nút trên từng ô sản phẩm theo thứ tự hợp lý.

### 3.5 Responsive & Tương thích (RES)

- [ ] GUI-RES-01: Giao diện danh sách sản phẩm tự động sắp xếp phù hợp từ 1 cột trên điện thoại đến 3 cột trên màn hình máy tính.

### 3.6 Khả năng truy cập (ACC)

- [ ] GUI-ACC-01: Tất cả ảnh sản phẩm đều có văn bản mô tả hỗ trợ công cụ đọc màn hình cho người khiếm thị (FR-24).
- [ ] GUI-ACC-02: Chữ giá sản phẩm màu đỏ có độ tương phản rõ ràng trên nền trắng, dễ đọc.

### 3.7 Xử lý lỗi & Thông báo (ERR)

- [ ] GUI-ERR-01: Khi tìm kiếm từ khóa không có sản phẩm phù hợp, màn hình hiển thị thông báo kết quả rỗng rõ ràng.
- [ ] GUI-ERR-02: Nhập từ khóa chứa các ký tự đặc biệt vào ô tìm kiếm hiển thị an toàn, không làm biến dạng giao diện hay hiển thị sai định dạng (SEC-04).

## 4. Giả định / Cần làm rõ

- Cần làm rõ: Giao diện trang chủ xuất hiện 2 tiêu đề chính ("Danh sách sản phẩm" ở đầu trang và "Hiển thị X sản phẩm" ở cuối trang), vi phạm quy định FR-05 / FR-21 chỉ có đúng 1 tiêu đề chính.
- Cần làm rõ: Giá sản phẩm hiển thị đơn vị "VND" thay vì ký hiệu `₫` theo quy định FR-21.
- Cần làm rõ: Ảnh sản phẩm bị thiếu văn bản mô tả hỗ trợ công cụ đọc màn hình, vi phạm FR-24.
- Cần làm rõ: Nhập từ khóa chứa ký tự đặc biệt làm hiển thị sai định dạng trên màn hình kết quả tìm kiếm, vi phạm an toàn giao diện SEC-04.
