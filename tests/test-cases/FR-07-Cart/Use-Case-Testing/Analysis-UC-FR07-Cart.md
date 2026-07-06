# Test Case Design Analysis – Use Case: Quản lý Giỏ hàng (FR-07)

## 1. Đặc tả Use Case

| Mục | Nội dung |
|------|----------|
| **Use Case ID** | UC-FR07 |
| **Tên Use Case** | Quản lý Giỏ hàng (Shopping Cart) |
| **Tác nhân chính** | Người dùng (đã đăng nhập) |
| **Mô tả** | Cho phép người dùng xem, thêm sản phẩm, điều chỉnh số lượng, xóa sản phẩm khỏi giỏ hàng và xem tổng tiền |
| **Tiền điều kiện** | Người dùng đã đăng nhập và có session hợp lệ |
| **Hậu điều kiện** | Giỏ hàng được cập nhật tương ứng với thao tác người dùng |

## 2. Danh sách sản phẩm trong hệ thống

| ID | Tên sản phẩm | Đơn giá |
|----|-------------|---------|
| 1 | iPhone 15 Pro Max | 30,000,000₫ |
| 2 | Samsung Galaxy S24 Ultra | 28,000,000₫ |
| 3 | MacBook Pro M3 | 45,000,000₫ |
| 4 | Tai nghe AirPods Pro 2 | 6,000,000₫ |
| 5 | Bàn phím cơ Keychron Q1 | 4,000,000₫ |

## 3. Luồng chính (Basic Flow) — Xem giỏ hàng

**ID:** UC-FR07-Basic  
**Kích hoạt (Trigger):** Người dùng điều hướng đến trang `/cart`  
**Tiền điều kiện:** Người dùng đã đăng nhập; giỏ hàng có ≥ 1 sản phẩm  
**Hậu điều kiện:** Giỏ hàng hiển thị đúng dữ liệu, không thay đổi dữ liệu

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click link "Giỏ hàng" trên navbar hoặc truy cập đường dẫn `/cart` | Hệ thống điều hướng đến trang Giỏ hàng |
| 2 | Hệ thống | — | Hiển thị danh sách sản phẩm dạng bảng (table), mỗi sản phẩm là 1 hàng |
| 3 | Hệ thống | — | Hiển thị header bảng gồm 5 cột: **Sản phẩm**, **Đơn giá**, **Số lượng**, **Thành tiền**, **Thao tác** |
| 4 | Hệ thống | — | Cột Sản phẩm: hiển thị tên + ảnh sản phẩm (có alt text) |
| 5 | Hệ thống | — | Cột Đơn giá: hiển thị đơn giá với ký hiệu ₫, định dạng phân cách hàng nghìn |
| 6 | Hệ thống | — | Cột Số lượng: hiển thị số lượng hiện tại, có nút `+` và `-` để điều chỉnh |
| 7 | Hệ thống | — | Cột Thành tiền: hiển thị đơn giá × số lượng, định dạng ₫ |
| 8 | Hệ thống | — | Cột Thao tác: hiển thị nút **Xóa** cho từng sản phẩm |
| 9 | Hệ thống | — | Hiển thị tổng tiền với nhãn **"Tổng cộng"** và giá trị tổng hợp |
| 10 | Hệ thống | — | Hiển thị nút **"Tiếp tục mua sắm"** cho phép quay về trang chủ |

## 4. Luồng phụ (Alternative Flows)

### A1: Thêm sản phẩm mới vào giỏ

**Kích hoạt:** Người dùng click "Thêm vào giỏ hàng" từ trang chi tiết sản phẩm  
**Tiền điều kiện:** Giỏ hàng trống hoặc chưa có sản phẩm này  
**Hậu điều kiện:** Giỏ hàng có thêm 1 dòng sản phẩm mới với số lượng tương ứng

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Vào trang chi tiết sản phẩm, chọn số lượng, click **"Thêm vào giỏ hàng"** | Hệ thống hiển thị phản hồi trực quan (toast / badge cập nhật) |
| 2 | Người dùng | Điều hướng đến trang Giỏ hàng | Sản phẩm xuất hiện như một dòng mới trong danh sách |
| 3 | Hệ thống | — | Cập nhật badge số lượng trên navbar (nếu có) |
| 4 | Hệ thống | — | Tính toán lại tổng tiền |

### A2: Thêm trùng sản phẩm

**Kích hoạt:** Người dùng click "Thêm vào giỏ hàng" cho sản phẩm đã có trong giỏ  
**Tiền điều kiện:** Sản phẩm đã tồn tại trong giỏ hàng  
**Hậu điều kiện:** Số lượng sản phẩm tăng lên, không tạo dòng mới

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click **"Thêm vào giỏ hàng"** cho sản phẩm đã có | Hệ thống kiểm tra sản phẩm đã tồn tại trong giỏ |
| 2 | Hệ thống | — | **Không** tạo dòng mới; tăng số lượng của dòng hiện có |
| 3 | Hệ thống | — | Cập nhật Thành tiền = Đơn giá × Số lượng mới |
| 4 | Hệ thống | — | Cập nhật Tổng cộng |

### A3: Xóa sản phẩm (Xác nhận)

**Kích hoạt:** Người dùng click nút Xóa trên 1 sản phẩm  
**Tiền điều kiện:** Giỏ hàng có ≥ 2 sản phẩm  
**Hậu điều kiện:** Sản phẩm bị xóa khỏi giỏ; các sản phẩm khác giữ nguyên

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **Xóa** trên sản phẩm muốn xóa | Hệ thống hiển thị dialog xác nhận |
| 2 | Người dùng | Click **Xác nhận** / **Đồng ý** trong dialog | Hệ thống xóa sản phẩm khỏi giỏ |
| 3 | Hệ thống | — | Cập nhật lại danh sách, thành tiền và tổng cộng |
| 4 | Hệ thống | — | Badge navbar cập nhật (nếu có) |

### A4: Xóa sản phẩm (Hủy bỏ)

**Kích hoạt:** Người dùng click nút Xóa nhưng sau đó hủy  
**Tiền điều kiện:** Giỏ hàng có ≥ 1 sản phẩm; dialog xác nhận đang hiển thị  
**Hậu điều kiện:** Giỏ hàng không thay đổi, sản phẩm không bị xóa

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **Xóa** trên sản phẩm | Hệ thống hiển thị dialog xác nhận |
| 2 | Người dùng | Click **Hủy** hoặc đóng dialog | Hệ thống đóng dialog |
| 3 | Hệ thống | — | Giỏ hàng giữ nguyên, không thay đổi dữ liệu |

### A5: Xóa sản phẩm cuối cùng

**Kích hoạt:** Người dùng xóa sản phẩm duy nhất còn lại trong giỏ  
**Tiền điều kiện:** Giỏ hàng chỉ có đúng 1 sản phẩm  
**Hậu điều kiện:** Giỏ hàng trống; hiển thị empty state

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click **Xóa** trên sản phẩm duy nhất | Dialog xác nhận hiển thị |
| 2 | Người dùng | Click **Xác nhận** | Hệ thống xóa sản phẩm |
| 3 | Hệ thống | — | Giỏ hàng chuyển sang trạng thái rỗng |
| 4 | Hệ thống | — | Hiển thị hình minh họa + thông báo "Giỏ hàng trống" |
| 5 | Hệ thống | — | Hiển thị gợi ý / nút quay lại mua sắm |

### A6: Điều chỉnh tăng số lượng (+)

**Kích hoạt:** Người dùng click nút `+` trên sản phẩm  
**Tiền điều kiện:** Giỏ hàng có sản phẩm; số lượng hiện tại ≥ 1  
**Hậu điều kiện:** Số lượng tăng 1; thành tiền và tổng cộng cập nhật

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **+** | Hệ thống tăng số lượng thêm 1 |
| 2 | Hệ thống | — | Cập nhật Thành tiền = Đơn giá × Số lượng mới |
| 3 | Hệ thống | — | Cập nhật Tổng cộng |

### A7: Điều chỉnh giảm số lượng (-) khi SL > 1

**Kích hoạt:** Người dùng click nút `-` khi số lượng > 1  
**Tiền điều kiện:** Số lượng hiện tại ≥ 2  
**Hậu điều kiện:** Số lượng giảm 1; thành tiền và tổng cộng cập nhật

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **-** | Hệ thống giảm số lượng đi 1 |
| 2 | Hệ thống | — | Cập nhật Thành tiền và Tổng cộng |

### A8: Giảm số lượng khi đang = 1

**Kích hoạt:** Người dùng click nút `-` khi số lượng = 1  
**Tiền điều kiện:** Số lượng hiện tại = 1  
**Hậu điều kiện:** Số lượng không đổi (vẫn = 1); không xóa sản phẩm

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **-** khi số lượng = 1 | Nút **-** bị **disabled** (không thể click) |
| 2 | Hệ thống | — | Số lượng giữ nguyên = 1; sản phẩm không bị xóa |
| 3 | Hệ thống | — | Thành tiền và Tổng cộng không thay đổi |

### A9: Tiếp tục mua sắm

**Kích hoạt:** Người dùng click nút "Tiếp tục mua sắm"  
**Tiền điều kiện:** Giỏ hàng có ≥ 1 sản phẩm  
**Hậu điều kiện:** Chuyển về trang chủ; giỏ hàng giữ nguyên

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Click nút **"Tiếp tục mua sắm"** | Hệ thống điều hướng về trang chủ |
| 2 | Hệ thống | — | Giỏ hàng giữ nguyên, không bị xóa hoặc thay đổi |
| 3 | Người dùng | Thêm sản phẩm khác vào giỏ | Hệ thống thêm sản phẩm vào giỏ hiện có |

### A10: Giỏ hàng trống

**Kích hoạt:** Người dùng vào trang Giỏ hàng khi chưa thêm sản phẩm  
**Tiền điều kiện:** Giỏ hàng trống  
**Hậu điều kiện:** Trang hiển thị empty state; không có dữ liệu giỏ hàng

| Bước | Tác nhân | Hành động | Phản hồi hệ thống |
|------|----------|-----------|-------------------|
| 1 | Người dùng | Điều hướng đến trang `/cart` | Hệ thống phát hiện giỏ hàng trống |
| 2 | Hệ thống | — | Hiển thị hình minh họa (icon giỏ hàng trống) |
| 3 | Hệ thống | — | Hiển thị thông báo rõ ràng (VD: "Giỏ hàng của bạn đang trống") |
| 4 | Hệ thống | — | Hiển thị nút/link để quay lại trang chủ mua sắm |
| 5 | Hệ thống | — | **Không** hiển thị danh sách sản phẩm, bảng giá, nút thanh toán |
| 6 | Hệ thống | — | Badge navbar hiển thị 0 hoặc không hiển thị |

## 5. Ma trận Luồng → Test Case

| Flow ID | TC ID | Mô tả Test Case | Kết quả |
|---------|-------|-----------------|---------|
| Basic | TC-UC-FR07-01 | Xem giỏ hàng có sản phẩm | ❌ FAIL |
| A1 | TC-UC-FR07-02 | Thêm sản phẩm mới vào giỏ | ❌ FAIL |
| A2 | TC-UC-FR07-03 | Thêm trùng sản phẩm | ❌ FAIL |
| A3 | TC-UC-FR07-04 | Xóa sản phẩm – Xác nhận | ❌ FAIL |
| A4 | TC-UC-FR07-05 | Xóa sản phẩm – Hủy bỏ | ❌ FAIL |
| A5 | TC-UC-FR07-06 | Xóa sản phẩm cuối cùng | ❌ FAIL |
| A6 | TC-UC-FR07-07 | Tăng số lượng bằng nút + | ❌ FAIL |
| A7 | TC-UC-FR07-08 | Giảm số lượng bằng nút - | ❌ FAIL |
| A8 | TC-UC-FR07-09 | Giảm số lượng khi đang = 1 | ❌ FAIL |
| A9 | TC-UC-FR07-10 | Tiếp tục mua sắm | ❌ FAIL |
| A10 | TC-UC-FR07-11 | Giỏ hàng trống | ❌ FAIL |
