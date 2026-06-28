# Chức năng: Đăng nhập & Khóa tài khoản (FR-02)

## DOMAIN TESTING

## 1. Xác định Input và Output

### 1.1 Input

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Email (Username)** | Text field | Trường nhập địa chỉ email |
| I2 | **Password** | Text field | Trường nhập mật khẩu |
| I3 | **Số lần đăng nhập sai liên tiếp** | Hidden state | Số lần đăng nhập sai liên tiếp |

### 1.2 Output

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Thông báo lỗi** | Text | Hiển thị khi đăng nhập sai hoặc tài khoản bị khóa |
| O2 | **Chuyển trang** | Navigation | Chuyển về trang chủ khi đăng nhập thành công |
| O3 | **HTML5 Validation** | Browser popup | Thông báo khi input bỏ trống hoặc sai định dạng |

---

## 2. Xác định tất cả miền giá trị (Valid & Invalid)

### 2.1 Miền giá trị cho Input

#### Input I1 - Email (Username)

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M1 | `""` (bỏ trống) | **Invalid** | Trường không được bỏ trống (required) |
| M2 | Chuỗi không có `@` (vd: `abc`, `test123`) | **Invalid** | Sai định dạng email |
| M3 | Có `@` nhưng sai định dạng (vd: `abc@`, `@email.com`, `a@b`) | **Invalid** | Sai định dạng email |
| M4 | Đúng định dạng email (vd: `user@email.com`, `test@gmail.com`) | **Valid** | Email hợp lệ |

#### Input I2 - Password

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M5 | `""` (bỏ trống) | **Invalid** | Trường không được bỏ trống (required) |
| M6 | Chuỗi password sai với email (vd: `pass123`, `123456`, `abc`) | **Valid** | Password sai |
| M6 | Chuỗi password đúng với email (vd: `User 123`) | **Valid** | Password hợp lệ |

#### Input I3 - Số lần đăng nhập sai liên tiếp

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M8 | `0` lần (lần đầu đăng nhập) | **Valid** | Chưa có lần sai nào |
| M9 | `1` `2` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M10 | `≥ 3` lần sai liên tiếp | **Valid** | Kích hoạt khóa tài khoản |

### 2.2 Miền giá trị cho Output

#### Output O1 - Thông báo trên giao diện

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | **Valid** | Đăng nhập sai, chưa khóa |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | **Invalid** | Đăng nhập sai ≥ 3 lần |
| O1.3 | Không hiển thị thông báo lỗi | **Valid** | Đăng nhập thành công |

#### Output O2 - Chuyển trang

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Chuyển về trang chủ | **Valid** | Đăng nhập thành công |
| O2.2 | Vẫn ở trang đăng nhập | **Invalid** | Đăng nhập thất bại |

#### Output O3 - HTML5 Validation

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O3.1 | `"Vui lòng điền vào trường này"` | **Valid** | Bỏ trống trường required |
| O3.2 | `"Please include an '@' in the email address"` | **Valid** | Sai định dạng email |

---

## 3. Xác định giá trị đại diện từng miền

| Miền | Giá trị đại diện | Chọn lý do |
|------|-----------------|------------|
| M1 | `""` | Đại diện email giá trị rỗng|
| M2 | `"abc"` | Đại diện chuỗi không có `@` |
| M3 | `"abc@"` | Đại diện có `@` nhưng sai định dạng |
| M4 | `"user@email.com"` | Đại diện email đúng định dạng |
| M5 | `""` | Đại diện password có giá trị rỗng|
| M6 | `"pass123"` | Đại diện password sai so với tài khoản |
| M7 | `"User 123"` | Đại diện password đúng so với tài khoản |
| M8 | `0` | Đại diện chưa sai lần nào |
| M9 | `1` | Đại diện sai nhưng chưa khóa |
| M10 | `3` | Đại diện ngưỡng kích hoạt khóa |
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | Đại diện thông báo lỗi chung |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | Đại diện thông báo khóa |
| O1.3 | `Không hiện thông báo lỗi` | Đăng nhập thành công |
| O2.1 | `Chuyển về trang chủ` | Đại diện đăng nhập thành công |
| O2.2 | `Vẫn ở trang login` | Đại diện đăng nhập thất bại |
| O3.1 | `"Vui lòng điền vào trường này"` | Đại diện lỗi bỏ trống |
| O3.2 | `"Please include an '@'"` | Đại diện lỗi sai format |

---

## 4. Xác định Test Cases

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC01 | M1 | Email=`""`, Password=`"User 123"`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" |
| TC02 | M2 | Email=`"abc"`, Password=`"User 123"`, bấm Sign In | HTML5: "Please include an '@'" |
| TC03 | M3 | Email=`"abc@"`, Password=`"User 123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC04 | M4 | Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ |
| TC05 | M5 | Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" |
| TC06 | M6 | Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại."|
| TC07 | M7 | Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ |
| TC08 | M8 | Đăng nhập lần đầu với đúng password |  Chuyển trang về trang chủ |
| TC09 | M9 | Đăng nhập sai 1 lần| "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC10 | M10 | Đăng nhập sai 3 lần liên tiếp| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| TC11 | O1.1 | Đăng nhập sai (chưa khóa) | Hiển thị "Đăng nhập thất bại..." |
| TC12 | O1.2 | Đăng nhập sai ≥ 3 lần | Hiển thị "Tài khoản đã bị khóa..." |
| TC13 | O1.3 | Đăng nhập đúng (email + password hợp lệ) | Không hiện thông báo lỗi|
| TC14 | O2.1 | Đăng nhập đúng (email + password hợp lệ) | Chuyển trang về trang chủ |
| TC15 | O2.2 | Đăng nhập sai | Vẫn ở trang đăng nhập |
| TC16 | O3.1 | Bỏ trống Email hoặc Password | "Vui lòng điền vào trường này" |
| TC17 | O3.2 | Email không có `@` | "Please include an '@'" |

---

## 5. Rút gọn Test Cases

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC01 | M1 | Email=`""`, Password=`"User 123"`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" | **Giữ** |
| TC02 | M2 | Email=`"abc"`, Password=`"User 123"`, bấm Sign In | HTML5: "Please include an '@'" | **Giữ** |
| TC03 | M3 | Email=`"abc@"`, Password=`"User 123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |**Giữ** |
| TC04 | M4 | Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ | **Giữ** |
| TC05 | M5 | Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" |**Giữ** |
| TC06 | M6 | Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại."|**Giữ** |
| TC07 | M7 | Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ |**Bỏ** Trùng với TC04|
| TC08 | M8 | Đăng nhập lần đầu với đúng password |  Chuyển trang về trang chủ |**Bỏ** Trùng với TC04|
| TC09 | M9 | Đăng nhập sai 1 lần| "Đăng nhập thất bại. Vui lòng kiểm tra lại." |**Bỏ** Trùng với TC06|
| TC10 | M10 | Đăng nhập sai 3 lần liên tiếp| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |**Giữ**|
| TC11 | O1.1 | Đăng nhập sai (chưa khóa) | Hiển thị "Đăng nhập thất bại..." |**Bỏ** Trùng với TC06|
| TC12 | O1.2 | Đăng nhập sai ≥ 3 lần | Hiển thị "Tài khoản đã bị khóa..." |**Bỏ** Trùng với TC10|
| TC13 | O1.3 | Đăng nhập đúng (email + password hợp lệ) | Không hiện thông báo lỗi|**Bỏ** Trùng với TC04|
| TC14 | O2.1 | Đăng nhập đúng (email + password hợp lệ) | Chuyển trang về trang chủ |**Bỏ** Trùng với TC04|
| TC15 | O2.2 | Đăng nhập sai | Vẫn ở trang đăng nhập |**Bỏ** Trùng với TC06|
| TC16 | O3.1 | Bỏ trống Email hoặc Password | "Vui lòng điền vào trường này" |**Bỏ** Trùng với TC01, TC05|
| TC17 | O3.2 | Email không có `@` | "Please include an '@'" |**Bỏ** Trùng với TC02|

### Kết quả rút gọn: **7 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1  |TC01 | M1 | Email=`""`, Password=`"User 123"`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" | 
| 2  | TC02 | M2 | Email=`"abc"`, Password=`"User 123"`, bấm Sign In | HTML5: "Please include an '@'" |
| 3  | TC03 | M3 | Email=`"abc@"`, Password=`"User 123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 4  | TC04 | M4 | Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ |
| 5  | TC05 | M5 | Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" |
| 6  | TC06 | M6 | Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại."|
| 7  | TC07 | M10 | Đăng nhập sai 3 lần liên tiếp| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
---
**Đổi TC10 ở mục 4 được đổi ID thành TC07 ở kết luận cuối cùng để dễ dàng quản lý**

## BOUNDARY ANALYSIS

## Bước 1: Xác định các biên

| STT | Input/Output | Kiểu dữ liệu | Miền giá trị | Biên |
|-----|--------------|---------------|--------------|------|
| 1 | Số lần đăng nhập sai | Số nguyên | 0, 1, 2, 3, ... | **3** (ngưỡng khóa) |
| 2 | Thời gian khóa| Thời gian (s) | >= 0s | **30s** |

---

## Bước 2: Xác định giá trị xung quanh biên

### Biên 1: Số lần đăng nhập sai 

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **2** | Dưới biên | Chưa khóa | Còn 1 lần thử nữa |
| **3** | Tại biên | **Bị khóa** | Đúng ngưỡng |
| **4** | Trên biên | Bị khóa | Vượt ngưỡng |

### Biên 2: Thời gian khóa (30 giây)

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **29 giây** | Dưới biên | Vẫn bị khóa | Chưa hết khóa |
| **30 giây** | Tại biên | Vừa hết khóa | Ngay ngưỡng thời gian khóa|
| **31 giây** | Trên biên | Đã hết khóa | Hết khóa |


---

## Bước 3: Viết Test Cases


### TC08 - 3 lần đăng nhập sai liên tục

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-08 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản bị khóa chính xác khi đạt ngưỡng 3 lần sai |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | Tài khoản tồn tại, tài khoản đã login 2 lần sai, tài khoản chưa bị khóa |
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Đăng nhập sai 2 lần liên tiếp <br>2. Đăng nhập lần 3 với password sai<br>3. Quan sát giao diện |
| **Expected Result** |Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."|

---

### TC09 - 2 lần sai liên tiếp

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-09 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản chưa bị khóa khi sai 2 lần |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Tài khoản tồn tại, đã đăng nhập sai 1 lần <br>- Tài khoản chưa bị khóa |
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Đăng nhập sai 1 lần<br>2. Đăng nhập lần 2 với password sai<br>3. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại."<br>- Tài khoản chưa bị khóa|

---

### TC10 - 4 lần sai liên tục

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-10 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản vẫn bị khóa khi đã vượt ngưỡng |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Tài khoản đang bị khóa|
| **Test Data** | Email: `user@email.com`, Password: `wrong` |
| **Test Steps** | 1. Đăng nhập sai >= 3 lần để kích hoạt khóa<br>2. Đăng nhập lần nữa khi đang khóa<br>3. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."|
---

### TC11 - Thời gian khóa: 29 giây

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-11 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản vẫn bị khóa tại 29 giây|
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Tài khoản vừa bị khóa (cách đây 29 giây) |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>2. Đợi 29 giây<br>3. Đăng nhập với password đúng<br>4. Quan sát giao diện |
| **Expected Result** | - Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau."<br>- Dù nhập đúng vẫn không đăng nhập được |
---

### TC12 - Thời gian khóa: 30 giây

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-12 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản vừa hết khóa tại đúng 30 giây |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Tài khoản bị khóa cách đây đúng 30 giây |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>2. Đợi đúng 30 giây<br>3. Đăng nhập với password đúng<br>4. Quan sát giao diện |
| **Expected Result** | - Đăng nhập thành công<br>- Chuyển trang về trang chủ<br>|
---

### TC13 - Thời gian khóa: 31 giây

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-13 |
| **Requirement ID** | FR-02 |
| **Feature** | Đăng nhập & Khóa tài khoản |
| **Objective** | Kiểm tra tài khoản đã hết khóa sau 31 giây |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Tài khoản bị khóa cách đây 31 giây |
| **Test Data** | Email: `user@email.com`, Password: `pass123` (đúng) |
| **Test Steps** | 1. Đăng nhập sai >= 3 lần → tài khoản bị khóa<br>2. Đợi 31 giây<br>3. Đăng nhập với password đúng<br>4. Quan sát giao diện |
| **Expected Result** | - Đăng nhập thành công<br>- Chuyển trang về trang chủ |
---

## TỔNG KẾT 2 CÁCH
### Do TC08 của BVA trùng với TC07 ở phần kết luận của Domain Testing nên có tổng cộng 12 test cases được tìm thấy khi sử dụng cả 2 cách

| STT | TC ID | Input/Objective | Expected Output |
|-----|-------|-------|-----------------|
| 1  |TC01 | Email=`""`, Password=`"User 123"`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" | 
| 2  | TC02 | Email=`"abc"`, Password=`"User 123"`, bấm Sign In | HTML5: "Please include an '@'" |
| 3  | TC03 | Email=`"abc@"`, Password=`"User 123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 4  | TC04 |Email=`"user@email.com"`, Password=`"User 123"`, bấm Sign In | Chuyển trang về trang chủ |
| 5  | TC05 |Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5: "Vui lòng điền vào trường này" |
| 6  | TC06 |Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại."|
| 7  | TC07 |Đăng nhập sai 3 lần liên tiếp| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| 8  | TC09 |Đăng nhập sai 2 lần liên tiếp| "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 9  | TC10 |Đăng nhập sai 4 lần liên tiếp| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| 10  | TC11 |Kiểm tra tài khoản vẫn bị khóa tại 29 giây| "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| 11  | TC12 |Kiểm tra tài khoản đã hết khóa sau 30 giây| Chuyển trang về trang chủ |
| 12  | TC13 |Kiểm tra tài khoản đã hết khóa sau 31 giây| Chuyển trang về trang chủ |
---

## AI gap analysis
- Ở phần Domain Testing, AI bị miss test cases của trường hợp password đúng và password sai, AI chỉ ghi chung 1 trường hợp duy nhất là password hợp lệ, password không rỗng. Ngoài ra, với Domain Testing, trường hợp nhập mật khẩu sai nhưng chưa khóa (1 lần sai, 2 lần sai liên tiếp) nên được gộp thành 1 test case chung do output của 2 input này giống nhau suy ra chỉ cần test case cho 1 giá trị đại diện. Em nghĩ sự thiếu sót test cases này của AI do AI không phân biệt miền giá trị của password thành đúng, sai, và rỗng mà chỉ tập trung vào miền rỗng và miền có giá trị. Do Domain Testing là kiểu test tùy vào độ cẩn thận khi chia miền giá trị của người test ngay cả người thật cũng có thể chia miền giá trị khác nhau và bị thiếu nên AI thiếu điều kiện password đúng và sai, em nghĩ do độ phức tạp về tính chất của Domain Testing 
- Ở phần Boundary Analysis, AI liệt kê email và password có biên nhưng theo em, 2 input này không thể test bằng BVA. Với lỗi này, em nghĩ do prompt của em chưa nêu rõ BVA có thể dùng để test với loại Input nào.

## Bug Reporting
