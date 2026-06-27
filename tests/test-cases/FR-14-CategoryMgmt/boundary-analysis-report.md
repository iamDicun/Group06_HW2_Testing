# BÁO CÁO BOUNDARY ANALYSIS
## FR-14: Quản lý Danh mục (Category CRUD)

---

## BƯỚC 1: Xác định Input/Output có dữ liệu số hoặc biên

| STT | Input/Output | Kiểu dữ liệu | Miền giá trị | Biên |
|-----|--------------|---------------|--------------|------|
| 1 | **name** (tên danh mục) | String | Rỗng / Không rỗng | **"" vs "a"** |
| 2 | **category.id** (ID danh mục) | Số nguyên | 1, 2, 3, ... / 0, -1 | **0 → 1** (không tồn tại → tồn tại) |
| 3 | **categories.length** (số lượng DM) | Số nguyên | 0, 1, 2, ... | **0 → 1** (trống → có dữ liệu) |

---

## BƯỚC 2: Xác định giá trị xung quanh biên

### Biên 1: Category name (Rỗng / Không rỗng)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **""** (rỗng) | Tại biên | Invalid | FR-14: "Tên danh mục là bắt buộc" |
| **"   "** (chỉ space) | Tại biên | Invalid | Thực tế rỗng |
| **"a"** (1 ký tự) | Trên biên | Valid | Tên hợp lệ tối thiểu |

### Biên 2: Category ID (Tồn tại / Không tồn tại)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Dưới biên | Không tồn tại | ID bắt đầu từ 1 |
| **1** | Tại biên | Tồn tại | ID đầu tiên |
| **999999** | Trên biên | Không tồn tại | ID quá lớn |

### Biên 3: categories.length (Số lượng DM)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Tại biên | Bảng trống | Chưa có DM nào |
| **1** | Trên biên | Bảng có 1 DM | Có dữ liệu |

---

## BƯỚC 3: Viết Test Cases

### TC01 - Biên name: Rỗng (tại biên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-001 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra không thêm được danh mục khi tên rỗng |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Đăng nhập Admin<br>- Truy cập trang Quản lý Danh mục |
| **Test Data** | Name: `""` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Vào trang Quản lý Danh mục<br>3. Để trống trường tên danh mục<br>4. Bấm "Thêm mới" |
| **Expected Result** | - Báo lỗi "Tên danh mục không được để trống"<br>- Danh mục KHÔNG được thêm vào DB |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | **BUG-001**: Backend không validate name rỗng |

---

### TC02 - Biên name: Chỉ có space (tại biên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-002 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra không thêm được danh mục khi tên chỉ có space |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Đăng nhập Admin<br>- Truy cập trang Quản lý Danh mục |
| **Test Data** | Name: `"   "` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Vào trang Quản lý Danh mục<br>3. Nhập `"   "` (3 space) vào trường tên<br>4. Bấm "Thêm mới" |
| **Expected Result** | - Báo lỗi hoặc coi như rỗng<br>- Danh mục KHÔNG được thêm vào DB |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC03 - Biên name: 1 ký tự (trên biên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-003 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra thêm được danh mục khi tên 1 ký tự |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | High |
| **Preconditions** | - Đăng nhập Admin<br>- Truy cập trang Quản lý Danh mục |
| **Test Data** | Name: `"A"` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Vào trang Quản lý Danh mục<br>3. Nhập `"A"` vào trường tên<br>4. Bấm "Thêm mới" |
| **Expected Result** | - Thêm thành công<br>- Danh mục "A" xuất hiện trong bảng |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC04 - Biên ID: 0 (không tồn tại)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-004 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra xóa danh mục ID = 0 (không tồn tại) |
| **Technique** | Boundary Value Analysis - Dưới biên |
| **Priority** | Medium |
| **Preconditions** | - Đăng nhập Admin |
| **Test Data** | Category ID: `0` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Gọi API `DELETE /api/categories/0`<br>3. Quan sát phản hồi |
| **Expected Result** | - Báo lỗi hoặc không tìm thấy<br>- Không có gì thay đổi trong DB |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC05 - Biên ID: 1 (tồn tại, ID đầu tiên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-005 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra xóa danh mục ID = 1 (tồn tại) |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | Medium |
| **Preconditions** | - Đăng nhập Admin<br>- Danh mục ID = 1 tồn tại |
| **Test Data** | Category ID: `1` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Xem danh sách danh mục<br>3. Bấm "Xóa" trên danh mục ID = 1<br>4. Quan sát danh sách |
| **Expected Result** | - Xóa thành công<br>- Danh mục ID = 1 biến mất khỏi bảng |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC06 - Biên ID: 999999 (không tồn tại)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-006 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra xóa danh mục ID = 999999 (không tồn tại) |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Đăng nhập Admin |
| **Test Data** | Category ID: `999999` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Gọi API `DELETE /api/categories/999999`<br>3. Quan sát phản hồi |
| **Expected Result** | - Báo lỗi hoặc không tìm thấy<br>- Không có gì thay đổi trong DB |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC07 - Biên categories.length: 0 (bảng trống)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-007 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra hiển thị khi chưa có danh mục nào |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | Low |
| **Preconditions** | - Đăng nhập Admin<br>- Chưa có danh mục nào trong DB |
| **Test Data** | Categories: `[]` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Vào trang Quản lý Danh mục<br>3. Quan sát bảng danh sách |
| **Expected Result** | - Bảng hiển thị rỗng (0 dòng dữ liệu)<br> Hoặc thông báo "Chưa có danh mục" |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC08 - Biên categories.length: 1 (bảng có 1 DM)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-014-008 |
| **Requirement ID** | FR-14 |
| **Feature** | Boundary Analysis - Quản lý Danh mục |
| **Objective** | Kiểm tra hiển thị khi có 1 danh mục |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Low |
| **Preconditions** | - Đăng nhập Admin<br>- Có 1 danh mục trong DB |
| **Test Data** | Categories: `[{id: 1, name: "Điện thoại"}]` |
| **Test Steps** | 1. Đăng nhập Admin<br>2. Thêm 1 danh mục<br>3. Vào trang Quản lý Danh mục<br>4. Quan sát bảng danh sách |
| **Expected Result** | - Bảng hiển thị 1 dòng<br>- Hiển thị ID và Tên danh mục |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

## Tổng hợp Bugs từ Boundary Analysis

| Bug ID | Biên | Mô tả | FR-14 yêu cầu |
|--------|------|-------|----------------|
| **BUG-001** | name | Backend không validate name rỗng khi POST | "Tên danh mục là bắt buộc, không được để trống" |
| **BUG-002** | name | Input không có `required` attribute | Cần validate phía client |
| **BUG-003** | ID | Không có confirmation dialog trước khi xóa | Nên có xác nhận |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-14 - Quản lý Danh mục (Category CRUD)
**Kỹ thuật:** Boundary Value Analysis
