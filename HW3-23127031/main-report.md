# GUI Checklist — Registry & Login
**Hệ thống:** EShop  
**Màn hình:** Đăng ký (Registry) · Đăng nhập (Login)  
**Functional Requirements:** FR-01, FR-02  
**Ngày tạo checklist:** 02/08/2026  
**Ngày thực thi:** 02/08/2026  
**Trạng thái thực thi:** Đã thực hiện
---

## Màn hình 1: Đăng ký tài khoản (Registry) — FR-01
**Chức năng:** Người dùng đăng ký tài khoản mới bằng Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu. Sau khi thành công, chuyển hướng tới trang Đăng nhập.

| STT | Hạng mục kiểm tra | IA | Pass/Fail | Ghi chú |
|-----|-------------------|-----|-----------|---------|
| 1 | Tiêu đề/trang có nhãn rõ ràng (ví dụ: "Đăng ký", "Register") | IA-01 | Pass |  |
| 2 | Bố cục form căn chỉnh, khoảng cách giữa các trường đồng nhất | IA-01 | Pass |  |
| 3 | Font chữ, màu chữ dễ đọc trên nền hiện tại | IA-01 | Pass |  |
| 4 | Nhãn (label) hiển thị đầy đủ cho tất cả trường nhập | IA-01 | Pass |  |
| 5 | Trường bắt buộc được đánh dấu rõ (ví dụ: dấu * hoặc text "bắt buộc") | IA-01 | Pass |  |
| 6 | Nút submit có nhãn rõ ràng (ví dụ: "Đăng ký", "Register") | IA-01 | Pass |  |
| 7 | Giao diện responsive / hiển thị ổn trên viewport phổ biến | IA-01 | Pass |  |
| 8 | Trường **Họ Tên** hiển thị và cho phép nhập liệu | IA-02 | Pass |  |
| 9 | Trường **Email** hiển thị và cho phép nhập liệu | IA-02 | Pass |  |
| 10 | Trường **Email** dùng `type="email"` (validate HTML5 format) | IA-02 | **Fail** | Email dùng `type="text"` thay vì `type="email"` — không có HTML5 format validation |
| 11 | Trường **Mật khẩu** hiển thị dạng che (password/masked) | IA-02 | Pass |  |
| 12 | Trường **Xác nhận mật khẩu** hiển thị và cho phép nhập liệu | IA-02 | **Fail** | Không có trường Xác nhận mật khẩu — form chỉ có 1 password field |
| 13 | Submit khi để trống Họ Tên → hiển thị thông báo lỗi phù hợp | IA-02 | Pass |  |
| 14 | Submit khi để trống Email → hiển thị thông báo lỗi phù hợp | IA-02 | Pass |  |
| 15 | Submit khi để trống Mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | Pass |  |
| 16 | Submit khi để trống Xác nhận mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | **Fail** | Không có trường Xác nhận mật khẩu để kiểm tra |
| 17 | Email sai định dạng (ví dụ: `abc`, `user@`) → bị từ chối với thông báo rõ ràng | IA-02 | **Fail** | Email type="text" nên không có HTML5 format validation — "abc" được chấp nhận |
| 18 | Email đúng định dạng (`user@domain.com`) → pass validation format | IA-02 | Pass |  |
| 19 | Email đã tồn tại trong hệ thống → bị từ chối với thông báo phù hợp | IA-02 | **Fail** | Không hiển thị thông báo lỗi trùng email — form vẫn ở trang /register |
| 20 | Mật khẩu < 8 ký tự → bị từ chối | IA-02 | Pass |  |
| 21 | Mật khẩu thiếu chữ hoa → bị từ chối | IA-02 | Pass |  |
| 22 | Mật khẩu thiếu chữ thường → bị từ chối | IA-02 | Pass |  |
| 23 | Mật khẩu thiếu chữ số → bị từ chối | IA-02 | Pass |  |
| 24 | Mật khẩu thiếu ký tự đặc biệt (@, $, !, %, *, ?, &) → bị từ chối | IA-02 | Pass |  |
| 25 | Mật khẩu đáp ứng đủ quy tắc mạnh → pass validation | IA-02 | **Fail** | Đăng ký với mật khẩu mạnh không thành công — vẫn ở trang /register |
| 26 | Mật khẩu và Xác nhận mật khẩu không khớp → bị từ chối | IA-02 | **Fail** | Không có trường Xác nhận mật khẩu để kiểm tra |
| 27 | Mật khẩu và Xác nhận mật khẩu khớp nhau → pass validation khớp | IA-02 | **Fail** | Không có trường Xác nhận mật khẩu để kiểm tra |
| 28 | Có hướng dẫn/quy tắc mật khẩu hiển thị cho người dùng (nếu thiết kế có) | IA-02 | Pass |  |
| 29 | Tab order giữa các trường theo thứ tự logic (Họ Tên → Email → Mật khẩu → Submit) | IA-02 | Pass |  |
| 30 | Có liên kết/chuyển hướng tới trang **Đăng nhập** (ví dụ: "Đã có tài khoản?") | IA-03 | Pass |  |
| 31 | Liên kết tới trang Đăng nhập hoạt động đúng | IA-03 | Pass |  |
| 32 | Đăng ký thành công → tự động chuyển hướng tới trang **Đăng nhập** | IA-03 | Pass |  |
| 33 | Trong lúc submit, nút Đăng ký bị vô hiệu hoặc hiển thị trạng thái loading | IA-04 | **Fail** | Button không bị disabled và không có loading indicator |
| 34 | Lỗi validation hiển thị gần trường tương ứng hoặc vị trí dễ nhận biết | IA-04 | Pass |  |
| 35 | Thông báo lỗi dùng ngôn ngữ rõ ràng, không gây hiểu nhầm | IA-04 | Pass |  |
| 36 | Đăng ký thành công có phản hồi rõ trước hoặc khi chuyển trang | IA-04 | **Fail** | Không có thông báo thành công |
| 37 | Sau lỗi, dữ liệu đã nhập (trừ mật khẩu) được giữ lại hoặc xử lý nhất quán | IA-04 | Pass |  |
| 38 | Người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter) | IA-01 | Pass |  |
| 39 | Liên kết hoặc nút đổi màu khi hover để thể hiện trạng thái tương tác | IA-01 | Pass |  |
| 40 | Giao diện vẫn hiển thị đúng khi phóng to trình duyệt lên 200% (không vỡ bố cục, không chồng chữ) | IA-01 | Pass |  |

**Kết quả Registry:** 30 Pass, 10 Fail

---

## Màn hình 2: Đăng nhập (Login) — FR-02 (Primary Screen)
**Chức năng:** Người dùng đăng nhập bằng Email và Mật khẩu. Sai liên tiếp ≥ 3 lần → khóa 30 giây.

| STT | Hạng mục kiểm tra | IA | Pass/Fail | Ghi chú |
|-----|-------------------|-----|-----------|---------|
| 41 | Tiêu đề/trang có nhãn rõ ràng (ví dụ: "Đăng nhập", "Login") | IA-01 | **Fail** | Heading trang Login hiển thị "Đăng Ký" thay vì "Đăng Nhập" |
| 42 | Bố cục form căn chỉnh, khoảng cách giữa các trường đồng nhất | IA-01 | Pass |  |
| 43 | Font chữ, màu chữ dễ đọc trên nền hiện tại | IA-01 | Pass |  |
| 44 | Nhãn hiển thị đầy đủ cho trường Email và Mật khẩu | IA-01 | Pass |  |
| 45 | Nút submit có nhãn rõ ràng (ví dụ: "Đăng nhập", "Sign In") | IA-01 | Pass |  |
| 46 | Giao diện responsive / hiển thị ổn trên viewport phổ biến | IA-01 | Pass |  |
| 47 | Trường **Email** hiển thị và cho phép nhập liệu | IA-02 | Pass |  |
| 48 | Trường **Email** dùng `type="email"` (validate HTML5 format) | IA-02 | **Fail** | Username dùng `type="text"` thay vì `type="email"` — không có HTML5 format validation |
| 49 | Trường **Mật khẩu** hiển thị dạng che (password/masked) | IA-02 | **Fail** | Mật khẩu dùng `type="text"` — hiển thị PLAINTEXT, không che |
| 50 | Submit khi để trống Email → hiển thị thông báo lỗi phù hợp | IA-02 | Pass |  |
| 51 | Submit khi để trống Mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | Pass |  |
| 52 | Email sai định dạng HTML5 (ví dụ: `abc`) -> bị chặn/báo lỗi trước khi gửi request | IA-02 | **Fail** | Username type="text" nên "abc" được chấp nhận — không có HTML5 validation |
| 53 | Email đúng định dạng → cho phép submit form | IA-02 | Pass |  |
| 54 | Tab order theo thứ tự logic (Email -> Mật khẩu -> Submit) | IA-02 | Pass |  |
| 55 | Có liên kết/chuyển hướng tới trang **Đăng ký** (ví dụ: "Chưa có tài khoản?") | IA-03 | Pass |  |
| 56 | Liên kết tới trang Đăng ký hoạt động đúng | IA-03 | Pass |  |
| 57 | Đăng nhập thành công -> chuyển hướng tới trang chính/landing phù hợp | IA-03 | Pass |  |
| 58 | Đăng nhập sai lần 1 -> tăng bộ đếm đúng 1, hiển thị lỗi chung (không lộ email tồn tại hay không) | IA-04 | Pass |  |
| 59 | Đăng nhập sai lần 2 liên tiếp -> bộ đếm = 2, vẫn cho phép thử (chưa khóa) | IA-04 | Pass |  |
| 60 | Đăng nhập sai lần 3 liên tiếp -> tài khoản bị khóa 30 giây | IA-04 | **Fail** | Không hiển thị thông báo khóa tài khoản sau 3 lần sai |
| 61 | Thông báo khóa tài khoản rõ ràng, không tiết lộ chi tiết nguyên nhân | IA-04 | **Fail** | Không có thông báo khóa |
| 62 | Email chưa đăng ký + mật khẩu bất kỳ → thông báo lỗi chung, không khác biệt so với sai mật khẩu | IA-04 | Pass |  |
| 63 | Email đúng + mật khẩu sai -> thông báo lỗi chung, không tiết lộ mật khẩu sai | IA-04 | Pass |  |
| 64 | Trong thời gian khóa (30s), submit đúng thông tin vẫn bị từ chối | IA-04 | Pass |  |
| 65 | Sau 30 giây, tài khoản được mở khóa và có thể đăng nhập lại | IA-04 | **Fail** | Sau 30s vẫn không đăng nhập được — URL vẫn ở /login |
| 66 | Trong lúc submit, nút Đăng nhập bị vô hiệu hoặc hiển thị trạng thái loading | IA-04 | **Fail** | Button không bị disabled và không có loading indicator |
| 67 | Trạng thái đã đăng nhập phản ánh trên UI (ví dụ: hiển thị tên user, ẩn nút login) | IA-04 | Pass |  |
| 68 | Người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter) | IA-01 | Pass |  |
| 69 | Liên kết hoặc nút đổi màu khi hover để thể hiện trạng thái tương tác | IA-01 | Pass |  |
| 70 | Giao diện vẫn hiển thị đúng khi phóng to trình duyệt lên 200% (không vỡ bố cục, không chồng chữ) | IA-01 | Pass |  |

**Kết quả Login:** 22 Pass, 8 Fail

---

## Bổ sung của sinh viên
Checklist do AI tạo ban đầu đã bỏ sót một số tiêu chí. Vì vậy, em đã bổ sung ba hạng mục sau:

1. Khả năng người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter): nhằm đảm bảo người dùng có thể hoàn thành biểu mẫu mà không cần sử dụng chuột -> checklist số 38, 68
2. Hiệu ứng hover của các thành phần tương tác: nhằm cung cấp phản hồi trực quan khi người dùng di chuyển chuột lên nút hoặc liên kết. -> checklist số 39, 69
3. Hiển thị đúng khi phóng to giao diện lên 200%: nhằm đảm bảo giao diện vẫn dễ đọc và không bị vỡ bố cục khi người dùng cần phóng to nội dung. -> checklist số 40, 70

AI thường bỏ sót các hạng mục trên có thể là do AI chỉ tập trung kiểm tra trang web hoạt động như thế nào qua việc nhấp chuột, ít khi kiểm tra xem trang web hoạt động như nào nếu sử dụng bàn phím để điều hướng. Bên cạnh đó, AI thường tạo checklist kiểm tra trạng thái tĩnh, ít quan tâm đến trạng thái động như khi người dùng hover đến button hay liên kết. Ngoài ra, AI bỏ qua việc kiểm thử giao diện có hiển thị đúng khi phóng to giao diện lên 200% do AI thường kiểm tra trang ở 100%, ít khi quan tâm đến việc zoom out hay zoom in giao diện.

---

## Danh sách lỗi phát hiện (Bugs Found)

| Bug ID | Mô tả | Severity | Checklist |
|--------|-------|----------|-----------|
| BUG-01 | Register: Email field dùng `type="text"` thay vì `type="email"` — không có HTML5 format validation | Major | STT 10, 17 |
| BUG-02 | Register: Không có trường **Xác nhận mật khẩu** (Confirm Password) | Critical | STT 12, 16, 26, 27 |
| BUG-03 | Register: Button submit không có disabled/loading state trong lúc gửi | Major | STT 33 |
| BUG-04 | Register: Email trùng không hiển thị lỗi rõ ràng | Major | STT 19 |
| BUG-05 | Register: Đăng ký thành công không có phản hồi rõ (toast/message) | Major | STT 36 |
| BUG-06 | Login: Heading trang Login hiển thị **"Đăng Ký"** thay vì **"Đăng Nhập"** | Major | STT 41 |
| BUG-07 | Login: Username field dùng `type="text"` thay vì `type="email"` — không có HTML5 validation | Major | STT 48, 52 |
| BUG-08 | Login: Mật khẩu dùng `type="text"` — hiển thị **PLAINTEXT**, không che | Critical | STT 49 |
| BUG-09 | Login: Không có thông báo khóa tài khoản sau 3 lần sai | Critical | STT 60, 61, 65 |
| BUG-10 | Login: Button submit không có disabled/loading state trong lúc gửi | Major | STT 66 |

---

## Tóm tắt kiểm thử (Test Summary)

| Chỉ số | Giá trị |
|--------|---------|
| Số lượng màn hình đã kiểm thử (Number of screens tested) | 2 / 2 |
| Số lượng hạng mục checklist đã thiết kế (Checklist items designed) | 70 |
| Số lượng hạng mục checklist đã thực hiện (Checklist items executed) | 70 |
| Số lượng hạng mục đạt (Passed) | **52** |
| Số lượng hạng mục không đạt (Failed) | **18** |
| Số lượng lỗi được phát hiện (Number of bugs) | **10** |

### Phân bổ theo IA

| Nhóm IA | Registry (FR-01) | Login (FR-02) | Tổng |
|---------|------------------|---------------|------|
| IA-01: General UI Standards | Pass: 10, Fail: 0 | Pass: 8, Fail: 1 | Pass: 18, Fail: 1 |
| IA-02: Forms | Pass: 14, Fail: 8 | Pass: 5, Fail: 3 | Pass: 19, Fail: 11 |
| IA-03: Navigation | Pass: 3, Fail: 0 | Pass: 3, Fail: 0 | Pass: 6, Fail: 0 |
| IA-04: Feedback/State | Pass: 3, Fail: 2 | Pass: 6, Fail: 4 | Pass: 9, Fail: 6 |
| **Tổng** | **Pass: 30, Fail: 10** | **Pass: 22, Fail: 8** | **Pass: 52, Fail: 18** |