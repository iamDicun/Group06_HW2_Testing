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
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | **Valid** | Đăng nhập sai ≥ 3 lần |
| O1.3 | Không hiển thị thông báo lỗi | **Valid** | Đăng nhập thành công |

#### Output O2 - Chuyển trang

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Chuyển về trang chủ | **Valid** | Đăng nhập thành công |
| O2.2 | Vẫn ở trang đăng nhập | **Valid** | Đăng nhập thất bại |

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
# Chức năng: Thanh toán (FR-08)
## DOMAIN TESTING

## 1. Xác định Input và Output

### 1.1 Input

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 |  **Trạng thái đăng nhập** | State | Trạng thái đăng nhập |
| I2 | **Sản phẩm** | State | Danh sách sản phẩm|
| I3 | **Tổng tiền thanh toán** | Increment/Decrement buttons | Nhập tổng số tiền thanh toán |

### 1.2 Output

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Thông báo** | Text | Thông báo đã thành công hay lỗi|
| O2 | **Giỏ hàng trống** | State | Cart được xóa sau thanh toán thành công |

---

## 2. Xác định tất cả miền giá trị (Valid & Invalid)

### 2.1 Miền giá trị cho Input

#### Input I1 - Trạng thái đăng nhập

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M1 | Chưa đăng nhập | **Invalid** | Không được phép checkout |
| M2 | Đã đăng nhập | **Valid** | Được phép checkout |

#### Input I2 - Sản phẩm

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M3 | Giỏ hàng trống| **Invalid** | Không có sản phẩm để thanh toán |
| M4 | Giỏ hàng có 1 sản phẩm | **Valid** | Đơn hàng 1 sản phẩm |
| M5 | Giỏ hàng có nhiều sản phẩm (≥ 2) | **Valid** | Đơn hàng nhiều sản phẩm |

#### Input I3 - Tổng tiền thanh toán

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M6 | Tổng tiền giá trị gốc | **Valid** | Giá trị đúng |
| M7 | Tổng tiền user chỉnh sửa| **Invalid** | FR-08 không cho phép chỉnh sửa |

### 2.2 Miền giá trị cho Output

#### Output O1 - Thông báo

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | "Thanh toán thành công!"| **Valid** | Thành công |
| O1.2 | Alert "Lỗi khi thanh toán..." | **Valid** | Thất bại |
| O1.3 | Alert "Bạn cần đăng nhập để thanh toán!" | **Valid** | Chưa đăng nhập |

#### Output O2 - Giỏ hàng sau thanh toán

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Sản phẩm xóa khỏi giỏ hàng| **Valid** | Đúng FR-08 |

---

## 3. Xác định giá trị đại diện từng miền

| Miền | Giá trị đại diện | Chọn lý do |
|------|-----------------|------------|
| M1 | Chưa đăng nhập | Đại diện trạng thái chưa xác thực |
| M2 | Đã đăng nhập | Đại diện trạng thái đã xác thực |
| M3 | Cart rỗng| Đại diện giỏ hàng trống |
| M4 | Cart 1 sản phẩm: chọn 1 sản phẩm Iphone 15 ProMax| Đại diện đơn hàng đơn giản |
| M5 | Cart 2+ sản phẩm: Iphone 15 ProMax và MacBook Pro M3| Đại diện đơn hàng phức tạp |
| M6 | 75000000 | Đại diện giá trị đúng |
| M7 | 75000001 | Đại diện giá trị bị chỉnh sửa |
| O1.1 | "Thanh toán thành công!" | Đại diện thành công |
| O1.2 | "Lỗi khi thanh toán..." | Đại diện thất bại |
| O1.3 | "Bạn cần đăng nhập để thanh toán!" | Đại diện chưa đăng nhập |
| O2.1 | Giỏ hàng rỗng sau khi checkout | Đại diện cart trống |

---

## 4. Xác định Test Cases

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC-Checkout-01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Alert "Bạn cần đăng nhập để thanh toán!"|
| TC-Checkout-02 | M2 | Đã đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Chuyển sang trang thanh toán|
| TC-Checkout-03 | M3 | Đăng nhập → giỏ hàng trống | Hiển thị "Giỏ hàng của bạn đang trống" |
| TC-Checkout-04 | M4 | Đăng nhập → giỏ hàng 1 sản phẩm → checkout | Hiển thị sản phẩm, tổng tiền đúng |
| TC-Checkout-05 | M5 | Đăng nhập → giỏ hàng 2+ sản phẩm → checkout | Hiển thị đầy đủ tất cả sản phẩm, tổng đúng |
| TC-Checkout-06 | M6 | Tổng tiền hiển thị đúng bằng tổng tiền hàng | Cho phép thanh toán |
| TC-Checkout-07 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend từ chối, không tạo đơn hàng (hoặc tính lại đúng) |
| TC-Checkout-08 | O1.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |
| TC-Checkout-09 | O1.2 | Checkout thất bại | Alert "Lỗi khi thanh toán..." |
| TC-Checkout-10 | O1.3 | Checkout khi chưa đăng nhập | Alert "Bạn phải đăng nhập..." |
| TC-Checkout-11 | O2.1 | Sau checkout thành công | Sản phẩm trong giỏ hàng bị xóa |


---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC-Checkout-01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Alert "Bạn cần đăng nhập để thanh toán!"|**Giữ**|
| TC-Checkout-02 | M2 | Đã đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Chuyển sang trang thanh toán|**Giữ**|
| TC-Checkout-03 | M3 | Đăng nhập → giỏ hàng trống | Hiển thị "Giỏ hàng của bạn đang trống" |**Giữ**|
| TC-Checkout-04 | M4 | Đăng nhập → giỏ hàng 1 sản phẩm → checkout | Hiển thị sản phẩm, tổng tiền đúng |**Giữ**|
| TC-Checkout-05 | M5 | Đăng nhập → giỏ hàng 2+ sản phẩm → checkout | Hiển thị đầy đủ tất cả sản phẩm, tổng đúng |**Giữ**|
| TC-Checkout-06 | M6 | Tổng tiền hiển thị đúng bằng tổng tiền hàng | Cho phép thanh toán |**Giữ**|
| TC-Checkout-07 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend từ chối, không tạo đơn hàng (hoặc tính lại đúng) |**Giữ**|
| TC-Checkout-08 | O1.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |**Giữ**|
| TC-Checkout-09 | O1.2 | Checkout thất bại | Alert "Lỗi khi thanh toán..." |**Giữ**|
| TC-Checkout-10 | O1.3 | Checkout khi chưa đăng nhập | Alert "Bạn phải đăng nhập..." |**Bỏ** do trùng với TC-Checkout-01|
| TC-Checkout-11 | O2.1 | Sau checkout thành công | Sản phẩm trong giỏ hàng bị xóa |**Giữ**|

### Kết quả rút gọn: **10 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC-Checkout-01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Alert "Bạn cần đăng nhập để thanh toán!"|
| 2 | TC-Checkout-02 | M2 | Đã đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Chuyển sang trang thanh toán|
| 3 | TC-Checkout-03 | M3 | Đăng nhập → giỏ hàng trống | Hiển thị "Giỏ hàng của bạn đang trống" |
| 4 | TC-Checkout-04 | M4 | Đăng nhập → giỏ hàng 1 sản phẩm → checkout | Hiển thị sản phẩm, tổng tiền đúng |
| 5 | TC-Checkout-05 | M5 | Đăng nhập → giỏ hàng 2+ sản phẩm → checkout | Hiển thị đầy đủ tất cả sản phẩm, tổng đúng |
| 6 | TC-Checkout-06 | M6 | Tổng tiền hiển thị đúng bằng tổng tiền hàng | Cho phép thanh toán |
| 7 | TC-Checkout-07 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend từ chối, không tạo đơn hàng (hoặc tính lại đúng) |
| 8 | TC-Checkout-08 | O1.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |
| 9 | TC-Checkout-09 | O1.2 | Checkout thất bại | Alert "Lỗi khi thanh toán..." |
| 10 | TC-Checkout-11 | O2.1 | Sau checkout thành công | Sản phẩm trong giỏ hàng bị xóa |

---
## BÁO CÁO BOUNDARY ANALYSIS

## Bước 1: Xác định Input/Output

| STT | Input/Output | Kiểu dữ liệu | Miền giá trị | Biên |
|-----|--------------|---------------|--------------|------|
| 1 | Số SP trong giỏ | Số nguyên | > 0 | 1 |
| 2 | Tổng tiền giỏ | Số thực | > 0 | Giá trị tổng của các sản phẩm|
---

## BƯỚC 2: Xác định giá trị xung quanh biên

### Biên 1: Số SP trong giỏ

| Giá trị | Vị trí | Trạng thái | Ghi chú |
|---------|--------|------------|---------|
| **0** | Dưới biên | Giỏ trống | Không checkout được |
| **1** | Tại biên | Giỏ có 1 SP | Checkout được |
| **2** | Trên biên | Giỏ có 2 SP | Checkout được |

### Biên 2: Tổng tiền

| Giá trị | Vị trí | Ví dụ | Ghi chú |
|---------|--------|------------|---------|
| **Tổng tiền - 1** | Dưới biên | Tổng = 74999999 | Không checkout được, báo lỗi |
| **Tổng tiền** | Tại biên | Tổng = 75000000 | Checkout được |
| **Tổng tiền + 1** | Trên biên | Tổng = 75000001 | Không checkout được, báo lỗi |

## BƯỚC 3: Viết Test Cases

### TC-Checkout-10 - 0 SP (giỏ trống)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-10 |
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Kiểm tra không checkout được khi giỏ hàng trống |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng trống |
| **Test Data** | Giỏ hàng trống |
| **Test Steps** | 1. Đăng nhập<br>2. Truy cập `/checkout` trực tiếp qua URL<br>3. Quan sát giao diện |
| **Expected Result** | - Không hiển thị form thanh toán<br>- Hoặc hiển thị "Giỏ hàng trống" |
---

### TC-Checkout-12 - 1 SP (giỏ có 1 SP)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-12 |
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Kiểm tra checkout hoạt động với 1 SP trong giỏ |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có 1 SP |
| **Test Data** | Giỏ hàng có Iphone 15 ProMax|
| **Test Steps** | 1. Đăng nhập<br>2. Thêm 1 SP vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Quan sát giao diện Checkout |
| **Expected Result** | - Hiển thị tên SP, số lượng, thành tiền<br>- Tổng tiền|
---

### TC-Checkout-13 - 2 SP (giỏ có 2 SP)

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-13 |
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Kiểm tra checkout hoạt động với 2 SP trong giỏ |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có 2 SP |
| **Test Data** | Giỏ hàng có Iphone 15 ProMax, Macbook|
| **Test Steps** | 1. Đăng nhập<br>2. Thêm 2 SP vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Quan sát giao diện Checkout |
| **Expected Result** | - Hiển thị tên SP, số lượng, thành tiền<br>- Tổng tiền|
---

### TC-Checkout-14 - Tổng tiền đươc điều chỉnh thành tổng tiền - 1

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-14 |
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Kiểm tra checkout với tổng tiền = tổng tiền - 1 |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ có tổng tiền |
| **Test Data** | Thay đổi tổng tiền = tổng tiền - 1|
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP price vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Bấm giảm Tổng tiền <br>5. Bấm "Xác Nhận Thanh Toán"|
| **Expected Result** | - Thanh toán không thành công, không cho phép thanh toán hoặc tự chỉnh số tiền tổng thanh toán thành đúng|

---


### TC-Checkout-15 - Tổng tiền đúng

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-15|
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Tổng tiền đúng|
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP |
| **Test Data** | Tổng tiền đúng|
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ<br>3. Bấm "Tiến hành thanh toán"<br>4. Kiểm tra tổng tiền hiển thị đúng <br>5. Bấm "Xác Nhận Thanh Toán"|

### TC-Checkout-16 - Tổng tiền chỉnh sửa lớn hơn thực tế

| Field | Nội dung |
|-------|----------|
| **Test Case ID** | TC-Checkout-16 |
| **Requirement ID** | FR-08 |
| **Feature** | Thanh toán |
| **Objective** | Kiểm tra user sửa tổng tiền lớn hơn thực tế |
| **Technique** | Boundary Value Analysis|
| **Priority** | High |
| **Preconditions** | - Đã đăng nhập<br>- Giỏ hàng có SP|
| **Test Data** | Tổng tiền chỉnh sửa lớn hơn thực tế|
| **Test Steps** | 1. Đăng nhập<br>2. Thêm SP vào giỏ (cartTotal = 100000)<br>3. Sửa tổng tiền thành tổng tiền + 1 trên input<br>4. Bấm "Xác Nhận Thanh Toán".|
| **Expected Result** | Thanh toán không thành công hoặc thanh toán thành công nhưng tiền chỉ trừ đúng giá trị thực tế|
---

## Tổng hợp test cases
**Do TC-Checkout-10, TC-Checkout-12, TC-Checkout-13, TC-Checkout-14, TC-Checkout-15, TC-Checkout-16 bị trùng với TC-Checkout-03, TC-Checkout-04, TC-Checkout-05, TC-Checkout-07, TC-Checkout-06 nên loại bỏ 6 test cases, còn lại 10 test cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC-Checkout-01 | M1 | Chưa đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Alert "Bạn cần đăng nhập để thanh toán!"|
| 2 | TC-Checkout-02 | M2 | Đã đăng nhập → bấm "Tiến hành thanh toán" ở Cart | Chuyển sang trang thanh toán|
| 3 | TC-Checkout-03 | M3 | Đăng nhập → giỏ hàng trống | Hiển thị "Giỏ hàng của bạn đang trống" |
| 4 | TC-Checkout-04 | M4 | Đăng nhập → giỏ hàng 1 sản phẩm → checkout | Hiển thị sản phẩm, tổng tiền đúng |
| 5 | TC-Checkout-05 | M5 | Đăng nhập → giỏ hàng 2+ sản phẩm → checkout | Hiển thị đầy đủ tất cả sản phẩm, tổng đúng |
| 6 | TC-Checkout-06 | M6 | Tổng tiền hiển thị đúng bằng tổng tiền hàng | Cho phép thanh toán |
| 7 | TC-Checkout-07 | M7 | User sửa tổng tiền trên input → bấm "Xác Nhận Thanh Toán" | Backend từ chối, không tạo đơn hàng (hoặc tính lại đúng) |
| 8 | TC-Checkout-08 | O1.1 | Checkout thành công | Hiển thị "Thanh toán thành công!" |
| 9 | TC-Checkout-09 | O1.2 | Checkout thất bại | Alert "Lỗi khi thanh toán..." |
| 10 | TC-Checkout-11 | O2.1 | Sau checkout thành công | Sản phẩm trong giỏ hàng bị xóa |
---
## AI gap analysis
AI có dấu hiệu đưa ra thông tin không chính xác, ở cả phần đều đưa ra các Input, Output sai, khó hiểu, cần phải lọc để loại bỏ. Nguyên nhân có thể do model AI không loại bỏ những input, test cases đã nêu mà cứ lặp đi lặp lại, cộng với độ khó của chức năng Checkout (gồm nhiều bước phải kiểm thử) nên gây ra sự tự bịa thông tin của AI. Ngoài ra, có thể do chưa nêu rõ biên là như nào nên có sự nhập nhằng khi AI đưa ra các test cases bằng BVA.

# Chức năng: Quản lý Danh mục (FR-14)
## BÁO CÁO DOMAIN TESTING

## 1. Xác định Input và Output

### 1.1 Input

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Tên danh mục** | Text field | Nhập tên danh mục mới |

### 1.2 Output

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Bảng danh sách danh mục** | Table | Hiển thị ID, Tên danh mục |
| O2 | **Thông báo** | Text | Hiển thị sau khi thêm/xóa|

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
| M5 | Tên trùng với danh mục đã có | **Invalid** | Trùng lặp|
| M6 | Chuỗi rất dài (vd: 255+ ký tự) | **Invalid** | Vượt quá độ dài cho phép |

### 2.2 Miền giá trị cho Output

#### Output O1 - Bảng danh sách

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | Hiển thị danh sách với ID và Tên | **Valid** | Dữ liệu đúng |
| O1.2 | Bảng trống| **Valid** | Chưa có dữ liệu |

#### Output O2 - Thông báo sau khi thêm/xóa danh mục

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Thông báo thêm thành công | **Valid** | Thêm thành công |
| O2.2 | Báo lỗi khi thêm thất bại | **Valid** | Thêm thất bại |
| O2.3 | Thông báo xóa thành công | **Valid** | Xóa thành công |
| O2.4 | Báo lỗi khi xóa thất bại | **Valid** | Xóa thất bại |

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
| O1.1 | Bảng hiển thị danh mục | Đại diện có dữ liệu |
| O1.2 | Bảng trống | Đại diện không có dữ liệu |
| O2.1 | Thông báo thêm thành công | Đại diện thêm thành công |
| O2.2 | Báo lỗi khi thêm thất bại| Đại diện thêm thất bại |
| O2.3 | Thông báo xóa thành công | Đại diện xóa thành công |
| O2.4 | Báo lỗi khi xóa thất bại | Đại diện xóa thất bại |
---

## 4. Xác định Test Cases (mỗi miền → mỗi test case)

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC-QLDM-01 | M1 | Nhập tên `""` → bấm "Thêm mới" | Báo lỗi "Tên danh mục không được để trống" |
| TC-QLDM-02 | M2 | Nhập tên `"   "` → bấm "Thêm mới" | Báo lỗi hoặc coi như rỗng |
| TC-QLDM-03 | M3 | Nhập tên `"Điện thoại"` → bấm "Thêm mới" | Thêm thành công, xuất hiện trong bảng |
| TC-QLDM-04 | M4 | Nhập tên `"@#$%"` → bấm "Thêm mới" | Thêm thành công (FR-14 không cấm) |
| TC-QLDM-05 | M5 | Nhập tên trùng `"Điện thoại"` → bấm "Thêm mới" | Báo lỗi trùng tên hoặc thêm thành công (tùy policy) |
| TC-QLDM-06 | M6 | Nhập tên 300 ký tự → bấm "Thêm mới" | Báo lỗi độ dài |
| TC-QLDM-07 | O1.1 | Đăng nhập Admin → xem danh mục | Bảng hiển thị ID và Tên danh mục |
| TC-QLDM-08 | O1.2 | Xem danh mục khi chưa có danh mục nào | Bảng trống hoặc thông báo "Chưa có danh mục" |
| TC-QLDM-09 | O2.1 |Nhập tên `"Điện thoại"` → bấm "Thêm mới" | Thông báo thêm thành công |
| TC-QLDM-10 | O2.2 | Nhập tên `"   "` → bấm "Thêm mới" | Báo lỗi  |
| TC-QLDM-11 | O2.3 | Xóa 1 danh mục | Thông báo xóa thành công |
| TC-QLDM-12 | O2.4 | Xóa 1 danh mục không thể xóa hoặc bị lỗi đường truyền | Thông báo xóa thất bại |

---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC-QLDM-01 | M1 | Tên rỗng → Thêm mới | Báo lỗi | **Giữ** |
| TC-QLDM-02 | M2 | Tên `"   "` → Thêm mới | Báo lỗi | **Bỏ** (trùng TC01 - cùng invalid rỗng) |
| TC-QLDM-03 | M3 | Tên `"Điện thoại"` → Thêm mới | Thêm thành công | **Giữ** |
| TC-QLDM-04 | M4 | Tên `"@#$%"` → Thêm mới | Thêm thành công | **Bỏ** (trùng TC03 - cùng valid name) |
| TC-QLDM-05 | M5 | Tên trùng → Thêm mới | Báo lỗi/trùng | **Bỏ** (FR-14 không quy định về trùng) |
| TC-QLDM-06 | M6 | Tên 300 ký tự → Thêm mới | Báo lỗi độ dài | **Bỏ** (FR-14 không quy định giới hạn độ dài) |
| TC-QLDM-07 | O1.1 | Xem danh mục | Bảng hiển thị | **Giữ** |
| TC-QLDM-08 | O1.2 | Danh mục trống | Bảng trống | **Bỏ** (trùng TC07 - cùng output xem) |
| TC-QLDM-09 | O2.1 |Nhập tên `"Điện thoại"` → bấm "Thêm mới" | Thông báo thêm thành công | **Bỏ** (trùng TC03 - cùng valid name) |
| TC-QLDM-10 | O2.2 | Nhập tên `"   "` → bấm "Thêm mới" | Báo lỗi  |**Bỏ** (trùng TC01 - cùng invalid rỗng) |
| TC-QLDM-11 | O2.3 | Xóa 1 danh mục | Thông báo xóa thành công | **Giữ** |
| TC-QLDM-12 | O2.4 | Xóa 1 danh mục không thể xóa hoặc bị lỗi đường truyền | Thông báo xóa thất bại | **Giữ** |


### Kết quả rút gọn: **5 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
|1| TC-QLDM-01 | M1 | Tên rỗng → Thêm mới | Báo lỗi |
|2| TC-QLDM-03 | M3 | Tên `"Điện thoại"` → Thêm mới | Thêm thành công |
|3| TC-QLDM-07 | O1.1 | Xem danh mục | Bảng hiển thị |
|4| TC-QLDM-11 | O2.3 | Xóa 1 danh mục | Thông báo xóa thành công |
|5| TC-QLDM-12 | O2.4 | Xóa 1 danh mục không thể xóa hoặc bị lỗi đường truyền | Thông báo xóa thất bại |

---

## BOUNDARY ANALYSIS
**Không có input/output có thể áp dụng BVA để test nên với chức năng này không áp dụng phương pháp BVA**

## AI gap analysis
Ở phần BVA, theo em không thể dùng BVA để viết test cases nhưng AI vẫn list ra được loạt test cases, tuy nhiên nhưng test cases không thể thực hiện qua giao diện, AI bắt đầu bịa thông tin. Nguyên nhân có thể do AI cố làm theo yêu cầu của prompt là BVA mà không xem xét liệu với input/output của chức năng có thực hiện BVA được hay không, có thể do prompt thiếu sót không chỉ dẫn kĩ thế nào là biên và nhắc nhở AI nếu không áp dụng được thì bỏ qua loại test này.

# Chức năng Mobile: Đăng nhập & Khóa tài khoản (FR-02)
## DOMAIN TESTING

## 1. Xác định Input và Output

### 1.1 Input (trên app Mobile)

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Email** | Text field | Trường nhập địa chỉ email |
| I2 | **Password** | Text field | Trường nhập mật khẩu |

### 1.2 Output

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Thông báo lỗi** | Toast/Alert | Hiển thị khi đăng nhập sai hoặc tài khoản bị khóa |
| O2 | **Chuyển màn hình** | Navigation | Chuyển về trang chủ khi đăng nhập thành công |
| O3 | **Validation message** | Text/Dialog | Thông báo khi input bỏ trống hoặc sai định dạng |

---

## 2. Xác định tất cả miền giá trị

### 2.1 Miền giá trị cho Input

#### Input I1 - Email

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M1 | `""` (bỏ trống) | **Invalid** | Trường không được bỏ trống |
| M2 | Chuỗi không có `@` (vd: `abc`) | **Invalid** | Sai định dạng email |
| M3 | Có `@` nhưng sai định dạng (vd: `abc@`) | **Invalid** | Sai định dạng email |
| M4 | Đúng định dạng email (vd: `user@email.com`) | **Valid** | Email hợp lệ |

#### Input I2 - Password

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M5 | `""` (bỏ trống) | **Invalid** | Trường không được bỏ trống |
| M6 | Password sai so với username (vd: `pass123`) | **Valid** | Password sai |
| M7 | Password đúng so với username (vd: `User 123`) | **Valid** | Password đúng |

#### Input I3 - Số lần đăng nhập sai liên tiếp

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M7 | `0` lần (lần đầu đăng nhập) | **Valid** | Chưa có lần sai nào |
| M8 | `1` `2` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M10 | `≥ 3` lần sai liên tiếp | **Valid** | Kích hoạt khóa tài khoản |

### 2.2 Miền giá trị cho Output

#### Output O1 - Thông báo trên app

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | **Valid** | Đăng nhập sai, chưa khóa |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | **Valid** | Đăng nhập sai ≥ 3 lần |
| O1.3 | Không hiển thị thông báo lỗi | **Valid** | Đăng nhập thành công |

#### Output O2 - Chuyển màn hình

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Chuyển về màn hình Home | **Valid** | Đăng nhập thành công |
| O2.2 | Vẫn ở màn hình Login | **Invalid** | Đăng nhập thất bại |

#### Output O3 - Validation

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O3.1 | "Vui lòng nhập email" | **Invalid** | Bỏ trống email |
| O3.2 | "Email không hợp lệ" | **Invalid** | Sai định dạng email |
| O3.3 | "Vui lòng nhập mật khẩu" | **Invalid** | Bỏ trống password |

---

## 3. Xác định giá trị đại diện từng miền

| Miền | Giá trị đại diện | Chọn lý do |
|------|-----------------|------------|
| M1 | `""` | Đại diện giá trị rỗng duy nhất |
| M2 | `"abc"` | Đại diện chuỗi không có `@` |
| M3 | `"abc@"` | Đại diện có `@` nhưng sai định dạng |
| M4 | `"user@email.com"` | Đại diện email đúng định dạng |
| M5 | `""` | Đại diện giá trị rỗng duy nhất |
| M6 | `"pass123"` | Đại diện password bất kỳ |
| M7 | `0` | Đại diện chưa sai lần nào |
| M8 | `1` | Đại diện sai 1 lần |
| M9 | `2` | Đại diện sai 2 lần |
| M10 | `3` | Đại diện ngưỡng kích hoạt khóa |
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | Đại diện thông báo lỗi chung |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | Đại diện thông báo khóa |
| O2.1 | Chuyển màn hình Home | Đại diện thành công |
| O3.1 | "Vui lòng nhập email" | Đại diện lỗi bỏ trống email |
| O3.2 | "Email không hợp lệ" | Đại diện lỗi sai format |

---

## 4. Xác định Test Cases (mỗi miền → mỗi test case)

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC01 | M1 | Email=`""`, Password=`"pass123"`, tap Sign In | Validation: "Vui lòng nhập email" |
| TC02 | M2 | Email=`"abc"`, Password=`"pass123"`, tap Sign In | Validation: "Email không hợp lệ" |
| TC03 | M3 | Email=`"abc@"`, Password=`"pass123"`, tap Sign In | Validation: "Email không hợp lệ" |
| TC04 | M4 | Email=`"user@email.com"`, Password=`"pass123"`, tap Sign In | Chuyển màn hình về Home |
| TC05 | M5 | Email=`"user@email.com"`, Password=`""`, tap Sign In | Validation: "Vui lòng nhập mật khẩu" |
| TC06 | M6 | Email=`"user@email.com"`, Password=`"wrong"`, tap Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC07 | M7 | Đăng nhập lần đầu với sai password | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC08 | M8 | Đăng nhập sai lần 1, rồi sai lần 2 | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC09 | M9 | Đăng nhập sai 2 lần, rồi sai lần 3 | "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| TC10 | M10 | Đăng nhập sai ≥ 3 lần → thử đăng nhập đúng | "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| TC11 | O1.1 | Đăng nhập sai (chưa khóa) | Hiển thị "Đăng nhập thất bại..." |
| TC12 | O1.2 | Đăng nhập sai ≥ 3 lần | Hiển thị "Tài khoản đã bị khóa..." |
| TC13 | O2.1 | Đăng nhập đúng (email + password hợp lệ) | Chuyển màn hình về Home |
| TC14 | O2.2 | Đăng nhập sai | Vẫn ở màn hình Login |
| TC15 | O3.1 | Bỏ trống Email | "Vui lòng nhập email" |
| TC16 | O3.2 | Email không có `@` | "Email không hợp lệ" |

---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Kết quả rút gọn: **8 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC01 | M1 | Email=`""`, Password=`"pass123"`, tap Sign In | Validation: "Vui lòng nhập email" |
| 2 | TC02 | M2 | Email=`"abc"`, Password=`"pass123"`, tap Sign In | Validation: "Email không hợp lệ" |
| 3 | TC03 | M4 | Email=`"user@email.com"`, Password=`"pass123"`, tap Sign In | Chuyển màn hình về Home |
| 4 | TC04 | M5 | Email=`"user@email.com"`, Password=`""`, tap Sign In | Validation: "Vui lòng nhập mật khẩu" |
| 5 | TC05 | M7 | Email=`"user@email.com"`, Password sai, tap Sign In lần 1 | Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 6 | TC06 | M8 | Đăng nhập sai lần 2 liên tiếp | Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 7 | TC07 | M9 | Đăng nhập sai lần 3 liên tiếp | Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| 8 | TC08 | M10 | Sau 30 giây hết khóa → đăng nhập đúng | Chuyển màn hình về Home |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-02 - Đăng nhập & Khóa tài khoản (Mobile)
**Platform:** Mobile App
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
