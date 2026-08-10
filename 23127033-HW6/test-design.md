# Báo Cáo Thiết Kế Kiểm Thử API (API Test Design Document)

* **MSSV:** 23127033
* **Họ và tên:** (Sinh viên)
* **API thực hiện:** `POST /api/login` (Đăng nhập hệ thống EShop)
* **Ngày thực hiện:** 10/08/2026

---

## 1. Bước 1 — Generate with AI (Sinh test case bằng AI)

### 1.1 Prompt đã sử dụng
```text
Tôi đang kiểm thử API Đăng nhập (Authentication) cho ứng dụng EShop.
Thông tin API:
- Endpoint: POST /api/login
- Request Body (JSON):
  {
    "email": "test@domain.com",
    "password": "Password123!"
  }
- Response thành công (200 OK):
  {
    "message": "Login successful",
    "token": "eyJhbGciOi...",
    "user": { "id": 1, "name": "Test User", "email": "test@eshop.com", "role": "user" }
  }
- Response thất bại (401 Unauthorized):
  {
    "error": "Invalid email or password"
  }

Hãy giúp tôi thiết kế danh sách ít nhất 12 test case bao phủ các khía cạnh:
1. Domain Partitions (Happy path, Email hợp lệ/không hợp lệ, sai mật khẩu, thiếu trường dữ liệu).
2. Security (SQL Injection, XSS, Brute force/Lockout).
3. Schema Validation (Kiểm tra kiểu dữ liệu và thuộc tính trong response).

Trả về dạng bảng Markdown gồm các cột: tc_id, input, expected_status, expected_fields, rationale.
```

### 1.2 Kết quả AI đề xuất (Rút gọn)

| tc_id | Input | Expected Status | Expected Fields | Rationale |
|---|---|---|---|---|
| TC-01 | email: "test@eshop.com", password: "Test1234!" | 200 | message, token, user | Đăng nhập thành công với tài khoản hợp lệ |
| TC-02 | email: "admin@eshop.com", password: "Admin123!" | 200 | message, token, user | Đăng nhập thành công với tài khoản Admin |
| TC-03 | email: "test@eshop.com", password: "WrongPassword" | 401 | error | Đăng nhập thất bại do sai mật khẩu |
| TC-04 | email: "nonexistent@eshop.com", password: "Test1234!" | 401 | error | Đăng nhập thất bại do email không tồn tại |
| TC-05 | email: "invalid-email-format", password: "Test1234!" | 400 | error | Định dạng email không hợp lệ |
| TC-06 | email: "", password: "Test1234!" | 400 | error | Trường email bị bỏ rỗng |
| TC-07 | email: "test@eshop.com", password: "" | 400 | error | Trường password bị bỏ rỗng |
| TC-08 | email: null, password: "Test1234!" | 400 | error | Trường email truyền giá trị null |
| TC-09 | email: "' OR '1'='1", password: "' OR '1'='1" | 400 | error | Kiểm thử tấn công SQL Injection |
| TC-10 | email: "<script>alert(1)</script>", password: "123" | 400 | error | Kiểm thử tấn công XSS Script Injection |
| TC-11 | email: "test@eshop.com", password: "Wrong" (Lần 3+) | 403 | error | Tài khoản bị khóa sau nhiều lần đăng nhập sai |
| TC-12 | email: "test@eshop.com", password: "Test1234!" | 200 | Content-Type: application/json | Kiểm tra Header phản hồi đúng chuẩn JSON |

---

## 2. Bước 2 — Audit (Human Review)

| TC | Nhãn | Nhận xét hoặc chỉnh sửa |
|---|---|---|
| TC-01 | `VALID` | Ca kiểm thử luồng chính xác cho user thường. |
| TC-02 | `VALID` | Ca kiểm thử luồng chính xác cho Admin. |
| TC-03 | `VALID` | Đúng kết quả trả về 401 khi sai mật khẩu. |
| TC-04 | `VALID` | Đúng kết quả trả về 401 khi email không tồn tại. |
| TC-05 | `INVALID` | AI dự đoán status code 400, tuy nhiên Backend hiện tại trả về 401 khi không tìm thấy match email trong DB. Đã sửa expected status thành 401. |
| TC-06 | `VALID` | Kiểm tra thiếu trường dữ liệu email. |
| TC-07 | `VALID` | Kiểm tra thiếu trường dữ liệu password. |
| TC-08 | `VALID` | Kiểm tra truyền giá trị null. |
| TC-09 | `VALID` | Đảm bảo hệ thống chặn SQL Injection an toàn. |
| TC-10 | `VALID` | Đảm bảo hệ thống không thực thi script XSS. |
| TC-11 | `VALID` | Backend EShop có cơ chế khóa tài khoản 3 phút sau 3 lần sai mật khẩu. |
| TC-12 | `VALID` | Kiểm tra đúng chuẩn Response Header. |

---

## 3. Bước 3 — Extend (Ca kiểm thử tự bổ sung)

| TC | Mục tiêu kiểm thử | Expected Result | Lý do AI bỏ sót |
|---|---|---|---|
| TC-EXT-01 | Kiểm tra Response Time (Thời gian phản hồi API) | Status 200, Response time < 500ms | AI thường chỉ tập trung vào Functional/Status code mà không chủ động kiểm tra non-functional/performance metric trừ khi được yêu cầu cụ thể. |
| TC-EXT-02 | Kiểm tra Response Header `Content-Type` chứa `application/json` | Status 200, Header `Content-Type` bao gồm `application/json` | AI tập trung check response body schema hơn là assert cấu trúc HTTP Response Headers. |

---

## 4. Bước 6 — Postman Features Listing

| Feature | Đã dùng? | Ghi chú |
|---|---|---|
| Collections | **Có** | Tổ chức request API đăng nhập trong 1 Postman Collection. |
| Environment variables | **Có** | Lưu biến `baseUrl` và `studentId` trong file environment. |
| Collection variables | Không | Dùng Environment variables để dùng chung toàn bộ môi trường. |
| Pre-request scripts | **Có** | Tự động chèn Header `X-Student-Id` chứa MSSV trước khi gửi request. |
| Test scripts (assertions) | **Có** | Kiểm tra status code động theo biến data và check Content-Type header. |
| Data-driven runs (Collection Runner + data file) | **Có** | Nạp dữ liệu 5 iterations từ tệp JSON (`mini-login.data.json`). |
| Newman CLI | **Có** | Thực thi kiểm thử tự động từ giao diện dòng lệnh và xuất báo cáo JSON. |
| Monitors | Không | Chưa sử dụng tính năng giám sát định kỳ trên Cloud. |
| Mock servers | Không | Đã sử dụng backend thật (`eshop-sut`) để thực thi test. |
| Workspaces | **Có** | Quản lý collection và environment trong Workspace cá nhân. |
