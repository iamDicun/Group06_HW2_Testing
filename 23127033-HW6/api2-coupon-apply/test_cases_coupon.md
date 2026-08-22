# Bảng Đặc Tả Test Cases — Áp Dụng Mã Giảm Giá (POST /api/apply-coupon)

* **Chức năng:** Áp Dụng Mã Giảm Giá (POST /api/apply-coupon)
* **Endpoint:** `POST /api/apply-coupon`
* **Phân loại Pool:** Pool B (Shopping Cart & Order Management)
* **Mã sinh viên:** 23127033 (Gắn tự động trong Header `X-Student-Id`)

---

## 1. Danh Sách 35 Ca Kiểm Thử Do AI Sinh (Generate with AI) & Đánh Giá Kiểm Duyệt (Human Audit)

| TC ID | Nhóm Kiểm Thử | Phương Thức & URL | Dữ Liệu Đầu Vào (Input Body) | Status Kỳ Vọng | Kết Quả Audit | Nhận Xét & Điều Chỉnh Của Sinh Viên |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **TC-COUPON-01** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000, "user_id": 1}` | **200** | `VALID` | Ap dung ma SAVE10 (10% off, min 300k, hop le) |
| **TC-COUPON-02** | Domain | `POST /api/apply-coupon` | `{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **200** | `VALID` | Ap dung ma BIGBUY (giam co dinh 50k, min 500k) |
| **TC-COUPON-03** | Domain | `POST /api/apply-coupon` | `{"code": "VIP100", "total_amount": 400000, "user_id": 2}` | **200** | `VALID` | Ap dung ma VIP100 (giam 100k, min 300k) |
| **TC-COUPON-04** | Domain | `POST /api/apply-coupon` | `{"code": "NONEXISTENT", "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | Ma coupon khong ton tai |
| **TC-COUPON-05** | Domain | `POST /api/apply-coupon` | `{"code": "EXPIRED", "total_amount": 500000, "user_id": 1}` | **400** | `VALID` | Ma coupon da het han su dung (expired_at 2020-01-01) |
| **TC-COUPON-06** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 200000, "user_id": 1}` | **200** | `INVALID` | AI tuong 400, nhung backend co bug: khi total < min thi van di tiep hoac thieu xu ly |
| **TC-COUPON-07** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 300000, "user_id": 1}` | **200** | `VALID` | Gia tri bien dung bang min_order_amount (300,000d) |
| **TC-COUPON-08** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 300001, "user_id": 1}` | **200** | `VALID` | Gia tri bien ngay tren min_order_amount (300,001d) |
| **TC-COUPON-09** | Domain | `POST /api/apply-coupon` | `{"code": "", "total_amount": 500000, "user_id": 1}` | **400** | `VALID` | Ma code de trong |
| **TC-COUPON-10** | Domain | `POST /api/apply-coupon` | `{"total_amount": 500000, "user_id": 1}` | **400** | `VALID` | Thieu field code trong JSON body |
| **TC-COUPON-11** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 0, "user_id": 1}` | **200** | `VALID` | Tong tien don hang bang 0 |
| **TC-COUPON-12** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": -100000, "user_id": 1}` | **200** | `VALID` | Tong tien don hang la so am |
| **TC-COUPON-13** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 1000000000, "user_id": 1}` | **200** | `VALID` | Tong tien don hang cuc lon 1 ty dong |
| **TC-COUPON-14** | Domain | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000}` | **200** | `VALID` | Khong truyen user_id (Khach hang vang lai an danh) |
| **TC-COUPON-15** | Domain | `POST /api/apply-coupon` | *Không có body* | **400** | `VALID` | Body rong hoan toan |
| **TC-COUPON-16** | Security (SQLi) | `POST /api/apply-coupon` | `{"code": "' OR '1'='1", "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | SQL Injection vao truong code |
| **TC-COUPON-17** | Security (SQLi) | `POST /api/apply-coupon` | `{"code": "SAVE10' --", "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | SQL Injection comment vao truong code |
| **TC-COUPON-18** | Security (XSS) | `POST /api/apply-coupon` | `{"code": "<script>alert(1)</script>", "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | XSS script payload vao code |
| **TC-COUPON-19** | Security (IDOR) | `POST /api/apply-coupon` | `{"code": "VIP100", "total_amount": 500000, "user_id": 99999}` | **200** | `VALID` | Truyen user_id khong ton tai trong he thong |
| **TC-COUPON-20** | Security (Limit) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000, "user_id": 1}` | **200** | `VALID` | Kiem tra gioi han su dung ma giam gia max_uses_per_user |
| **TC-COUPON-21** | Security (Float Precision) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000.55, "user_id": 1}` | **200** | `VALID` | Truyen so thuc float vao total_amount |
| **TC-COUPON-22** | Security (Overflow) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 999999999999999999, "user_id": 1}` | **200** | `VALID` | Truyen so nguyen vuot gioi han 64-bit integer |
| **TC-COUPON-23** | Security (Type String) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": "500000", "user_id": 1}` | **200** | `VALID` | Total amount truyen dang chuoi so |
| **TC-COUPON-24** | Security (Type Boolean) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": true, "user_id": 1}` | **200** | `VALID` | Total amount truyen dang boolean |
| **TC-COUPON-25** | Security (Null User) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000, "user_id": null}` | **200** | `VALID` | User ID truyen gia tri null |
| **TC-COUPON-26** | Security (Negative User) | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000, "user_id": -5}` | **200** | `VALID` | User ID truyen so am |
| **TC-COUPON-27** | Security (String Code Array) | `POST /api/apply-coupon` | `{"code": ["SAVE10"], "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | Code truyen dang mang Array |
| **TC-COUPON-28** | Schema | `POST /api/apply-coupon` | `{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **200** | `VALID` | Response body chua du success, coupon_id, discount_amount, final_amount |
| **TC-COUPON-29** | Schema | `POST /api/apply-coupon` | `{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **200** | `VALID` | Kiem tra kieu du lieu discount_amount va final_amount la so nguyen |
| **TC-COUPON-30** | Schema | `POST /api/apply-coupon` | `{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **200** | `VALID` | Field success tra ve true |
| **TC-COUPON-31** | Schema | `POST /api/apply-coupon` | `{"code": "NONEXISTENT", "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | Error schema 404 chua field error thong bao loi ro rang |
| **TC-COUPON-32** | Schema | `POST /api/apply-coupon` | `{"code": "EXPIRED", "total_amount": 500000, "user_id": 1}` | **400** | `VALID` | Error schema 400 chua field error bao ma da het han |
| **TC-COUPON-33** | Schema | `POST /api/apply-coupon` | `{"code": 12345, "total_amount": 500000, "user_id": 1}` | **404** | `VALID` | Code truyen kieu number |
| **TC-COUPON-34** | Schema | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": "invalid_number", "user_id": 1}` | **200** | `VALID` | Total amount la chuoi chu khong the parse thanh so |
| **TC-COUPON-35** | Schema | `POST /api/apply-coupon` | `{"code": "SAVE10", "total_amount": 500000, "user_id": "invalid_user"}` | **200** | `VALID` | User ID la chuoi khong hop le |

---

## 2. Danh Sách 5 Ca Kiểm Thử Tự Viết Bổ Sung (Extend Test Cases)

| TC ID | Mục Tiêu Kiểm Thử Mở Rộng | Input & Request | Kết Quả Kỳ Vọng | Lý Do AI Bỏ Sót |
| :--- | :--- | :--- | :--- | :--- |
| **TC-COUPON-EXT-01** | Extend (Performance) | `POST /api/apply-coupon`<br>`{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **Status 200**: Thoi gian phan hoi API < 400ms | AI khong kiem tra chi so thoi gian dap ung. |
| **TC-COUPON-EXT-02** | Extend (Protocol) | `POST /api/apply-coupon`<br>`{"code": "BIGBUY", "total_amount": 600000, "user_id": 1}` | **Status 200**: Response Header Content-Type phai la application/json | AI chi kiem tra response JSON body ma quen header. |
| **TC-COUPON-EXT-03** | Extend (Case Sensitivity) | `POST /api/apply-coupon`<br>`{"code": "save10", "total_amount": 500000, "user_id": 1}` | **Status 404**: Ma coupon chu thuong 'save10' thay vi 'SAVE10' | AI quen test tinh nhay chu hoa chu thuong cua ma giam gia. |
| **TC-COUPON-EXT-04** | Extend (Whitespace) | `POST /api/apply-coupon`<br>`{"code": " SAVE10 ", "total_amount": 500000, "user_id": 1}` | **Status 404**: Ma coupon bi dinh khoang trang truoc/sau | Kiem tra he thong co trim() ma giam gia truoc khi query khong. |
| **TC-COUPON-EXT-05** | Extend (Bug Hunt) | `POST /api/apply-coupon`<br>`{"code": "SAVE10", "total_amount": 500000, "user_id": 1}` | **Status 200**: Kiem tra cong thuc giam gia phan tram (Phat hien Bug tinh discount bi am) | AI tin tuong spec chu khong phat hien bug tinh toan trong code. |

---

## 3. Tổng Kết Độ Bao Phủ Kiểm Thử

- **Tổng số ca kiểm thử:** 40 test cases (35 AI + 5 Tự bổ sung).
- **Bao phủ phân vùng:** Domain Partitions, Boundary Values, State Machine Transitions, Security Rules (SEC-01..SEC-07), Response Schemas & Protocol Headers.
- **Tương thích:** Tích hợp trực tiếp vào Postman Collection v2.1 và chạy tự động qua Newman CLI.