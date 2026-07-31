# GUI Testing Checklist — FR-07: Shopping Cart

## 1. Phạm vi & nguồn thông tin

- **Màn hình / Chức năng**: Trang Giỏ hàng (FR-07).
- **Nguồn tài liệu**: 
  - HW03 GUI Usability Spec (`2026.HW03.GUI Usability_En.pdf`)
  - EShop System Specification (`application/README.md`)
- **Phương pháp kiểm thử**: Black-box Testing (Kiểm thử hộp đen dựa trên trải nghiệm & giao diện người dùng)
- **Các Interface Aspects bao phủ**: IA-01 (Tiêu chuẩn chung), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback & State).
- **Thiết bị & Trình duyệt mục tiêu**: Desktop (Chrome, Firefox), Mobile (Safari iOS, Chrome Android).

## 2. Danh sách thành phần UI

| Thành phần | Loại | Ghi chú |
|---|---|---|
| Tiêu đề trang | Tiêu đề giỏ hàng | Hiển thị "Giỏ Hàng" |
| Bảng sản phẩm giỏ hàng | Bảng dữ liệu | Gồm 5 cột: Sản phẩm, Giá, Số lượng, Thành tiền, Thao tác |
| Dòng sản phẩm | Hàng thông tin | Hiển thị tên, đơn giá, số lượng, thành tiền từng món |
| Nút tăng/giảm số lượng | Nút thao tác (+/-) | Cho phép tăng/giảm số lượng từng mặt hàng (FR-07) |
| Nút Xóa | Nút thao tác | Nút màu đỏ "Xóa", kích hoạt xóa sản phẩm khỏi giỏ |
| Khung tổng tiền | Khung thông tin tổng | Hiển thị nhãn tổng tiền và số tiền nổi bật |
| Nhãn tổng tiền | Văn bản nhãn | Phải ghi đúng "Tổng cộng" theo FR-07 / FR-21 |
| Nút Mua tiếp | Nút chuyển trang | Nút "← Mua tiếp" hoặc "Tiếp tục mua sắm" |
| Nút Tiến hành thanh toán | Nút hành động chính | Nút màu xanh "Tiến hành thanh toán" |
| Giao diện giỏ hàng trống | Màn hình trạng thái rỗng | Hiển thị tiêu đề "Giỏ hàng của bạn đang trống", hình minh họa và nút mua sắm |

## 3. Checklist

### 3.1 Bố cục & Hiển thị (LAY)

- [ ] GUI-LAY-01: Bảng giỏ hàng hiển thị các cột ngay ngắn, các hàng sản phẩm phân tách bằng đường viền mỏng dễ quan sát.
- [ ] GUI-LAY-02: Nút "Tiến hành thanh toán" nổi bật bằng màu xanh và nút "Xóa" màu đỏ để người dùng dễ phân biệt thao tác.

### 3.2 Nội dung & Ngôn ngữ (CON)

- [ ] GUI-CON-01: Nhãn dòng tổng tiền hiển thị chính xác cụm từ "Tổng cộng" theo quy định bắt buộc của FR-07 / FR-21.
- [ ] GUI-CON-02: Đơn giá, thành tiền và tổng tiền hiển thị ký hiệu `₫` và có dấu phân cách hàng nghìn.
- [ ] GUI-CON-03: Nút quay lại hiển thị nhãn "Tiếp tục mua sắm" hoặc "← Mua tiếp" rõ nghĩa.

### 3.3 Chức năng thành phần UI (FUN)

- [ ] GUI-FUN-01: Cột "Số lượng" cung cấp bộ nút tăng/giảm (+/-) cho phép người dùng thay đổi số lượng sản phẩm trực tiếp (FR-07).
- [ ] GUI-FUN-02: Bấm nút "Xóa" hiển thị hộp thoại xác nhận (Confirmation Dialog) trước khi loại bỏ sản phẩm khỏi giỏ hàng (FR-07 / FR-24).
- [ ] GUI-FUN-03: Thành tiền từng sản phẩm và Tổng cộng tự động cập nhật ngay khi thay đổi số lượng hoặc xóa mặt hàng.

### 3.4 Điều hướng & Luồng (NAV)

- [ ] GUI-NAV-01: Bấm nút "Tiếp tục mua sắm" chuyển người dùng quay trở lại trang chủ.
- [ ] GUI-NAV-02: Bấm nút "Tiến hành thanh toán" khi đã đăng nhập sẽ chuyển sang trang Thanh toán.
- [ ] GUI-NAV-03: Bấm nút "Tiến hành thanh toán" khi chưa đăng nhập sẽ hiển thị thông báo yêu cầu và chuyển người dùng sang trang Đăng nhập.

### 3.5 Responsive & Tương thích (RES)

- [ ] GUI-RES-01: Bảng giỏ hàng tự động co giãn hoặc cho phép cuộn ngang trên màn hình điện thoại di động.

### 3.6 Khả năng truy cập (ACC)

- [ ] GUI-ACC-01: Bảng giỏ hàng có cấu trúc hiển thị rõ ràng, hỗ trợ các công cụ trợ năng dành cho người khiếm thị.

### 3.7 Xử lý lỗi & Thông báo (ERR)

- [ ] GUI-ERR-01: Màn hình giỏ hàng trống hiển thị thông báo rõ ràng kèm hình ảnh minh họa thân thiện (FR-07 / FR-24).
- [ ] GUI-ERR-02: Khi người dùng chọn "Hủy" trên hộp thoại xác nhận xóa, sản phẩm vẫn được giữ nguyên trong giỏ hàng.

## 4. Giả định / Cần làm rõ

- Cần làm rõ: Màn hình giỏ hàng hiển thị nhãn "Tổng tạm tính:" thay vì "Tổng cộng:", vi phạm FR-07 / FR-21.
- Cần làm rõ: Cột số lượng trong giỏ hàng chỉ hiển thị số tĩnh, thiếu bộ nút `+` / `-` điều chỉnh số lượng theo FR-07.
- Cần làm rõ: Thao tác xóa sản phẩm xóa trực tiếp không mở hộp thoại xác nhận, vi phạm FR-07 / FR-24.
- Cần làm rõ: Màn hình giỏ hàng trống thiếu hình ảnh minh họa theo FR-07 / FR-24.
