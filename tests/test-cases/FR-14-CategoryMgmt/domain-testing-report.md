# BÁO CÁO DOMAIN TESTING
## FR-14: Quản lý Danh mục (Category CRUD)

---

## 1. Xác định Input và Output

### 1.1 Input (trên giao diện Admin Category)

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Tên danh mục** | Text field | Nhập tên danh mục mới |
| I2 | **Nút "Thêm mới"** | Button | Bấm để thêm danh mục |
| I3 | **Nút "Xóa"** | Button | Bấm để xóa danh mục |

### 1.2 Output (trên giao diện Admin Category)

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Bảng danh sách danh mục** | Table | Hiển thị ID, Tên danh mục |
| O2 | **Thông báo thành công** | Text | Hiển thị khi thêm/xóa thành công |
| O3 | **Thông báo lỗi** | Alert | Hiển thị khi thao tác thất bại |

---

## 2. Xác định tất cả miền giá trị (Valid & Invalid)

### 2.1 Miền giá trị cho Input

#### Input I1 - Tên danh mục

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M1 | `""` (bỏ trống) | **Invalid** | FR-14: "Tên danh mục là bắt buộc, không được để trống" |
| M2 | Khoảng trắng chỉ (`"   "`) | **Invalid** | Chỉ chứa space, thực tế rỗng |
| M3 | Chuỗi bất kỳ (vd: `"Điện thoại"`, `"Quần áo"`) | **Valid** | Tên hợp lệ |
| M4 | Ký tự đặc biệt (vd: `"@#$%"`) | **Valid** | Chưa bị cấm theo FR-14 |
| M5 | Tên trùng với danh mục đã có | **Invalid** | Trùng lặp (nếu có validation) |
| M6 | Chuỗi rất dài (vd: 255+ ký tự) | **Invalid** | Vượt quá độ dài cho phép |

#### Input I2 - Nút "Thêm mới"

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M7 | Bấm khi tên rỗng | **Invalid** | Không được thêm |
| M8 | Bấm khi tên hợp lệ | **Valid** | Thêm thành công |

#### Input I3 - Nút "Xóa"

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M9 | Bấm Xóa trên danh mục không có SP liên kết | **Valid** | Xóa thành công |
| M10 | Bấm Xóa trên danh mục có SP liên kết | **Invalid** | Cần xử lý đặc biệt |
| M11 | Bấm Xóa trên danh mục không tồn tại (ID sai) | **Invalid** | Báo lỗi |

### 2.2 Miền giá trị cho Output

#### Output O1 - Bảng danh sách

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | Hiển thị danh sách với ID và Tên | **Valid** | Dữ liệu đúng |
| O1.2 | Bảng trống (không có danh mục nào) | **Valid** | Chưa có dữ liệu |

#### Output O2 - Kết quả thêm danh mục

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Danh mục mới xuất hiện trong bảng | **Valid** | Thêm thành công |
| O2.2 | Báo lỗi khi thêm thất bại | **Invalid** | Thêm thất bại |

#### Output O3 - Kết quả xóa danh mục

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O3.1 | Danh mục biến mất khỏi bảng | **Valid** | Xóa thành công |
| O3.2 | Báo lỗi khi xóa thất bại | **Invalid** | Xóa thất bại |

---

## 3. Xác định giá trị đại diện từng miền

| Miền | Giá trị đại diện | Chọn lý do |
|------|-----------------|------------|
| M1 | `""` | Đại diện rỗng duy nhất |
| M2 | `"   "` | Đại diện chỉ có space |
| M3 | `"Điện thoại"` | Đại diện tên hợp lệ |
| M4 | `"@#$%"` | Đại diện ký tự đặc biệt |
| M5 | `"Điện thoại"` (trùng) | Đại diện trùng tên |
| M6 | Chuỗi 300 ký tự | Đại diện quá dài |
| M7 | Bấm Thêm mới khi rỗng | Đại diện thao tác invalid |
| M8 | Bấm Thêm mới khi hợp lệ | Đại diện thao tác valid |
| M9 | Xóa danh mục không có SP | Đại diện xóa an toàn |
| M10 | Xóa danh mục có SP | Đại diện xóa có liên kết |
| M11 | Xóa ID không tồn tại | Đại diện xóa vô hiệu |
| O1.1 | Bảng hiển thị danh mục | Đại diện có dữ liệu |
| O1.2 | Bảng trống | Đại diện không có dữ liệu |
| O2.1 | Danh mục mới trong bảng | Đại diện thêm thành công |
| O3.1 | Danh mục biến mất | Đại diện xóa thành công |

---

## 4. Xác định Test Cases (mỗi miền → mỗi test case)

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC01 | M1 | Nhập tên `""` → bấm "Thêm mới" | Báo lỗi "Tên danh mục không được để trống" |
| TC02 | M2 | Nhập tên `"   "` → bấm "Thêm mới" | Báo lỗi hoặc coi như rỗng |
| TC03 | M3 | Nhập tên `"Điện thoại"` → bấm "Thêm mới" | Thêm thành công, xuất hiện trong bảng |
| TC04 | M4 | Nhập tên `"@#$%"` → bấm "Thêm mới" | Thêm thành công (FR-14 không cấm) |
| TC05 | M5 | Nhập tên trùng `"Điện thoại"` → bấm "Thêm mới" | Báo lỗi trùng tên hoặc thêm thành công (tùy policy) |
| TC06 | M6 | Nhập tên 300 ký tự → bấm "Thêm mới" | Báo lỗi độ dài |
| TC07 | M9 | Bấm "Xóa" trên danh mục không có SP | Xóa thành công, biến mất khỏi bảng |
| TC08 | M10 | Bấm "Xóa" trên danh mục có SP liên kết | Báo lỗi hoặc cảnh báo |
| TC09 | M11 | Gọi API xóa danh mục ID không tồn tại | Báo lỗi "Category not found" |
| TC10 | O1.1 | Đăng nhập Admin → xem danh mục | Bảng hiển thị ID và Tên danh mục |
| TC11 | O1.2 | Xem danh mục khi chưa có danh mục nào | Bảng trống hoặc thông báo "Chưa có danh mục" |

---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC01 | M1 | Tên rỗng → Thêm mới | Báo lỗi | **Giữ** |
| TC02 | M2 | Tên `"   "` → Thêm mới | Báo lỗi | **Bỏ** (trùng TC01 - cùng invalid rỗng) |
| TC03 | M3 | Tên `"Điện thoại"` → Thêm mới | Thêm thành công | **Giữ** |
| TC04 | M4 | Tên `"@#$%"` → Thêm mới | Thêm thành công | **Bỏ** (trùng TC03 - cùng valid name) |
| TC05 | M5 | Tên trùng → Thêm mới | Báo lỗi/trùng | **Bỏ** (FR-14 không quy định về trùng) |
| TC06 | M6 | Tên 300 ký tự → Thêm mới | Báo lỗi độ dài | **Bỏ** (FR-14 không quy định giới hạn độ dài) |
| TC07 | M9 | Xóa danh mục không có SP | Xóa thành công | **Giữ** |
| TC08 | M10 | Xóa danh mục có SP | Báo lỗi/cảnh báo | **Giữ** |
| TC09 | M11 | Xóa ID không tồn tại | Báo lỗi | **Bỏ** (trùng TC08 - cùng xóa invalid) |
| TC10 | O1.1 | Xem danh mục | Bảng hiển thị | **Giữ** |
| TC11 | O1.2 | Danh mục trống | Bảng trống | **Bỏ** (trùng TC10 - cùng output xem) |

### Kết quả rút gọn: **5 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC01 | M1 | Nhập tên `""` → bấm "Thêm mới" | Báo lỗi "Tên danh mục không được để trống" |
| 2 | TC02 | M3 | Nhập tên `"Điện thoại"` → bấm "Thêm mới" | Thêm thành công, danh mục xuất hiện trong bảng |
| 3 | TC03 | M9 | Bấm "Xóa" trên danh mục không có sản phẩm | Xóa thành công, danh mục biến mất khỏi bảng |
| 4 | TC04 | M10 | Bấm "Xóa" trên danh mục có sản phẩm liên kết | Báo lỗi hoặc cảnh báo, danh mục KHÔNG bị xóa |
| 5 | TC05 | O1.1 | Đăng nhập Admin → xem danh mục | Bảng hiển thị ID và Tên danh mục đầy đủ |

---

## Bugs tìm thấy từ Code Review

| Bug ID | File | Dòng | Mô tả | FR-14 yêu cầu |
|--------|------|------|-------|----------------|
| **BUG-001** | `server.js` | 251 | Backend `POST /api/categories` KHÔNG validate `name` rỗng | "Tên danh mục là bắt buộc, không được để trống" |
| **BUG-002** | `App.jsx` | 298-304 | Input tên danh mục KHÔNG có `required` attribute | Cần validate phía client |
| **BUG-003** | `App.jsx` | 325 | Không có xác nhận trước khi xóa danh mục | Nên có confirmation dialog |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-14 - Quản lý Danh mục (Category CRUD)
