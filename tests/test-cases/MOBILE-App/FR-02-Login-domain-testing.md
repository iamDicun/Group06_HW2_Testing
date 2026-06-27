# BÁO CÁO DOMAIN TESTING
## FR-02: Đăng nhập & Khóa tài khoản (Mobile)

---

## 1. Xác định Input và Output

### 1.1 Input (trên app Mobile)

| STT | Input | Kiểu | Mô tả |
|-----|-------|------|-------|
| I1 | **Email** | Text field | Trường nhập địa chỉ email |
| I2 | **Password** | Text field | Trường nhập mật khẩu |
| I3 | **Nút "Sign In"** | Button | Nút bấm gửi form đăng nhập |

### 1.2 Output (trên app Mobile)

| STT | Output | Kiểu | Mô tả |
|-----|--------|------|-------|
| O1 | **Thông báo lỗi** | Toast/Alert | Hiển thị khi đăng nhập sai hoặc tài khoản bị khóa |
| O2 | **Chuyển màn hình** | Navigation | Chuyển về trang chủ khi đăng nhập thành công |
| O3 | **Validation message** | Text/Dialog | Thông báo khi input bỏ trống hoặc sai định dạng |

---

## 2. Xác định tất cả miền giá trị (Valid & Invalid)

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
| M6 | Chuỗi bất kỳ (vd: `pass123`) | **Valid** | Password hợp lệ |

#### Input I3 - Số lần đăng nhập sai liên tiếp

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| M7 | `0` lần (lần đầu đăng nhập) | **Valid** | Chưa có lần sai nào |
| M8 | `1` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M9 | `2` lần sai liên tiếp | **Valid** | Chưa đủ điều kiện khóa |
| M10 | `≥ 3` lần sai liên tiếp | **Valid** | Kích hoạt khóa tài khoản |

### 2.2 Miền giá trị cho Output

#### Output O1 - Thông báo trên app

| Miền | Giá trị | Type | Ghi chú |
|------|---------|------|---------|
| O1.1 | `"Đăng nhập thất bại. Vui lòng kiểm tra lại."` | **Invalid** | Đăng nhập sai, chưa khóa |
| O1.2 | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` | **Invalid** | Đăng nhập sai ≥ 3 lần |
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
