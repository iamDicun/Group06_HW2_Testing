# Test Cases: FR-15 - Product Management (CRUD)

**Feature:** `FR-15` Product Management (CRUD)  
**Module:** Web Admin (`PROD_MGMT`)  
**Target Page:** Web Admin Portal (Tab "Sản phẩm")  
**Total Test Cases:** 15 (Positive: 6, Negative: 6, Edge: 3)

---

| ID | Category | Scenario / Description | Precondition | Input Data | Steps | Expected Result | Priority |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| `TC_PM_01` | Positive | Thêm sản phẩm mới với thông tin hợp lệ đầy đủ | Đã đăng nhập tài khoản Admin, chọn Tab "Sản phẩm" | `name: "iPhone 16 Pro Max"`, `price: 34990000`, `imageUrl: "https://placehold.co/300"`, `description: "Smartphone cao cấp"`, `category_id: 1` | 1. Nhập các trường thông tin sản phẩm<br>2. Click "Lưu sản phẩm" | Sản phẩm mới xuất hiện trong bảng danh sách | P0 |
| `TC_PM_02` | Positive | Chỉnh sửa tên và giá sản phẩm thành công | Đã có sẵn sản phẩm trong danh sách | `id: 1`, `name: "iPhone 15 Pro Max Updated"`, `price: 29990000` | 1. Click "Sửa" sản phẩm<br>2. Cập nhật Tên & Giá<br>3. Click "Lưu sản phẩm" | Hiển thị alert "Cập nhật thành công!" | P0 |
| `TC_PM_03` | Positive | Xóa sản phẩm khỏi danh sách có hộp thoại xác nhận (Confirm Dialog) | Đã có sản phẩm cần xóa | `id: 2` | 1. Click "Xóa" sản phẩm<br>2. Quan sát sự xuất hiện của Hộp thoại xác nhận (Confirm dialog)<br>3. Click "OK" để xác nhận | Phải xuất hiện dialog xác nhận trước khi xóa (Bắt lỗi BUG-FR15-004 nếu thiếu confirm dialog) | P0 |
| `TC_PM_04` | Positive | Hủy thao tác chỉnh sửa sản phẩm | Đang trong chế độ sửa sản phẩm | Click nút "Hủy sửa" | Click nút "Hủy sửa" | Form reset về trạng thái tạo mới "Thêm sản phẩm mới" | P2 |
| `TC_PM_05` | Negative | Thêm sản phẩm để trống tên sản phẩm bắt buộc | Đang ở tab "Sản phẩm" | `name: ""`, `price: 100000` | 1. Bỏ trống Tên SP<br>2. Submit form | HTML5 validation báo yêu cầu điền tên sản phẩm | P1 |
| `TC_PM_06` | Negative | Thêm sản phẩm với giá âm (< 0) | Đang ở tab "Sản phẩm" | `name: "Test SP Giá Âm"`, `price: -50000` | 1. Nhập giá -50000<br>2. Click Lưu | Server hoặc UI báo lỗi giá sản phẩm phải lớn hơn 0 | P1 |
| `TC_PM_07` | Negative | Thêm sản phẩm không chọn danh mục (category_id không hợp lệ) | Đang ở tab "Sản phẩm" | `name: "SP Không DM"`, `category_id: null` | Submit form không chọn danh mục | Server báo lỗi `category_id` không tồn tại | P1 |
| `TC_PM_08` | Negative | Truy cập trang Admin quản lý sản phẩm khi chưa đăng nhập Admin | Chưa đăng nhập hoặc token hết hạn | Không có token | Đột nhập vào giao diện Admin | Chuyển hướng lập tức về trang Admin Login | P0 |
| `TC_PM_09` | Negative | Đăng nhập tài khoản User thường vào Admin Portal | Tài khoản role `user` | `email: "user@example.com"`, `password: "User123! "` | Submit form Admin Login với tài khoản user | Alert báo "Bạn không phải là admin!" và không cho vào | P0 |
| `TC_PM_10` | Edge | Thêm sản phẩm với tên cực dài (255+ ký tự) | Ở tab "Sản phẩm" | `name: "A".repeat(300)` | 1. Nhập tên dài 300 ký tự<br>2. Click Lưu | Hệ thống cắt gọn tên hoặc báo lỗi vượt quá số ký tự cho phép | P2 |
| `TC_PM_11` | Edge | Nhập tên sản phẩm chứa các ký tự HTML / Script injection (`<script>alert(1)</script>`) | Ở tab "Sản phẩm" | `name: "<script>alert('XSS')</script> Laptop"` | 1. Nhập tên có chứa thẻ script<br>2. Click Lưu | Tên hiển thị dạng plaintext an toàn, không thực thi script | P1 |
| `TC_PM_12` | Edge | Phát hiện lỗi cập nhật đồng loạt tên sản phẩm khi chỉnh sửa (SUT Bug Feature) | Ở tab "Sản phẩm" | Chỉnh sửa tên 1 SP bất kỳ | 1. Click "Sửa" sản phẩm A<br>2. Đổi tên sản phẩm A<br>3. Click "Lưu sản phẩm" | Phát hiện bug: Tất cả sản phẩm trong bảng bị đổi tên theo SP A | P1 |
| `TC_PM_13` | Positive | Hủy thao tác xóa sản phẩm qua Hộp thoại xác nhận (Confirm Dialog Cancel) | Đã có sản phẩm trong danh sách | Click nút "Xóa", bấm "Cancel" trên confirm dialog | 1. Click nút "Xóa"<br>2. Bấm "Cancel" trong confirm popup | Thao tác xóa bị hủy, sản phẩm vẫn được giữ nguyên trong danh sách | P1 |
| `TC_PM_14` | Negative | BVA Giá sản phẩm bằng 0 (Price = 0 VND) | Đang ở tab "Sản phẩm" | `name: "Test SP Giá 0đ"`, `price: 0` | 1. Nhập tên sản phẩm<br>2. Nhập giá 0 ₫<br>3. Click "Lưu sản phẩm" | Hệ thống từ chối lưu và yêu cầu giá lớn hơn 0 (Bắt lỗi BUG-FR15-002 nếu lưu sản phẩm giá 0đ) | P1 |
| `TC_PM_15` | Positive | BVA Giá sản phẩm tối thiểu hợp lệ 1 ₫ (Price = 1 VND) | Đang ở tab "Sản phẩm" | `name: "Test SP Giá 1đ"`, `price: 1` | 1. Nhập giá 1 ₫<br>2. Click "Lưu sản phẩm" | Lưu thành công sản phẩm 1 ₫ vào danh sách | P1 |
