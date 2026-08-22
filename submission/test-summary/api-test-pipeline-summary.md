# Báo Cáo Tổng Hợp Chi Tiết Pipeline Kiểm Thử API (FR-04, FR-10, FR-16)

Tài liệu này tổng hợp chi tiết toàn bộ quy trình kiểm thử API (API Testing Pipeline) gồm 5 giai đoạn cho 3 tính năng của hệ thống EShop SUT theo chuẩn đề bài HW06:
1. **Pool A — FR-04**: Quản lý hồ sơ cá nhân (`GET /api/users/me`, `PUT /api/users/me`)
2. **Pool B — FR-10**: Vòng đời & Trạng thái Đơn hàng (`POST /api/checkout`, `PUT /api/admin/orders/:id/status`, `PUT /api/orders/:id/cancel`, `GET /api/orders/:id`, `GET /api/orders/my-orders`, `GET /api/admin/orders`)
3. **Pool C — FR-16**: Import Sản phẩm từ CSV/JSON (`POST /api/admin/import-products`)

---

## 1. Bảng Tổng Quan Số Liệu Toàn Bộ Test Suite

| Chỉ số (Metric) | FR-04 (Profile) | FR-10 (Order State) | FR-16 (Product Import) | Auth Setup | Toàn Bộ Suite |
|---|---|---|---|---|---|
| **Số Test Case AI sinh (AI-Generated TCs)** | **51** | **53** | **49** | — | **153** |
| - *Domain Partition (DP)* | 27 | 20 | 27 | — | 74 |
| - *State Transition (ST)* | 4 | 16 | 5 | — | 25 |
| - *Security (SEC-01..07)* | 14 | 11 | 12 | — | 37 |
| - *Schema Validation (SCH)* | 6 | 6 | 5 | — | 17 |
| **Số Test Case người mở rộng (Human Extensions)** | **1** (`EXT-003`) | **2** (`EXT-001`, `EXT-002`) | **2** (`EXT-004`, `EXT-005`) | — | **5** |
| **Tổng số ca kiểm thử thiết kế** | **52** | **55** | **51** | — | **158** |
| **Số Request thực thi trong Postman/Newman** | **51** | **53** | **49** | **2** | **155** |
| **Số Test Passed** | **42** | **41** | **37** | **2** | **122** |
| **Số Test Failed (Bắt được lỗi SUT)** | **9** | **12** | **12** | **0** | **33** |
| **Số lỗi thực tế phát hiện trong Backend (Bugs)** | **2** | **3** | **2** | **0** | **7 Bugs** |

---

## 2. Chi Tiết Pipeline Từng Tính Năng

---

### 2.1 FEATURE 1: FR-04 — Personal Profile Management (Pool A)

#### Giai đoạn 1: Generate with AI (Sinh ca kiểm thử)
- **File phân tích**: [`tests/test-cases/FR-04-Profile/PROFILE-API-test-analysis.md`](../test-cases/FR-04-Profile/PROFILE-API-test-analysis.md)
- **Nội dung kiểm thử chi tiết**:
  - **Domain Partition (27 TCs - `TC-PROFILE-DP-001` → `027`)**:
    - `name`: Tên chuẩn Latin, tên tiếng Việt có dấu ("Trần Thị Bích Hạnh"), chuỗi rỗng `""`, chỉ khoảng trắng `"   "`, biên dưới 1 ký tự ("A"), biên trên 255 ký tự, vượt biên 256 ký tự, tên chứa số, thiếu field/null.
    - `phone`: SĐT 10 số bắt đầu bằng `0` ("0912345678"), SĐT 11 số ("01234567890"), biên dưới 9 số, biên trên 12 số, không bắt đầu bằng số 0 ("1912345678"), chứa chữ ("0912345abc"), chứa ký tự đặc biệt ("0912-345-678"), chuỗi rỗng, null.
    - `shipping_address`: Địa chỉ chuẩn, địa chỉ có ký tự đặc biệt/xuống dòng, chuỗi rỗng, biên 500 ký tự, vượt biên 501 ký tự.
    - `Authorization Header`: Bearer token hợp lệ của User, thiếu header, sai tiền tố token, token giả mạo (invalid signature).
  - **State Transition (4 TCs - `TC-PROFILE-ST-001` → `004`)**:
    - ST-001: Tài khoản mới đăng ký -> Cập nhật profile hợp lệ -> Chuyển sang `ProfileUpdated`.
    - ST-002: Đã có profile -> Cập nhật thông tin mới -> Ghi đè thành công `ProfileUpdated`.
    - ST-003: Cung cấp SĐT sai validation -> Cập nhật thất bại -> Giữ nguyên dữ liệu cũ.
    - ST-004: Token hết hạn -> Bị từ chối -> Không thay đổi CSDL.
  - **Security Testing (14 TCs - `TC-PROFILE-SEC-001` → `014`)**:
    - SEC-01 (SQLi): Gửi `' OR '1'='1` vào `name`, `'; DROP TABLE users; --` vào `shipping_address`, `' UNION SELECT...` vào `phone`.
    - SEC-02 (IDOR): Gửi `{"id": 1}` để cố sửa hồ sơ của Admin từ token của User thường.
    - SEC-03 (Role Escalation / Mass Assignment): Gửi `{"role": "admin"}` và `{"isAdmin": true}` từ token User thường.
    - SEC-04 (Auth Bypass): Gọi `GET /api/users/me` và `PUT /api/users/me` không token hoặc token giả mạo.
    - SEC-05 (Stored XSS): Gửi payload `<script>alert('XSS')</script>` vào `name` và `<img src=x onerror=alert(1)>` vào `shipping_address`.
    - SEC-06 (Rate Limiting): Gửi 50 request cập nhật liên tiếp trong 1 giây.
    - SEC-07 (Data Exposure): Kiểm tra response `GET /api/users/me` có lộ `password` (hash/plaintext) hoặc `reset_token`.
  - **Schema Validation (6 TCs - `TC-PROFILE-SCH-001` → `006`)**:
    - Validate schema response 200 OK (`id`, `name`, `email`, `role`, `shipping_address`, `phone`), 400 Bad Request, 401 Unauthorized, 403 Forbidden.

#### Giai đoạn 2: Human Audit & Evaluation
- **Đánh giá**: 48 TCs VALID, 3 TCs INCOMPLETE (chưa kiểm tra chuỗi Unicode 4-byte UTF-8 emoji).
- **Ca kiểm thử con người mở rộng**:
  - `EXT-003`: Cập nhật tên chứa Unicode 4-byte UTF-8 (`Nguyen Van A 𠜎 🚀 😀`) để kiểm tra string truncation trên SQLite.

#### Giai đoạn 3: Thực thi (Execution) & Kết quả
- **Tổng số request thực thi**: 51
- **Passed**: 42 requests
- **Failed (Bắt được lỗi)**: 9 requests
- **Bugs thực tế phát hiện trên FR-04**:
  1. **BUG-01 (Role Escalation)**: `PUT /api/users/me` chấp nhận field `role` trong body và ghi thẳng vào CSDL (`server.js:124-127`), cho phép regular user tự phong làm Admin.
  2. **BUG-02 (Sensitive Data Exposure)**: `GET /api/users/me` thực hiện `SELECT * FROM users` làm lộ toàn bộ plaintext `password` và `reset_token` trong response JSON (`server.js:114`).

---

### 2.2 FEATURE 2: FR-10 — Order State Machine (Pool B)

#### Giai đoạn 1: Generate with AI (Sinh ca kiểm thử)
- **File phân tích**: [`tests/test-cases/FR-10-OrderState/ORDER-API-test-analysis.md`](../test-cases/FR-10-OrderState/ORDER-API-test-analysis.md)
- **Nội dung kiểm thử chi tiết**:
  - **Domain Partition (20 TCs - `TC-ORDER-DP-001` → `020`)**:
    - Path param `:id`: ID hợp lệ (1), ID không tồn tại (999999), ID âm (-1), ID chuỗi ("abc"), ID số thực (1.5).
    - Field `status` (Admin update): Enum hợp lệ (`confirmed`, `shipping`, `delivered`, `canceled`), Enum không hợp lệ (`completed`, `unknown`, `""`, số nguyên 123).
    - Path param `:id` khi User cancel: Đơn của chính mình, đơn không tồn tại/đơn người khác.
    - Body khi Checkout (`POST /api/checkout`): `total_amount` dương (>0), âm (-50000), 0; `shipping_address` chuẩn, rỗng.
    - Header `Authorization`: Token Admin, Token User thường khi gọi endpoint Admin.
  - **State Transition (16 TCs - `TC-ORDER-ST-001` → `016`)**:
    - Kiểm tra toàn diện ma trận chuyển đổi 5x5 trạng thái:
      - 7 nhánh hợp lệ: `pending -> confirmed`, `pending -> canceled (user)`, `pending -> canceled (admin)`, `confirmed -> shipping`, `confirmed -> canceled (user)`, `confirmed -> canceled (admin)`, `shipping -> delivered`.
      - 9 nhánh bất hợp lệ: User cancel khi `shipping`, Admin đi lùi (`shipping -> pending`, `shipping -> confirmed`), Chuyển đổi từ Final State `delivered` (`delivered -> pending`, `delivered -> shipping`, `delivered -> canceled`), Chuyển đổi từ Final State `canceled` (`canceled -> delivered`, `canceled -> pending`, `canceled -> confirmed`).
  - **Security Testing (11 TCs - `TC-ORDER-SEC-001` → `011`)**:
    - SEC-01 (SQLi): Injection trên path param `:id` (`/api/orders/1 OR 1=1/cancel`) và status body (`confirmed'; DROP TABLE orders; --`).
    - SEC-02 (IDOR): User A gọi `PUT /api/orders/2/cancel` hoặc `GET /api/orders/2` để can thiệp đơn hàng của User B.
    - SEC-03 (Role Escalation): User thường gọi `PUT /api/admin/orders/:id/status` hoặc `GET /api/admin/orders`.
    - SEC-04 (Auth Bypass): Gọi đổi trạng thái / hủy đơn không token.
    - SEC-05 (Stored XSS): Gửi `<script>alert('OrderXSS')</script>` trong `shipping_address` khi checkout.
    - SEC-06 (Race Condition): Gửi 2 request hủy đơn liên tiếp đồng thời.
    - SEC-07 (Data Exposure): Kiểm tra `GET /api/admin/orders` có lộ thông tin tài khoản nhạy cảm của khách hàng.
  - **Schema Validation (6 TCs - `TC-ORDER-SCH-001` → `006`)**:
    - Validate schema của checkout response (`orderId`, `message`), update status response, cancel response, error schema (400, 404) và mảng my-orders.

#### Giai đoạn 2: Human Audit & Evaluation
- **Đánh giá**: 50 TCs VALID, 3 TCs INCOMPLETE (thiếu ca kiểm thử tương tranh khi gửi 2 lệnh hủy đồng thời và đơn hàng của tài khoản đã xóa).
- **Ca kiểm thử con người mở rộng**:
  - `EXT-001`: Idempotency & Race Condition on Concurrent Cancel (2 request hủy đơn song song).
  - `EXT-002`: State Transition on Inactive / Soft-Deleted User Orders (Đổi trạng thái đơn của user đã bị xóa).

#### Giai đoạn 3: Thực thi (Execution) & Kết quả
- **Tổng số request thực thi**: 53
- **Passed**: 41 requests
- **Failed (Bắt được lỗi)**: 12 requests
- **Bugs thực tế phát hiện trên FR-10**:
  1. **BUG-03 (Vi phạm Final State Rule)**: Backend tại `server.js:550` có code `if (currentStatus === "canceled" && status === "delivered") isValidTransition = true;`, cho phép chuyển đổi bất hợp lệ từ trạng thái đã hủy `canceled` sang `delivered`.
  2. **BUG-04 (Lỗi logic hủy đơn khi đang shipping)**: Backend tại `server.js:329` kiểm tra `if (order.status === "delivered" || order.status === "canceled")`, bỏ sót trạng thái `shipping`, dẫn tới việc User vẫn tự hủy được đơn hàng đang giao.
  3. **BUG-05 (Broken Access Control)**: `PUT /api/admin/orders/:id/status` và `GET /api/admin/orders` cho phép token của User thường truy cập mà không kiểm tra `user.role === 'admin'`.

---

### 2.3 FEATURE 3: FR-16 — Product Import from CSV (Pool C)

#### Giai đoạn 1: Generate with AI (Sinh ca kiểm thử)
- **File phân tích**: [`tests/test-cases/FR-16-ProductImport/IMPORT-API-test-analysis.md`](../test-cases/FR-16-ProductImport/IMPORT-API-test-analysis.md)
- **Nội dung kiểm thử chi tiết**:
  - **Domain Partition (27 TCs - `TC-IMPORT-DP-001` → `027`)**:
    - Cấu trúc `products`: Mảng 1 item, mảng nhiều items (5 items), mảng rỗng `[]`, thiếu key `products`, kiểu chuỗi không phải mảng, giá trị null.
    - Field `name`: Tên chuẩn, tên tiếng Việt có dấu, chuỗi rỗng `""`, chỉ khoảng trắng, thiếu field `name`, biên 255 ký tự, vượt biên 256 ký tự.
    - Field `price`: Số dương (100000), biên dưới 1 (1 ₫), giá bằng 0, giá âm (-50000), kiểu chuỗi ("free"), thiếu field `price`.
    - Field `category_id`: ID hợp lệ (1, 2, 3), ID không tồn tại (9999), ID âm (-1).
    - Field `imageUrl` & `description`: URL ảnh hợp lệ, mô tả có xuống dòng.
    - Header `Authorization`: Token Admin, Token User thường, không truyền token.
  - **State Transition & Transactional Integrity (5 TCs - `TC-IMPORT-ST-001` → `005`)**:
    - ST-001: Import 3 SP hợp lệ toàn bộ -> CSDL tăng đúng 3 sản phẩm.
    - ST-002: Lô 3 SP (SP 1 valid, SP 2 price=-100000, SP 3 valid) -> Rollback nguyên tử: CSDL tăng 0 sản phẩm.
    - ST-003: Lô 3 SP (SP 1 valid, SP 2 thiếu tên, SP 3 valid) -> Rollback nguyên tử: CSDL tăng 0 sản phẩm.
    - ST-004: Lô SP có `category_id` không tồn tại -> Rollback nguyên tử.
    - ST-005: Gửi lại lô dữ liệu đã sửa lỗi -> Import thành công trọn vẹn.
  - **Security Testing (12 TCs - `TC-IMPORT-SEC-001` → `012`)**:
    - SEC-01 (SQLi): Gửi `"iPhone 16', 1000, '', '', 1); DROP TABLE products; --"` trong `name`, SQLi trong `description`, SQLi trong `imageUrl`.
    - SEC-02 (IDOR): Cố tình chèn `id` có sẵn để ghi đè sản phẩm người khác.
    - SEC-03 (Role Escalation): User thường gọi API Import sản phẩm của Admin hoặc gửi kèm `isAdmin: true`.
    - SEC-04 (Auth Bypass): Gọi API không token hoặc token giả mạo.
    - SEC-05 (Stored XSS): Gửi `<script>alert('XSS_Product')</script>` trong `name` và `<svg/onload=alert('XSS_Desc')>` trong `description`.
    - SEC-06 (DoS / Bulk Exhaustion): Gửi mảng 10,000 items để kiểm tra giới hạn tải.
    - SEC-07 (Data Exposure): Kiểm tra mảng `errors` có để lộ stack trace hoặc cấu trúc SQL SQLite nội bộ.
  - **Schema Validation (5 TCs - `TC-IMPORT-SCH-001` → `005`)**:
    - Validate schema 200 Success (`message`, `inserted`, `errors`), 400 Bad Request, 401 Unauthorized, 403 Forbidden, cấu trúc mảng `errors`.

#### Giai đoạn 2: Human Audit & Evaluation
- **Đánh giá**: 46 TCs VALID, 3 TCs INCOMPLETE (bỏ sót CSV Formula Injection khi Admin mở file trên Excel và trùng tên sản phẩm trong cùng batch).
- **Ca kiểm thử con người mở rộng**:
  - `EXT-004`: Intra-Batch Duplicate Name Collision in CSV Import (Trùng tên sản phẩm trong cùng 1 batch import).
  - `EXT-005`: CSV / Excel Formula Injection (Tấn công chèn công thức `=cmd|...` vào tên/mô tả).

#### Giai đoạn 3: Thực thi (Execution) & Kết quả
- **Tổng số request thực thi**: 49
- **Passed**: 37 requests
- **Failed (Bắt được lỗi)**: 12 requests
- **Bugs thực tế phát hiện trên FR-16**:
  1. **BUG-06 (Vi phạm All-or-Nothing Rollback)**: Backend tại `server.js:213-233` dùng `rows.forEach` chèn từng dòng một mà không dùng Database Transaction (`BEGIN TRANSACTION ... ROLLBACK`). Khi có dòng lỗi, các dòng hợp lệ đứng trước/sau vẫn bị chèn dở dang vào CSDL (`inserted > 0`).
  2. **BUG-07 (Thiếu validation giá <= 0)**: Backend tại `server.js:218` chỉ kiểm tra `if (!row.name)`, cho phép chèn sản phẩm có giá 0 ₫ hoặc số âm mà không báo lỗi.
  3. **BUG-05 (Tiếp tục vi phạm Access Control)**: Endpoint `POST /api/admin/import-products` cho phép token của User thường gọi thành công.

---

## 3. Bảng Tổng Hợp Lỗi Thực Tế Phát Hiện Trong Backend SUT

| Bug ID | Mức độ | Tính năng | Endpoint | Nguyên nhân kỹ thuật trong mã nguồn | File & Dòng Code |
|---|---|---|---|---|---|
| **BUG-01** | **Critical** | FR-04 | `PUT /api/users/me` | Lỗ hổng Privilege Escalation: Backend chấp nhận `role` từ request body và cập nhật vào DB | [`application/backend/server.js:124-127`](../../application/backend/server.js#L124-L127) |
| **BUG-02** | **High** | FR-04 | `GET /api/users/me` | Lỗ hổng Sensitive Data Exposure: Dùng `SELECT *` làm lộ `password` (plaintext) và `reset_token` | [`application/backend/server.js:113-115`](../../application/backend/server.js#L113-L115) |
| **BUG-03** | **Critical** | FR-10 | `PUT /api/admin/orders/:id/status` | Vi phạm Final State Rule: Cho phép chuyển từ trạng thái kết thúc `canceled` sang `delivered` | [`application/backend/server.js:550-551`](../../application/backend/server.js#L550-L551) |
| **BUG-04** | **Medium** | FR-10 | `PUT /api/orders/:id/cancel` | Lỗi logic hủy đơn: Bỏ sót trạng thái `shipping`, cho phép User hủy đơn đang giao | [`application/backend/server.js:329-331`](../../application/backend/server.js#L329-L331) |
| **BUG-05** | **High** | FR-10, FR-16 | `/api/admin/*` | Lỗ hổng Broken Access Control: `authenticateToken` không kiểm tra `req.user.role === 'admin'` | [`application/backend/server.js:100-110`](../../application/backend/server.js#L100-L110) |
| **BUG-06** | **High** | FR-16 | `POST /api/admin/import-products` | Vi phạm All-or-Nothing Rollback: Dùng `rows.forEach` không transaction, chèn dở dang khi có lỗi | [`application/backend/server.js:213-233`](../../application/backend/server.js#L213-L233) |
| **BUG-07** | **Medium** | FR-16 | `POST /api/admin/import-products` | Thiếu validation giá tiền: Không kiểm tra `price <= 0`, chấp nhận giá âm và 0 ₫ | [`application/backend/server.js:214-220`](../../application/backend/server.js#L214-L220) |

---

## 4. Minh Chứng Thực Thi & Báo Cáo Newman

- **Postman Collection JSON**: [`tests/test-runs/EShop_API_Testing.postman_collection.json`](../test-runs/EShop_API_Testing.postman_collection.json)
- **Postman Environment JSON**: [`tests/test-runs/eshop-api.postman_environment.json`](../test-runs/eshop-api.postman_environment.json)
- **Báo cáo HTML trực quan (Newman HTML Extra)**: [`submission/reports/EShop_API_Test_Report.html`](../../submission/reports/EShop_API_Test_Report.html)
- **Kịch bản chạy tự động**: [`tests/test-runs/run-newman-tests.ps1`](../test-runs/run-newman-tests.ps1)
