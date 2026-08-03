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

### Usability Test Bugs (Task 2)

| Bug ID | Mô tả | Severity | Participants |
|--------|-------|----------|-------------|
| BUG-US-01 | Đăng ký thất bại dù nhập đúng thông tin hợp lệ, không rõ nguyên nhân | Blocker | P1–P7 (0/7 success) |
| BUG-US-02 | Thông báo lỗi khi đăng ký/đăng nhập không hướng dẫn cách khắc phục | Major | P1–P7 (7/7) |
| BUG-US-03 | Đăng ký thành công nhưng không đăng nhập được bằng chính tài khoản đó | Major | P3 |
| BUG-US-04 | Quy tắc mật khẩu yêu cầu khoảng trắng nhưng không công bố trên form | Major | P6 |
| BUG-US-05 | Thêm vào giỏ hàng phản hồi không nhất quán, thiếu xác nhận thành công | Minor | P2, P5 |

---

## Tóm tắt kiểm thử (Test Summary)

| Chỉ số | Giá trị |
|--------|---------|
| Số lượng màn hình đã kiểm thử (Number of screens tested) | 2 / 2 |
| Số lượng hạng mục checklist đã thiết kế (Checklist items designed) | 70 |
| Số lượng hạng mục checklist đã thực hiện (Checklist items executed) | 70 |
| Số lượng hạng mục đạt (Passed) | **52** |
| Số lượng hạng mục không đạt (Failed) | **18** |
| Số lượng lỗi được phát hiện (Number of bugs) | **15** (10 GUI + 5 Usability) |

### Phân bổ theo IA

| Nhóm IA | Registry (FR-01) | Login (FR-02) | Tổng |
|---------|------------------|---------------|------|
| IA-01: General UI Standards | Pass: 10, Fail: 0 | Pass: 8, Fail: 1 | Pass: 18, Fail: 1 |
| IA-02: Forms | Pass: 14, Fail: 8 | Pass: 5, Fail: 3 | Pass: 19, Fail: 11 |
| IA-03: Navigation | Pass: 3, Fail: 0 | Pass: 3, Fail: 0 | Pass: 6, Fail: 0 |
| IA-04: Feedback/State | Pass: 3, Fail: 2 | Pass: 6, Fail: 4 | Pass: 9, Fail: 6 |
| **Tổng** | **Pass: 30, Fail: 10** | **Pass: 22, Fail: 8** | **Pass: 52, Fail: 18** |

---

# Task 2 — Kế hoạch Đánh giá Khả năng Sử dụng (Usability Evaluation Plan)

> **Flow được chọn:** EShop — luồng end-to-end: **Đăng ký tài khoản → Đăng nhập → Tìm kiếm sản phẩm → Xem chi tiết sản phẩm → Thêm vào giỏ hàng → Kiểm tra giỏ hàng**.

---

## Phase 1 — Plan & Prepare

### 1.1 Mục tiêu đánh giá (Objectives)

| # | Mục tiêu | Vì sao quan trọng |
|---|----------|---------------------|
| O1 | Xác định điểm nghẽn ở bước **Đăng ký** (form validation, yêu cầu mật khẩu, xác thực OTP/email...) | Đây là bước đầu tiên — nếu vướng ở đây, người dùng bỏ cuộc trước khi chạm vào giá trị cốt lõi của app |
| O2 | Xác định điểm nghẽn ở bước **Đăng nhập** (quên mật khẩu, nhớ tài khoản, thông báo lỗi sai mật khẩu...) | Đăng nhập lặp lại thường xuyên — friction nhỏ cũng gây khó chịu tích lũy |
| O3 | Đánh giá khả năng người dùng **tìm kiếm** đúng sản phẩm mong muốn (dùng từ khóa, bộ lọc, gợi ý tìm kiếm) | Search là điểm vào chính của hành trình mua hàng |
| O4 | Đánh giá mức độ rõ ràng của **trang chi tiết sản phẩm** (đủ thông tin để ra quyết định thêm vào giỏ chưa) | Thiếu thông tin ở đây khiến người dùng do dự hoặc rời trang |
| O5 | Đo mức độ dễ dàng khi **thêm vào giỏ hàng** và **kiểm tra giỏ hàng** (số lượng, giá, xóa/sửa sản phẩm) | Đây là bước cuối trước khi chuyển sang thanh toán — lỗi ở đây trực tiếp ảnh hưởng chuyển đổi (conversion) |
| O6 | Đo mức độ tự tin của người dùng khi hoàn tất toàn bộ luồng (self-reported confidence) | Tự tin thấp dù hoàn thành task vẫn là rủi ro UX |
| O7 | Đo điểm SUS tổng thể làm baseline để so sánh về sau | Cần một con số định lượng, có thể lặp lại đo |

**Câu hỏi nghiên cứu (research questions):**
- Người dùng có gặp khó khăn gì với yêu cầu định dạng của form đăng ký (mật khẩu, email, số điện thoại) không?
- Sau khi đăng ký, người dùng có tự tìm được đường quay lại đăng nhập không, hay bị lạc?
- Người dùng dùng từ khóa tìm kiếm như thế nào — có khớp với cách hệ thống index sản phẩm không?
- Trang chi tiết sản phẩm có đủ thông tin (giá, size, tồn kho...) để người dùng quyết định thêm vào giỏ mà không cần quay lại danh sách không?
- Khi vào giỏ hàng, người dùng có hiểu rõ tổng tiền, cách chỉnh số lượng, cách xóa sản phẩm không?

---

### 1.2 Kịch bản nhiệm vụ (Task Scenario)

**Nguyên tắc:** cho participant một *mục tiêu*, KHÔNG cho các bước thực hiện.

> **Kịch bản đọc cho participant:**
> "Bạn vừa biết đến app EShop qua bạn bè giới thiệu và muốn dùng thử. Hãy **tạo một tài khoản mới**, sau đó **đăng nhập** bằng tài khoản vừa tạo. Khi đã vào app, hãy **tìm một sản phẩm** mà bạn thực sự quan tâm (ví dụ: Iphone, Macbook), **xem chi tiết** sản phẩm đó để chắc chắn nó phù hợp, rồi **thêm vào giỏ hàng**. Cuối cùng, hãy **vào giỏ hàng để kiểm tra lại** đơn hàng của mình trước khi dừng lại (không cần thanh toán thật)."

Chia nhỏ theo 6 bước con để dễ quan sát & ghi nhận friction riêng từng bước:

| Bước | Task con | Success criteria |
|---|---|---|
| 1 | Đăng ký tài khoản | Tạo được tài khoản mới thành công, không bị kẹt ở bước xác thực |
| 2 | Đăng nhập | Đăng nhập thành công bằng tài khoản vừa tạo, không cần thử sai quá 1 lần |
| 3 | Tìm kiếm sản phẩm | Tìm ra sản phẩm mong muốn trong danh sách kết quả (không cần đúng 1 sản phẩm cụ thể — đúng ý định là đạt) |
| 4 | Xem chi tiết sản phẩm | Mở được trang chi tiết, đọc được các thông tin cần thiết (giá, mô tả, size/tuỳ chọn...) |
| 5 | Thêm vào giỏ hàng | Thêm sản phẩm vào giỏ thành công, có xác nhận rõ ràng (thông báo/badge số lượng...) |
| 6 | Kiểm tra giỏ hàng | Vào được trang giỏ hàng, đọc đúng được tổng số lượng & tổng tiền hiển thị |

Tiêu chí hoàn thành **toàn bộ task**:
- **Hoàn thành (Success):** Hoàn tất cả 6 bước không cần trợ giúp, tự xác nhận đúng thông tin giỏ hàng ở bước cuối
- **Hoàn thành có trợ giúp (Success with assist):** Hoàn thành nhưng cần gợi ý từ người hướng dẫn ở ít nhất 1 bước (ghi rõ bước nào)
- **Không hoàn thành (Fail):** Bỏ cuộc / không thể qua được 1 trong 6 bước trên (ghi rõ bước nào là điểm dừng)

---

### 1.3 Công cụ đo lường (Instruments)

**Thang đo chính:** System Usability Scale (SUS) — 10 câu, thang Likert 1–5, chấm điểm 0–100.

**Câu hỏi mở (Open-ended probe questions)** — hỏi sau khi participant làm xong thang SUS:

| Chủ đề | Câu hỏi |
|---|---|
| **Clarity (Rõ ràng)** | Bước nào trong quá trình bạn thấy khó hiểu nhất? Vì sao? |
| | Có lúc nào bạn không chắc mình đang ở đâu trong quy trình không? |
| **Error recovery (Phục hồi lỗi)** | Bạn có gặp lỗi/thông báo lỗi nào không? Khi đó bạn đã làm gì? |
| | Thông báo lỗi (nếu có) có giúp bạn biết cách sửa không? |
| **Speed (Tốc độ)** | Bạn cảm thấy quá trình này nhanh hay chậm so với kỳ vọng? |
| | Có bước nào bạn thấy thừa/mất thời gian không cần thiết không? |
| **Trust (Tin tưởng)** | Bạn có tin tưởng thông tin hiển thị (giá, mã giảm giá, trạng thái đơn hàng) không? |
| | Có điều gì khiến bạn lo ngại/nghi ngờ trong lúc thao tác không? |

---

### 1.4 Tiêu chí tuyển participant (Recruitment criteria)

- **Số lượng:** 7 người
- **Ưu tiên:** người không làm IT/tester để feedback chân thực hơn.
- **Thông tin liên hệ xác thực:** Zalo/email/SĐT, che 4 số giữa (VD: `090•••1234` → `0901****234` tùy định dạng, xem bảng theo dõi ở file Excel).
- **Thông tin bổ sung cần thu thập cho mỗi participant**: **tuổi, nghề nghiệp, thiết bị sử dụng khi test** (điện thoại/laptop/tablet, hệ điều hành), **trình duyệt/app** (Chrome, Safari, app native...).

---

## Phase 2 — Quy trình chạy buổi test (Session Protocol)

1. **Set the stage** (2 phút): Giải thích đang test *EShop*, không test người dùng. Xin phép ghi màn hình/âm thanh. Yêu cầu think-aloud.
2. **Task** (5–15 phút tùy flow): Đưa kịch bản, quan sát trung lập, không gợi ý trừ khi participant bị kẹt hoàn toàn.
3. **SUS scale** (2 phút): Đưa thang đo, để participant tự điền.
4. **Probe questions** (5–10 phút): Hỏi các câu ở mục 1.3, đào sâu vào điểm friction đã quan sát được.
5. **Kết thúc:** Cảm ơn, xác nhận lại thông tin liên hệ để TA có thể verify nếu cần.

---

## Video bằng chứng Usability Test

| Participant | Video |
|-------------|-------|
| P1 | `usability_session_evidence/P1.mp4` |
| P2 | `usability_session_evidence/P2.mp4` |
| P3 | `usability_session_evidence/P3.mp4` |
| P4 | `usability_session_evidence/P4.mp4` |
| P5 | `usability_session_evidence/P5.mp4` |
| P6 | `usability_session_evidence/P6.mp4` |
| P7 | `usability_session_evidence/P7.mp4` |

---

# Task 2 — Báo cáo Phân tích & Kết quả (Phase 3)

## 1. Tóm tắt (Executive Summary)

Đã kiểm thử luồng Đăng ký → Đăng nhập → Tìm sản phẩm → Xem chi tiết sản phẩm → Thêm giỏ hàng → Kiểm tra giỏ hàng với 7 participants. Điểm SUS trung bình là **58,9/100** (dưới mức trung bình ngành theo thang Bangor et al.). Phát hiện chính: **100% participant không thể tự hoàn tất bước Đăng ký tài khoản** mà không cần hỗ trợ trực tiếp hoặc tài khoản thay thế, và **thông báo lỗi trong toàn luồng không giúp người dùng biết cách khắc phục** — đây là hai điểm nghẽn nghiêm trọng nhất, tập trung gần như toàn bộ ở bước đầu tiên của hành trình.

---

## 2. Kết quả thang đo SUS

| Participant | P1 | P2 | P3 | P4 | P5 | P6 | P7 | **Trung bình** |
|---|---|---|---|---|---|---|---|---|
| Điểm SUS (0–100) | 67.5 | 80 | 65 | 72.5 | 32.5 | 57.5 | 37.5 | **58.9** |

**Nhận định:** Điểm trung bình 58,9/100, so với benchmark ngành 68 (Bangor et al.) → sản phẩm ở mức **Dưới trung bình** (khoảng 51–67 trên thang đánh giá). Đáng chú ý, hai participant có điểm thấp nhất — P5 (32,5) và P7 (37,5) — đều là những người gặp khó khăn rõ rệt nhất ở bước đăng ký, cho thấy mối liên hệ trực tiếp giữa lỗi chặn luồng đăng ký và cảm nhận usability tổng thể kém.

---

## 2b. Tỷ lệ hoàn thành theo từng bước (Step-level completion)

| Bước | P1 | P2 | P3 | P4 | P5 | P6 | P7 | Tỷ lệ Success (n/7) |
|---|---|---|---|---|---|---|---|---|
| 1. Đăng ký tài khoản | Assist| Assist| Assist| Assist| Assist| Assist| Assist| 0/7|
| 2. Đăng nhập |Success |Success |Success |Success | Success| Success|Success | 7/7 |
| 3. Tìm kiếm sản phẩm |Success |Success | Success| Success|Success |Success | Success|7/7 |
| 4. Xem chi tiết sản phẩm |Success |Success | Success|Success | Success| Success| Success|7/7 |
| 5. Thêm vào giỏ hàng | Success| Success| Success| Success|Success |Success |Success |7/7 |
| 6. Kiểm tra giỏ hàng |Success |Success | Success| Success| Success|Success |Success | 7/7|

**Ghi chú đọc bảng:** Bước 1 là điểm nghẽn duy nhất — 0/7 participant tự đăng ký thành công, tất cả đều cần được cấp tài khoản thay thế hoặc hướng dẫn trực tiếp mới đi tiếp được. Các bước 2–6 đạt 7/7 Success, nhưng điều này phần lớn phản ánh việc participant dùng **tài khoản được hỗ trợ cấp sẵn** để đăng nhập, chứ không phải tài khoản họ tự tạo.

---

## 3. Tổng hợp điểm friction (Synthesis)

| Theme / Chủ đề | Loại | Số participant gặp phải (n/7) | Mô tả | Ví dụ trích dẫn |
|---|---|---|---|---|
| Không thể tự đăng ký tài khoản thành công, phải nhờ hỗ trợ/dùng tài khoản thay thế | Systemic | 7/7 | Tất cả participant nhập đúng định dạng nhưng bị từ chối, không rõ nguyên nhân; phải liên hệ người phụ trách hoặc dùng tài khoản test để tiếp tục | "Không đăng kí được tài khoản và phải liên hệ người lập app" (P2) |
| Thông báo lỗi không hướng dẫn cách khắc phục | Systemic | 7/7 | Khi được hỏi "thông báo lỗi có giúp biết cách sửa không", toàn bộ 7 participant trả lời không/không có | "Không, sửa mật khẩu vẫn lỗi" (P7) |
| Đăng ký thành công nhưng không đăng nhập được bằng chính tài khoản đó | Isolated bug | 1/7 | Tài khoản tự tạo báo đăng ký thành công, nhưng khi dùng để đăng nhập lại bị từ chối | "Đăng ký tài khoản thành công nhưng không đăng nhập với nó được" (P3) |
| Quy tắc mật khẩu ẩn (yêu cầu chứa khoảng trắng) không được công bố trên form | Isolated bug | 1/7 | Chỉ phát hiện được nhờ người hỗ trợ nói miệng, không có trong hướng dẫn hiển thị | "Hỏi chị cách đăng ký thì chị nói mật khẩu phải có khoảng trắng" (P6) |
| Thêm vào giỏ hàng phản hồi không nhất quán/thiếu xác nhận | Systemic | 2/7 | Nút thêm giỏ hàng lúc hoạt động lúc không, và không có thông báo xác nhận đã thêm thành công | "Phần thêm vào giỏ hàng, bấm lúc ăn lúc không" (P2); "không có thông báo cho biết đã thêm được hay chưa" (P5) |
| Cảm nhận luồng đăng ký/đăng nhập chậm hơn kỳ vọng | Systemic | 6/7 | Phần lớn cho rằng quá trình chậm — nhiều khả năng là hệ quả gián tiếp của các lần thử đăng ký thất bại lặp lại | "Chậm hơn" (P1, P3, P4); "Hơi chậm" (P2); "Chậm" (P5, P7) |
| Độ tin tưởng vào thông tin hiển thị còn thấp | Systemic | 4/7 | Một số participant bày tỏ nghi ngờ/chưa tin tưởng hoàn toàn thông tin trên hệ thống | "Chưa tin tưởng hoàn toàn" (P4); "Không" (P5, P7) |

---

## 4. Ưu tiên theo mức độ nghiêm trọng (Severity Prioritization)

| Mức độ | Định nghĩa | Số lượng vấn đề | Danh sách |
|---|---|---|---|
| 🔴 **Blocker** | Ngăn hoàn toàn việc hoàn thành task | 1 | Không thể tự đăng ký tài khoản thành công (0/7 Success, 7/7 cần hỗ trợ) |
| 🟠 **Major** | Gây khó khăn/nhầm lẫn đáng kể nhưng vẫn hoàn thành được (thường cần trợ giúp) | 3 | (1) Thông báo lỗi không hướng dẫn cách khắc phục — 7/7; (2) Đăng ký thành công nhưng không đăng nhập được — P3 (1/7); (3) Quy tắc mật khẩu ẩn (khoảng trắng) không công bố — P6 (1/7) |
| 🟡 **Minor** | Gây khó chịu nhẹ, không ảnh hưởng hoàn thành task | 3 | (1) Thêm giỏ hàng phản hồi không nhất quán/thiếu xác nhận — P2, P5 (2/7); (2) Cảm nhận tốc độ chậm hơn kỳ vọng — 6/7; (3) Độ tin tưởng vào thông tin hiển thị thấp — P3, P4, P5, P7 (4/7) |
| ⚪ **Cosmetic** | Vấn đề thẩm mỹ/hiển thị, không ảnh hưởng chức năng | 0 | Không phát hiện vấn đề cosmetic đáng kể trong phiên test này |

---

## 5. Trả lời theo 4 chủ đề bắt buộc (Clarity, Error Recovery, Speed, Trust)

### 5.1 Clarity (Rõ ràng)
Bước đăng ký là nơi thiếu rõ ràng nhất trong toàn luồng: nhiều participant không hiểu vì sao form từ chối thông tin họ nhập (đặc biệt là mật khẩu), dù đã tuân theo các yêu cầu hiển thị trên giao diện. Một trường hợp (P6) cho thấy tồn tại quy tắc mật khẩu không được công bố (yêu cầu khoảng trắng), khiến người dùng không có cách nào tự suy luận được yêu cầu thực sự. Ngược lại, các bước sau khi đã có tài khoản hoạt động (đăng nhập, tìm sản phẩm, xem chi tiết, thêm giỏ hàng, kiểm tra giỏ hàng) không ghi nhận vấn đề về rõ ràng — bố cục, nhãn, và luồng thao tác được đánh giá dễ hiểu.

### 5.2 Error Recovery (Phục hồi lỗi)
Đây là điểm yếu rõ rệt nhất: **cả 7/7 participant** đều xác nhận thông báo lỗi không giúp họ biết cách khắc phục. Không ai trong số họ tự phục hồi được từ lỗi đăng ký — toàn bộ phải nhờ người điều phối buổi test can thiệp (cung cấp tài khoản thay thế hoặc hướng dẫn miệng). Điều này cho thấy hệ thống hiện tại không có cơ chế phục hồi lỗi tự phục vụ (self-service error recovery) ở bước quan trọng nhất của hành trình người dùng mới.

### 5.3 Speed (Tốc độ)
6/7 participant cảm thấy quá trình chậm hơn kỳ vọng (chỉ P6 đánh giá "bình thường"). Tuy nhiên, không có participant nào chỉ ra một bước cụ thể nào là "thừa/mất thời gian không cần thiết" — tất cả đều trả lời "Không" cho câu hỏi này. Điều này gợi ý rằng cảm nhận "chậm" nhiều khả năng đến từ việc phải thử đăng ký nhiều lần và chờ hỗ trợ, chứ không phải do hiệu năng/tốc độ phản hồi kỹ thuật của hệ thống — cần đo thời gian phản hồi thực tế (vd. thời gian tải trang, thời gian submit form) để xác nhận giả thuyết này.

### 5.4 Trust (Tin tưởng)
Mức độ tin tưởng bị phân hóa: 3/7 participant (P1, P2, P6) cảm thấy tin tưởng hoặc "tương đối" tin tưởng thông tin hiển thị, trong khi 4/7 (P3, P4, P5, P7) bày tỏ sự nghi ngờ hoặc chưa tin tưởng hoàn toàn. Nguyên nhân được nêu cụ thể nhất là cảm giác không chắc chắn về kết quả thao tác (ví dụ P5 không biết đã thêm giỏ hàng thành công hay chưa; P7 cảm thấy "kết quả thao tác không đúng như mong đợi. Website bị lỗi rất nhiều"). Sự thiếu tin tưởng này có tương quan với các participant có điểm SUS thấp nhất (P5, P7), củng cố nhận định rằng các lỗi chức năng (đặc biệt ở đăng ký) đang trực tiếp làm giảm niềm tin vào toàn bộ sản phẩm.

---

## 6. Danh sách Bug đã log lên GitHub Issues

| # | Tiêu đề Issue | Severity | Participant liên quan | GitHub Issue | Screenshot đính kèm |
|---|---|---|---|---|---|
| 1 | Đăng ký thất bại dù nhập đúng thông tin hợp lệ, không rõ nguyên nhân | Blocker | P1, P2, P3, P4, P5, P6, P7 | #91 | ![BUG-US-01](bug_report_gihub_issues_screenshots/BUG-US-01.png) |
| 2 | Thông báo lỗi khi đăng ký/đăng nhập không hướng dẫn cách khắc phục | Major | P1, P2, P3, P4, P5, P6, P7 | #92 | ![BUG-US-02](bug_report_gihub_issues_screenshots/BUG-US-02.png) |
| 3 | Đăng ký thành công nhưng không đăng nhập được bằng chính tài khoản đó | Major | P3 | #93 | ![BUG-US-03](bug_report_gihub_issues_screenshots/BUG-US-03.png) |
| 4 | Quy tắc mật khẩu yêu cầu khoảng trắng nhưng không công bố trên form | Major | P6 | #94 | ![BUG-US-04](bug_report_gihub_issues_screenshots/BUG-US-04.png) |
| 5 | Thêm vào giỏ hàng phản hồi không nhất quán, thiếu xác nhận thành công | Minor | P2, P5 | #95 | ![BUG-US-05](bug_report_gihub_issues_screenshots/BUG-US-05.png) |

## 7. Khuyến nghị (Recommendations)

| Ưu tiên | Vấn đề | Đề xuất cải thiện |
|---|---|---|
| 1 | Đăng ký thất bại dù nhập đúng thông tin hợp lệ (Blocker, 7/7) | Rà soát lại toàn bộ logic validate ở backend/frontend cho form đăng ký; bổ sung log lỗi chi tiết phía server để xác định root cause; kiểm tra riêng các rule ẩn (vd. yêu cầu khoảng trắng trong mật khẩu) và công bố rõ ràng nếu thực sự cần thiết |
| 2 | Thông báo lỗi không hướng dẫn cách khắc phục (Major, 7/7) | Viết lại nội dung thông báo lỗi theo hướng cụ thể theo từng trường (field-level), nêu rõ điều kiện chưa đáp ứng thay vì thông báo chung chung; hiển thị ngay cạnh trường bị lỗi |
| 3 | Đăng ký thành công nhưng không đăng nhập được (Major, P3) | Điều tra luồng đồng bộ dữ liệu tài khoản giữa API đăng ký và đăng nhập, đặc biệt khả năng lệch dữ liệu (race condition/cache) ngay sau khi tạo tài khoản |
| 4 | Thêm giỏ hàng thiếu phản hồi xác nhận (Minor, P2/P5) | Bổ sung phản hồi trực quan tức thời (toast, đổi số lượng giỏ hàng, hiệu ứng nút) ngay sau khi thao tác thêm giỏ hàng thành công hoặc thất bại |

---

## 8. Giới hạn của nghiên cứu (Limitations)

Cỡ mẫu nhỏ (n=7) nên kết quả mang tính định tính, chưa đại diện thống kê cho toàn bộ người dùng mục tiêu. Participant chủ yếu là sinh viên trong độ tuổi 20–22, cùng với một số trường hợp ở hai đầu phổ (P5: 49 tuổi, lập trình viên; P6: 15 tuổi, học sinh), khiến mẫu chưa phản ánh đầy đủ sự đa dạng của target user. Đáng chú ý, 3/7 participant (P3, P5, P7) có nền tảng liên quan đến IT/Tester — nhóm này có thể phát hiện lỗi kỹ thuật nhạy hơn nhưng cũng có thể đánh giá mức độ khó khác với người dùng phổ thông, tạo thiên lệch hai chiều trong kết quả. Việc tuyển participant qua quen biết cá nhân (bạn bè, người quen của người test) cũng có thể tạo thiên lệch chọn mẫu — participant có thể ngại phản hồi tiêu cực hoặc quen thuộc hơn với ngữ cảnh sản phẩm so với người dùng hoàn toàn mới.

---

# Task 3 — Cross-Browser / Cross-Platform Testing Report

- **Hệ thống:** EShop — `https://eshop-sut-whje.vercel.app/`
- **Phạm vi test (= Task 1):** GUI Checklist 70 hạng mục — màn hình **Đăng ký (Registry, FR-01)** và **Đăng nhập (Login, FR-02)**
*(xem `GUI_Checklist.xlsx` / `main-report.md` — baseline gốc: 52 Pass, 18 Fail, 10 bugs)*
- **Số platform test:** 3
- **Ngày thực hiện:** 02/08/2026
- **Người thực hiện:** 23127031

---

## 1. Công cụ & Môi trường Test

| # | Platform | Browser | OS / Device | Phương thức test |
|---|----------|------------------|-------------|-------------------|
| 1 | Chrome | Chrome beta 151 | macOS Golden Gate Beta | BrowserStack |
| 2 | Firefox | Firefox beta 154 | macOS Golden Gate Beta | BrowserStack |
| 3 | Safari | Safari 27 | macOS Golden Gate Beta | BrowserStack |

### Bằng chứng dùng BrowserStack

![BrowserStack Account](cross_browser_screenshots/browserstack_account.png)

---

## 2. Phạm vi & phương pháp

- **Nội dung test:** Task 1 (checklist GUI 70 mục, Registry & Login) được thực hiện lại trên 3 platform ở trên.
- **Phương pháp:** Kiểm tra trực quan toàn bộ giao diện 2 màn hình (Registry, Login) trên mỗi platform, đối chiếu trực tiếp với 10 bug đã ghi nhận ở report — chạy 70 mục checklist trên từng platform (chỉ 6 ảnh chụp tổng thể, mỗi màn hình 1 ảnh/platform).
- **Report đối chiếu:** kết quả gốc lấy từ `main-report.md` (test trên Chrome desktop, không qua BrowserStack).

---

## 3. Ma trận kết quả (Cross-Platform Results Matrix)

### 3.1. Màn hình Đăng ký (Registry)

| Platform | Screenshot | So với baseline | Khác biệt phát hiện |
|---|---|---|---|
| Chrome beta 151 | ![Registry - Chrome](cross_browser_screenshots/chrome_macos_registry.png) | Giống nhau | Không |
| Firefox beta 154 | ![Registry - Firefox](cross_browser_screenshots/firefox_macos_registry.png) | Giống nhau | Không |
| Safari 27 | ![Registry - Safari](cross_browser_screenshots/safari_macos_registry.png) | Giống nhau | Không |

### 3.2. Màn hình Đăng nhập (Login)

| Platform | Screenshot | So với baseline | Khác biệt phát hiện |
|---|---|---|---|
| Chrome beta 151 | ![Login - Chrome](cross_browser_screenshots/chrome_macos_login.png) | Giống nhau | Không |
| Firefox beta 154 | ![Login - Firefox](cross_browser_screenshots/firefox_macos_login.png) | Giống nhau | Không |
| Safari 27 | ![Login - Safari](cross_browser_screenshots/safari_macos_login.png) | Giống nhau | Không |

---

## 4. Đối chiếu với 10 bug đã phát hiện ở Task 1

Vì baseline gốc đã có 18/70 mục Fail (10 bug), điểm quan trọng của cross-browser testing là xác nhận **các bug này có xảy ra giống nhau trên cả 3 platform hay không** — đây là bằng chứng cho biết bug là do logic ứng dụng (cross-browser) hay do browser rendering (chỉ 1 số browser gặp).

| Bug ID | Mô tả ngắn | Chrome beta 151 | Firefox beta 154 | Safari 27 | Kết luận |
|---|---|---|---|---|---|
| BUG-01 | Email field type="text" không validate HTML5 | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-02 | Thiếu trường Xác nhận mật khẩu | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-03 | Register: button không có loading state | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-04 | Email trùng không báo lỗi | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-05 | Đăng ký thành công không có thông báo | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-06 | Login hiển thị heading sai ("Đăng Ký") | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-07 | Username field không validate HTML5 | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-08 | Password hiển thị plaintext | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-09 | Không thông báo khóa tài khoản sau 3 lần sai | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |
| BUG-10 | Login: button không có loading state | Fail | Fail | Fail | Lỗi logic/code, không phải browser-specific |

---

## 5. Kết luận Cross-Browser

- Không phát hiện khác biệt về giao diện hay hành vi giữa Chrome beta 151, Firefox beta 154, và Safari 27.
- Toàn bộ 10 bug phát hiện ở Task 1 đều tái hiện giống nhau trên cả 3 platform → cho thấy đây là lỗi ở tầng logic/code của ứng dụng (thiếu validation, thiếu state handling...), không phải lỗi tương thích trình duyệt (cross-browser compatibility issue).
- Không có bug mới phát sinh riêng trên platform nào.