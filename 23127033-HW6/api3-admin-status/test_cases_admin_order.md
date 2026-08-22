# Bảng Đặc Tả Test Cases — Admin Cập Nhật Trạng Thái Đơn Hàng (PUT /api/admin/orders/:id/status)

* **Chức năng:** Admin Cập Nhật Trạng Thái Đơn Hàng (PUT /api/admin/orders/:id/status)
* **Endpoint:** `PUT /api/admin/orders/:id/status`
* **Phân loại Pool:** Pool C (Web Admin & Order Operations)
* **Mã sinh viên:** 23127033 (Gắn tự động trong Header `X-Student-Id`)

---

## 1. Danh Sách 35 Ca Kiểm Thử Do AI Sinh (Generate with AI) & Đánh Giá Kiểm Duyệt (Human Audit)

| TC ID | Nhóm Kiểm Thử | Phương Thức & URL | Dữ Liệu Đầu Vào (Input Body) | Status Kỳ Vọng | Kết Quả Audit | Nhận Xét & Điều Chỉnh Của Sinh Viên |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **TC-ADMIN-01** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **200** | `VALID` | Chuyen trang thai hop le: pending -> confirmed |
| **TC-ADMIN-02** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "shipping"}` | **200** | `VALID` | Chuyen trang thai hop le: confirmed -> shipping |
| **TC-ADMIN-03** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "delivered"}` | **200** | `VALID` | Chuyen trang thai hop le: shipping -> delivered |
| **TC-ADMIN-04** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "canceled"}` | **200** | `VALID` | Huy don hang hop le tu pending -> canceled |
| **TC-ADMIN-05** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "canceled"}` | **200** | `VALID` | Huy don hang hop le tu confirmed -> canceled |
| **TC-ADMIN-06** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "pending"}` | **400** | `VALID` | Chuyen bat hop phap: delivered -> pending (khong cho phep quay lui) |
| **TC-ADMIN-07** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "shipping"}` | **400** | `VALID` | Chuyen bat hop phap: canceled -> shipping |
| **TC-ADMIN-08** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "delivered"}` | **400** | `INVALID` | Backend co BUG nghiem trong: cho phep canceled -> delivered (ValidTransition = true) |
| **TC-ADMIN-09** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "shipping"}` | **400** | `VALID` | Chuyen bat hop phap: pending -> shipping (nhay coc buoc) |
| **TC-ADMIN-010** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "delivered"}` | **400** | `VALID` | Chuyen bat hop phap: pending -> delivered (nhay coc buoc) |
| **TC-ADMIN-011** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "delivered"}` | **400** | `VALID` | Chuyen bat hop phap: confirmed -> delivered (nhay coc buoc) |
| **TC-ADMIN-012** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": "invalid_status"}` | **400** | `VALID` | Trang thai khong nam trong enum cho phep |
| **TC-ADMIN-013** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": ""}` | **400** | `VALID` | Trang thai de chuoi rong |
| **TC-ADMIN-014** | State Transition | `PUT /api/admin/orders/1/status` | *Không có body* | **400** | `VALID` | Thieu field status trong body |
| **TC-ADMIN-015** | State Transition | `PUT /api/admin/orders/1/status` | `{"status": 12345}` | **400** | `VALID` | Status truyen kieu so integer |
| **TC-ADMIN-016** | Security (SEC-01) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **401** | `VALID` | Khong truyen Authorization header (Unauthenticated -> 401) |
| **TC-ADMIN-017** | Security (SEC-02) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **403** | `VALID` | Truyen Bearer Token khong hop le / het han -> 403 |
| **TC-ADMIN-018** | Security (SEC-03) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **403** | `INVALID` | AI du doan 403 cho User thuong, nhung backend co BUG BAC: authenticateToken khong check role admin |
| **TC-ADMIN-019** | Security (IDOR/Path) | `PUT /api/admin/orders/99999/status` | `{"status": "confirmed"}` | **404** | `VALID` | Cap nhat don hang co ID khong ton tai -> 404 Not Found |
| **TC-ADMIN-020** | Security (IDOR/Negative) | `PUT /api/admin/orders/-1/status` | `{"status": "confirmed"}` | **404** | `VALID` | Order ID la so am |
| **TC-ADMIN-021** | Security (SQLi Path) | `PUT /api/admin/orders/1' OR '1'='1/status` | `{"status": "confirmed"}` | **404** | `VALID` | SQL Injection tren URL path parameter |
| **TC-ADMIN-022** | Security (SQLi Body) | `PUT /api/admin/orders/1/status` | `{"status": "' OR '1'='1"}` | **400** | `VALID` | SQL Injection trong status body |
| **TC-ADMIN-023** | Security (XSS Body) | `PUT /api/admin/orders/1/status` | `{"status": "<script>alert(1)</script>"}` | **400** | `VALID` | XSS payload trong status body |
| **TC-ADMIN-024** | Security (Admin Token) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **200** | `VALID` | Su dung Admin Token hop le -> 200 OK |
| **TC-ADMIN-025** | Security (Mass Assign) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed", "total_amount": 0}` | **200** | `VALID` | Gui kem truong total_amount khong hop le |
| **TC-ADMIN-026** | Security (Null Byte) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed\u0000"}` | **400** | `VALID` | Null byte injection trong status |
| **TC-ADMIN-027** | Security (Bearer Malform) | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **401** | `VALID` | Header Authorization chi ghi Bearer khong co token chuoi |
| **TC-ADMIN-028** | Schema | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **200** | `VALID` | Response body tra ve message xac nhan thanh cong |
| **TC-ADMIN-029** | Schema | `PUT /api/admin/orders/99999/status` | `{"status": "confirmed"}` | **404** | `VALID` | Error schema 404 chua field error: Order not found |
| **TC-ADMIN-030** | Schema | `PUT /api/admin/orders/1/status` | `{"status": "confirmed"}` | **400** | `VALID` | Error schema 400 chua chi tiet Invalid state transition |
| **TC-ADMIN-031** | Schema | `PUT /api/admin/orders/abc/status` | `{"status": "confirmed"}` | **404** | `VALID` | Order ID la chuoi chu khong the parse thanh so |
| **TC-ADMIN-032** | Schema | `PUT /api/admin/orders/1/status` | `{"status": true}` | **400** | `VALID` | Status truyen dang boolean |
| **TC-ADMIN-033** | Schema | `PUT /api/admin/orders/1/status` | `{"status": ["confirmed"]}` | **400** | `VALID` | Status truyen dang array |
| **TC-ADMIN-034** | Schema | `PUT /api/admin/orders/1/status` | `{"status": null}` | **400** | `VALID` | Status truyen gia tri null |
| **TC-ADMIN-035** | Schema | `PUT /api/admin/orders/1/status` | `{"status": "CONFIRMED"}` | **400** | `VALID` | Trang thai chu HOA (he thong yeu cau chu thuong) |

---

## 2. Danh Sách 5 Ca Kiểm Thử Tự Viết Bổ Sung (Extend Test Cases)

| TC ID | Mục Tiêu Kiểm Thử Mở Rộng | Input & Request | Kết Quả Kỳ Vọng | Lý Do AI Bỏ Sót |
| :--- | :--- | :--- | :--- | :--- |
| **TC-ADMIN-EXT-01** | Extend (Performance) | `PUT /api/admin/orders/1/status`<br>`{"status": "confirmed"}` | **Status 200**: Thoi gian cap nhat trang thai phai < 300ms | AI bo sot assertion ve response latency. |
| **TC-ADMIN-EXT-02** | Extend (Protocol) | `PUT /api/admin/orders/1/status`<br>`{"status": "confirmed"}` | **Status 200**: Header Content-Type tra ve phai la application/json | AI chi kiem tra body ma bo qua response headers. |
| **TC-ADMIN-EXT-03** | Extend (State Cycle) | `PUT /api/admin/orders/1/status`<br>`{"status": "confirmed"}` | **Status 200**: Kiem tra chuoi chuyen trang thai lien tiep pending -> confirmed -> shipping -> delivered | AI chi test don le tung buoc ma khong test toan ven chuoi. |
| **TC-ADMIN-EXT-04** | Extend (Self-Transition) | `PUT /api/admin/orders/1/status`<br>`{"status": "pending"}` | **Status 400**: Chuyen sang dung trang thai hien tai (pending -> pending) | AI khong xet truong hop giu nguyen trang thai co bi bao loi khong. |
| **TC-ADMIN-EXT-05** | Extend (BAC Security) | `PUT /api/admin/orders/1/status`<br>`{"status": "confirmed"}` | **Status 403**: Kiem tra chan triet de user thuong khong the doi trang thai don hang | AI thuong tin tuong middleware auth chu khong kiem tra lo hong BAC. |

---

## 3. Tổng Kết Độ Bao Phủ Kiểm Thử

- **Tổng số ca kiểm thử:** 40 test cases (35 AI + 5 Tự bổ sung).
- **Bao phủ phân vùng:** Domain Partitions, Boundary Values, State Machine Transitions, Security Rules (SEC-01..SEC-07), Response Schemas & Protocol Headers.
- **Tương thích:** Tích hợp trực tiếp vào Postman Collection v2.1 và chạy tự động qua Newman CLI.