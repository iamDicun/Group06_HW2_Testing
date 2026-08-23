# AI Audit Report - Test Case Generation

- **Cong cu AI su dung:** opencode (model: mimo-v2-free)
- **Ngay thuc hien:** 24/08/2026
- **Nguoi thuc hien / xac nhan:** 23127031

---

## 1. Danh sach Prompt va Output

| # | Date & Time | AI Tool | Prompt (tom tat) | AI Output | File tao/sua | Verdict | Reasoning | Student Fix |
|---|---|---| --- | --- | --- | --- | --- | --- |
| 1 | 24/08/2026 | opencode (mimo-v2-free) | "FR-02 Login: sinh test case domain partitioning cho 2 field email va password (khop tai khoan, khong khop, rong, null, wrong type, qua dai, ky tu dac biet). Xuat vao sheet FR-02 Login" | Tao 21 TC (TC01-TC21) domain partition cho email va password | `testcases_testsummary.xlsx` (sheet FR-02 Login) | Valid | Phan loai day du 7 partition cho moi field, bao gom happy path va cac truong hop bi ro | Khong can sua |
| 2 | 24/08/2026 | opencode (mimo-v2-free) | "FR-02: Dang nhap sai lien tiep - bo dem tang 1, khoa 30 giay sau 3 lan. Sinh test case cho luong dang nhap sai lan 1, 2, 3, trong khoa, sau khi het khoa" | Tao 7 TC (TC22-TC28) state transition - luong dang nhap sai lien tiep | `testcases_testsummary.xlsx` (sheet FR-02 Login) | Valid | Bao trum day du buoc: sai 1 -> sai 2 -> sai 3 (khoa) -> trong khoa -> sau khoa | Khong can sua |
| 3 | 24/08/2026 | opencode (mimo-v2-free) | "FR-02: kiem tra thong bao loi dong nhat (email khong ton tai vs sai pass), SQL injection, response khong lo SQL/stack trace. Dua tren SEC: parameterized query, khong noi chuoi truc tiep" | Tao 9 TC (TC29-TC37) security - SQL injection, error message uniformity, info leak | `testcases_testsummary.xlsx` (sheet FR-02 Login) | Valid | Bao trum 5 loai SQL injection, 3 TC error message giong nhau, 1 TC info leak. Dau tieng Viet bi loi encoding o lan dau, da fix | Fix encoding: dung Write tool thay vi bash heredoc de giu dung Unicode |
| 4 | 24/08/2026 | opencode (mimo-v2-free) | "FR-02: sinh test case response shape - response thanh cong co token va user hay khong, JWT co dung 3 phan header.payload.signature hay khong" | Tao 8 TC (TC38-TC45) schema validation - response co token/user, JWT 3 phan, base64 JSON, signature, base64url | `testcases_testsummary.xlsx` (sheet FR-02 Login) | Valid | Kiem tra response shape o muc chac chan (array/object/string), khong tu dat ten field cu the | Khong can sua |
| 5 | 24/08/2026 | opencode (mimo-v2-free) | "Gop FR-02 thanh dung 35 test case, loai bo trung y tang, phan bo can doi: domain partition, state transition, security, schema validation" | Xoa sheet cu, tao lai voi 35 TC: Domain(12), State(7), Security(8), Schema(8) | `testcases_testsummary.xlsx` (sheet FR-02 Login) | Valid | Gop dung 45 -> 35, loai bo trung (TC34=TC19, TC35=TC17+TC18, TC38=TC21, TC39=TC23, TC40=TC25, TC37=TC10) | Khong can sua |
| 6 | 24/08/2026 | opencode (mimo-v2-free) | "FR-08 Checkout: sinh test case domain partitioning cho shipping_address (rong, null, qua dai, ky tu dac biet) va trang thai gio hang (rong, co san pham). Backend tu tinh lai total_amount" | Tao 12 TC (TC01-TC12): shipping_address partition(5), cart state(3), total_amount recalc(3), cart cleared(1) | `testcases_testsummary.xlsx` (sheet FR-08 Checkout) | Valid | Bao trum day du partition shipping_address, 3 truong hop total_amount (am, 0, thap/cao hon), kiem tra gio hang bi xoa | Khong can sua |
| 7 | 24/08/2026 | opencode (mimo-v2-free) | "FR-08: checkout thanh cong -> kiem tra gio hang bi xoa (GET /api/cart), checkout khi chua dang nhap, checkout khi gio hang rong" | Tao 3 TC (TC13-TC15): checkout khong token, verify cart cleared, empty cart checkout | `testcases_testsummary.xlsx` (sheet FR-08 Checkout) | Valid | Bao trum 3 yeu cau chinh: auth, cart cleared verify, empty cart | Khong can sua |
| 8 | 24/08/2026 | opencode (mimo-v2-free) | "FR-08: test total_amount sai lech (am, 0, thap hon, cao hon) va XSS trong shipping_address" | Tao 7 TC (TC16-TC22): total_amount sai lech(5), XSS(2) | `testcases_testsummary.xlsx` (sheet FR-08 Checkout) | Valid | Test total_amount o 5 huong sai lech + 2 loai XSS (script, img onerror) | Khong can sua |
| 9 | 24/08/2026 | opencode (mimo-v2-free) | "FR-08: response thanh cong co 2xx, response thieu field bao loi, khong tu dat ten field cu the" | Tao 6 TC (TC23-TC28): response 2xx, response structure, missing field | `testcases_testsummary.xlsx` (sheet FR-08 Checkout) | Valid | Kiem tra response shape o muc chac chan, danh dau "SUY DOAN" cho ten field nhu "orderId" | Khong can sua |
| 10 | 24/08/2026 | opencode (mimo-v2-free) | "FR-08: them test case de du 35 - token het han, token gia ma, role user, gio hang nhieu san pham, SQL injection, thieu field total_amount, GET thay POST" | Tao 7 TC (TC29-TC35): expired token, tampered token, user role, multi-item cart, SQL injection, missing field, wrong method | `testcases_testsummary.xlsx` (sheet FR-08 Checkout) | Valid | Bo sung day du 7 TC de dat 35, bao gom security va edge case | Khong can sua |
| 11 | 24/08/2026 | opencode (mimo-v2-free) | "FR-14 Category CRUD: sinh test case domain partitioning cho field name khi tao category: rong, null, thieu field, qua dai, khoang trang, trung ten, ky tu dac biet" | Tao 25 TC (TC01-TC25): domain partition(8), state transition(6), security(6), schema(5) | `testcases_testsummary.xlsx` (sheet FR-14 Category CRUD) | Valid | Phan loai day du 8 partition cho field name + CRUD operations + role admin check | Khong can sua |
| 12 | 24/08/2026 | opencode (mimo-v2-free) | "FR-14: sinh test case luong tao category -> GET danh sach thay moi -> Xoa -> GET khong con thay" | Tao 3 TC (TC26-TC28): luong hoan chinh Tao-Xem-Xoa-Xem, verify bang id, xoa roi tao lai ten giong | `testcases_testsummary.xlsx` (sheet FR-14 Category CRUD) | Valid | Bao trum luong CRUD hoan chinh, kiem tra id va trung ten sau khi xoa | Khong can sua |
| 13 | 24/08/2026 | opencode (mimo-v2-free) | "FR-14: POST/DELETE voi (1) khong token, (2) role user, (3) token gia ma, (4) token het han. GET khong ro co can auth - ghi CAN XAC DINH THEM" | Tao 7 TC (TC29-TC35): token gia ma, token het han, GET khong token, GET user token, POST+DELETE user role | `testcases_testsummary.xlsx` (sheet FR-14 Category CRUD) | Valid | Bao trum 4 loai token sai + GET auth ambiguous theo dung yeu cau | Khong can sua |
| 14 | 24/08/2026 | opencode (mimo-v2-free) | "FR-14: GET tra ve danh sach dang mang, POST thanh cong 2xx, DELETE thanh cong 2xx. Khong dat ten field cu the" | Tao 6 TC (TC36-TC41): GET array, GET empty, POST 2xx, POST 4xx, DELETE 2xx, DELETE4xx | `testcases_testsummary.xlsx` (sheet FR-14 Category CRUD) | Valid | Kiem tra response shape o muc chac chan, khong tu dat ten field | Khong can sua |
| 15 | 24/08/2026 | opencode (mimo-v2-free) | "Gop FR-14 thanh dung 35 test case, loai bo trung, phan can doi: domain partition, state transition, security, schema validation" | Xoa sheet cu, tao lai voi 35 TC: Domain(8), State(7), Security(8), Schema(12) | `testcases_testsummary.xlsx` (sheet FR-14 Category CRUD) | Valid | Gop dung 41 -> 35, loai bo trung, them 4 TC bo sung (PUT response, xoa tao lai, user POST+DELETE) | Khong can sua |

---

## 2. Tong ket

| Hang muc | So luong |
|----------|----------|
| **Tong so prompt** | 15 |
| **So AI Tool khac nhau da dung** | 1 (opencode mimo-v2-free) |
| **Tong so test case da tao** | 105 (FR-02: 35, FR-08: 35, FR-14: 35) |
| **So output duoc chap nhan ngay (Valid)** | 15 |
| **So output can sua (Incomplete)** | 1 (#3 - dau tieng Viet bi loi encoding, da fix ngay) |
| **So output invalid** | 0 |
| **File tao/sua** | `testcases_testsummary.xlsx` (3 sheet: FR-02 Login, FR-08 Checkout, FR-14 Category CRUD) |

---

## 3. Phan bo test case theo loai

| Loai Test | FR-02 | FR-08 | FR-14 | Tong |
|-----------|-------|-------|-------|------|
| Domain Partition | 12 | 8 | 8 | 28 |
| State Transition | 7 | 5 | 7 | 19 |
| Security | 8 | 8 | 8 | 24 |
| Schema Validation | 8 | 14 | 12 | 34 |
| **Tong** | **35** | **35** | **35** | **105** |

---

## 4. Ghi chu

- Tat ca test case deu danh dau **"CAN XAC DINH THEM"** cho cac muc ma SRS/khong mo ta cu the (status code, response body, ten field, etc.)
- Khong tu biet bat ky thong tin nao ngoai dac ta (khong tu dat ten field nhu "orderId", "message", khong tu dat status code nhu 401/403/400)
- Tieng Viet co dau duoc giu dung trong file Excel (su dung Write tool thay vi bash heredoc de tranh mat Unicode)
- 3 sheet trong 1 file Excel: `testcases_testsummary.xlsx`
