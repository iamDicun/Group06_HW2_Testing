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

