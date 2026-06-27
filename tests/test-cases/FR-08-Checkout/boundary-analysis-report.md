# BÁO CÁO BOUNDARY ANALYSIS
## FR-08: Thanh toán (Checkout)

---

## BƯỚC 1: Xác định Input/Output có dữ liệu số hoặc biên

| STT | Input/Output | Kiểu dữ liệu | Miền giá trị | Biên |
|-----|--------------|---------------|--------------|------|
| 1 | **cart.length** (số SP trong giỏ) | Số nguyên | 0, 1, 2, ... | **0 → 1** (giỏ trống → có SP) |
| 2 | **quantity** (số lượng SP) | Số nguyên | 1, 2, 3, ... | **0 → 1** (bỏ SP → giữ SP) |
| 3 | **price** (giá SP) | Số thực | 0, 0.01, ... | **0 → 0.01** (miễn phí → có phí) |
| 4 | **cartTotal** (tổng tiền giỏ) | Số thực | 0, 0.01, ... | **0 → 0.01** (tổng = 0 → tổng > 0) |
| 5 | **editableTotal** (tổng tiền trên UI) | Số thực | Số thực | **0, cartTotal** (editable vs actual) |

---

## BƯỚC 2: Xác định giá trị xung quanh biên

### Biên 1: cart.length (Số SP trong giỏ)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Tại biên | Giỏ trống | Không checkout được |
| **1** | Trên biên | Giỏ có 1 SP | Checkout được |

### Biên 2: quantity (Số lượng SP)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Tại biên | Bỏ SP khỏi giỏ | SP biến mất |
| **1** | Trên biên | Giữ SP | SP còn 1 |

### Biên 3: price (Giá SP)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Tại biên | Miễn phí | Tổng = 0 |
| **0.01** | Trên biên | Có phí | Tổng > 0 |

### Biên 4: cartTotal (Tổng tiền giỏ)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Tại biên | Tổng = 0 | Không có SP hoặc SP miễn phí |
| **0.01** | Trên biên | Tổng > 0 | Có SP có phí |

### Biên 5: editableTotal (Tổng tiền UI - BUG)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **cartTotal** | Tại biên | Đúng giá trị | FR-08 yêu cầu |
| **cartTotal - 1** | Dưới biên | Nhỏ hơn thực tế | BUG: user có thể sửa |
| **cartTotal + 1** | Trên biên | Lớn hơn thực tế | BUG: user có thể sửa |

---

## BƯỚC 3: Viết Test Cases

### TC01 - Biên cart.length: 0 SP (giỏ trống)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-001 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra không checkout được khi giỏ hàng trống |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng trống (cart.length = 0) |
| **Test Data** | Cart: `[]` |
| **Test Steps** | 1. Đăng nhập<br>2. Truy cập `/checkout` trực tiếp qua URL<br>3. Quan sát giao diện |
| **Expected Result** | - Không hiển thị form thanh toán<br>- Hoặc hiển thị "Giỏ hàng trống" |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC02 - Biên cart.length: 1 SP (giỏ có 1 SP)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-002 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra checkout hoạt động với 1 SP trong giỏ |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có 1 SP |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm 1 SP vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Quan sát giao diện Checkout |
| **Expected Result** | - Hiển thị tên SP, số lượng, thành tiền<br>- Tổng tiền = 100.000 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC03 - Biên quantity: 0 (xóa SP khỏi giỏ)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-003 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra SP bị xóa khi quantity = 0 |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | Medium |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ<br>3. Bấm "Xóa" SP<br>4. Quan sát giỏ hàng |
| **Expected Result** | - SP biến mất khỏi giỏ<br>- cart.length giảm 1 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC04 - Biên quantity: 1 (giữ SP với SL tối thiểu)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-004 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra SP vẫn còn khi quantity = 1 |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP với quantity = 1 |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ<br>3. Kiểm tra số lượng SP = 1<br>4. Quan sát giỏ hàng |
| **Expected Result** | - SP vẫn còn trong giỏ<br>- Thành tiền = 100.000 × 1 = 100.000 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC05 - Biên price: 0 (SP miễn phí)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-005 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra SP miễn phí (price = 0) được xử lý đúng |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | Low |
| **Preconditions** | - Đã đăng nhập<br>- Có SP price = 0 |
| **Test Data** | Cart: `[{name: "Quà tặng", price: 0, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP price = 0 vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Quan sát tổng tiền |
| **Expected Result** | - Thành tiền SP = 0 ₫<br>- Tổng thanh toán = 0 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC06 - Biên price: 0.01 (SP có giá tối thiểu)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-006 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra SP có giá nhỏ nhất được xử lý đúng |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Low |
| **Preconditions** | - Đã đăng nhập<br>- Có SP price = 0.01 |
| **Test Data** | Cart: `[{name: "SP test", price: 0.01, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP price = 0.01 vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Quan sát tổng tiền |
| **Expected Result** | - Thành tiền SP = 0.01 ₫<br>- Tổng thanh toán = 0.01 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC07 - Biên cartTotal: 0 (tổng = 0)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-007 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra checkout với tổng tiền = 0 |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | Medium |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ có SP price = 0 |
| **Test Data** | Cart: `[{name: "Quà tặng", price: 0, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP price = 0 vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Bấm "Xác Nhận Thanh Toán" |
| **Expected Result** | - Thanh toán thành công<br>- Tổng thanh toán hiển thị 0 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC08 - Biên cartTotal: 0.01 (tổng > 0, giá trị nhỏ nhất)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-008 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra checkout với tổng tiền > 0 |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ có SP price = 0.01 |
| **Test Data** | Cart: `[{name: "SP test", price: 0.01, quantity: 1}]` |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP price = 0.01 vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Bấm "Xác Nhận Thanh Toán" |
| **Expected Result** | - Thanh toán thành công<br>- Tổng thanh toán hiển thị 0.01 ₫ |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC09 - Biên editableTotal: = cartTotal (đúng giá trị)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-009 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra editableTotal = cartTotal (giá trị đúng) |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]`, cartTotal = 100000 |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Kiểm tra tổng tiền hiển thị |
| **Expected Result** | - Tổng tiền hiển thị = 100.000 ₫ (= cartTotal) |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC10 - Biên editableTotal: cartTotal - 1 (nhỏ hơn thực tế)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-010 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra user sửa tổng tiền nhỏ hơn thực tế |
| **Technique** | Boundary Value Analysis - Dưới biên |
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP<br>- editableTotal có thể chỉnh sửa (BUG) |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]`, editableTotal = 99999 |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ (cartTotal = 100000)<br>3. Sửa tổng tiền thành 99999 trên input<br>4. Bấm "Xác Nhận Thanh Toán"<br>5. Kiểm tra DB |
| **Expected Result** | - Backend từ chối giá trị 99999<br>- Hoặc backend tự tính lại đúng 100000 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | **BUG-001**: editableTotal cho phép user sửa<br>**BUG-002**: Backend nhận total_amount từ client |

---

### TC11 - Biên editableTotal: cartTotal + 1 (lớn hơn thực tế)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-008-011 |
| **Requirement ID** | FR-08 |
| **Feature** | Boundary Analysis - Thanh toán |
| **Objective** | Kiểm tra user sửa tổng tiền lớn hơn thực tế |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP<br>- editableTotal có thể chỉnh sửa (BUG) |
| **Test Data** | Cart: `[{name: "Áo", price: 100000, quantity: 1}]`, editableTotal = 100001 |
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ (cartTotal = 100000)<br>3. Sửa tổng tiền thành 100001 trên input<br>4. Bấm "Xác Nhận Thanh Toán"<br>5. Kiểm tra DB |
| **Expected Result** | - Backend từ chối giá trị 100001<br>- Hoặc backend tự tính lại đúng 100000 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | **BUG-001**: editableTotal cho phép user sửa<br>**BUG-002**: Backend nhận total_amount từ client |

---

## Tổng hợp Bugs từ Boundary Analysis

| Bug ID | Biên | Mô tả | FR-08 yêu cầu |
|--------|------|-------|----------------|
| **BUG-001** | editableTotal | Input `editableTotal` cho phép user sửa tổng tiền | "Tổng tiền thanh toán không cho phép người dùng chỉnh sửa trực tiếp" |
| **BUG-002** | editableTotal | Backend nhận `total_amount` từ client | "Backend phải tự tính lại tổng tiền; không chấp nhận giá trị total_amount do client gửi lên" |
| **BUG-003** | checkout | `clearCart()` không được gọi sau checkout thành công | "Sau thanh toán thành công, giỏ hàng được xóa" |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-08 - Thanh toán (Checkout)
**Kỹ thuật:** Boundary Value Analysis
