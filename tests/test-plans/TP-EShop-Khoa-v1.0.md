# Test Plan — EShop (FR-04, FR-10, FR-19 & Mobile Profile)

---

## 1. Test Plan Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TP-ESHOP-KHOA-v1.0 |
| **Tính năng** | FR-04 (Profile), FR-10 (Order State), FR-19 (User Mgmt), Mobile Profile |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-06-26 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Draft |

---

## 2. Introduction

### 2.1 Mô tả tính năng
Tài liệu này lập kế hoạch kiểm thử cho 4 phân hệ chức năng được phân công của hệ thống EShop:
- **FR-04: Quản lý hồ sơ cá nhân (Web)**: Cho phép người dùng đã đăng nhập xem và cập nhật thông tin cá nhân (Họ Tên, Số điện thoại, Địa chỉ giao hàng mặc định) với các ràng buộc về định dạng và bảo mật.
- **FR-10: Trạng thái Đơn hàng (Order State Machine)**: Quản lý vòng đời của đơn hàng qua 5 trạng thái (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`) dựa trên quyền hạn của User và Admin.
- **FR-19: Quản lý Người dùng (Admin)**: Cho phép tài khoản Admin xem danh sách tất cả người dùng (không lộ mật khẩu) và xóa người dùng (không tự xóa chính mình).
- **Mobile App - Hồ sơ cá nhân (FR-04 trên Mobile)**: Kiểm thử tính năng quản lý hồ sơ cá nhân trên ứng dụng Mobile (React Native + Expo), tương tác với Backend qua mạng LAN.

### 2.2 Mục tiêu kiểm thử
- Xác nhận các API và giao diện UI hoạt động chính xác theo đặc tả của hệ thống EShop.
- Áp dụng các kỹ thuật thiết kế kiểm thử hộp đen chuẩn **Domain Testing** (Phân hoạch tương đương - EP, Phân tích giá trị biên - BVA) cho các trường nhập liệu và tham số API.
- Đảm bảo tính toàn vẹn dữ liệu, các ràng buộc bảo mật (Access Control, Role) được kiểm soát chặt chẽ và xử lý ngoại lệ đúng cách.
- Phát hiện các lỗi triển khai không tuân thủ đặc tả trên cả hai nền tảng Web và Mobile.

### 2.3 Tài liệu tham chiếu
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Kế hoạch tổng thể dự án: [README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/README.md)

---

## 3. Test Items

Các thành phần hệ thống sẽ được kiểm thử bao gồm:

| # | Thành phần kiểm thử | Loại | Ghi chú |
|---|---|---|---|
| 1 | API `GET /api/users/me` | Backend API | Lấy thông tin cá nhân của user đang đăng nhập |
| 2 | API `PUT /api/users/me` | Backend API | Cập nhật thông tin cá nhân (Họ Tên, SĐT, Địa chỉ) |
| 3 | API `PUT /api/orders/:id/cancel` | Backend API | Người dùng/Admin yêu cầu hủy đơn hàng |
| 4 | API `PUT /api/admin/orders/:id/status` | Backend API | Admin cập nhật trạng thái đơn hàng |
| 5 | API `GET /api/admin/users` | Backend API | Admin lấy danh sách người dùng hệ thống |
| 6 | API `DELETE /api/admin/users/:id` | Backend API | Admin xóa một tài khoản người dùng |
| 7 | Màn hình Profile (Web) | Web Frontend | Giao diện quản lý hồ sơ cá nhân của người dùng |
| 8 | Màn hình Order Management (Admin Web) | Web Frontend | Giao diện Admin cập nhật trạng thái đơn hàng |
| 9 | Màn hình User Management (Admin Web) | Web Frontend | Giao diện Admin danh sách & xóa người dùng |
| 10| Màn hình Profile (Mobile App) | Mobile Frontend | Giao diện hồ sơ trên React Native + Expo |

---

## 4. Features to be Tested

### 4.1 FR-04: Quản lý hồ sơ cá nhân (Web)
- Xem thông tin cá nhân hiện tại (Họ tên, Email, SĐT, Địa chỉ).
- Cập nhật Họ Tên (kiểm tra độ dài, ký tự đặc biệt).
- Cập nhật Số điện thoại (kiểm tra điều kiện bắt đầu bằng `0`, độ dài từ 10-11 chữ số).
- Cập nhật Địa chỉ giao hàng mặc định (kiểm tra độ dài, bỏ trống).
- Đảm bảo Email không thể thay đổi thông qua giao diện Web.
- Bảo mật: Đảm bảo không thể thay đổi thuộc tính `role` từ client khi gửi payload cập nhật profile (SEC-06).

### 4.2 FR-10: Trạng thái Đơn hàng (Order State Machine)
- Chuyển đổi trạng thái đơn hàng tuần tự bởi Admin: `pending` -> `confirmed` -> `shipping` -> `delivered`.
- Hủy đơn hàng bởi User / Admin từ trạng thái `pending` sang `canceled`.
- Hủy đơn hàng bởi User / Admin từ trạng thái `confirmed` sang `canceled`.
- Ngăn chặn User tự hủy đơn hàng khi trạng thái đã chuyển sang `shipping` (chỉ Admin mới có quyền thao tác cập nhật/hủy đơn hàng lúc này).
- Ràng buộc trạng thái kết thúc (`delivered`, `canceled`): Đảm bảo không cho phép chuyển sang bất kỳ trạng thái nào khác.
- Kiểm tra thông báo lỗi khi thực hiện các chuyển đổi trạng thái không hợp lệ (ví dụ: `pending` -> `delivered` hoặc `shipping` -> `confirmed`).

### 4.3 FR-19: Quản lý Người dùng (Admin)
- Admin xem danh sách tất cả người dùng (yêu cầu không hiển thị mật khẩu dưới dạng plaintext hoặc hash trong payload API).
- Admin thực hiện xóa tài khoản người dùng khác bằng ID.
- Cơ chế chặn: Admin tự xóa tài khoản của chính mình đang đăng nhập.
- Phân quyền: Ngăn chặn tài khoản có `role = 'user'` truy cập API admin (`/api/admin/users/*`).

### 4.4 Mobile App - Hồ sơ cá nhân (FR-04 trên Mobile)
- Giao diện và trải nghiệm cập nhật profile trên Mobile App (React Native).
- Kiểm tra ràng buộc mở bàn phím số (Numeric Keyboard) đối với trường nhập số điện thoại trên di động.
- Kiểm tra tính responsive của giao diện nhập liệu khi bàn phím ảo xuất hiện.
- Khả năng kết nối và gửi yêu cầu API thông qua IP LAN của máy chủ.
- Xử lý các tình huống mất kết nối mạng đột ngột (Offline mode) khi đang cập nhật thông tin trên Mobile.

---

## 5. Features NOT to be Tested

Các tính năng sau đây nằm ngoài phạm vi của Kế hoạch kiểm thử này và được đảm nhận bởi các thành viên khác trong nhóm:

| Tính năng | Lý do loại trừ |
|---|---|
| FR-01: Đăng ký tài khoản | Do thành viên khác kiểm thử (Module `REGISTER`) |
| FR-02: Đăng nhập & Khóa tài khoản | Do thành viên khác kiểm thử (Module `LOGIN`) |
| FR-03: Quên mật khẩu & Đặt lại mật khẩu | Do thành viên khác kiểm thử (Module `FORGOT_PW`) |
| FR-05: Xem danh sách & Tìm kiếm sản phẩm | Do thành viên khác kiểm thử (Module `PROD_SEARCH`) |
| FR-06: Xem chi tiết sản phẩm | Do thành viên khác kiểm thử (Module `PROD_DETAIL`) |
| FR-07: Giỏ hàng | Do thành viên khác kiểm thử (Module `CART`) |
| FR-08: Thanh toán | Do thành viên khác kiểm thử (Module `CHECKOUT`) |
| FR-09: Mã Giảm Giá | Do thành viên khác kiểm thử (Module `COUPON`) |
| FR-11: Xem lịch sử đơn hàng (User) | Do thành viên khác kiểm thử (Module `ORDER_HIST`) |
| FR-12 đến FR-18: Các tính năng Admin Web khác | Do thành viên khác kiểm thử |
| FR-20: Các chức năng Mobile khác (ngoại trừ Profile) | Do thành viên khác kiểm thử |

---

## 6. Approach (Chiến lược kiểm thử)

### 6.1 Các loại kiểm thử
- **Functional Testing**: Kiểm thử các chức năng trên giao diện Web và Mobile đảm bảo đúng nghiệp vụ của profile, state machine và user management.
- **API Testing**: Sử dụng công cụ (Postman/cURL) kiểm thử độc lập các API endpoint, validate dữ liệu đầu vào và các trường hợp phân quyền (JWT Token, Role Admin/User).
- **Mobile UI & Compatibility Testing**: Thực thi test trên thiết bị thật / giả lập Android và iOS bằng Expo để kiểm tra độ tương thích và hành vi của giao diện nhập liệu di động.
- **Negative & Edge-case Testing**: Kiểm thử với dữ liệu sai định dạng, dữ liệu biên, các hành động chuyển trạng thái vi phạm sơ đồ chuyển đổi.

### 6.2 Kỹ thuật thiết kế test case (Domain Testing Standard)

Chúng tôi áp dụng kỹ thuật Phân hoạch tương đương (Equivalence Partitioning - EP) và Phân tích giá trị biên (Boundary Value Analysis - BVA) để thiết kế các kịch bản kiểm thử miền giá trị.

#### 6.2.1 Phân tích Miền (Domain Analysis) cho FR-04 & Mobile Profile - Trường Số điện thoại (`phone`)
*Ràng buộc đặc tả: Bắt đầu bằng số `0`, độ dài từ 10 đến 11 chữ số.*

| Phân hoạch tương đương (EP) | Giá trị biên đại diện (BVA) | Loại kiểm thử | Kỳ vọng kết quả (Expected) |
|---|---|---|---|
| **EP-V1**: Số điện thoại hợp lệ, 10 chữ số, bắt đầu bằng `0` | `0912345678` (Độ dài = 10) | Positive | Cập nhật thành công (HTTP 200) |
| **EP-V2**: Số điện thoại hợp lệ, 11 chữ số, bắt đầu bằng `0` | `01234567890` (Độ dài = 11) | Positive | Cập nhật thành công (HTTP 200) |
| **EP-I1**: Bỏ trống hoặc giá trị null | `""`, `null` | Negative | Báo lỗi hoặc giữ nguyên nếu không bắt buộc (assumed) |
| **EP-I2**: Bắt đầu bằng số khác `0` | `1912345678` (Bắt đầu bằng `1`) | Negative | Trả về lỗi validate số điện thoại (HTTP 400) |
| **EP-I3**: Độ dài quá ngắn (< 10 chữ số) | `091234567` (Độ dài = 9 - Cận dưới biên) | Negative | Trả về lỗi validate số điện thoại (HTTP 400) |
| **EP-I4**: Độ dài quá dài (> 11 chữ số) | `091234567890` (Độ dài = 12 - Cận trên biên) | Negative | Trả về lỗi validate số điện thoại (HTTP 400) |
| **EP-I5**: Chứa ký tự không phải số | `091234567a`, `0912-345-678` | Negative | Trả về lỗi validate định dạng số điện thoại (HTTP 400) |

#### 6.2.2 Phân tích Miền (Domain Analysis) cho FR-04 & Mobile Profile - Trường Họ Tên (`name`)
*Ràng buộc giả định (Assumed): Bắt buộc nhập, độ dài từ 1 đến 255 ký tự.*

| Phân hoạch tương đương (EP) | Giá trị biên đại diện (BVA) | Loại kiểm thử | Kỳ vọng kết quả (Expected) |
|---|---|---|---|
| **EP-V1**: Họ tên hợp lệ (1 - 255 ký tự) | - Chuỗi 1 ký tự: `"A"` (Biên dưới)<br>- Chuỗi 255 ký tự (Biên trên) | Positive | Cập nhật thành công (HTTP 200) |
| **EP-I1**: Bỏ trống hoặc rỗng | `""` (Độ dài = 0 - Dưới biên dưới) | Negative | Báo lỗi Họ tên là bắt buộc (HTTP 400) |
| **EP-I2**: Độ dài vượt quá giới hạn | Chuỗi 256 ký tự (Trên biên trên) | Negative | Báo lỗi độ dài Họ tên quá dài (HTTP 400) |

#### 6.2.3 Phân tích Miền (Domain Analysis) cho FR-04 & Mobile Profile - Trường Địa chỉ giao hàng (`shipping_address`)
*Ràng buộc giả định (Assumed): Bắt buộc nhập, độ dài từ 1 đến 500 ký tự.*

| Phân hoạch tương đương (EP) | Giá trị biên đại diện (BVA) | Loại kiểm thử | Kỳ vọng kết quả (Expected) |
|---|---|---|---|
| **EP-V1**: Địa chỉ hợp lệ (1 - 500 ký tự) | - Chuỗi 1 ký tự: `"B"` (Biên dưới)<br>- Chuỗi 500 ký tự (Biên trên) | Positive | Cập nhật thành công (HTTP 200) |
| **EP-I1**: Bỏ trống hoặc rỗng | `""` (Độ dài = 0) | Negative | Báo lỗi Địa chỉ là bắt buộc (HTTP 400) |
| **EP-I2**: Độ dài vượt quá giới hạn | Chuỗi 501 ký tự | Negative | Báo lỗi độ dài Địa chỉ vượt quá quy định (HTTP 400) |

#### 6.2.4 Phân tích Chuyển đổi trạng thái (State Transition) cho FR-10 - Trạng thái Đơn hàng
*Quy tắc chuyển đổi: Trạng thái hiện tại quyết định trạng thái tiếp theo hợp lệ.*

| Trạng thái hiện tại | Trạng thái tiếp theo yêu cầu | Tác nhân thao tác | Hợp lệ? | Kết quả mong đợi |
|---|---|---|---|---|
| `pending` | `confirmed` | Admin | Hợp lệ | Đơn hàng chuyển sang `confirmed` (HTTP 200) |
| `pending` | `canceled` | User hoặc Admin | Hợp lệ | Đơn hàng chuyển sang `canceled` (HTTP 200) |
| `confirmed` | `shipping` | Admin | Hợp lệ | Đơn hàng chuyển sang `shipping` (HTTP 200) |
| `confirmed` | `canceled` | User hoặc Admin | Hợp lệ | Đơn hàng chuyển sang `canceled` (HTTP 200) |
| `shipping` | `delivered` | Admin | Hợp lệ | Đơn hàng chuyển sang `delivered` (HTTP 200) |
| `shipping` | `canceled` | User | **Không** | Bị chặn, trả về lỗi phân quyền hủy (HTTP 400/403) |
| `shipping` | `canceled` | Admin | **Không** *(theo State Machine)* | Bị chặn, trả về lỗi chuyển đổi trạng thái (HTTP 400) |
| `delivered` (Final) | Bất kỳ trạng thái nào khác | Admin / User | **Không** | Bị chặn, báo lỗi trạng thái kết thúc (HTTP 400) |
| `canceled` (Final) | Bất kỳ trạng thái nào khác | Admin / User | **Không** | Bị chặn, báo lỗi trạng thái kết thúc (HTTP 400) |
| `pending` | `shipping` (Nhảy bước) | Admin | **Không** | Bị chặn, báo lỗi quy trình tuần tự (HTTP 400) |
| `confirmed` | `delivered` (Nhảy bước) | Admin | **Không** | Bị chặn, báo lỗi quy trình tuần tự (HTTP 400) |

#### 6.2.5 Phân tích Bảng quyết định (Decision Table) cho FR-19 - Xóa người dùng (Admin)
*Ràng buộc: Chỉ Admin được xóa người dùng, và không được tự xóa tài khoản chính mình.*

| Điều kiện / Biến đầu vào | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|---|---|---|---|---|
| **C1**: Token JWT hợp lệ? | Sai | Đúng | Đúng | Đúng |
| **C2**: Vai trò (Role) trong Token là 'admin'? | - | Sai | Đúng | Đúng |
| **C3**: ID cần xóa trùng với ID Admin hiện tại? | - | - | Đúng | Sai |
| **Hành động (Action)** | | | | |
| **A1**: Cho phép thực hiện API delete? | Không | Không | Không | Có |
| **A2**: Mã lỗi HTTP phản hồi | 401 Unauthorized | 403 Forbidden | 400 Bad Request | 200 OK |

---

### 6.3 Tiêu chí đánh giá Pass/Fail

**Được đánh giá là PASS khi**:
- **API**: Trả về đúng HTTP status code (200 OK cho thành công, 400/401/403 cho thất bại nghiệp vụ), cấu trúc dữ liệu JSON đúng đặc tả, và các trường nhạy cảm như `password` không bị trả về.
- **Dữ liệu**: Dữ liệu lưu trong SQLite được cập nhật chính xác (đúng giá trị, đúng định dạng và không bị mất mát dữ liệu xung quanh).
- **UI (Web & Mobile)**: Hiển thị đúng thông báo lỗi trên nút submit khi nhập liệu sai, highlight đúng trường lỗi, hiển thị thông tin chính xác khi cập nhật thành công.
- **Security**: Token hết hạn hoặc không có token không thể truy cập tài nguyên. Không thể đổi `role` của bản thân từ `user` lên `admin` qua payload API profile.

**Được đánh giá là FAIL khi**:
- Xảy ra lỗi 500 Internal Server Error ở phía Backend.
- Hệ thống chấp nhận số điện thoại sai định dạng (ví dụ bắt đầu bằng số `1` hoặc chỉ có 9 số).
- Hệ thống cho phép chuyển đổi trạng thái đơn hàng sai quy trình (ví dụ từ `delivered` quay lại `pending`).
- Cho phép người dùng bình thường (`role = 'user'`) gọi API lấy danh sách người dùng (`GET /api/admin/users`) hoặc xóa người dùng (`DELETE /api/admin/users/:id`).
- Admin tự xóa thành công tài khoản của chính mình đang đăng nhập.
- Ứng dụng Mobile bị crash hoặc treo khi mất kết nối mạng (offline) trong quá trình cập nhật profile.

---

### 6.4 Entry / Exit Criteria

#### 6.4.1 Entry Criteria (Điều kiện bắt đầu)
- [ ] Backend API đã được triển khai đầy đủ các endpoint thuộc phạm vi kiểm thử trên môi trường local (`http://localhost:3000`).
- [ ] Frontend Web Admin và Client Web đã tích hợp chức năng Hồ sơ, Quản lý đơn hàng và Quản lý user.
- [ ] Mobile App đã cấu hình chạy thành công trên Expo Go/Giả lập và kết nối được với LAN IP của Backend.
- [ ] Tài liệu đặc tả API và DB Schema đã được cung cấp rõ ràng.
- [ ] Môi trường Database SQLite đã được seeding sẵn dữ liệu mẫu (Tài khoản Admin, các tài khoản User test, các Đơn hàng với đầy đủ trạng thái `pending`, `confirmed`, `shipping`, `delivered`, `canceled`).

#### 6.4.2 Exit Criteria (Điều kiện kết thúc)
- [ ] 100% các kịch bản kiểm thử (Test Cases) được thiết kế cho FR-04, FR-10, FR-19 và Mobile Profile đã được thực thi.
- [ ] Tỷ lệ kiểm thử thành công đạt tối thiểu 95% tổng số test case.
- [ ] Không còn lỗi nghiêm trọng thuộc mức độ **Blocker** hoặc **Critical** chưa được giải quyết.
- [ ] Mọi lỗi (Bug) phát hiện đã được log đầy đủ lên GitHub Issues kèm theo bằng chứng (Screenshots/Video) và phân loại nhãn (Labels) chuẩn của dự án.
- [ ] Tất cả các kiểm thử hồi quy (Regression Testing) cho các tính năng liên quan đã pass sau khi Dev sửa lỗi.

---

## 7. Test Environment

### 7.1 Infrastructure

| Thành phần | Công nghệ / Phiên bản | Ghi chú |
|---|---|---|
| **Hệ điều hành** | Windows 10/11 | Môi trường máy trạm chạy Server |
| **Backend API** | Node.js + Express | Chạy ở cổng `localhost:3000` |
| **Database** | SQLite | File database cục bộ trong project |
| **Frontend Web** | React + Vite + Tailwind CSS | Cổng `localhost:5173` (Client) & `localhost:5174` (Admin) |
| **Mobile App** | React Native + Expo Go | Chạy trên thiết bị thật Android/iOS qua LAN IP |
| **Mạng kết nối** | Local WiFi / LAN | Đảm bảo Mobile và PC chung một lớp mạng để kết nối API |

### 7.2 Test Data Strategy
- Sử dụng các tài khoản mặc định của hệ thống:
  - Admin: `admin@eshop.com` / `Admin123!`
  - User test: `test@eshop.com` / `Test1234!`
- Seed sẵn tối thiểu 5 đơn hàng tương ứng với 5 trạng thái khởi đầu khác nhau trong SQLite để kiểm tra State Machine.
- Seed thêm 2-3 tài khoản người dùng khác nhau để phục vụ tính năng Admin xóa người dùng.
- Thực hiện reset/seed lại cơ sở dữ liệu SQLite sau mỗi chu kỳ test run để đảm bảo tính nhất quán của dữ liệu.

### 7.3 Công cụ kiểm thử (Test Tools)
- **Postman**: Dùng để gửi các request API độc lập, thiết lập header Authorization Bearer token và kiểm tra response raw.
- **Google Chrome DevTools**: Kiểm tra DOM, console log lỗi của Web client, và giám sát network tab cho các request PUT/GET.
- **Expo Go & Expo CLI**: Dùng để build, chạy và debug ứng dụng Mobile trên thiết bị thật.
- **DB Browser for SQLite**: Đọc và xác minh trực tiếp trạng thái dữ liệu trong database SQLite trước và sau khi thực hiện test.

---

## 8. Risks & Contingencies

Dưới đây là các rủi ro kỹ thuật và vận hành được xác định trong quá trình kiểm thử các tính năng này cùng biện pháp xử lý:

| # | Rủi ro (Risk) | Xác suất | Ảnh hưởng | Biện pháp giảm thiểu (Mitigation) | Kế hoạch dự phòng (Contingency) |
|---|---|---|---|---|---|
| **R1** | **Lỗi kết nối mạng LAN trên Mobile**: Ứng dụng Mobile (Expo) không thể kết nối tới Backend API chạy trên máy tính do cấu hình firewall hoặc khác lớp mạng. | High | High | Đảm bảo cả PC chạy server và thiết bị di động đều kết nối chung một router WiFi và tắt firewall Windows tạm thời trong lúc test. | Chạy Backend và sử dụng các công cụ tunnel như **Ngrok** để tạo public HTTPS URL tạm thời cho Backend, giúp Mobile kết nối từ xa. |
| **R2** | **Race Condition khi cập nhật trạng thái đơn hàng**: Admin đang cập nhật trạng thái sang `shipping` đồng thời User gửi lệnh `cancel` đơn hàng thông qua API. | Medium | Medium | Thiết kế kiểm thử đồng thời (Concurrency Testing) bằng cách giả lập gửi đồng thời hai request PUT sát nhau và kiểm tra xem hệ thống có xử lý lock transaction hoặc xử lý tuần tự an toàn không. | Nếu database SQLite bị khóa hoặc xảy ra sai lệch trạng thái đơn hàng, kiến nghị Dev sử dụng cơ chế xử lý đồng thời (như transaction lock hoặc kiểm tra trạng thái trước khi ghi). |
| **R3** | **Rò rỉ thông tin nhạy cảm qua API**: API Admin lấy danh sách người dùng (`GET /api/admin/users`) vô tình trả về trường `password` dạng plaintext hoặc hash trong payload JSON. | Low | High | Soát xét kỹ cấu trúc response JSON trả về của API này trên Postman. | Yêu cầu Dev chỉnh sửa câu truy vấn database loại bỏ trường mật khẩu hoặc cấu hình ORM loại trừ trường password trong model trước khi trả về. |
| **R4** | **SQLite bị khóa ghi (Database Locked)**: Khi chạy các test case tự động hoặc thao tác ghi dồn dập (cập nhật profile + cập nhật trạng thái đơn hàng), SQLite (vốn có nhược điểm ghi đồng thời kém) báo lỗi locked. | Medium | Medium | Giãn cách thời gian thực hiện các request ghi trong test scripts và tránh chạy đa luồng ghi song song trên cùng database SQLite. | Thực hiện restart service backend và reset database file để giải phóng lock. |

---

*Tài liệu này được lập theo chuẩn kiểm thử phần mềm ISTQB / IEEE 829 phục vụ cho bài tập HW02.*
