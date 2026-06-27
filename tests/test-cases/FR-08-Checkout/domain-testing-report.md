# BÁO CÁO DOMAIN TESTING
## FR-08: Thanh toán (Checkout)

---

## 1. Xác định Input và Output

### 1.1 Input (trên giao diện Checkout)

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Nút "Xác Nhận Thanh Toán"** | Button | Bấm để gửi đơn hàng |
| I2 | **Giỏ hàng (cart)** | State | Danh sách sản phẩm từ CartContext |
| I3 | **Mã giảm giá** | Text field | Nhập mã giảm giá (tùy chọn) |

### 1.2 Output (trên giao diện Checkout)

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Danh sách sản phẩm** | List | Hiển thị tên, số lượng, thành tiền mỗi sản phẩm |
| O2 | **Tổng tiền thanh toán** | Text/Input | Tổng tiền tự động từ giỏ hàng |
| O3 | **Thông báo thành công** | Text | "Thanh toán thành công!" sau khi checkout OK |
| O4 | **Thông báo lỗi** | Alert/Text | Hiển thị khi thanh toán thất bại |
| O5 | **Redirect về Login** | Navigation | Chuyển trang khi chưa đăng nhập |
| O6 | **Giỏ hàng trống** | State | Cart được xóa sau thanh toán thành công |

---

## 2. Xác định tất cả miền giá trị (Valid & Invalid)

### 2.1 Miền giá trị cho Input

#### Input I1 - Trạng thái đăng nhập

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M1 | Chưa đăng nhập (`user = null`) | **Invalid** | Không được phép checkout |
| M2 | Đã đăng nhập (`user ≠ null`, `token` hợp lệ) | **Valid** | Được phép checkout |

#### Input I2 - Giỏ hàng (cart)

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M3 | Giỏ hàng trống (`cart.length = 0`) | **Invalid** | Không có sản phẩm để thanh toán |
| M4 | Giỏ hàng có 1 sản phẩm | **Valid** | Đơn hàng 1 sản phẩm |
| M5 | Giỏ hàng có nhiều sản phẩm (≥ 2) | **Valid** | Đơn hàng nhiều sản phẩm |

#### Input I3 - Tổng tiền trên giao diện (editableTotal)

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M6 | Tổng tiền = `cartTotal` (giá trị gốc) | **Valid** | Giá trị đúng |
| M7 | Tổng tiền ≠ `cartTotal` (user chỉnh sửa) | **Invalid** | FR-08 không cho phép chỉnh sửa |

### 2.2 Miền giá trị cho Output

#### Output O1 - Danh sách sản phẩm

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | Hiển thị đầy đủ tên, SL, thành tiền | **Valid** | Đúng yêu cầu FR-08 |
| O1.2 | Thiếu sản phẩm hoặc thông tin sai | **Invalid** | Sai yêu cầu |

#### Output O2 - Tổng tiền

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Tổng = `Σ(price × quantity)` từ cart | **Valid** | Tính đúng |
| O2.2 | Tổng ≠ `Σ(price × quantity)` từ cart | **Invalid** | Tính sai |

#### Output O3 - Kết quả thanh toán

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O3.1 | "Thanh toán thành công!" + redirect | **Valid** | Thành công |
| O3.2 | Alert "Lỗi khi thanh toán..." | **Invalid** | Thất bại |
| O3.3 | Alert "Bạn cần đăng nhập để thanh toán!" | **Invalid** | Chưa đăng nhập |

#### Output O4 - Giỏ hàng sau thanh toán

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O4.1 | Giỏ hàng bị xóa (`cart.length = 0`) | **Valid** | Đúng FR-08 |
| O4.2 | Giỏ hàng vẫn còn sản phẩm | **Invalid** | Sai FR-08 |

---

## 3. Xác định giá trị đại diện từng miền

| Miền | Giá trị đại diện | Chọn lý do |
|------|-----------------|------------|
| M1 | Chưa đăng nhập | Đại diện trạng thái chưa xác thực |
| M2 | Đã đăng nhập (token hợp lệ) | Đại diện trạng thái đã xác thực |
| M3 | Cart rỗng (`[]`) | Đại diện giỏ hàng trống |
| M4 | Cart 1 sản phẩm: `[{name: "Áo", price: 100000, quantity: 1}]` | Đại diện đơn hàng đơn giản |
| M5 | Cart 2+ sản phẩm: `[{...}, {...}]` | Đại diện đơn hàng phức tạp |
| M6 | `editableTotal = 200000` (= cartTotal) | Đại diện giá trị đúng |
| M7 | `editableTotal = 10000` (≠ cartTotal) | Đại diện giá trị bị chỉnh sửa |
| O1.1 | Hiển thị đủ: tên, SL, thành tiền | Đại diện output đúng |
| O2.1 | Tổng = `200000` (đúng công thức) | Đại diện tổng đúng |
| O3.1 | "Thanh toán thành công!" | Đại diện thành công |
| O3.2 | "Lỗi khi thanh toán..." | Đại diện thất bại |
| O3.3 | "Bạn cần đăng nhập để thanh toán!" | Đại diện chưa đăng nhập |
| O4.1 | Cart = `[]` sau checkout | Đại diện cart trống |

---

## 4. Xác định Test Cases (mỗi miền → mỗi test case)

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Alert "Bạn cần đăng nhập để thanh toán!" → redirect `/login` |
| TC02 | M3 | Đăng nhập → giỏ hàng trống → truy cập `/checkout` | Hiển thị "Giỏ hàng của bạn đang trống" |
| TC03 | M4 | Đăng nhập → giỏ hàng 1 sản phẩm → checkout | Hiển thị tên, SL, thành tiền, tổng tiền đúng |
| TC04 | M5 | Đăng nhập → giỏ hàng 2+ sản phẩm → checkout | Hiển thị đầy đủ tất cả sản phẩm, tổng đúng |
| TC05 | M6 | Tổng tiền hiển thị đúng = `cartTotal` | Tổng tiền = `Σ(price × quantity)` |
| TC06 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend từ chối, không tạo đơn hàng (hoặc tính lại đúng) |
| TC07 | O3.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |
| TC08 | O4.1 | Sau checkout thành công | Giỏ hàng bị xóa (cart = `[]`) |
| TC09 | O3.2 | Checkout thất bại (server error) | Alert "Lỗi khi thanh toán..." |
| TC10 | O2.1 | Kiểm tra tổng tiền trên UI | Tổng = `Σ(price × quantity)` từ cart |

---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC01 | M1 | Chưa đăng nhập → bấm thanh toán | Alert "Bạn cần đăng nhập..." | **Giữ** |
| TC02 | M3 | Giỏ hàng trống → checkout | "Giỏ hàng trống" | **Giữ** |
| TC03 | M4 | Giỏ hàng 1 SP → checkout | Hiển thị đúng thông tin | **Giữ** |
| TC04 | M5 | Giỏ hàng 2+ SP → checkout | Hiển thị đầy đủ | **Bỏ** (trùng TC03 - cùng kiểm thử hiển thị danh sách) |
| TC05 | M6 | Tổng tiền = cartTotal | Tổng đúng | **Bỏ** (trùng TC03 - đã kiểm tra ở TC03) |
| TC06 | M7 | User sửa tổng tiền → checkout | Backend từ chối | **Giữ** |
| TC07 | O3.1 | Checkout thành công | "Thanh toán thành công!" | **Giữ** |
| TC08 | O4.1 | Sau checkout thành công | Cart = `[]` | **Giữ** |
| TC09 | O3.2 | Checkout thất bại | Alert lỗi | **Giữ** |
| TC10 | O2.1 | Kiểm tra tổng tiền UI | Tổng đúng | **Bỏ** (trùng TC03) |

### Kết quả rút gọn: **7 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" | Alert "Bạn cần đăng nhập để thanh toán!" → redirect `/login` |
| 2 | TC02 | M3 | Đăng nhập → giỏ hàng trống → truy cập `/checkout` | Hiển thị "Giỏ hàng của bạn đang trống" |
| 3 | TC03 | M4 | Đăng nhập → giỏ hàng 1 SP → checkout | Hiển thị tên, SL, thành tiền; Tổng = `Σ(price × quantity)` |
| 4 | TC04 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend tự tính lại đúng, không chấp nhận giá trị client gửi |
| 5 | TC05 | O3.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |
| 6 | TC06 | O4.1 | Sau checkout thành công | Giỏ hàng bị xóa (cart = `[]`) |
| 7 | TC07 | O3.2 | Checkout thất bại (server error) | Alert "Lỗi khi thanh toán..." |

---

## Bugs tìm thấy từ Code Review

| Bug ID | File | Dòng | Mô tả | FR-08 yêu cầu |
|--------|------|------|-------|----------------|
| **BUG-001** | `Checkout.jsx` | 14, 93-102 | `editableTotal` cho phép user sửa tổng tiền | "Tổng tiền thanh toán không cho phép người dùng chỉnh sửa trực tiếp" |
| **BUG-002** | `Checkout.jsx` | 45-51 | Client gửi `total_amount` lên backend | "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị total_amount do client gửi lên" |
| **BUG-003** | `Checkout.jsx` | 61 | `clearCart()` không được gọi sau checkout thành công | "Sau thanh toán thành công, giỏ hàng được xóa" |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-08 - Thanh toán (Checkout)
