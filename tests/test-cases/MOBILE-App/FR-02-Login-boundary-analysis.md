# BÁO CÁO BOUNDARY ANALYSIS
## FR-02: Đăng nhập & Khóa tài khoản (Mobile)

---

## BƯỚC 1: Xác định Input/Output có dữ liệu số hoặc biên

| STT | Input/Output | Kiểu dữ liệu | Miền giá trị | Biên |
|-----|--------------|---------------|--------------|------|
| 1 | **login_attempts** (số lần đăng nhập sai) | Số nguyên | 0, 1, 2, 3, ... | **2 → 3** (ngưỡng khóa) |
| 2 | **Thời gian khóa** (locked_until) | Thời gian (ms) | 30000 ms (30s) | **29s, 30s, 31s** |
| 3 | **Email** | String | Rỗng / Không rỗng | **"" vs "a"** |
| 4 | **Password** | String | Rỗng / Không rỗng | **"" vs "a"** |

---

## BƯỚC 2: Xác định giá trị xung quanh biên

### Biên 1: login_attempts (Ngưỡng khóa tài khoản)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **1** | Dưới biên | Chưa khóa | Còn 2 lần thử nữa |
| **2** | Dưới biên | Chưa khóa | Còn 1 lần thử nữa |
| **3** | Tại biên | **Bị khóa** | Đúng ngưỡng FR-02 |
| **4** | Trên biên | Bị khóa | Vượt ngưỡng |

### Biên 2: Thời gian khóa (30 giây)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **29 giây** | Dưới biên | Vẫn bị khóa | Chưa hết hạn |
| **30 giây** | Tại biên | Vừa hết khóa | Đúng FR-02 |
| **31 giây** | Trên biên | Đã hết khóa | Hết hạn |

### Biên 3: Email (Rỗng / Không rỗng)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **""** (rỗng) | Tại biên | Invalid | Validation chặn |
| **"a"** (1 ký tự) | Trên biên | Valid (không rỗng) | Chưa kiểm tra format |

### Biên 4: Password (Rỗng / Không rỗng)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **""** (rỗng) | Tại biên | Invalid | Validation chặn |
| **"a"** (1 ký tự) | Trên biên | Valid (không rỗng) | Được chấp nhận |

---

## BƯỚC 3: Viết Test Cases

### TC01 - Biên login_attempts: 2 lần sai → lần thứ 3 sai (2 → 3)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-001 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản bị khóa chính xác khi đạt ngưỡng 3 lần sai |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản tồn tại, `login_attempts = 2`<br>- Tài khoản chưa bị khóa |
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai 2 lần liên tiếp (login_attempts = 2)<br>3. Đăng nhập lần 3 với password sai<br>4. Quan sát giao diện |
| **Expected Result** | - Lần 3: Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."<br>- HTTP Status: 403 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC02 - Biên login_attempts: 1 lần sai → lần thứ 2 sai (1 → 2, chưa khóa)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-002 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản CHƯA bị khóa khi dưới ngưỡng 3 |
| **Technique** | Boundary Value Analysis - Dưới biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản tồn tại, `login_attempts = 1`<br>- Tài khoản chưa bị khóa |
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai 1 lần (login_attempts = 1)<br>3. Đăng nhập lần 2 với password sai<br>4. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại."<br>- Tài khoản CHƯA bị khóa<br>- login_attempts = 2 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC03 - Biên login_attempts: 3 lần sai → lần thứ 4 sai (3 → 4, vẫn khóa)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-003 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản vẫn bị khóa khi đã vượt ngưỡng |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản đang bị khóa (`locked_until` > thời điểm hiện tại) |
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai >= 3 lần để kích hoạt khóa<br>3. Đăng nhập lần nữa khi đang khóa<br>4. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."<br>- HTTP Status: 403 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC04 - Biên thời gian khóa: 29 giây (dưới biên, vẫn khóa)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-004 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản vẫn bị khóa tại 29 giây (dưới biên 30s) |
| **Technique** | Boundary Value Analysis - Dưới biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản vừa bị khóa (cách đây 29 giây) |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>3. Đợi 29 giây<br>4. Đăng nhập với password đúng<br>5. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."<br>- Dù nhập đúng vẫn không đăng nhập được |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC05 - Biên thời gian khóa: 30 giây (tại biên, vừa hết khóa)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-005 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản vừa hết khóa tại đúng 30 giây |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản bị khóa cách đây đúng 30 giây |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>3. Đợi đúng 30 giây<br>4. Đăng nhập với password đúng<br>5. Quan sát giao diện |
| **Expected Result** | - Đăng nhập thành công<br>- Chuyển màn hình về Home<br>- login_attempts được reset về 0 |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC06 - Biên thời gian khóa: 31 giây (trên biên, đã hết khóa)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-006 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra tài khoản đã hết khóa sau 31 giây |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Mở app Mobile<br>- Tài khoản bị khóa cách đây 31 giây |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Mở app Mobile<br>2. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>3. Đợi 31 giây<br>4. Đăng nhập với password đúng<br>5. Quan sát giao diện |
| **Expected Result** | - Đăng nhập thành công<br>- Chuyển màn hình về Home |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC07 - Biên Email: Rỗng (tại biên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-007 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra validation khi Email bỏ trống |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile |
| **Test Data** | Email: `""`, Password: `pass123` |
| **Test Steps** | 1. Mở app Mobile<br>2. Không nhập gì vào trường Email<br>3. Nhập `pass123` vào trường Password<br>4. Tap Sign In |
| **Expected Result** | - Validation: "Vui lòng nhập email"<br>- Form không submit |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC08 - Biên Email: 1 ký tự (trên biên, không rỗng)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-008 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra email 1 ký tự được chấp nhận (không rỗng) |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Mở app Mobile |
| **Test Data** | Email: `a`, Password: `pass123` |
| **Test Steps** | 1. Mở app Mobile<br>2. Nhập `a` vào trường Email<br>3. Nhập `pass123` vào trường Password<br>4. Tap Sign In |
| **Expected Result** | - Form submit được (vì không rỗng)<br>- Server trả về lỗi "Invalid email or password" |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC09 - Biên Password: Rỗng (tại biên)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-009 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra validation khi Password bỏ trống |
| **Technique** | Boundary Value Analysis - Tại biên |
| **Priority** | High |
| **Preconditions** | - Mở app Mobile |
| **Test Data** | Email: `user@email.com`, Password: `""` |
| **Test Steps** | 1. Mở app Mobile<br>2. Nhập `user@email.com` vào trường Email<br>3. Không nhập gì vào trường Password<br>4. Tap Sign In |
| **Expected Result** | - Validation: "Vui lòng nhập mật khẩu"<br>- Form không submit |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

### TC10 - Biên Password: 1 ký tự (trên biên, không rỗng)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-BA-M-010 |
| **Requirement ID** | FR-02 |
| **Feature** | Boundary Analysis - Đăng nhập & Khóa tài khoản (Mobile) |
| **Objective** | Kiểm tra password 1 ký tự được chấp nhận (không rỗng) |
| **Technique** | Boundary Value Analysis - Trên biên |
| **Priority** | Medium |
| **Preconditions** | - Mở app Mobile |
| **Test Data** | Email: `user@email.com`, Password: `a` |
| **Test Steps** | 1. Mở app Mobile<br>2. Nhập `user@email.com` vào trường Email<br>3. Nhập `a` vào trường Password<br>4. Tap Sign In |
| **Expected Result** | - Form submit được (vì không rỗng)<br>- Server trả về lỗi "Invalid email or password" |
| **Actual Result** | (Chưa thực hiện) |
| **Status** | Not Run |
| **Notes** | |

---

## Tổng hợp Bugs từ Boundary Analysis

| Bug ID | Biên | Mô tả | FR-02 yêu cầu |
|--------|------|-------|----------------|
| **BUG-001** | login_attempts | Cần kiểm tra backend có cộng đúng +1 hay không | Tăng đúng 1 đơn vị |
| **BUG-002** | Thời gian khóa | Cần kiểm tra backend set đúng 30s hay không | Khóa 30 giây |
| **BUG-003** | Email/Password | Cần kiểm tra validation message trên Mobile | Thông báo lỗi phù hợp |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-02 - Đăng nhập & Khóa tài khoản (Mobile)
**Kỹ thuật:** Boundary Value Analysis
**Platform:** Mobile App
