# Test Cases: FR-03 - Forgot Password & Password Reset

**Feature:** `FR-03` Forgot Password & Reset (Two Steps)  
**Module:** Authentication (`FORGOT_PW`)  
**Target Page:** `/forgot-password` (Web Frontend)  
**Total Test Cases:** 13 (Positive: 4, Negative: 6, Edge: 3)

---

| ID | Category | Scenario / Description | Precondition | Input Data | Steps | Expected Result | Priority |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| `TC_FP_01` | Positive | Lấy mã OTP thành công với email đã đăng ký | Tài khoản `user@example.com` đã tồn tại trên SUT | `email: "user@example.com"` | 1. Mở trang `/forgot-password`<br>2. Nhập Email<br>3. Bấm "Lấy mã OTP" | Chuyển sang bước 2, hiển thị thông báo "Mã OTP của bạn là: XXXX" | P0 |
| `TC_FP_02` | Positive | Đặt lại mật khẩu thành công với OTP đúng và MK mạnh hợp lệ | Đã thực hiện bước 1 lấy OTP | `otp: "1234"` (từ bước 1), `newPassword: "NewPass123! "` | 1. Nhập OTP<br>2. Nhập mật khẩu mới mạnh<br>3. Bấm "Đặt lại mật khẩu" | Thông báo "Đổi mật khẩu thành công!" và chuyển hướng sang `/login` | P0 |
| `TC_FP_03` | Positive | Quay lại bước 1 từ bước 2 nhập OTP | Đang ở bước 2 | Click "← Quay lại" | Click nút "← Quay lại" | Form bước 1 hiển thị lại với ô nhập Email | P2 |
| `TC_FP_04` | Positive | Đăng nhập thành công với mật khẩu mới vừa đổi | Đã đổi mật khẩu ở `TC_FP_02` | `email: "user@example.com"`, `password: "NewPass123! "` | 1. Đến `/login`<br>2. Nhập email & mật khẩu mới<br>3. Click Đăng nhập | Đăng nhập thành công, chuyển tới trang chủ | P0 |
| `TC_FP_05` | Negative | Gửi yêu cầu lấy OTP với email chưa đăng ký trong hệ thống | Email chưa từng đăng ký | `email: "notfound@example.com"` | 1. Nhập email chưa có<br>2. Click "Lấy mã OTP" | Hiển thị alert thông báo lỗi không tìm thấy tài khoản | P1 |
| `TC_FP_06` | Negative | Gửi yêu cầu lấy OTP để trống email | Đang ở trang bước 1 | `email: ""` | 1. Để trống Email<br>2. Submit form | HTML5 validation ngăn submit hoặc thông báo yêu cầu nhập Email | P1 |
| `TC_FP_07` | Negative | Gửi yêu cầu lấy OTP với email sai định dạng | Đang ở bước 1 | `email: "invalid-email-format"` | 1. Nhập email sai định dạng<br>2. Submit form | Trình duyệt hoặc ứng dụng báo lỗi email không hợp lệ | P2 |
| `TC_FP_08` | Negative | Đặt lại mật khẩu với mã OTP sai (sai 4 chữ số) | Ở bước 2 | `otp: "9999"`, `newPassword: "NewPassword123! "` | 1. Nhập OTP sai<br>2. Nhập MK mới<br>3. Submit | Alert báo "Mã OTP không đúng hoặc có lỗi xảy ra." | P1 |
| `TC_FP_09` | Negative | Đặt lại mật khẩu với mật khẩu mới quá ngắn (< 8 ký tự) | Ở bước 2 | `otp: "1234"`, `newPassword: "Short1!"` | 1. Nhập OTP đúng<br>2. Nhập MK ngắn<br>3. Submit | Alert báo lỗi mật khẩu quá yếu (phải dài tối thiểu 8 ký tự) | P1 |
| `TC_FP_10` | Edge | Đặt lại mật khẩu không chứa ký tự khoảng trắng/ký tự đặc biệt theo yêu cầu regex flawed | Ở bước 2 | `otp: "1234"`, `newPassword: "Password123"` (không space/ký tự đặc biệt) | 1. Nhập OTP<br>2. Nhập MK không đúng regex flawedStrongPasswordRegex<br>3. Submit | Alert báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự..." | P2 |
| `TC_FP_11` | Edge | Nhập mã OTP chứa ký tự chữThay vì 4 số | Ở bước 2 | `otp: "ABCD"`, `newPassword: "NewPassword123! "` | 1. Nhập OTP dạng chữ<br>2. Submit | Server báo lỗi OTP không khớp hoặc không hợp lệ | P2 |
| `TC_FP_12` | Edge | Đặt lại mật khẩu khớp chính xác regex flawed (có chữ hoa, chữ thường, số, khoảng trắng) | Ở bước 2 | `otp: "1234"`, `newPassword: "Pass Word123"` | 1. Nhập OTP đúng<br>2. Nhập MK chứa khoảng trắng<br>3. Submit | Đổi mật khẩu thành công | P2 |
| `TC_FP_13` | Negative | Kiểm tra ô Xác nhận Mật khẩu (Confirm Password) và xử lý không trùng khớp | Ở bước 2 form đặt lại mật khẩu | `newPassword: "Pass Word123"`, `confirmPassword: "MismatchPass123!"` | 1. Nhập OTP<br>2. Kiểm tra sự tồn tại ô "Xác nhận mật khẩu"<br>3. Nhập mật khẩu không trùng khớp | Mẫu giao diện phải có ô "Xác nhận mật khẩu" và từ chối nếu 2 ô không trùng nhau (Ghi nhận BUG-FR03-003 nếu thiếu ô này trên SUT) | P1 |
