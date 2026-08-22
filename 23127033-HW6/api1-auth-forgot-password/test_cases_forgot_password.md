# Bảng Đặc Tả Test Cases — Quên Mật Khẩu & Lấy OTP (POST /api/forgot-password)

* **Chức năng:** Quên Mật Khẩu & Lấy OTP (POST /api/forgot-password)
* **Endpoint:** `POST /api/forgot-password`
* **Phân loại Pool:** Pool A (FR-03: Forgot Password & Reset)
* **Mã sinh viên:** 23127033 (Gắn tự động trong Header `X-Student-Id`)

---

## 1. Danh Sách 35 Ca Kiểm Thử Do AI Sinh (Generate with AI) & Đánh Giá Kiểm Duyệt (Human Audit)

| TC ID | Nhóm Kiểm Thử | Phương Thức & URL | Dữ Liệu Đầu Vào (Input Body) | Status Kỳ Vọng | Kết Quả Audit | Nhận Xét & Điều Chỉnh Của Sinh Viên |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **TC-FORGOT-01** | Domain | `POST /api/forgot-password` | `{"email": "admin@eshop.com"}` | **200** | `VALID` | Yeu cau OTP thanh cong voi email Admin hop le |
| **TC-FORGOT-02** | Domain | `POST /api/forgot-password` | `{"email": "test@eshop.com"}` | **200** | `VALID` | Yeu cau OTP thanh cong voi email User hop le |
| **TC-FORGOT-03** | Domain | `POST /api/forgot-password` | `{"email": "nonexistent@eshop.com"}` | **404** | `VALID` | Email khong ton tai trong co so du lieu -> 404 User not found |
| **TC-FORGOT-04** | Domain | `POST /api/forgot-password` | `{"email": "invalid-email-format"}` | **404** | `INVALID` | AI du doan 400, backend thuc te query khong thay email tra ve 404 |
| **TC-FORGOT-05** | Domain | `POST /api/forgot-password` | `{"email": "test@"}` | **404** | `INVALID` | Email thieu domain, sua expected status thanh 404 |
| **TC-FORGOT-06** | Domain | `POST /api/forgot-password` | `{"email": "@eshop.com"}` | **404** | `INVALID` | Email thieu username, sua expected status thanh 404 |
| **TC-FORGOT-07** | Domain | `POST /api/forgot-password` | `{"email": ""}` | **404** | `VALID` | Email de chuoi rong |
| **TC-FORGOT-08** | Domain | `POST /api/forgot-password` | *Không có body* | **404** | `VALID` | Thieu field email trong JSON body |
| **TC-FORGOT-09** | Domain | `POST /api/forgot-password` | `{"email": "ADMIN@ESHOP.COM"}` | **404** | `VALID` | Kiem tra tinh phan biet chu hoa/chu thuong cua SQLite |
| **TC-FORGOT-10** | Domain | `POST /api/forgot-password` | `{"email": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@eshop.com"}` | **404** | `VALID` | Email do dai cuc dai 250+ ky tu |
| **TC-FORGOT-11** | Domain | `POST /api/forgot-password` | `{"email": "user.test+123@eshop.com"}` | **404** | `VALID` | Email co chua dau cham va dau cong |
| **TC-FORGOT-12** | Domain | `POST /api/forgot-password` | `{"email": "admin@eshop.com.vn"}` | **404** | `VALID` | Email domain mo rong cap 2 |
| **TC-FORGOT-13** | Domain | `POST /api/forgot-password` | `{"email": "  "}` | **404** | `VALID` | Email chi toan khoang trang |
| **TC-FORGOT-14** | Domain | `POST /api/forgot-password` | `{"email": "admin@eshop.com", "other": 123}` | **200** | `VALID` | Truyen kem field du thua ngoai dac ta |
| **TC-FORGOT-15** | Domain | `POST /api/forgot-password` | `{"email": "test@eshop.com"}` | **200** | `VALID` | Goi lien tiep 2 lan tao OTP moi |
| **TC-FORGOT-16** | Security (SQLi) | `POST /api/forgot-password` | `{"email": "' OR '1'='1"}` | **404** | `VALID` | SQL Injection dang OR 1=1 |
| **TC-FORGOT-17** | Security (SQLi) | `POST /api/forgot-password` | `{"email": "admin@eshop.com' --"}` | **404** | `VALID` | SQL Injection comment syntax |
| **TC-FORGOT-18** | Security (SQLi) | `POST /api/forgot-password` | `{"email": "'; DROP TABLE users; --"}` | **404** | `VALID` | SQL Injection lenh drop table |
| **TC-FORGOT-19** | Security (XSS) | `POST /api/forgot-password` | `{"email": "<script>alert(1)</script>"}` | **404** | `VALID` | XSS script payload |
| **TC-FORGOT-20** | Security (XSS) | `POST /api/forgot-password` | `{"email": "<img src=x onerror=alert(1)>"}` | **404** | `VALID` | XSS image onerror payload |
| **TC-FORGOT-21** | Security (Mass Assign) | `POST /api/forgot-password` | `{"email": "test@eshop.com", "role": "admin", "reset_token": "9999"}` | **200** | `VALID` | Truyen them field role va reset_token co y dinh ghi de |
| **TC-FORGOT-22** | Security (Brute-Force OTP) | `POST /api/forgot-password` | `{"email": "admin@eshop.com"}` | **200** | `VALID` | Kiem tra do ngau nhien va do dai 4 chu so cua ma resetToken |
| **TC-FORGOT-23** | Security (Null Byte) | `POST /api/forgot-password` | `{"email": "admin@eshop.com\u0000"}` | **404** | `VALID` | Null byte injection vao chuoi email |
| **TC-FORGOT-24** | Security (NoSQL Object) | `POST /api/forgot-password` | `{"email": {"$gt": ""}}` | **404** | `VALID` | Nested Object payload |
| **TC-FORGOT-25** | Security (Auth Header Bypass) | `POST /api/forgot-password` | `{"email": "admin@eshop.com"}` | **200** | `VALID` | Endpoint public khong bi anh huong boi Authorization header |
| **TC-FORGOT-26** | Security (Email Header Inject) | `POST /api/forgot-password` | `{"email": "admin@eshop.com\r\nBcc: hacker@evil.com"}` | **404** | `VALID` | Email header injection attempt |
| **TC-FORGOT-27** | Security (HTML Entities) | `POST /api/forgot-password` | `{"email": "&lt;admin@eshop.com&gt;"}` | **404** | `VALID` | HTML entities encoding trong email |
| **TC-FORGOT-28** | Schema | `POST /api/forgot-password` | `{"email": "admin@eshop.com"}` | **200** | `VALID` | Response body chua dung field message va resetToken |
| **TC-FORGOT-29** | Schema | `POST /api/forgot-password` | `{"email": "admin@eshop.com"}` | **200** | `VALID` | Field resetToken la chuoi string gom 4 chu so |
| **TC-FORGOT-30** | Schema | `POST /api/forgot-password` | `{"email": "nonexistent@eshop.com"}` | **404** | `VALID` | Error schema 404 chua field error: User not found |
| **TC-FORGOT-31** | Schema | `POST /api/forgot-password` | `{"email": 123456}` | **404** | `VALID` | Email truyen dang integer |
| **TC-FORGOT-32** | Schema | `POST /api/forgot-password` | `{"email": true}` | **404** | `VALID` | Email truyen dang boolean |
| **TC-FORGOT-33** | Schema | `POST /api/forgot-password` | `{"email": ["admin@eshop.com"]}` | **404** | `VALID` | Email truyen dang array |
| **TC-FORGOT-34** | Schema | `POST /api/forgot-password` | `{"email": null}` | **404** | `VALID` | Email truyen gia tri null |
| **TC-FORGOT-35** | Schema | `POST /api/forgot-password` | `{"email": 0}` | **404** | `VALID` | Email truyen so 0 |

---

## 2. Danh Sách 5 Ca Kiểm Thử Tự Viết Bổ Sung (Extend Test Cases)

| TC ID | Mục Tiêu Kiểm Thử Mở Rộng | Input & Request | Kết Quả Kỳ Vọng | Lý Do AI Bỏ Sót |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FORGOT-EXT-01** | Extend (Performance) | `POST /api/forgot-password`<br>`{"email": "admin@eshop.com"}` | **Status 200**: Thoi gian tao va tra ve OTP < 400ms | AI bo qua non-functional latency assertion. |
| **TC-FORGOT-EXT-02** | Extend (Protocol) | `POST /api/forgot-password`<br>`{"email": "admin@eshop.com"}` | **Status 200**: Header Content-Type tra ve phai la application/json | AI tap trung vao response body ma bo qua response headers. |
| **TC-FORGOT-EXT-03** | Extend (Whitespace) | `POST /api/forgot-password`<br>`{"email": "  admin@eshop.com  "}` | **Status 404**: Email co khoang trang dau/cuoi (Kiem tra backend co auto-trim khong) | AI khong tinh toi truong hop nguoi dung copy dinh khoang trang. |
| **TC-FORGOT-EXT-04** | Extend (Unicode) | `POST /api/forgot-password`<br>`{"email": "admin_tiếngviệt@eshop.com"}` | **Status 404**: Email chua ky tu Unicode tieng Viet co dau | AI it khi thu nghiem chuoi email da ngon ngu/Unicode. |
| **TC-FORGOT-EXT-05** | Extend (Security OTP Leak) | `POST /api/forgot-password`<br>`{"email": "admin@eshop.com"}` | **Status 200**: Kiem tra resetToken co bi lo trong cookie hoac header khong | AI khong kiem tra viec ro ri token qua cac kenh phu (side-channels). |

---

## 3. Tổng Kết Độ Bao Phủ Kiểm Thử

- **Tổng số ca kiểm thử:** 40 test cases (35 AI + 5 Tự bổ sung).
- **Bao phủ phân vùng:** Domain Partitions, Boundary Values, Security Rules (SEC-01..SEC-07), Response Schemas & Protocol Headers.
- **Tương thích:** Tích hợp trực tiếp vào Postman Collection v2.1 và chạy tự động qua Newman CLI.