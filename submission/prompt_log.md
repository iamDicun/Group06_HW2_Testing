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

