# BÁO CÁO DOMAIN TESTING
## Chức năng: Đăng nhập & Khóa tài khoản (FR-02)

---

## 1. Xác định Input và Output

### 1.1 Input (trên giao diện form đăng nhập)

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Email (Username)** | Text field | Trường nhập địa chỉ email |
| I2 | **Password** | Text field | Trường nhập mật khẩu |
| I3 | **Nút Sign In** | Button | Nút gửi form đăng nhập |

### 1.2 Output (trên giao diện)

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Thông báo lỗi** | Alert/Text | Hiển thị khi đăng nhập sai hoặc tài khoản bị khóa |
| O2 | **Chuyển trang** | Navigation | Chuyển về trang chủ `/` khi đăng nhập thành công |
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
| M6 | Chuỗi bất kỳ (vd: `pass123`, `123456`, `abc`) | **Valid** | Password hợp lệ |

#### Input I3 - Số lần đăng nhập sai liên tiếp (hidden state)

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M7 | `0` lần (lần đầu đăng nhập) | **Valid** | Chưa có lần sai nào |
| M8 | `1` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M9 | `2` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M10 | `≥ 3` lần sai liên tiếp | **Valid** | Kích hoạt khóa tài khoản |

### 2.2 Miền giá trị cho Output

#### Output O1 - Thông báo trên giao diện

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | **Invalid** | Đăng nhập sai, chưa khóa |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | **Invalid** | Đăng nhập sai ≥ 3 lần |
| O1.3 | Không hiển thị thông báo lỗi | **Valid** | Đăng nhập thành công |

#### Output O2 - Chuyển trang

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O2.1 | Chuyển về trang chủ `/` | **Valid** | Đăng nhập thành công |
| O2.2 | Vẫn ở trang đăng nhập | **Invalid** | Đăng nhập thất bại |

#### Output O3 - HTML5 Validation

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O3.1 | `"Please fill out this field"` | **Invalid** | Bỏ trống trường required |
| O3.2 | `"Please include an '@' in the email address"` | **Invalid** | Sai định dạng email |

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
| O2.1 | Chuyển trang `/` | Đại diện thành công |
| O2.2 | Vẫn ở trang login | Đại diện thất bại |
| O3.1 | `"Please fill out this field"` | Đại diện lỗi bỏ trống |
| O3.2 | `"Please include an '@'"` | Đại diện lỗi sai format |

---

## 4. Xác định Test Cases (mỗi miền → mỗi test case)

| TC | Miền | Input | Expected Output |
|----|------|-------|-----------------|
| TC01 | M1 | Email=`""`, Password=`"pass123"`, bấm Sign In | HTML5: "Please fill out this field" |
| TC02 | M2 | Email=`"abc"`, Password=`"pass123"`, bấm Sign In | HTML5: "Please include an '@'" |
| TC03 | M3 | Email=`"abc@"`, Password=`"pass123"`, bấm Sign In | HTML5: "Please include an '@'" |
| TC04 | M4 | Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | Chuyển trang về `/` |
| TC05 | M5 | Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5: "Please fill out this field" |
| TC06 | M6 | Email=`"user@email.com"`, Password=`"wrong"`, bấm Sign In | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC07 | M7 | Đăng nhập lần đầu với sai password | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC08 | M8 | Đăng nhập sai lần 1, rồi sai lần 2 | "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| TC09 | M9 | Đăng nhập sai 2 lần, rồi sai lần 3 | "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| TC10 | M10 | Đăng nhập sai ≥ 3 lần → thử đăng nhập đúng | "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| TC11 | O1.1 | Đăng nhập sai (chưa khóa) | Hiển thị "Đăng nhập thất bại..." |
| TC12 | O1.2 | Đăng nhập sai ≥ 3 lần | Hiển thị "Tài khoản đã bị khóa..." |
| TC13 | O2.1 | Đăng nhập đúng (email + password hợp lệ) | Chuyển trang về `/` |
| TC14 | O2.2 | Đăng nhập sai | Vẫn ở trang đăng nhập |
| TC15 | O3.1 | Bỏ trống Email hoặc Password | "Please fill out this field" |
| TC16 | O3.2 | Email không có `@` | "Please include an '@'" |

---

## 5. Rút gọn Test Cases (loại bỏ trùng loại)

### Phân tích trùng lặp

| TC | Miền | Input | Expected Output | Quyết định |
|----|------|-------|-----------------|------------|
| TC01 | M1 | Email=`""`, Password=`"pass123"` | HTML5: "Please fill out this field" | **Giữ** |
| TC02 | M2 | Email=`"abc"`, Password=`"pass123"` | HTML5: "Please include an '@'" | **Giữ** |
| TC03 | M3 | Email=`"abc@"`, Password=`"pass123"` | HTML5: "Please include an '@'" | **Bỏ** (trùng TC02 - cùng output) |
| TC04 | M4 | Email=`"user@email.com"`, Password=`"pass123"` | Chuyển trang về `/` | **Giữ** |
| TC05 | M5 | Email=`"user@email.com"`, Password=`""` | HTML5: "Please fill out this field" | **Giữ** |
| TC06 | M6 | Email=`"user@email.com"`, Password=`"wrong"` | "Đăng nhập thất bại..." | **Bỏ** (trùng TC07 - cùng miền Invalid) |
| TC07 | M7 | Đăng nhập sai lần 1 | "Đăng nhập thất bại..." | **Giữ** |
| TC08 | M8 | Đăng nhập sai lần 2 liên tiếp | "Đăng nhập thất bại..." | **Giữ** |
| TC09 | M9 | Đăng nhập sai lần 3 liên tiếp | "Tài khoản đã bị khóa..." | **Giữ** |
| TC10 | M10 | Đăng nhập sai ≥ 3 lần → đúng | "Tài khoản đã bị khóa..." | **Bỏ** (trùng TC09 - cùng output) |
| TC11 | O1.1 | Đăng nhập sai (chưa khóa) | Hiển thị lỗi | **Bỏ** (trùng TC07, TC08) |
| TC12 | O1.2 | Đăng nhập sai ≥ 3 lần | Hiển thị khóa | **Bỏ** (trùng TC09) |
| TC13 | O2.1 | Đăng nhập đúng | Chuyển trang `/` | **Bỏ** (trùng TC04) |
| TC14 | O2.2 | Đăng nhập sai | Vẫn ở trang login | **Bỏ** (trùng TC07) |
| TC15 | O3.1 | Bỏ trống Email/Password | "Please fill out this field" | **Bỏ** (trùng TC01, TC05) |
| TC16 | O3.2 | Email không có `@` | "Please include an '@'" | **Bỏ** (trùng TC02) |

### Kết quả rút gọn: **8 Test Cases**

| STT | TC ID | Miền | Input | Expected Output |
|-----|-------|------|-------|-----------------|
| 1 | TC01 | M1 | Email=`""`, Password=`"pass123"`, bấm Sign In | HTML5 validation: "Please fill out this field" |
| 2 | TC02 | M2 | Email=`"abc"`, Password=`"pass123"`, bấm Sign In | HTML5 validation: "Please include an '@' in the email address" |
| 3 | TC03 | M4 | Email=`"user@email.com"`, Password=`"pass123"`, bấm Sign In | Đăng nhập thành công, chuyển trang về `/` |
| 4 | TC04 | M5 | Email=`"user@email.com"`, Password=`""`, bấm Sign In | HTML5 validation: "Please fill out this field" |
| 5 | TC05 | M7 | Email=`"user@email.com"`, Password sai, bấm Sign In lần 1 | Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 6 | TC06 | M8 | Đăng nhập sai lần 2 liên tiếp | Hiển thị "Đăng nhập thất bại. Vui lòng kiểm tra lại." |
| 7 | TC07 | M9 | Đăng nhập sai lần 3 liên tiếp | Hiển thị "Tài khoản đã bị khóa. Vui lòng thử lại sau." |
| 8 | TC08 | M10 | Sau 30 giây hết khóa → đăng nhập đúng | Đăng nhập thành công, chuyển trang về `/` |

---

**Ngày tạo báo cáo:** 27/06/2026
**Nguồn tham khảo:** FR-02 - Đăng nhập & Khóa tài khoản
