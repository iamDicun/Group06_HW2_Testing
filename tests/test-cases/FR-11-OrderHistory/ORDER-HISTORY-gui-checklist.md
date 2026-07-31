# GUI Testing Checklist — FR-11: Order History View (User)

## 1. Phạm vi & nguồn thông tin

- **Màn hình / Chức năng**: Xem lịch sử đơn hàng cá nhân (FR-11).
- **Nguồn tài liệu**: 
  - HW03 GUI Usability Spec (`2026.HW03.GUI Usability_En.pdf`)
  - EShop System Specification (`application/README.md`)
- **Phương pháp kiểm thử**: Black-box Testing (Kiểm thử hộp đen dựa trên trải nghiệm & giao diện người dùng)
- **Các Interface Aspects bao phủ**: IA-01 (Tiêu chuẩn chung), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback & State).
- **Thiết bị & Trình duyệt mục tiêu**: Desktop (Chrome, Firefox), Mobile (Safari iOS, Chrome Android).

## 2. Danh sách thành phần UI

| Thành phần | Loại | Ghi chú |
|---|---|---|
| Tiêu đề Lịch sử đơn hàng | Tiêu đề phân khu | Hiển thị "Lịch sử đơn hàng" trong khung hồ sơ cá nhân |
| Bảng danh sách đơn hàng | Bảng dữ liệu | Gồm các cột: Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, Thao tác |
| Mã đơn hàng | Văn bản mã số | Định dạng tiền tố dạng `#id` |
| Ngày đặt hàng | Văn bản ngày tháng | Định dạng ngày tháng rõ ràng theo quy chuẩn |
| Tổng tiền đơn hàng | Văn bản số tiền | Nổi bật màu đỏ, có dấu phân cách hàng nghìn và ký hiệu `₫` |
| Nhãn Trạng thái | Thẻ nhãn trạng thái | Hiển thị trạng thái đơn hàng bằng tiếng Việt có màu sắc phân biệt |
| Nút Hủy đơn | Nút thao tác | Nút màu đỏ "Hủy đơn" cho các đơn thỏa điều kiện hủy |
| Thông báo chưa có đơn hàng | Khung thông báo | Hiển thị dòng chữ "Bạn chưa có đơn hàng nào." |

## 3. Checklist

### 3.1 Bố cục & Hiển thị (LAY)

- [ ] GUI-LAY-01: Bố cục trang hiển thị dạng 2 cột trên máy tính và tự động xếp thành 1 cột trên điện thoại.
- [ ] GUI-LAY-02: Nhãn trạng thái đơn hàng có khung bo tròn, lề vừa vặn, không làm đè chữ.
- [ ] GUI-LAY-03: Mã đơn hàng sử dụng kiểu chữ đơn cách (monospace) giúp phân biệt rõ từng chữ số.

### 3.2 Nội dung & Ngôn ngữ (CON)

- [ ] GUI-CON-01: Trạng thái đơn hàng hiển thị bằng tiếng Việt chuẩn (Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy).
- [ ] GUI-CON-02: Tổng tiền của từng đơn hàng hiển thị ký hiệu `₫` kèm dấu phân cách hàng nghìn.
- [ ] GUI-CON-03: Tiêu đề các cột trong bảng lịch sử đơn hàng viết bằng tiếng Việt chính xác.

### 3.3 Chức năng thành phần UI (FUN)

- [ ] GUI-FUN-01: Nút "Hủy đơn" chỉ xuất hiện đối với các đơn hàng ở trạng thái Chờ xác nhận hoặc Đã xác nhận (FR-10 / FR-11).
- [ ] GUI-FUN-02: Nút "Hủy đơn" bị ẩn hoặc vô hiệu hóa khi đơn hàng chuyển sang trạng thái Đang giao (người dùng không được tự hủy khi đơn đang giao - FR-10).
- [ ] GUI-FUN-03: Nút "Hủy đơn" bị ẩn hoàn toàn khi đơn hàng đã chuyển sang trạng thái Đã giao hoặc Đã hủy.
- [ ] GUI-FUN-04: Bấm nút "Hủy đơn" gửi yêu cầu hủy thành công, hiển thị thông báo phản hồi và cập nhật trạng thái đơn thành Đã hủy.

### 3.4 Điều hướng & Luồng (NAV)

- [ ] GUI-NAV-01: Danh sách đơn hàng cá nhân tự động hiển thị ngay sau khi người dùng đăng nhập tài khoản.
- [ ] GUI-NAV-02: Khi người dùng chưa đăng nhập truy cập vào trang, màn hình hiển thị thông báo yêu cầu đăng nhập.

### 3.5 Responsive & Tương thích (RES)

- [ ] GUI-RES-01: Bảng danh sách đơn hàng hiển thị gọn gàng trên màn hình nhỏ di động, không làm méo vỡ giao diện.

### 3.6 Khả năng truy cập (ACC)

- [ ] GUI-ACC-01: Trạng thái đơn hàng được phân biệt rõ ràng bằng cả màu sắc VÀ chữ tiếng Việt để người mù màu vẫn nhận biết được.

### 3.7 Xử lý lỗi & Thông báo (ERR)

- [ ] GUI-ERR-01: Khi tài khoản chưa từng mua hàng, màn hình hiển thị dòng thông báo "Bạn chưa có đơn hàng nào." thân thiện.

## 4. Giả định / Cần làm rõ

- Cần làm rõ: Nút "Hủy đơn" vẫn hiển thị đối với các đơn hàng ở trạng thái Đang giao (`shipping`), vi phạm quy định sơ đồ chuyển trạng thái FR-10.
- Cần làm rõ: Nhãn trạng thái `pending` (Chờ xác nhận) cần kiểm tra độ tương phản giữa chữ màu vàng và nền màu vàng nhạt.
