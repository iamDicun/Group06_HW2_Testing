# Prompt Log
Verbatim record of all AI sessions for academic audit purposes.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-26 23:58 (UTC+7)
---

### Turn 1

**[User]**
Đọc đặc tả và api cho các chức năng này  để tạo DUY NHẤT test plan, không tạo các analysis hoặc test case| FR-04 (Profile) | FR-10 (Order State) | FR-19 | Mobile ( FR4 để test cho mobile)| trong docs/api và readme; nhớ dùng skill tạo plan, chuẩn domain testing

**[Assistant]**
I will start by viewing the `istqb-test-plan` skill instructions to ensure I follow the correct format and requirements for the Test Plan.

I will list the contents of the workspace directory to find the documentation and API folders.

I will list the contents of the `docs` directory to locate specification or API documents.

I will search specifically for "FR-04" references to locate where its specification is defined.

I will read the contents of `docs/README.md` to find the functional specifications for the requested modules.

I will view the `docs/api_specification.md` file to see the API endpoints and requirements for FR-04, FR-10, and FR-19.

I will view the workspace `README.md` to see if there is any other context or requirements description.

I will view the `tests/test-plans/TP-EShop-v1.0.md` file to see what content already exists there.

I will list the contents of the `tests` directory to see what folders exist inside it.

I will list the contents of `tests/test-plans` to see if there are any test plan files there.

I will list the contents of the `istqb-test-plan` skill folder to find the template and instructions.

I will list the contents of the `references` directory in the `istqb-test-plan` skill.

I will view `template.md` to see the structure for our Test Plan.

I will view the `section.md` file to understand the guidelines for writing each section of the test plan.

I will now create the Test Plan file at `tests/test-plans/TP-EShop-v1.0.md` incorporating the specified requirements for FR-04, FR-10, FR-19, and the Mobile Profile, applying the Domain Testing standard for inputs and validation.

Tôi đã tạo xong tài liệu **Test Plan** duy nhất theo yêu cầu tại đường dẫn:

[tests/test-plans/TP-EShop-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-plans/TP-EShop-v1.0.md)

### Tóm tắt nội dung đã thực hiện:
- **Chuẩn cấu trúc**: Tuân thủ cấu trúc 9 phần của tài liệu Test Plan theo chuẩn ISTQB / IEEE 829.
- **Phạm vi kiểm thử**: Bao gồm các chức năng được phân công từ tài liệu đặc tả và API:
  - **FR-04 (Profile - Web)**: Các trường thông tin Họ tên, SĐT (ràng buộc 10-11 chữ số, bắt đầu bằng `0`), Địa chỉ, khóa thay đổi Email và Role.
  - **FR-10 (Order State)**: Sơ đồ chuyển đổi trạng thái đơn hàng (State Machine) và các ràng buộc phân quyền hủy đơn hàng.
  - **FR-19 (User Management - Admin)**: Xem danh sách người dùng (không lộ mật khẩu) và xóa người dùng (không tự xóa chính mình).
  - **Mobile Profile (FR-04 trên Mobile)**: Trải nghiệm di động, bàn phím số (Numeric Keyboard), kết nối qua LAN IP của máy chủ.
- **Chiến lược kiểm thử & Thiết kế Test Case (chuẩn Domain Testing)**:
  - Tích hợp trực tiếp các bảng phân tích miền giá trị **Phân hoạch tương đương (EP)** và **Phân tích giá trị biên (BVA)** cho các trường dữ liệu đầu vào (`phone`, `name`, `shipping_address`).
  - Thiết kế bảng chuyển đổi trạng thái (**State Transition**) cho vòng đời đơn hàng.
  - Thiết kế bảng quyết định (**Decision Table**) cho phân quyền xóa người dùng của Admin.
- **Rủi ro & Kế hoạch dự phòng**: Đề xuất 4 rủi ro kỹ thuật liên quan (kết nối LAN của Mobile, race condition khi cập nhật trạng thái đơn hàng, rò rỉ password qua API, và SQLite bị khóa ghi) cùng giải pháp xử lý cụ thể.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 01:18 (UTC+7)
---

### Turn 1

**[User]**
Dựa vào test plan trong tests/test-plans và các api, readme trong docs, tạo test analysis cho tính năng FR4, theo đúng domain testing

**[Assistant]**
Tôi đã thực hiện phân tích miền (Domain Testing Analysis) cho tính năng **FR-04: Quản lý hồ sơ cá nhân** dựa trên tài liệu đặc tả và kế hoạch kiểm thử (Test Plan) sẵn có.

Tài liệu phân tích đã được tạo tại đường dẫn:
[TA-EShop-Khoa-FR04-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-analysis/TA-EShop-Khoa-FR04-v1.0.md)

### Tóm tắt nội dung phân tích miền đã thực hiện:
1. **Đối tượng phân tích (Input variables):**
   - `name` (Họ tên)
   - `phone` (Số điện thoại)
   - `shipping_address` (Địa chỉ giao hàng mặc định)
   - `email` (Ràng buộc bất biến)
   - `role` (Ràng buộc bảo mật chống leo thang đặc quyền)
   - `Authorization` header (Xác thực đầu vào của API)

2. **Quy chuẩn kỹ thuật kiểm thử miền (Domain Testing):**
   - **Phân hoạch tương đương (Equivalence Partitioning):** Xác định rõ các lớp hợp lệ (Valid partitions) và không hợp lệ (Invalid partitions - null, rỗng, sai kiểu dữ liệu, chứa thẻ script mã độc).
   - **Phân tích giá trị biên (Boundary Value Analysis):** Áp dụng quy tắc phân tích biên 2 điểm (`on` và `off`) đối với các thuộc tính độ dài (ví dụ: số điện thoại 10-11 chữ số, họ tên 1-255 ký tự, địa chỉ 1-500 ký tự).
   - **Bảng phân tích miền (Domain Tables):** Xây dựng cấu trúc bảng chuẩn theo yêu cầu nghiệp vụ và kỹ thuật cho từng biến.
   - **Giải thích bổ sung bằng tiếng Việt:** Tóm tắt số lớp tương đương, các giá trị biên quan trọng cần lưu ý khi thiết kế test case, và các giả định miền giá trị.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 01:24 (UTC+7)
---

### Turn 1

**[User]**
Dựa vào test plan trong tests/test-plans và các api, readme trong docs, tạo test analysis cho tính năng FR10, theo đúng domain testing

**[Assistant]**
Tôi đã thực hiện phân tích miền (Domain Testing Analysis) cho tính năng **FR-10: Trạng thái Đơn hàng (Order State Machine)** dựa trên đặc tả và kế hoạch kiểm thử (Test Plan).

Tài liệu phân tích miền đã được lưu tại đường dẫn:
[TA-EShop-Khoa-FR10-ORDER-STATE-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-analysis/TA-EShop-Khoa-FR10-ORDER-STATE-v1.0.md)

### Các nội dung chính được xây dựng trong tài liệu:
1. **Các biến đầu vào và trạng thái nghiệp vụ được phân tích (Input & State Variables):**
   - **`id` (Mã đơn hàng):** Tham số trên URL path của API.
   - **`status` (Trạng thái cập nhật mới):** Dữ liệu truyền lên qua API của Admin.
   - **`current_status` (Trạng thái hiện tại trong DB):** Biến trạng thái quyết định quy tắc chuyển đổi (State Transition).
   - **`Authorization` Header:** Xác thực Token JWT đầu vào.
   - **`role` (Vai trò người dùng):** Quyền hạn trích xuất từ Token.
   - **`order_ownership` (Quan hệ sở hữu):** Quyền hạn hủy đơn hàng của User chính chủ.

2. **Áp dụng kỹ thuật Domain Testing:**
   - **Phân hoạch tương đương (Equivalence Partitioning):** Định nghĩa các lớp giá trị hợp lệ (Valid) và các lớp giá trị không hợp lệ (Invalid - rỗng, sai kiểu dữ liệu, các trạng thái không nằm trong danh sách hỗ trợ hoặc sai lệch về logic nghiệp vụ).
   - **Phân tích giá trị biên (Boundary Value Analysis):** Xác định cận biên giá trị dưới của mã đơn hàng (`id`), các biên chặn phân quyền truy cập, các biên đóng hoàn toàn (Final States) của vòng đời đơn hàng (`delivered`, `canceled`), cùng các ranh giới chuyển đổi trạng thái không cho phép (ví dụ: chặn hủy đơn khi đang ở trạng thái `shipping`, chặn nhảy bước hoặc đi ngược quy trình).

3. **Phần giải thích chi tiết bằng tiếng Việt:** Tổng kết các lớp phân hoạch tương đương, phân tích sâu các biên nghiệp vụ của máy trạng thái (Order State Machine) và các giả định miền giá trị đi kèm.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 01:39 (UTC+7)
---

### Turn 1

**[User]**
Dựa vào test plan trong tests/test-plans và các api, readme trong docs, tạo test analysis cho tính năng FR19, theo đúng domain testing

**[Assistant]**
Tôi đã thực hiện phân tích miền (Domain Testing Analysis) cho tính năng **FR-19: Quản lý Người dùng (Admin)** dựa trên các tài liệu đặc tả yêu cầu, tài liệu đặc tả API và Kế hoạch kiểm thử (Test Plan) sẵn có.

Tài liệu phân tích miền đã được tạo và lưu tại:
[TA-EShop-Khoa-FR19-USERMGMT-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-analysis/TA-EShop-Khoa-FR19-USERMGMT-v1.0.md)

### Tóm tắt các nội dung phân tích miền đã thực hiện:
1. **Các biến đầu vào và ràng buộc logic (Variables & Logical Constraints):**
   - **`id` (Mã người dùng cần xóa):** Tham số truyền trên URL path của API `DELETE /api/admin/users/:id`.
   - **`Authorization` Header:** Xác thực Token JWT đầu vào.
   - **`role` (Vai trò người dùng):** Quyền hạn trích xuất từ Token.
   - **`self_deletion` (Ràng buộc tự xóa):** Logic nghiệp vụ ngăn chặn Admin xóa chính tài khoản đang đăng nhập.
   - **`target_user_is_self` (Logic hiển thị Web Admin UI):** Trạng thái hoạt động và hiển thị của nút "Xóa" tương ứng trên giao diện người dùng.

2. **Kỹ thuật thiết kế kiểm thử miền (Domain Testing Techniques):**
   - **Phân hoạch tương đương (Equivalence Partitioning):** Xác định các lớp hợp lệ (Valid) và không hợp lệ (Invalid) cho từng biến (như mã ID không tồn tại, ID âm, sai định dạng token, hoặc phân quyền không đủ).
   - **Phân tích giá trị biên (Boundary Value Analysis):** Xác định biên cận dưới của `id`, điểm biên logic nhạy cảm của việc tự xóa (`self_deletion` khi `token_user_id = target_user_id`), và các quy tắc hiển thị giao diện theo quy chuẩn nghiệp vụ.
   - **An toàn thông tin (Security Testing):** Lưu ý giám sát cấu trúc payload trả về của API `GET /api/admin/users` để đảm bảo trường mật khẩu (password) không bị lộ.

3. **Giải thích bằng tiếng Việt:** Tổng hợp số lớp phân hoạch tương đương, phân tích sâu các giá trị biên đặc thù và các giả định miền giá trị thiết kế kiểm thử.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 01:44 (UTC+7)
---

### Turn 1

**[User]**
Dựa vào test plan trong tests/test-plans và các api, readme trong docs, tạo test analysis cho tính năng FR4 nhưng cho mobile, theo đúng domain testing

**[Assistant]**
Tôi đã tạo tài liệu Phân tích miền (Domain Testing Analysis) cho tính năng **Hồ sơ cá nhân (FR-04) trên ứng dụng di động Mobile App** theo đúng yêu cầu kiểm thử miền (EP/BVA) và các tài liệu đặc tả, kế hoạch kiểm thử hiện tại.

### Chi tiết các công việc đã thực hiện:
1. **Tạo tài liệu mới**: Đã lưu tại đường dẫn [tests/test-analysis/TA-EShop-Khoa-FR04-MOBILE-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-analysis/TA-EShop-Khoa-FR04-MOBILE-v1.0.md).
2. **Nội dung phân tích**:
   - **phone_input_type**: Phân tích lớp tương đương đối với thuộc tính bàn phím ảo (Numeric / Phone-pad vs Alphanumeric) nhằm kiểm tra việc mở đúng loại bàn phím khi focus vào trường nhập.
   - **phone_value_client**: Kiểm thử các lớp tương đương và giá trị biên của số điện thoại trên giao diện Client di động (độ dài 10, 11 chữ số bắt đầu bằng số `0`, các lớp không hợp lệ, và cơ chế giới hạn ký tự tối đa).
   - **address_input_multiline**: Kiểm thử thuộc tính nhập liệu nhiều dòng (`multiline`) để đảm bảo địa chỉ hiển thị và nhập liệu trực quan.
   - **base_url_lan**: Phân tích miền giá trị đối với cấu hình địa chỉ IP LAN kết nối từ Mobile App đến Backend chạy trên host PC (mạng LAN, Public Tunnel Ngrok, Localhost và các lớp mạng con khác).
   - **network_connectivity_state**: Phân tích biên đối với trạng thái kết nối mạng di động (trực tuyến ổn định, ngắt kết nối hoàn toàn và mạng yếu chập chờn với biên thời gian timeout 10 giây).
   - **keyboard_viewport_adjust**: Phân tích bố cục thích ứng (Adaptive Layout dùng `KeyboardAvoidingView` và `ScrollView`) để tránh việc bàn phím ảo đè che mất nút và các trường nhập liệu.
3. **Định dạng chuẩn**: Sử dụng bảng tiếng Anh cho phần kỹ thuật và viết phần giải thích tóm tắt bằng tiếng Việt tuân thủ theo quy định thiết kế tài liệu.


---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 15:37 (UTC+7)
---

### Turn 1

**[User]**
đọc TA của tính năng FR4 và tạo test case chuẩn domain testing, số lượng

**[Assistant]**
Tôi đã đọc tài liệu Test Analysis (TA) của tính năng **FR-04 (Quản lý hồ sơ cá nhân)** bao gồm cả bản Web/API (`TA-EShop-Khoa-FR04-PROFILE-v1.0.md`) và bản Mobile (`TA-EShop-Khoa-FR04-PROFILE-MOBILE-v1.0.md`).

Dựa trên các lớp phân hoạch tương đương (EP) và phân tích giá trị biên (BVA) từ các tài liệu trên, tôi đã tạo mới và cập nhật toàn bộ **29 test case** chuẩn Domain Testing cùng file chỉ mục `_index.md` dưới dạng tiếng Việt có dấu, đáp ứng đúng cấu trúc của `test-case-template.md`.

Các tệp được lưu trữ tại thư mục: [tests/test-cases/FR-04-Profile/](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/)

### Số lượng và Phân loại Test Case

| Chỉ số | Số lượng | Mô tả / Chi tiết |
|---|---|---|
| **Tổng số Test Case** | **29** | Bao gồm kiểm thử Web/API (`TC-PROFILE-001` tới `020`) và Mobile (`TC-PROFILE-021` tới `029`). |
| **Positive (Happy Path)** | **10** | Các trường hợp cập nhật thông tin thành công với dữ liệu hợp lệ, cấu hình bàn phím số, tự động xuống dòng trên di động, kết nối mạng LAN/Ngrok thành công. |
| **Negative / Edge cases** | **19** | Các trường hợp dữ liệu rỗng, quá dài, chứa thẻ script/HTML (XSS), thay đổi email/role (Security), sai token, mất kết nối (Offline), timeout 10 giây, paste chữ cái từ clipboard. |
| **Boundary Value Analysis (BVA)** | **12** | Kiểm thử các điểm biên quan trọng: Họ Tên (0, 1, 255, 256 ký tự); Số điện thoại (9, 10, 11, 12 ký tự); Địa chỉ (0, 1, 500, 501 ký tự); Timeout (10 giây). |
| **Equivalence Partitioning (EP)** | **17** | Kiểm thử các lớp tương đương khác như định dạng số điện thoại, kiểu dữ liệu, các lớp mạng LAN/localhost, cấu hình bàn phím, khả năng co giãn giao diện. |

---

### Danh sách chi tiết các file Test Case đã tạo

1. **[_index.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/_index.md)**: File chỉ mục tổng hợp toàn bộ danh sách 29 test case (ID, mô tả, phân loại, kỹ thuật, độ ưu tiên, trạng thái).
2. **Web & API Test Cases (`TC-PROFILE-001` -> `020`):**
   - [TC-PROFILE-001.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-001.md): Cập nhật hồ sơ thành công với dữ liệu hợp lệ (EP)
   - [TC-PROFILE-002.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-002.md): Cập nhật Họ Tên rỗng (BVA)
   - [TC-PROFILE-003.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-003.md): Cập nhật Họ Tên có độ dài đúng 255 ký tự (BVA)
   - [TC-PROFILE-004.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-004.md): Cập nhật Họ Tên quá dài 256 ký tự (BVA)
   - [TC-PROFILE-005.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-005.md): Cập nhật Họ Tên chứa thẻ HTML hoặc Script để kiểm tra XSS (EP)
   - [TC-PROFILE-006.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-006.md): Cập nhật Số điện thoại hợp lệ 10 chữ số bắt đầu bằng 0 (BVA)
   - [TC-PROFILE-007.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-007.md): Cập nhật Số điện thoại hợp lệ 11 chữ số bắt đầu bằng 0 (BVA)
   - [TC-PROFILE-008.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-008.md): Cập nhật Số điện thoại quá ngắn 9 chữ số (BVA)
   - [TC-PROFILE-009.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-009.md): Cập nhật Số điện thoại quá dài 12 chữ số (BVA)
   - [TC-PROFILE-010.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-010.md): Cập nhật Số điện thoại không bắt đầu bằng số 0 (EP)
   - [TC-PROFILE-011.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-011.md): Cập nhật Số điện thoại chứa ký tự không phải số (EP)
   - [TC-PROFILE-012.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-012.md): Cập nhật Số điện thoại để trống (EP)
   - [TC-PROFILE-013.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-013.md): Cập nhật Địa chỉ giao hàng rỗng (BVA)
   - [TC-PROFILE-014.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-014.md): Cập nhật Địa chỉ giao hàng có độ dài đúng 500 ký tự (BVA)
   - [TC-PROFILE-015.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-015.md): Cập nhật Địa chỉ giao hàng quá dài 501 ký tự (BVA)
   - [TC-PROFILE-016.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-016.md): Cập nhật Địa chỉ giao hàng chứa thẻ HTML hoặc Script để kiểm tra XSS (EP)
   - [TC-PROFILE-017.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-017.md): Cố tình thay đổi địa chỉ email trong payload gửi lên API (EP)
   - [TC-PROFILE-018.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-018.md): Cố tình thay đổi vai trò (role) lên admin trong payload gửi lên API (EP)
   - [TC-PROFILE-019.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-019.md): Truy cập API cập nhật profile không có Authorization header (EP)
   - [TC-PROFILE-020.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-020.md): Truy cập API cập nhật profile với Authorization token không hợp lệ (EP)

3. **Mobile App Specific Test Cases (`TC-PROFILE-021` -> `029`):**
   - [TC-PROFILE-021.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-021.md): Kiểm tra cấu hình bàn phím số (phone-pad) cho trường Số điện thoại trên Mobile App (EP)
   - [TC-PROFILE-022.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-022.md): Kiểm tra chặn nhập quá 11 ký tự số điện thoại tại Client Mobile App (BVA)
   - [TC-PROFILE-023.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-023.md): Kiểm tra validate Số điện thoại chứa chữ cái khi paste từ clipboard trên Mobile App (EP)
   - [TC-PROFILE-024.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-024.md): Kiểm tra TextInput Địa chỉ hỗ trợ nhập nhiều dòng (multiline) trên Mobile App (EP)
   - [TC-PROFILE-025.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-025.md): Kết nối API thành công qua dải mạng LAN cùng subnet hoặc URL Ngrok (EP)
   - [TC-PROFILE-026.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-026.md): Kết nối API thất bại khi dùng Localhost IP trên thiết bị di động thật (EP)
   - [TC-PROFILE-027.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-027.md): Cập nhật hồ sơ khi thiết bị ở trạng thái ngoại tuyến (Offline mode) (EP)
   - [TC-PROFILE-028.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-028.md): Xử lý timeout 10 giây khi kết nối mạng chập chờn trên Mobile App (BVA)
   - [TC-PROFILE-029.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-04-Profile/TC-PROFILE-029.md): Kiểm tra co giãn giao diện (KeyboardAvoidingView) khi mở bàn phím ảo trên Mobile App (EP)

Anh/chị vui lòng kiểm tra lại cấu trúc và nội dung các file test case đã tạo. Nếu cần tôi hỗ trợ xuất báo cáo kiểm toán AI (AI Audit Report) hoặc tạo tiếp test case cho các chức năng khác, xin vui lòng phản hồi.

---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 16:01 (UTC+7)
---

### Turn 1

**[User]**
đọc TA của tính năng FR10 và tạo test case chuẩn domain testing

**[Assistant]**
Da tao 31 test case cho feature "Trạng thái Đơn hàng (FR-10)"
  - Positive (happy path): 10 TC
  - Negative / Edge case:  18 TC
  - Boundary Value:        3 TC
Thu muc: tests/test-cases/FR-10-OrderState/

Bạn có muốn:
- Thêm / bớt test case nào không?
- Xuất thêm định dạng khác (Excel, Gherkin)?
- Tạo test case cho feature khác không?
---
## Session | Agent: Gemini 3.5 Flash | Assignment: HW02 - Domain Testing | 2026-06-27 16:11 (UTC+7)
---

### Turn 1

**[User]**
đọc TA của tính năng FR19 và tạo test case chuẩn domain testing

**[Assistant]**
Da tao 22 test case cho feature "Quản lý Người dùng (FR-19)"
  - Positive (happy path): 2 TC
  - Negative / Edge case:  18 TC
  - Boundary Value:        2 TC
Thu muc: tests/test-cases/FR-19-UserMgmt/

Danh sach cac file da tao:
- [_index.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/_index.md)
- [TC-USERMGMT-001.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-001.md)
- [TC-USERMGMT-002.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-002.md)
- [TC-USERMGMT-003.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-003.md)
- [TC-USERMGMT-004.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-004.md)
- [TC-USERMGMT-005.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-005.md)
- [TC-USERMGMT-006.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-006.md)
- [TC-USERMGMT-007.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-007.md)
- [TC-USERMGMT-008.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-008.md)
- [TC-USERMGMT-009.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-009.md)
- [TC-USERMGMT-010.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-010.md)
- [TC-USERMGMT-011.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-011.md)
- [TC-USERMGMT-012.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-012.md)
- [TC-USERMGMT-013.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-013.md)
- [TC-USERMGMT-014.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-014.md)
- [TC-USERMGMT-015.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-015.md)
- [TC-USERMGMT-016.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-016.md)
- [TC-USERMGMT-017.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-017.md)
- [TC-USERMGMT-018.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-018.md)
- [TC-USERMGMT-019.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-019.md)
- [TC-USERMGMT-020.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-020.md)
- [TC-USERMGMT-021.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-021.md)
- [TC-USERMGMT-022.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-cases/FR-19-UserMgmt/TC-USERMGMT-022.md)

Ban co muon:
- Them / bot test case nao khong?
- Xuat them dinh dang khac (Excel, Gherkin)?
- Tao test case cho feature khac khong?
