# Bug Report – FR-07: Giỏ hàng (Shopping Cart)

**Dự án:** EShop SUT  
**Ngày kiểm thử:** 06/07/2026  
**Người thực hiện:** Test User (test@eshop.com)  
**Môi trường:** Frontend Web (React + Vite) tại http://localhost:5173

---

## Tổng hợp Bug

| Bug ID | Mức độ | Mô tả ngắn | File ảnh hưởng |
|--------|--------|------------|----------------|
| BUG-01 | **Cao** | Thiếu nút +/- để điều chỉnh số lượng trong giỏ hàng | `Cart.jsx:47` |
| BUG-02 | **Cao** | Xóa sản phẩm không có dialog xác nhận | `Cart.jsx:51` |
| BUG-03 | **Cao** | Nhãn tổng tiền là "Tổng tạm tính" thay vì "Tổng cộng" | `Cart.jsx:63` |
| BUG-04 | **Cao** | addToCart không merge sản phẩm trùng → tạo nhiều dòng | `CartContext.jsx:9` |
| BUG-05 | **Trung bình** | Giỏ hàng trống không có hình minh họa (empty state) | `Cart.jsx:20-27` |
| BUG-06 | **Trung bình** | Badge số lượng giỏ hàng không hiển thị trên navbar | `App.jsx:23` |
| BUG-07 | **Thấp** | Nhãn nút "← Mua tiếp" khác với yêu cầu "Tiếp tục mua sắm" | `Cart.jsx:66` |
| BUG-08 | **Trung bình** | Nút "Thêm vào giỏ hàng" yêu cầu click 2 lần mới hoạt động | `ProductDetail.jsx:21-24` |
| BUG-09 | **Trung bình** | Đơn giá hiển thị thiếu ký hiệu ₫ (chỉ hiển thị số) | `Cart.jsx:46` |
| BUG-10 | **Trung bình** | Nút logout nhãn là "Thoát" thay vì "Đăng xuất" | `App.jsx:29` |

---

## Chi tiết Bug

### BUG-01: Thiếu nút +/- điều chỉnh số lượng

- **Mức độ:** Cao
- **FR:** FR-07 — Cột Số lượng có nút +/- để chỉnh
- **File:** `frontend-web/src/pages/Cart.jsx:47`
- **Mô tả:** Trang giỏ hàng chỉ hiển thị số lượng dưới dạng text plain (`{item.quantity}`), không có nút +/- để tăng/giảm. Người dùng không thể thay đổi số lượng sản phẩm từ trang giỏ hàng.
- **Expected:** Có nút +/- bên cạnh ô số lượng để điều chỉnh
- **Actual:** Chỉ hiển thị số (VD: "2")
- **Ảnh hưởng:** TC-UC-FR07-07, TC-UC-FR07-08, TC-UC-FR07-09, TC-ST-FR07-08, TC-ST-FR07-09

### BUG-02: Xóa sản phẩm không có dialog xác nhận

- **Mức độ:** Cao
- **FR:** FR-07 — Nút Xóa sản phẩm phải có dialog xác nhận
- **File:** `frontend-web/src/pages/Cart.jsx:51`
- **Mô tả:** Khi click nút Xóa, sản phẩm bị xóa ngay lập tức mà không hiển thị dialog xác nhận. Người dùng có thể vô tình xóa nhầm sản phẩm.
- **Expected:** Dialog xác nhận hiển thị với 2 nút (Xác nhận / Hủy)
- **Actual:** Xóa trực tiếp, không có dialog
- **Ảnh hưởng:** TC-UC-FR07-04, TC-UC-FR07-05, TC-UC-FR07-06, TC-ST-FR07-05, TC-ST-FR07-06, TC-ST-FR07-07

### BUG-03: Nhãn tổng tiền sai

- **Mức độ:** Cao
- **FR:** FR-07 — Tổng tiền hiển thị nhãn "Tổng cộng" (không phải "Tổng tạm tính")
- **File:** `frontend-web/src/pages/Cart.jsx:63`
- **Mô tả:** Nhãn hiển thị tổng tiền là "Tổng tạm tính" thay vì "Tổng cộng" theo yêu cầu.
- **Expected:** `Tổng cộng: <giá trị> ₫`
- **Actual:** `Tổng tạm tính: <giá trị> ₫`
- **Ảnh hưởng:** TC-UC-FR07-01, TC-ST-FR07-04

### BUG-04: addToCart không merge sản phẩm trùng

- **Mức độ:** Cao
- **FR:** FR-07 — Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới
- **File:** `frontend-web/src/context/CartContext.jsx:9`
- **Mô tả:** `addToCart` trong CartContext luôn tạo mới một entry trong mảng cart thay vì kiểm tra sản phẩm đã tồn tại và tăng số lượng. Kết quả là giỏ hàng hiển thị nhiều dòng cho cùng một sản phẩm.
- **Expected:** `setCart([...cart, { ...product, quantity }]);` cần kiểm tra `product.id` trước khi append
- **Actual:** Append thẳng vào mảng, không merge
- **Ảnh hưởng:** TC-UC-FR07-03, TC-ST-FR07-03

### BUG-05: Giỏ hàng trống không có hình minh họa

- **Mức độ:** Trung bình
- **FR:** FR-07 — Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng
- **File:** `frontend-web/src/pages/Cart.jsx:20-27`
- **Mô tả:** Khi giỏ hàng trống, chỉ hiển thị text "Giỏ hàng của bạn đang trống" và link text, không có hình minh họa (icon/illustration).
- **Expected:** Có hình minh họa (icon giỏ hàng trống) + thông báo
- **Actual:** Chỉ text, không hình ảnh
- **Ảnh hưởng:** TC-UC-FR07-11, TC-ST-FR07-02, TC-ST-FR07-06

### BUG-06: Badge giỏ hàng không hiển thị trên navbar

- **Mức độ:** Trung bình
- **FR:** FR-23 — Link "Giỏ hàng" phải hiển thị badge số lượng
- **File:** `frontend-web/src/App.jsx:23`
- **Mô tả:** Navbar chỉ hiển thị link "Giỏ hàng" dạng text, không có badge hiển thị số lượng sản phẩm.
- **Expected:** `Giỏ hàng (2)` hoặc badge icon với số lượng
- **Actual:** Chỉ "Giỏ hàng"
- **Ảnh hưởng:** TC-UC-FR07-10, TC-UC-FR07-11

### BUG-07: Nhãn nút "← Mua tiếp" không đúng yêu cầu

- **Mức độ:** Thấp
- **FR:** FR-07 — Có nút "Tiếp tục mua sắm" để quay về trang chủ
- **File:** `frontend-web/src/pages/Cart.jsx:66`
- **Mô tả:** Nút quay về trang chủ có nhãn "← Mua tiếp" thay vì "Tiếp tục mua sắm".
- **Expected:** `Tiếp tục mua sắm`
- **Actual:** `← Mua tiếp`
- **Ảnh hưởng:** TC-UC-FR07-10, TC-ST-FR07-10

### BUG-08: Nút "Thêm vào giỏ hàng" cần click 2 lần

- **Mức độ:** Trung bình
- **FR:** FR-06 (liên quan FR-07)
- **File:** `frontend-web/src/pages/ProductDetail.jsx:21-24`
- **Mô tả:** `handleAddToCart` có biến `clickCount`: lần click đầu chỉ set clickCount=1 và return (không làm gì), lần click thứ 2 mới thực sự thêm sản phẩm.
- **Expected:** Click 1 lần là thêm vào giỏ
- **Actual:** Click lần 1 không có tác dụng, click lần 2 mới thêm
- **Ảnh hưởng:** TC-UC-FR07-02, TC-UC-FR07-03, TC-ST-FR07-01, TC-ST-FR07-03

### BUG-09: Đơn giá thiếu ký hiệu ₫

- **Mức độ:** Trung bình
- **FR:** FR-21 — Luôn dùng ký hiệu ₫ với định dạng phân cách hàng nghìn
- **File:** `frontend-web/src/pages/Cart.jsx:46`
- **Mô tả:** Cột Đơn giá hiển thị số (VD: "30,000,000") thiếu ký hiệu ₫ ở cuối.
- **Expected:** `30,000,000 ₫`
- **Actual:** `30,000,000`
- **Ảnh hưởng:** TC-UC-FR07-01

### BUG-10: Nút logout nhãn "Thoát"

- **Mức độ:** Trung bình
- **FR:** FR-23 — Nút Đăng xuất phải nhãn là "Đăng xuất"
- **File:** `frontend-web/src/App.jsx:29`
- **Mô tả:** Nút logout hiển thị "Thoát" thay vì "Đăng xuất".
- **Expected:** `Đăng xuất`
- **Actual:** `Thoát`
- **Ảnh hưởng:** FR-23 (không trực tiếp FR-07)

---

## Thống kê

| Kết quả | Use Case Testing | State Transition Testing |
|---------|-----------------|-------------------------|
| Total TC | 11 | 10 |
| PASS | 0 | 2 (TC-ST-01, TC-ST-10) |
| FAIL | 11 | 8 |
| **Tỉ lệ FAIL** | **100%** | **80%** |

## Nguyên nhân chính

1. **CartContext.jsx** (`addToCart`) không merge sản phẩm trùng → gây lỗi TC-UC-03, TC-ST-03
2. **Cart.jsx** không implement dialog confirm, nút +/-, nhãn "Tổng cộng", hình minh họa → gây lỗi hầu hết TC còn lại
3. **ProductDetail.jsx** có logic clickCount bug → cần 2 click để thêm vào giỏ
