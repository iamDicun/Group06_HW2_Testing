# Bug Reports — API Testing (Newman)

**Student ID:** 23127031
**Test Tool:** Newman CLI 6.2.2 + newman-reporter-htmlextra
**SUT:** eShop Backend (Node.js/Express/SQLite) — `http://localhost:3000`
**Execution Date:** 2026-08-24
**Newman Report:** `newman-report/report.html`
**Total Assertions:** 138 (executed: 138, failed: 77, passed: 61) + 15 test-script errors (JSONError)

---

## [BUG-API-01][FR-02] Sai số lần đăng nhập sai — `login_attempts + 2` thay vì `+ 1`

### Found by Test Case
TC-FR02-ST-01 → ST-03 (bộ đếm tăng quá nhanh, khóa sau 1 lần sai thay vì 3)

### Requirement Related
FR-02 — Đăng nhập sai 3 lần liên tiếp mới bị khóa 30 giây

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. Tạo tài khoản mới (login_attempts = 0)
2. Đăng nhập sai password 1 lần
3. Kiểm tra DB: `login_attempts` = **2** (không phải 1)

### Expected Result
Sau 1 lần đăng nhập sai: `login_attempts = 1`. Sau 3 lần: `login_attempts = 3` → khóa.

### Actual Result
Sau 1 lần đăng nhập sai: `login_attempts = 2`. Chỉ cần 2 lần sai là đã khóa (2 × 2 = 4 ≥ 3).

### Evidence
![Bug 1](screenshots/bug_1.png)

---

## [BUG-API-02][FR-02] Thời gian khóa tài khoản là 3 phút thay vì 30 giây

### Found by Test Case
TC-FR02-ST-06 (đăng nhập đúng sau khi hết khóa thất bại — vẫn trả về 403)

### Requirement Related
FR-02 — Khóa tài khoản trong 30 giây

### Severity / Priority
Major / P1

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. Đăng nhập sai 3 lần → tài khoản bị khóa
2. Chờ 30 giây
3. Đăng nhập đúng password

### Expected Result
Sau 30 giây, tài khoản hết khóa → đăng nhập thành công (200 OK).

### Actual Result
Sau 30 giây vẫn trả về 403 Forbidden. Phải chờ 3 phút.

### Evidence
![Bug 2](screenshots/bug_2.png)

---

## [BUG-API-03][FR-02] Server crash (500) khi Content-Type sai hoặc body rỗng

### Found by Test Case
TC-FR02-EXT-04, TC-FR02-EXT-05, TC-FR02-SEC-06, TC-FR02-SEC-07

### Requirement Related
FR-02 — Xử lý lỗi nhập liệu

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. Gửi POST `/api/login` với Content-Type `application/x-www-form-urlencoded` (thay vì JSON)
2. Hoặc gửi POST `/api/login` với body rỗng

### Expected Result
Server trả về 400 Bad Request hoặc 401 Unauthorized với thông báo lỗi rõ ràng.

### Actual Result
Server trả về **500 Internal Server Error** với thông báo SQL/stack trace.

### Evidence
![Bug 3](screenshots/bug_3.png)

---

## [BUG-API-04][FR-02] Response login lộ password plain text

### Found by Test Case
TC-FR02-SEC-08 (kiểm tra JWT/response không lộ password)

### Requirement Related
FR-02 — Bảo mật thông tin user

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/login` với email/password hợp lệ
2. Kiểm tra response body

### Expected Result
Response chứa `token` và `user` object, nhưng `user` object **KHÔNG** chứa field `password`.

### Actual Result
Response trả về `user` object đầy đủ包括 `password: "Test123!"` — mật khẩu hiển thị plain text.

### Evidence
![Bug 4](screenshots/bug_4.png)

---

## [BUG-API-05][FR-02] JWT không có field `exp` — token không bao giờ hết hạn

### Found by Test Case
TC-FR02-SCHEMA-06 (kiểm tra JWT payload)

### Requirement Related
FR-02 — Bảo mật JWT

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/login` → nhận JWT
2. Decode JWT payload (dùng jwt.io hoặc base64)

### Expected Result
JWT payload chứa field `exp` (expiration time).

### Actual Result
JWT payload chỉ chứa `id`, `role`, `iat`. **Không có `exp`** → token sống mãi.

### Evidence
![Bug 5](screenshots/bug_5.png)

---

## [BUG-API-06][FR-02] Secret key hardcode trong source code

### Found by Test Case
Security testing - Phân tích JWT token

### Requirement Related
FR-02 — Bảo mật JWT

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/login` với valid credentials → nhận JWT
2. Decode JWT header (base64)
3. Kiểm tra secret key

### Expected Result
Secret key được lưu trong environment variable (`.env`), không hardcode trong source code.

### Actual Result
Secret key `super_secret_key_that_should_not_be_here` được hardcode trực tiếp trong file `server.js`.

### Impact
Ai cũng có thể đọc được secret key và forge JWT token giả mạo.

### Evidence
![Bug 6](screenshots/bug_6.png)

---

## [BUG-API-07][FR-08] Checkout không validate body — chấp nhận thiếu field, sai kiểu

### Found by Test Case
TC-FR08-DP-09, DP-10, DP-14, DP-15, DP-18

### Requirement Related
FR-08 — Validate dữ liệu checkout

### Severity / Priority
Major / P1

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/checkout` với `total_amount: null` → Server chấp nhận (200 OK)
2. POST `/api/checkout` với `total_amount: true` (boolean) → Server chấp nhận (200 OK)
3. POST `/api/checkout` thiếu `shipping_address` → Server chấp nhận (200 OK)
4. POST `/api/checkout` với `shipping_address: 12345` (number) → Server chấp nhận (200 OK)

### Expected Result
Server trả về 400 Bad Request cho mỗi trường hợp trên.

### Actual Result
Server chấp nhận tất cả, inserts `null`/`undefined` vào DB.

### Evidence
![Bug 7](screenshots/bug_7.png)

---

## [BUG-API-08][FR-14] Category CRUD không validate tên — chấp nhận empty, null, ký tự đặc biệt

### Found by Test Case
TC-FR14-DP-02, DP-03, DP-06, SEC-01

### Requirement Related
FR-14 — Validate dữ liệu category

### Severity / Priority
Major / P1

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/categories` với `{"name": ""}` → 200 OK (tạo category tên rỗng)
2. POST `/api/categories` với `{"name": null}` → 200 OK (tạo category tên null)
3. POST `/api/categories` với `{"name": "   "}` → 200 OK (tạo category tên toàn space)
4. POST `/api/categories` với `{"name": "<script>alert(1)</script>"}` → 200 OK

### Expected Result
Server trả về 400 Bad Request cho tên rỗng/null/special characters.

### Actual Result
Server chấp nhận tất cả, insert vào DB.

### Evidence
![Bug 8](screenshots/bug_8.png)

---

## [BUG-API-09][FR-14] Không có Role-Based Access Control trên Category API

### Found by Test Case
TC-FR14-SEC-06, SEC-07, SEC-10

### Requirement Related
FR-14 — Category chỉ admin mới được tạo/xóa

### Severity / Priority
Critical / P0

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. Login với tài khoản `user` (role = "user") → lấy userToken
2. POST `/api/categories` với userToken → **200 OK** (tạo thành công!)
3. DELETE `/api/categories/:id` với userToken → **200 OK** (xóa thành công!)

### Expected Result
User role không được tạo/xóa category → trả về 403 Forbidden.

### Actual Result
User role thực hiện được cả POST và DELETE.

### Evidence
![Bug 9](screenshots/bug_9.png)

---

## [BUG-API-11][FR-14] DELETE category không tồn tại trả về 200 thay vì 404

### Found by Test Case
TC-FR14-DP-08, TC-FR14-SCHEMA-07

### Requirement Related
FR-14 — Xử lý lỗi resource không tồn tại

### Severity / Priority
Minor / P2

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. DELETE `/api/categories/99999` (id không tồn tại)

### Expected Result
Trả về 404 Not Found.

### Actual Result
Trả về `200 OK` với message `"Category deleted"`.

### Evidence
![Bug 11](screenshots/bug_11.png)

---

## [BUG-API-12][FR-14] POST category trả về 200 thay vì 201 Created

### Found by Test Case
TC-FR14-DP-01, TC-FR14-SCHEMA-03

### Requirement Related
FR-14 — REST API conventions

### Severity / Priority
Minor / P2

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/categories` với tên hợp lệ

### Expected Result
Trả về `201 Created`.

### Actual Result
Trả về `200 OK`.

### Evidence
![Bug 12](screenshots/bug_12.png)

---

## [BUG-API-13][FR-14] DELETE category trả về 200 thay vì 204 No Content

### Found by Test Case
TC-FR14-ST-03, TC-FR14-SCHEMA-06

### Requirement Related
FR-14 — REST API conventions

### Severity / Priority
Minor / P2

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. DELETE `/api/categories/:id` với id hợp lệ

### Expected Result
Trả về `204 No Content` (không có body).

### Actual Result
Trả về `200 OK` với body `{"message":"Category deleted"}`.

### Evidence
![Bug 13](screenshots/bug_13.png)

---

## [BUG-API-14][FR-14] Cho phép tạo category trùng tên

### Found by Test Case
TC-FR14-DP-07

### Requirement Related
FR-14 — Unique constraint trên category name

### Severity / Priority
Major / P1

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. POST `/api/categories` với `{"name": "Điện thoại"}`
2. POST `/api/categories` với `{"name": "Điện thoại"}` (lặp lại)

### Expected Result
Lần 2 trả về 409 Conflict.

### Actual Result
Lần 2 trả về `200 OK` — tạo thành công category trùng tên.

### Evidence
![Bug 14](screenshots/bug_14.png)

---

## [BUG-API-15][FR-02/FR-08/FR-14] Server trả 500 kèm trang lỗi HTML thay vì JSON ở nhiều endpoint

### Found by Test Case
Lặp lại 15 lần trong lần chạy Newman gần nhất, ví dụ: TC-FR02-SCHEMA-01→07, TC-FR02-SEC-08, TC-FR08-ST-04, TC-FR08-SEC-03, TC-FR14-ST-04/05/06, TC-FR14-EXT-05

### Requirement Related
FR-02, FR-08, FR-14 — API luôn phải trả về JSON hợp lệ, kể cả khi lỗi

### Severity / Priority
Major / P1

### Environment
- **Tool:** Newman CLI 6.2.2
- **OS:** Windows 11

### Steps to Reproduce
1. Gửi các request nằm trong chuỗi bị ảnh hưởng bởi trạng thái trước đó (ví dụ tài khoản đã bị khóa do BUG-API-01, hoặc request phụ thuộc token/dữ liệu từ bước trước)
2. Server trả về `500 Internal Server Error` với body là trang HTML mặc định của Express (`<!DOCTYPE html>...`) thay vì JSON

### Expected Result
Mọi response, kể cả lỗi 500, phải trả về JSON có cấu trúc rõ ràng (vd `{"error": "..."}`), để client (và test script) có thể parse được.

### Actual Result
Test script gọi `pm.response.json()` gặp lỗi `JSONError: Unexpected token '<' at 1:1` vì body là HTML, không phải JSON — làm gãy toàn bộ chuỗi test phụ thuộc vào response đó (ví dụ các bước GET tiếp theo trong cùng một luồng nhiều bước).

### Note
Bug này thường xuất hiện đi kèm/là hệ quả của các bug trạng thái khác (BUG-API-01, token hết hạn giữa chừng...), nhưng bản thân việc trả HTML thay vì JSON khi lỗi là một vấn đề độc lập cần được server xử lý bằng error-handling middleware chuẩn (trả JSON ở mọi nhánh lỗi).

### Evidence
![Bug 15](screenshots/bug_15.png)

---

## Tổng kết

| Loại bug | Số lượng | Issue Numbers |
|----------|---------|---------------|
| Critical (P0) | 6 | #166, #168, #169, #170, #171, #174 |
| Major (P1) | 5 | #167, #172, #173, #179, #180 |
| Minor (P2) | 3 | #176, #177, #178 |
| **Tổng** | **14** | |

> **Lưu ý:** BUG-API-10 không tồn tại (đánh số nhảy từ 09 sang 11). Tổng cộng 14 bugs, khớp với 14 GitHub Issue (#166–#180, thiếu #175).

### Bugs phân theo FR

| FR | Bugs |
|----|------|
| FR-02 (Login) | BUG-API-01, 02, 03, 04, 05, 06, 15 |
| FR-08 (Checkout) | BUG-API-07, 15 |
| FR-14 (Category) | BUG-API-08, 09, 11, 12, 13, 14, 15 |
