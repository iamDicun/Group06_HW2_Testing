# Bug Reports

## [BUG-01][FR-02] Không thông báo lỗi định dạng email

### Found by Test Case
TC-LOGIN-02

### Requirement Related
FR-02

### Severity / Priority
Minor / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11
- **Username:** abc

### Steps to Reproduce
1. Để trống ô username
2. Nhập ô password
3. Bấm Sign In

### Expected Result
Ô Username phải thông báo báo sai định dạng email hoặc thiếu dấu @

### Actual Result
Không có thông báo sai định dạng email hoặc thiếu dấu @, chỉ có thông báo đăng nhập thất bại

### Evidence
![BUG_01](BUG_01.png)

---

## [BUG-02][FR-02] Đăng nhập sai 2 lần đã bị khóa

### Found by Test Case
TC-LOGIN-09

### Requirement Related
FR-02

### Severity / Priority
Major / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Đăng nhập sai 2 lần liên tiếp
2. Đăng nhập đúng ở lần thứ 3

### Expected Result
- Đăng nhập sai 2 lần liên tiếp thông báo lỗi "Đăng nhập thất bại." 
- Nhưng ở lượt đăng nhập thứ 3, đăng nhập đúng và chuyển trang đến trang chủ.

### Actual Result
Lần thứ 3 đăng nhập đúng nhưng tài khoản vẫn bị khóa, không chuyển được đến trang chủ

### Evidence
![BUG_02](BUG_02.png)

---

## [BUG-03][FR-02] Tài khoản bị khóa đã trải qua 30s, 31s nhưng tài khoản vẫn không được mở

### Found by Test Case
TC-LOGIN-12, TC-LOGIN-13

### Requirement Related
FR-02

### Severity / Priority
Critical / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Đăng nhập sai 3 lần liên tiếp
2. Đợi sau 30s, 31s đăng nhập đúng lại

### Expected Result
Tài khoản đăng nhập thành công, chuyển sang trang chủ.

### Actual Result
Trang vẫn báo đăng nhập thất bại

### Evidence
![BUG_03](BUG_03.png)

---

## [BUG-04][FR-08] Số tiền thanh toán không đúng với thực tế vẫn thanh toán được

### Found by Test Case
TC-Checkout-07

### Requirement Related
FR-08

### Severity / Priority
Critical / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Thêm sản phẩm vào giỏ hàng
2. Bấm nút "Tiến hành thanh toán"
3. Chỉnh sửa giá tiền
4. Bấm nút "Xác nhận thanh toán"

### Expected Result
Thông báo lỗi / Từ chối thanh toán hoặc chỉ thanh toán đúng số tiền thực tế

### Actual Result
Thông báo thanh toán thành công

### Evidence
![BUG_04](BUG_04.png)

---

## [BUG-05][FR-08] Sau khi thanh toán, sản phẩm đã thanh toán không được xóa trong giỏ hàng

### Found by Test Case
TC-Checkout-11

### Requirement Related
FR-08

### Severity / Priority
Major / P1

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Thêm sản phẩm vào giỏ hàng
2. Nhấn nút "Tiến hành thanh toán"
3. Nhấn nút "Xác nhận thanh toán"
4. Xem lại giỏ hàng

### Expected Result
Các sản phẩm đã được thanh toán phải được xóa trong giỏ hàng

### Actual Result
Các sản phẩm đã được thanh toán vẫn còn nằm trong giỏ hàng

### Evidence
![BUG_05](BUG_05.png)

---

## [BUG-06][FR-08] Giỏ hàng trống nhưng vẫn thanh toán được

### Found by Test Case
TC-Checkout-3

### Requirement Related
FR-08

### Severity / Priority
Minor / P2

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Giỏ hàng trống
2. Đổi URL thêm `/checkout`
3. Nhấn xác nhận thanh toán

### Expected Result
Thông báo giỏ hàng đang trống

### Actual Result
Thanh toán thành công

### Evidence
![BUG_06](BUG_06.png)

---

## [BUG-07][FR-14] Tên danh mục rỗng nhưng vẫn thêm được

### Found by Test Case
TC-QLDM-01

### Requirement Related
FR-14

### Severity / Priority
Critical / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Để trống ô "Tên danh mục mới"
2. Bấm "Thêm mới"

### Expected Result
Thông báo lỗi hoặc không thêm danh mục

### Actual Result
Thêm danh mục rỗng

### Evidence
![BUG_07](BUG_07.png)

**Link github: https://github.com/iamDicun/Group06_HW2_Testing.git**