# BẢNG MIÊU TẢ VÀ ĐÁNH GIÁ 35 TEST CASES FOR FR-19
## Chức năng: Quản lý Người dùng (Admin) — Lấy danh sách người dùng (`GET /api/admin/users`)

---

## I. GIỚI THIỆU VÀ MỤC TIÊU KIỂM THỬ

Tài liệu này bao gồm **35 test cases** được thiết kế chuyên biệt cho chức năng **FR-19: Quản lý Người dùng (Admin)** — cụ thể là Endpoint API `GET /api/admin/users` của hệ thống EShop.

Bộ test cases được xây dựng nhằm đáp ứng các tiêu chuẩn kiểm thử phần mềm nâng cao, bao gồm:
1. **Domain Partitions on Parameters (Phân vùng tương đương & Giá trị biên trên tham số)**: Kiểm thử các tham số truy vấn (`search`, `page`, `limit`, `role`), định dạng dữ liệu, giá trị rỗng, giá trị âm, và các ký tự đặc biệt.
2. **State Transitions (Chuyển đổi trạng thái)**: Kiểm thử sự thay đổi dữ liệu của danh sách người dùng khi hệ thống trải qua các biến đổi trạng thái (Tạo tài khoản mới FR-01, Tài khoản bị khóa do 3 lần đăng nhập sai FR-02, Cập nhật thông tin cá nhân FR-04, và Xóa tài khoản FR-19).
3. **Security (SEC-01 – SEC-07)**: Kiểm thử Bảo mật tuyệt đối bao gồm Bảo vệ Mật khẩu/OTP không bị lộ (SEC-01, SEC-07), Bắt buộc JWT Authentication (SEC-02), Kiểm soát Phân quyền Role Escalation/Bypass (SEC-03), Chống XSS (SEC-04), và Phòng chống SQL Injection (SEC-05).
4. **Schema Validation (Xác minh Cấu trúc & Kiểu dữ liệu)**: Kiểm thử tính đúng đắn của HTTP Status Code, Header `Content-Type`, định dạng JSON Array, kiểu dữ liệu từng thuộc tính (`id`, `name`, `email`, `role`), và Thời gian phản hồi (SLA Performance).

---

## II. LÝ DO PHÂN LOẠI TEST CASE VÀ CÁC TÍNH NĂNG POSTMAN SỬ DỤNG

### 1. Giải thích Lý do Phân loại (Categorization Reasoning)
* **Schema Validation**: Được xếp vào nhóm này khi mục tiêu chính là kiểm tra cấu trúc gói tin HTTP phản hồi (Status Code, Response Headers, JSON Schema, kiểu dữ liệu các trường, và không chứa trường cấm).
* **Security (SEC-01 – SEC-07)**: Được xếp vào nhóm này khi mục tiêu là phát hiện lỗ hổng bảo mật như rò rỉ dữ liệu nhạy cảm (mật khẩu/OTP), leo thang đặc quyền (Privilege Escalation), thiếu xác thực (Unauthenticated), JWT Tampering, hoặc tấn công tiêm mã độc (SQL Injection, XSS).
* **Domain Partitions**: Được xếp vào nhóm này khi kiểm thử các miền giá trị của tham số đầu vào (`query string`), bao gồm giá trị hợp lệ, giá trị biên, giá trị không hợp lệ, và ký tự đặc biệt.
* **State Transitions**: Được xếp vào nhóm này khi kiểm thử chuỗi hành động làm thay đổi trạng thái của hệ thống/cơ sở dữ liệu, và kiểm tra xem danh sách trả về từ API `GET /api/admin/users` có phản ánh chính xác trạng thái mới đó hay không.
* **Mock Servers / Monitors / Data-driven Runs**: Các nhóm mở rộng tận dụng toàn diện sức mạnh hạ tầng của Postman cho kiểm thử hiệu năng, độ sẵn sàng (Uptime) và giả lập lỗi hệ thống.

### 2. Các Tính năng Postman (Postman Features) được Sử dụng
* **Workspaces**: Quản lý tập trung toàn bộ tài nguyên kiểm thử của dự án EShop.
* **Collections**: Tóm gọn và tổ chức bộ test API thành từng nhóm logical (Auth, Admin, Security, Schema).
* **Environments & Variables**: Sử dụng các biến môi trường (`{{base_url}}`, `{{admin_token}}`, `{{user_token}}`) để linh hoạt chuyển đổi giữa Local, Staging, Production mà không sửa code.
* **Data-driven Runs (Collection Runner & Data File `data_fr19.json`)**: Cho phép thực thi tự động 35 test cases chỉ trong một lần chạy bằng cách truyền file dữ liệu JSON.
* **Pre-request Scripts**: Đoạn mã JavaScript tự động chạy trước khi gửi request (dùng để cấu hình động Header Authorization, tạo Token hết hạn, chuẩn bị payload SQLi).
* **Tests / Assertions (pm.test, Chai.js, Ajv Schema)**: Đoạn mã JavaScript kiểm tra tự động kết quả trả về sau khi nhận response.
* **Mock Servers**: Giả lập API server trả về status 500 khi backend gặp sự cố.
* **Monitors**: Tự động chạy bộ test định kỳ trên Postman Cloud để giám sát Uptime và thời gian phản hồi.

---

## III. BẢNG MIÊU TẢ VÀ ĐÁNH GIÁ 35 TEST CASES FOR FR-19 (`GET /api/admin/users`)

| STT / Mã TC | Mô tả Chi tiết Test Case | Phân loại (Category) | Feature Postman Sử Dụng & Lý Do | Kết quả Mong Đợi (Expected Output) | Đánh giá của Người Dùng | Lý do / Nhận xét của Người Dùng (User Reasoning) |
|---|---|---|---|---|---|---|
| **TC_FR19_01** | Lấy danh sách người dùng thành công với tài khoản Admin hợp lệ | Schema Validation | **Collections & Assertions**: Dùng `pm.test` kiểm tra status 200 và response body dạng JSON array. | HTTP Status 200 OK. Body trả về danh sách array các đối tượng users. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_02** | Kiểm tra cấu trúc Schema chi tiết của từng đối tượng User trong mảng | Schema Validation | **Data-driven Runs & Ajv Schema Validator**: Kiểm tra tự động kiểu dữ liệu của từng trường (`id`: int, `name`: string, `email`: string, `role`: string). | HTTP Status 200 OK. Mỗi đối tượng trong array tuân thủ chính xác Schema. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_03** | Kiểm tra Tuyệt đối Không để lộ trường Password/Password Hash trong response (SEC-01) | Security (SEC-01) | **Tests Script (`pm.expect`)**: Quét toàn bộ chuỗi JSON phản hồi để xác minh không chứa key `password` hoặc `password_hash`. | HTTP Status 200 OK. Tuyệt đối không xuất hiện thuộc tính `password` hay `password_hash`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_04** | Kiểm tra Không để lộ trường OTP / Reset Token khôi phục mật khẩu (SEC-01, SEC-07) | Security (SEC-01, SEC-07) | **Tests Script (`pm.expect`)**: Đảm bảo các token đặt lại mật khẩu nhạy cảm không bị rò rỉ qua API công khai. | HTTP Status 200 OK. Không tồn tại trường `resetToken` hoặc `otp` trong dữ liệu trả về. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_05** | Truy vấn API không gửi Header Authorization (SEC-02) | Security (SEC-02) | **Pre-request Script & Header Override**: Xóa bỏ header `Authorization` trước khi gửi request để kiểm tra xác thực. | HTTP Status 401 Unauthorized. Thông báo lỗi yêu cầu đăng nhập. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_06** | Truy vấn API với JWT Token của User thường (Bypass Privilege Escalation - SEC-03) | Security (SEC-03) | **Environment Variables (`{{user_token}}`)**: Gửi token của người dùng thông thường (`role = user`) để kiểm tra phân quyền Admin. | HTTP Status 403 Forbidden. Từ chối truy cập vì tài khoản không có quyền Admin. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_07** | Truy vấn API với Token sai định dạng (Malformed JWT) | Security (SEC-02) | **Data-driven Runs (`data_fr19.json`)**: Truyền chuỗi token lỗi cú pháp `Bearer malformed.jwt.token`. | HTTP Status 401 Unauthorized. Hệ thống từ chối token không hợp lệ. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_08** | Truy vấn API với Token đã hết hạn (Expired JWT) | Security (SEC-02) | **Pre-request Script**: Giả lập chuỗi Token chứa trường `exp` trong quá khứ để kiểm tra thời hạn token. | HTTP Status 401 Unauthorized. Báo lỗi Token expired. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_09** | Truy vấn API với Token bị chỉnh sửa Chữ ký (Tampered Signature JWT) | Security (SEC-02) | **Security Testing & Pre-request Script**: Thay đổi payload token nhưng giữ nguyên signature cũ để kiểm tra tính toàn vẹn. | HTTP Status 401 Unauthorized. Từ chối do chữ ký không hợp lệ. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_10** | Tấn công SQL Injection qua tham số tìm kiếm `?search=' OR '1'='1` (SEC-05) | Security (SEC-05) | **Data-driven Runs (`data_fr19.json`)**: Truyền payload SQLi vào query param `search` để xác minh Parameterized Query. | HTTP Status 200 OK. Trả về kết quả rỗng hoặc lọc đúng chuỗi, KHÔNG bị lỗi 500 hay rò rỉ CSDL. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_11** | Tấn công XSS qua tham số tìm kiếm `?search=<script>alert('xss')</script>` (SEC-04) | Security (SEC-04) | **Data-driven Runs & Tests Script**: Gửi mã HTML/JS độc hại để kiểm tra khả năng sanitize dữ liệu đầu vào. | HTTP Status 200 OK. Dữ liệu phản hồi được escape an toàn, không thực thi script. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_12** | Lọc danh sách người dùng theo từ khóa tìm kiếm hợp lệ (`?search=test`) | Domain Partitions | **Data-driven Runs (Collection Runner)**: Truyền tham số `search=test` và kiểm tra tính chính xác của bộ lọc. | HTTP Status 200 OK. Danh sách trả về chỉ bao gồm các user có tên hoặc email chứa chữ "test". | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_13** | Tìm kiếm người dùng với từ khóa không tồn tại (`?search=nonexistent_user_xyz`) | Domain Partitions | **Data-driven Runs**: Kiểm tra miền giá trị tìm kiếm không tìm thấy dữ liệu (Empty State). | HTTP Status 200 OK. Trả về mảng rỗng `[]`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_14** | Tìm kiếm người dùng với ký tự đặc biệt trong email (`?search=@eshop.com`) | Domain Partitions | **Data-driven Runs**: Gửi từ khóa chứa ký tự đặc biệt `@` đại diện cho miền email. | HTTP Status 200 OK. Trả về danh sách user có email thuộc tên miền `@eshop.com`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_15** | Phân trang hợp lệ trang đầu tiên (`?page=1&limit=5`) | Domain Partitions | **Data-driven Runs & Assertions**: Kiểm tra số lượng phần tử trả về không vượt quá tham số `limit`. | HTTP Status 200 OK. Danh sách chứa tối đa 5 phần tử. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_16** | Phân trang sang trang tiếp theo (`?page=2&limit=5`) | Domain Partitions | **Data-driven Runs & Tests Script**: Xác minh các phần tử ở trang 2 không bị trùng lặp ID với trang 1. | HTTP Status 200 OK. Danh sách trả về các user của trang 2. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_17** | Phân trang với giới hạn bằng 0 (`?limit=0` - Giá trị biên dưới) | Domain Partitions | **Data-driven Runs**: Kiểm tra cách hệ thống xử lý giá trị biên `limit=0`. | HTTP Status 200 OK (trả mảng rỗng) hoặc fallback về limit mặc định an toàn. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_18** | Phân trang với giới hạn là số âm (`?limit=-10`) | Domain Partitions | **Data-driven Runs**: Gửi giá trị số âm không hợp lệ cho tham số phân trang. | HTTP Status 400 Bad Request hoặc tự động điều chỉnh về số dương mặc định. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_19** | Phân trang với tham số trang không phải chữ số (`?page=abc`) | Domain Partitions | **Data-driven Runs**: Gửi chuỗi ký tự thay vì số nguyên cho tham số `page`. | HTTP Status 400 Bad Request hoặc tự động ép kiểu về `page=1`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_20** | Lọc danh sách người dùng theo Vai trò Admin (`?role=admin`) | Domain Partitions | **Data-driven Runs & Assertions**: Lặp qua tất cả phần tử trả về để khẳng định `role == 'admin'`. | HTTP Status 200 OK. TẤT CẢ người dùng trong mảng trả về đều có `role: 'admin'`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_21** | Lọc danh sách người dùng theo Vai trò User thường (`?role=user`) | Domain Partitions | **Data-driven Runs & Assertions**: Lặp qua tất cả phần tử trả về để khẳng định `role == 'user'`. | HTTP Status 200 OK. TẤT CẢ người dùng trong mảng trả về đều có `role: 'user'`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_22** | Lọc danh sách theo Vai trò không tồn tại trong hệ thống (`?role=superman`) | Domain Partitions | **Data-driven Runs**: Gửi giá trị `role` không thuộc danh mục phân quyền. | HTTP Status 200 OK. Trả về mảng rỗng `[]` hoặc 400 Bad Request. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_23** | Kiểm tra hiển thị trạng thái bị khóa sau khi User đăng nhập sai 3 lần liên tiếp (FR-02 & FR-19) | State Transitions | **Collection Workflow**: Thực hiện 3 lần đăng nhập sai (chuyển trạng thái locked) -> Admin GET danh sách kiểm tra. | HTTP Status 200 OK. Trường trạng thái khóa của tài khoản (`is_locked: true` hoặc `status: locked`) phản ánh chính xác. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_24** | Cập nhật danh sách sau khi Đăng ký tài khoản mới thành công (FR-01 & FR-19) | State Transitions | **Collection Workflow (`POST /api/register` -> `GET /api/admin/users`)**: Tạo tài khoản mới -> Admin lấy danh sách. | HTTP Status 200 OK. Danh sách người dùng chứa tài khoản mới vừa tạo. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_25** | Cập nhật danh sách sau khi Admin Xóa một người dùng (FR-19 Delete -> GET) | State Transitions | **Collection Workflow (`DELETE /api/admin/users/:id` -> `GET`)**: Xóa user -> Admin GET lại danh sách. | HTTP Status 200 OK. Tài khoản vừa bị xóa không còn xuất hiện trong danh sách trả về. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_26** | Cập nhật thông tin trong danh sách sau khi User cập nhật Profile (FR-04 & FR-19) | State Transitions | **Collection Workflow (`PUT /api/users/me` -> `GET /api/admin/users`)**: User đổi tên -> Admin kiểm tra danh sách. | HTTP Status 200 OK. Tên/Số điện thoại mới của User được hiển thị chính xác trong kết quả của Admin. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_27** | Kiểm tra Header Content-Type của Phản hồi | Schema Validation | **Assertions (`pm.response.to.have.header`)**: Kiểm tra chuẩn định dạng dữ liệu truyền tải Web API. | Response Header `Content-Type` chứa `application/json`. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_28** | Kiểm tra Thời gian Phản hồi API (Response Time SLA) | Schema Validation | **Assertions (`pm.expect(responseTime)`)**: Đo lường hiệu năng xử lý của backend API Admin. | Response Time < 500ms. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_29** | Giả lập Backend gặp lỗi hệ thống / CSDL bằng Mock Server | Mock Servers | **Postman Mock Servers**: Tạo Mock Server phản hồi status 500 Internal Error để kiểm tra xử lý lỗi phía Admin UI. | Mock Server trả về HTTP Status 500 với thông điệp lỗi JSON tiêu chuẩn. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_30** | Giám sát Độ sẵn sàng (Uptime Monitoring) tự động định kỳ | Monitors | **Postman Monitors**: Cấu hình lịch chạy tự động hàng giờ trên Postman Cloud để cảnh báo gián đoạn API. | Monitor thực thi thành công (Pass rate 100%), tự động gửi email nếu API Admin ngưng hoạt động. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_31** | Chạy Kiểm thử Tải trọng Lặp lại nhiều lần (Stress Check) | Data-driven Runs | **Collection Runner & Newman**: Thực thi liên tục 35 vòng lặp request để phát hiện memory leak hoặc deadlock CSDL. | 100% request thành công, không phát sinh lỗi rò rỉ bộ nhớ hay gián đoạn kết nối SQLite. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_32** | Gửi Authorization Header sử dụng cú pháp thiếu từ khóa `Bearer` | Security (SEC-02) | **Pre-request Script & Data-driven Runs**: Gửi `Authorization: <token_string>` (không có prefix Bearer). | HTTP Status 401 Unauthorized. Yêu cầu định dạng Bearer Token chuẩn. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_33** | Tấn công Parameter Pollution gửi trùng lặp tham số (`?search=admin&search=user`) | Security (SEC-05) | **Data-driven Runs & Assertions**: Kiểm tra xử lý mảng tham số trùng tên từ client. | HTTP Status 200 OK hoặc 400 Bad Request. Backend xử lý an toàn, không bị crash ngoại lệ Uncaught Exception. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_34** | Kiểm tra Mã hóa UTF-8 đối với Tên người dùng có tiếng Việt có dấu | Schema Validation | **Assertions & Unicode Check**: Kiểm tra tìm kiếm và hiển thị chuỗi tiếng Việt như "Nguyễn Văn A". | HTTP Status 200 OK. Chuỗi tiếng Việt hiển thị chính xác chuẩn UTF-8, không bị lỗi font hay biến dạng. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |
| **TC_FR19_35** | Kiểm tra Kích thước Gói tin Phản hồi (Response Size Threshold) | Schema Validation | **Assertions (`pm.response.responseSize`)**: Đảm bảo dung lượng phản hồi hợp lý, không gây quá tải băng thông. | HTTP Status 200 OK. Dung lượng Response Body < 2MB. | [ ] Valid<br>[ ] Invalid<br>[ ] Incomplete | |

---

## IV. HƯỚNG DẪN CHI TIẾT TỪ A ĐẾN Z: CẤU TRÚC THƯ MỤC, TÍCH HỢP VÀ CHẠY BỘ TEST CASES VỚI POSTMAN VÀ NEWMAN

Để thiết lập môi trường kiểm thử chuyên nghiệp, chuẩn hóa và tự động hóa báo cáo HTML, bạn hãy thực hiện chính xác theo hướng dẫn từng bước bên dưới:

### 1. Cấu trúc Thư mục Dự án Chuẩn
Hệ thống file kiểm thử được tổ chức theo cấu trúc cây thư mục như sau:

```text
EShop-API-Testing/
├── collections/
│   └── EShop_Admin_Users.postman_collection.json   # Collection chứa Requests & Script Assertions cho FR19
├── environments/
│   └── EShop_Local.postman_environment.json        # Môi trường Local chứa base_url và Tokens
├── data/
│   └── data_fr19.json                              # Dữ liệu 35 Test Cases cho Collection Runner & Newman
└── reports/
    ├── FR19_Test_Cases_Review.md                   # File Markdown miêu tả & đánh giá Test Cases
    └── EShop_FR19_Report.html                      # Báo cáo HTML tự động sinh bởi Newman htmlextra
```

---

### 2. Bước 1: Khởi tạo Thư mục và Chuẩn bị Các File

Mở Terminal (hoặc Command Prompt / PowerShell) và thực hiện các lệnh sau:

```bash
# Tạo thư mục gốc dự án
mkdir EShop-API-Testing
cd EShop-API-Testing

# Tạo các thư mục con
mkdir collections environments data reports
```

Các file cấu hình (`.json`) đã được hệ thống tạo sẵn hoàn chỉnh trong các thư mục tương ứng:
1. `collections/EShop_Admin_Users.postman_collection.json`
2. `environments/EShop_Local.postman_environment.json`
3. `data/data_fr19.json`
4. `reports/FR19_Test_Cases_Review.md`

---

### 3. Bước 2: Nhập (Import) vào Postman GUI

1. Mở ứng dụng **Postman**.
2. Chọn **Workspaces** $ightarrow$ Tạo mới hoặc chọn Workspace làm việc cho dự án EShop.
3. Nhấp vào nút **Import** ở góc trên bên trái.
4. Kéo thả hoặc Chọn file từ máy tính:
   * Chọn `collections/EShop_Admin_Users.postman_collection.json`
   * Chọn `environments/EShop_Local.postman_environment.json`
5. Chọn môi trường **EShop_Local** ở góc trên bên phải của Postman màn hình chính.

---

### 4. Bước 3: Chạy Tự động trên Postman GUI (Collection Runner)

1. Đảm bảo **Backend EShop** đang chạy tại `http://localhost:3000` (`node server.js`).
2. Chọn Collection **EShop_Admin_Users_FR19** bên thanh điều hướng trái.
3. Bấm vào nút **Run** (hoặc biểu tượng 3 chấm $ightarrow$ **Run collection**).
4. Trong giao diện Runner:
   * **Environment**: Chọn `EShop_Local`.
   * **Data**: Nhấp chọn file `data/data_fr19.json`.
   * **Data File Type**: Chọn `application/json`.
   * Tích chọn **Persist variables**.
5. Bấm nút màu cam **Run EShop_Admin_Users_FR19**.
6. Postman sẽ chạy tự động 35 iterations và hiển thị trực quan số lượng test cases Passed/Failed.

---

### 5. Bước 4: Chạy Tự động và Sinh Báo cáo HTML bằng Newman CLI (A to Z)

Newman là công cụ dòng lệnh (CLI) chạy các bộ test của Postman, rất phù hợp tích hợp CI/CD (GitHub Actions, Jenkins).

#### 4.1. Cài đặt Newman và Newman Reporter htmlextra
Mở Terminal và cài đặt NodeJS package toàn cục:

```bash
npm install -g newman newman-reporter-htmlextra
```

#### 4.2. Thực thi Lệnh Chạy Kiểm thử với Newman

Chạy lệnh sau tại thư mục gốc `EShop-API-Testing`:

```bash
newman run collections/EShop_Admin_Users.postman_collection.json   -e environments/EShop_Local.postman_environment.json   -d data/data_fr19.json   -r cli,htmlextra   --reporter-htmlextra-export reports/EShop_FR19_Report.html   --reporter-htmlextra-title "Báo Cáo Kiểm Thử Tự Động FR-19 Admin Users API - EShop"
```

#### 4.3. Giải thích Tham số Lệnh Newman:
* `run collections/...`: Chỉ định file Collection JSON cần chạy.
* `-e environments/...`: Chỉ định file Environment biến môi trường.
* `-d data/...`: Chỉ định file dữ liệu đầu vào chứa 35 test cases (`data_fr19.json`).
* `-r cli,htmlextra`: Xuất kết quả ra cả màn hình Terminal (cli) và file HTML đẹp mắt (htmlextra).
* `--reporter-htmlextra-export reports/...`: Nơi lưu trữ file báo cáo HTML kết quả.

#### 4.4. Mở Báo cáo Kết quả HTML
Sau khi Newman hoàn tất, bạn chỉ cần mở file `reports/EShop_FR19_Report.html` bằng bất kỳ trình duyệt web nào (Chrome, Edge, Firefox) để xem báo cáo chi tiết trực quan với đồ thị, thống kê thời gian phản hồi, danh sách request thành công/thất bại và chi tiết từng assertion!

---

_Tài liệu hướng dẫn và bộ Test Cases đã hoàn tất và sẵn sàng cho việc kiểm thử hệ thống EShop._
