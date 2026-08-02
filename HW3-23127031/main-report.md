# GUI Checklist — Registry & Login
**Hệ thống:** EShop  
**Màn hình:** Đăng ký (Registry) · Đăng nhập (Login)  
**Functional Requirements:** FR-01, FR-02  
**Ngày tạo checklist:** 02/08/2026  
**Trạng thái thực thi:** Chưa thực hiện (checklist thiết kế)
---

## Màn hình 1: Đăng ký tài khoản (Registry) — FR-01
**Chức năng:** Người dùng đăng ký tài khoản mới bằng Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu. Sau khi thành công, chuyển hướng tới trang Đăng nhập.
| STT | Hạng mục kiểm tra | IA | Pass/Fail | Ghi chú |
|-----|-------------------|-----|-----------|---------|
| 1 | Tiêu đề/trang có nhãn rõ ràng (ví dụ: "Đăng ký", "Register") | IA-01 | | |
| 2 | Bố cục form căn chỉnh, khoảng cách giữa các trường đồng nhất | IA-01 | | |
| 3 | Font chữ, màu chữ dễ đọc trên nền hiện tại | IA-01 | | |
| 4 | Nhãn (label) hiển thị đầy đủ cho tất cả trường nhập | IA-01 | | |
| 5 | Trường bắt buộc được đánh dấu rõ (ví dụ: dấu * hoặc text "bắt buộc") | IA-01 | | |
| 6 | Nút submit có nhãn rõ ràng (ví dụ: "Đăng ký", "Register") | IA-01 | | |
| 7 | Giao diện responsive / hiển thị ổn trên viewport phổ biến | IA-01 | | |
| 8 | Trường **Họ Tên** hiển thị và cho phép nhập liệu | IA-02 | | |
| 9 | Trường **Email** hiển thị và cho phép nhập liệu | IA-02 | | |
| 10 | Trường **Email** dùng `type="email"` (validate HTML5 format) | IA-02 | | |
| 11 | Trường **Mật khẩu** hiển thị dạng che (password/masked) | IA-02 | | |
| 12 | Trường **Xác nhận mật khẩu** hiển thị và cho phép nhập liệu | IA-02 | | |
| 13 | Submit khi để trống Họ Tên → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 14 | Submit khi để trống Email → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 15 | Submit khi để trống Mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 16 | Submit khi để trống Xác nhận mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 17 | Email sai định dạng (ví dụ: `abc`, `user@`) → bị từ chối với thông báo rõ ràng | IA-02 | | |
| 18 | Email đúng định dạng (`user@domain.com`) → pass validation format | IA-02 | | |
| 19 | Email đã tồn tại trong hệ thống → bị từ chối với thông báo phù hợp | IA-02 | | |
| 20 | Mật khẩu < 8 ký tự → bị từ chối | IA-02 | | |
| 21 | Mật khẩu thiếu chữ hoa → bị từ chối | IA-02 | | |
| 22 | Mật khẩu thiếu chữ thường → bị từ chối | IA-02 | | |
| 23 | Mật khẩu thiếu chữ số → bị từ chối | IA-02 | | |
| 24 | Mật khẩu thiếu ký tự đặc biệt (@, $, !, %, *, ?, &) → bị từ chối | IA-02 | | |
| 25 | Mật khẩu đáp ứng đủ quy tắc mạnh → pass validation | IA-02 | | |
| 26 | Mật khẩu và Xác nhận mật khẩu không khớp → bị từ chối | IA-02 | | |
| 27 | Mật khẩu và Xác nhận mật khẩu khớp nhau → pass validation khớp | IA-02 | | |
| 28 | Có hướng dẫn/quy tắc mật khẩu hiển thị cho người dùng (nếu thiết kế có) | IA-02 | | |
| 29 | Tab order giữa các trường theo thứ tự logic (Họ Tên → Email → Mật khẩu → Xác nhận → Submit) | IA-02 | | |
| 30 | Có liên kết/chuyển hướng tới trang **Đăng nhập** (ví dụ: "Đã có tài khoản?") | IA-03 | | |
| 31 | Liên kết tới trang Đăng nhập hoạt động đúng | IA-03 | | |
| 32 | Đăng ký thành công → tự động chuyển hướng tới trang **Đăng nhập** | IA-03 | | |
| 33 | Trong lúc submit, nút Đăng ký bị vô hiệu hoặc hiển thị trạng thái loading | IA-04 | | |
| 34 | Lỗi validation hiển thị gần trường tương ứng hoặc vị trí dễ nhận biết | IA-04 | | |
| 35 | Thông báo lỗi dùng ngôn ngữ rõ ràng, không gây hiểu nhầm | IA-04 | | |
| 36 | Đăng ký thành công có phản hồi rõ (toast/message/redirect) trước hoặc khi chuyển trang | IA-04 | | |
| 37 | Sau lỗi, dữ liệu đã nhập (trừ mật khẩu) được giữ lại hoặc xử lý nhất quán | IA-04 | | |
| 38 | Người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter) | IA-01 | | |
| 39 | Liên kết hoặc nút đổi màu khi hover để thể hiện trạng thái tương tác | IA-01 | | |
| 40 | Giao diện vẫn hiển thị đúng khi phóng to trình duyệt lên 200% (không vỡ bố cục, không chồng chữ) | IA-01 | | |
---

## Màn hình 2: Đăng nhập (Login) — FR-02 (Primary Screen)
**Chức năng:** Người dùng đăng nhập bằng Email và Mật khẩu. Sai liên tiếp ≥ 3 lần → khóa 30 giây. Đăng nhập thành công trả JWT, lưu client và gửi kèm header `Authorization: Bearer <token>`.
| STT | Hạng mục kiểm tra | IA | Pass/Fail | Ghi chú |
|-----|-------------------|-----|-----------|---------|
| 41 | Tiêu đề/trang có nhãn rõ ràng (ví dụ: "Đăng nhập", "Login") | IA-01 | | |
| 42 | Bố cục form căn chỉnh, khoảng cách giữa các trường đồng nhất | IA-01 | | |
| 43 | Font chữ, màu chữ dễ đọc trên nền hiện tại | IA-01 | | |
| 44 | Nhãn hiển thị đầy đủ cho trường Email và Mật khẩu | IA-01 | | |
| 45 | Nút submit có nhãn rõ ràng (ví dụ: "Đăng nhập", "Sign In") | IA-01 | | |
| 46 | Giao diện responsive / hiển thị ổn trên viewport phổ biến | IA-01 | | |
| 47 | Trường **Email** hiển thị và cho phép nhập liệu | IA-02 | | |
| 48 | Trường **Email** dùng `type="email"` (validate HTML5 format) | IA-02 | | |
| 49 | Trường **Mật khẩu** hiển thị dạng che (password/masked) | IA-02 | | |
| 50 | Submit khi để trống Email → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 51 | Submit khi để trống Mật khẩu → hiển thị thông báo lỗi phù hợp | IA-02 | | |
| 52 | Email sai định dạng HTML5 (ví dụ: `abc`) -> bị chặn/báo lỗi trước khi gửi request | IA-02 | | |
| 53 | Email đúng định dạng → cho phép submit form | IA-02 | | |
| 54 | Tab order theo thứ tự logic (Email -> Mật khẩu -> Submit) | IA-02 | | |
| 55 | Có liên kết/chuyển hướng tới trang **Đăng ký** (ví dụ: "Chưa có tài khoản?") | IA-03 | | |
| 56 | Liên kết tới trang Đăng ký hoạt động đúng | IA-03 | | |
| 57 | Đăng nhập thành công -> chuyển hướng tới trang chính/landing phù hợp | IA-03 | | |
| 58 | Đăng nhập sai lần 1 -> tăng bộ đếm đúng 1, hiển thị lỗi chung (không lộ email tồn tại hay không) | IA-04 | | |
| 59 | Đăng nhập sai lần 2 liên tiếp -> bộ đếm = 2, vẫn cho phép thử (chưa khóa) | IA-04 | | |
| 60 | Đăng nhập sai lần 3 liên tiếp -> tài khoản bị khóa 30 giây | IA-04 | | |
| 61 | Thông báo khóa tài khoản rõ ràng, không tiết lộ chi tiết nguyên nhân (enumeration) | IA-04 | | |
| 62 | Email chưa đăng ký + mật khẩu bất kỳ → thông báo lỗi chung, không khác biệt so với sai mật khẩu | IA-04 | | |
| 63 | Email đúng + mật khẩu sai -> thông báo lỗi chung, không tiết lộ mật khẩu sai | IA-04 | | |
| 64 | Trong thời gian khóa (30s), submit đúng thông tin vẫn bị từ chối | IA-04 | | |
| 65 | Sau 30 giây, tài khoản được mở khóa và có thể đăng nhập lại | IA-04 | | |
| 66 | Trong lúc submit, nút Đăng nhập bị vô hiệu hoặc hiển thị trạng thái loading | IA-04 | | |
| 67 | Trạng thái đã đăng nhập phản ánh trên UI (ví dụ: hiển thị tên user, ẩn nút login) | IA-04 | | |
| 68 | Người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter) | IA-01 | | |
| 69 | Liên kết hoặc nút đổi màu khi hover để thể hiện trạng thái tương tác | IA-01 | | |
| 70 | Giao diện vẫn hiển thị đúng khi phóng to trình duyệt lên 200% (không vỡ bố cục, không chồng chữ) | IA-01 | | |
---

## Bổ sung của sinh viên
Checklist do AI tạo ban đầu đã bỏ sót một số tiêu chí. Vì vậy, em đã bổ sung ba hạng mục sau:

1. Khả năng người dùng có thể hoàn thành form chỉ bằng bàn phím (Tab, Shift+Tab, Enter): nhằm đảm bảo người dùng có thể hoàn thành biểu mẫu mà không cần sử dụng chuột -> checklist số 38, 68
2. Hiệu ứng hover của các thành phần tương tác: nhằm cung cấp phản hồi trực quan khi người dùng di chuyển chuột lên nút hoặc liên kết. -> checklist số 39, 69
3. Hiển thị đúng khi phóng to giao diện lên 200%: nhằm đảm bảo giao diện vẫn dễ đọc và không bị vỡ bố cục khi người dùng cần phóng to nội dung. -> checklist số 40, 70

AI thường bỏ sót các hạng mục trên có thể là do AI chỉ tập trung kiểm tra trang web hoạt động như thế nào qua việc nhấp chuột, ít khi kiểm tra xem trang web hoạt động như nào nếu sử dụng bàn phím để điều hướng. Bên cạnh đó, AI thường tạo checklist kiểm tra trạng thái tĩnh, ít quan tâm đến trạng thái động như khi người dùng hover đến button hay liên kết. Ngoài ra, AI bỏ qua việc kiểm thử giao diện có hiển thị đúng khi phóng to giao diện lên 200% do AI thường kiểm tra trang ở 100%, ít khi quan tâm đến việc zoom out hay zoom in giao diện.

## Tóm tắt kiểm thử (Test Summary)
| Chỉ số | Giá trị |
|--------|---------|
| Số lượng màn hình đã kiểm thử (Number of screens tested) | 2 / 2 |
| Số lượng hạng mục checklist đã thiết kế (Checklist items designed) | 70 |
| Số lượng hạng mục checklist đã thực hiện (Checklist items executed) | 0 |
| Số lượng hạng mục đạt (Passed) | 0 |
| Số lượng hạng mục không đạt (Failed) | 0 |
| Số lượng lỗi được phát hiện (Number of bugs) | 0 |

### Phân bổ theo IA
| Nhóm IA | Registry (FR-01) | Login (FR-02) | Tổng |
|---------|------------------|---------------|------|
| IA-01: General UI Standards | 10 | 9 | 19 |
| IA-02: Forms | 22 | 8 | 30 |
| IA-03: Navigation | 3 | 3 | 6 |
| IA-04: Feedback/State | 5 | 10 | 15 |
| **Tổng** | **40** | **30** | **70** |