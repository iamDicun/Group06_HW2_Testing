# Bug Reports — GUI Checklist (Registry & Login)

## [BUG-01][FR-01] Trường Email dùng type="text" thay vì type="email"

### Found by Test Case
STT 10, STT 17

### Requirement Related
FR-01

### Severity / Priority
Major / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng ký (`/register`)
2. Nhập email sai định dạng `abc` vào trường Email
3. Bấm "Đăng Ký"

### Expected Result
Trường Email phải dùng `type="email"` để trình duyệt tự động validate định dạng email (HTML5 validation). Nhập `abc` phải bị từ chối trước khi gửi request.

### Actual Result
Trường Email dùng `type="text"`, nhập `abc` được chấp nhận mà không có thông báo lỗi định dạng email nào.

### Evidence
![BUG_01](bug_report_gihub_issues_screenshots/BUG_01.png)

---

## [BUG-02][FR-01] Không có trường Xác nhận mật khẩu

### Found by Test Case
STT 12, STT 16, STT 26, STT 27

### Requirement Related
FR-01

### Severity / Priority
Critical / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng ký (`/register`)
2. Quan sát form đăng ký

### Expected Result
Form phải có trường "Xác nhận mật khẩu" (Confirm Password) để người dùng nhập lại mật khẩu xác nhận.

### Actual Result
Form chỉ có 3 trường: Họ Tên, Email, Mật khẩu. Không có trường Xác nhận mật khẩu.

### Evidence
![BUG_02](bug_report_gihub_issues_screenshots/BUG_02.png)

---

## [BUG-03][FR-01] Nút Đăng ký không có trạng thái disabled/loading khi submit

### Found by Test Case
STT 33

### Requirement Related
FR-01

### Severity / Priority
Major / P1

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng ký (`/register`)
2. Điền đầy đủ thông tin hợp lệ
3. Bấm "Đăng Ký"
4. Quan sát nút submit trong lúc đang xử lý

### Expected Result
Nút "Đăng Ký" phải bị disabled hoặc hiển thị spinner/loading indicator trong lúc form đang được gửi đi.

### Actual Result
Nút "Đăng Ký" vẫn enabled bình thường, không có bất kỳ indicator loading nào.

### Evidence
![BUG_03](bug_report_gihub_issues_screenshots/BUG_03.png)

---

## [BUG-04][FR-01] Email đã tồn tại không hiển thị lỗi rõ ràng

### Found by Test Case
STT 19

### Requirement Related
FR-01

### Severity / Priority
Major / P1

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng ký (`/register`)
2. Nhập Email đã tồn tại: `user@email.com`
3. Điền đầy đủ thông tin còn lại
4. Bấm "Đăng Ký"

### Expected Result
Hiển thị thông báo lỗi rõ ràng: "Email đã tồn tại" hoặc "Email already exists".

### Actual Result
Không hiển thị thông báo lỗi trùng email. Form vẫn ở trạng thái cũ, người dùng không biết tại sao đăng ký không thành công.

### Evidence
![BUG_04](bug_report_gihub_issues_screenshots/BUG_04.png)

---

## [BUG-05][FR-01] Đăng ký thành công không có phản hồi rõ ràng

### Found by Test Case
STT 36

### Requirement Related
FR-01

### Severity / Priority
Major / P1

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng ký (`/register`)
2. Nhập thông tin hợp lệ với email chưa tồn tại
3. Bấm "Đăng Ký"

### Expected Result
Có thông báo thành công.

### Actual Result
Không có thông báo thành công.

### Evidence
![BUG_05](bug_report_gihub_issues_screenshots/BUG_05.png)

---

## [BUG-06][FR-02] Heading trang Đăng nhập hiển thị "Đăng Ký" thay vì "Đăng Nhập"

### Found by Test Case
STT 41

### Requirement Related
FR-02

### Severity / Priority
Major / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng nhập (`/login`)
2. Quan sát heading (tiêu đề) của trang

### Expected Result
Heading trang Login phải hiển thị "Đăng Nhập" hoặc "Login".

### Actual Result
Heading trang Login hiển thị **"Đăng Ký"** — đây là text của trang Register, gây nhầm lẫn nghiêm trọng cho người dùng.

### Evidence
![BUG_06](bug_report_gihub_issues_screenshots/BUG_06.png)

---

## [BUG-07][FR-02] Trường Username dùng type="text" thay vì type="email"

### Found by Test Case
STT 48, STT 52

### Requirement Related
FR-02

### Severity / Priority
Major / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng nhập (`/login`)
2. Nhập `abc` vào trường Username
3. Bấm "Sign In"

### Expected Result
Trường Username phải dùng `type="email"` để trình duyệt tự động validate định dạng email. Nhập `abc` phải bị từ chối trước khi gửi request.

### Actual Result
Trường Username dùng `type="text"`, nhập `abc` được chấp nhận mà không có thông báo lỗi định dạng email nào.

### Evidence
![BUG_07](bug_report_gihub_issues_screenshots/BUG_07.png)

---

## [BUG-08][FR-02] Trường Mật khẩu dùng type="text" — hiển thị PLAINTEXT

### Found by Test Case
STT 49

### Requirement Related
FR-02

### Severity / Priority
**Critical / P0**

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng nhập (`/login`)
2. Nhập mật khẩu bất kỳ vào trường Mật khẩu
3. Quan sát giá trị nhập vào

### Expected Result
Trường Mật khẩu phải dùng `type="password"` để hiển thị dạng che (dots/asterisks), không để lộ mật khẩu.

### Actual Result
Trường Mật khẩu dùng `type="text"` — mật khẩu hiển thị **PLAINTEXT** hoàn toàn, ai đứng bên cạnh cũng có thể thấy.

### Evidence
![BUG_08](bug_report_gihub_issues_screenshots/BUG_08.png)

---

## [BUG-09][FR-02] Không có thông báo khóa tài khoản sau 3 lần đăng nhập sai

### Found by Test Case
STT 60, STT 61, STT 65

### Requirement Related
FR-02

### Severity / Priority
Critical / P0

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng nhập (`/login`)
2. Đăng nhập sai 3 lần liên tiếp với cùng một email
3. Quan sát thông báo

### Expected Result
Sau 3 lần đăng nhập sai liên tiếp, tài khoản phải bị khóa 30 giây và hiển thị thông báo rõ ràng: "Tài khoản đã bị khóa. Vui lòng thử lại sau."

### Actual Result
Không có thông báo khóa tài khoản nào.

### Evidence
![BUG_09](bug_report_gihub_issues_screenshots/BUG_09.png)

---

## [BUG-10][FR-02] Nút Sign In không có trạng thái disabled/loading khi submit

### Found by Test Case
STT 66

### Requirement Related
FR-02

### Severity / Priority
Major / P1

### Environment
- **Browser:** Chrome
- **OS:** Windows 11

### Steps to Reproduce
1. Vào trang Đăng nhập (`/login`)
2. Điền đầy đủ Username và Mật khẩu
3. Bấm "Sign In"
4. Quan sát nút submit trong lúc đang xử lý

### Expected Result
Nút "Sign In" phải bị disabled hoặc hiển thị spinner/loading indicator trong lúc form đang được gửi đi.

### Actual Result
Nút "Sign In" vẫn enabled bình thường, không có bất kỳ indicator loading nào.

### Evidence
![BUG_10](bug_report_gihub_issues_screenshots/BUG_10.png)

---

**Link github: https://github.com/iamDicun/Group06_HW2_Testing.git**
