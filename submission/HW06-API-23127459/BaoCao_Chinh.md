# Báo Cáo Chính - HW06 AI API Testing - EShop

**Mã số sinh viên:** 23127459  
**Họ tên:** Huỳnh Vương Thụy Quân
**Nhánh bài nộp:** https://github.com/iamDicun/Group06_HW2_Testing/tree/HW06-23127459

---

## 1. Tổng Quan Quy Trình

Quy trình kiểm thử được thực hiện theo 5 bước: **Tạo sinh (Generate) → Kiểm tra (Audit) → Mở rộng (Extend) → Thực thi (Execute) → Báo cáo lỗi (Report bugs)**, áp dụng cho 3 nhóm yêu cầu đã chọn: FR-05, FR-11, FR-17. Mỗi nhóm đều phải đạt tối thiểu 35 trường hợp hợp lệ sau kiểm tra.

---

## 2. FR-05: Liệt Kê Và Tìm Kiếm Sản Phẩm

### Tạo sinh
- Trí tuệ nhân tạo tạo ban đầu **43 trường hợp chính + 5 mở rộng = 48**, bao phủ phân vùng tương đương, giá trị biên, bảo mật, lược đồ cho `GET /api/products` và `GET /api/products?search=`

### Kiểm tra
- **Trước kiểm tra:** 43 chính
- **Sau kiểm tra:** 56 chính (sau khi bổ sung 13 mới) — **HỢP LỆ 35 (62,5%), KHÔNG HỢP LỆ 16 (28,6%), CHƯA HOÀN CHỈNH 5 (8,9%)**
- **Lỗi phạm vi phát hiện:** 10 trường hợp `GET /api/products/:id` bị nhầm vào FR-05 (vốn là **FR-06 Xem chi tiết sản phẩm**): `TC_FR05_010,011,012,013,014,015,022,030,039,040` — đã đổi nhãn thành `KHÔNG HỢP LỆ` với lý do `Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06, không phải FR-05 đã chọn`, giữ lại dòng gốc làm bằng chứng.
- **Các lỗi khác đã xử lý:** 6 trường hợp thuộc FR khác/trùng (`019,020,021,023,026,028`) và 5 trường hợp chưa hoàn chỉnh cần gộp (`016,035,036,037,043`)

### Mở rộng
- Bổ sung **13 trường hợp mới (044-056)** đúng phạm vi chỉ `GET /api/products` và `?search=`: cắt khoảng trắng đầu/cuối, ký tự đại diện `%`/`_`, kết hợp `category_id`/`page`/`limit`/`sort`, kiểm tra `imageUrl`, định dạng giá `₫`, tiêu đề `CORS`/`Cache-Control`, giới hạn tần suất, alt text.

### Thực thi
- Chạy qua Newman với `X-Student-Id` tự thêm bởi Pre-request Script, kiểm tra mã trạng thái và cấu trúc JSON. **Thực tế từ `newman-report.html`:** 124 yêu cầu (122 hợp lệ +2 đăng nhập), 367 kiểm tra, 312 đạt, 55 lỗi (ảnh `image1.png`), tương đương 365 assertions, 311 đạt, 54 lỗi — do các lỗi thực tế dưới đây, không phải do sai phạm vi.

### Báo cáo lỗi thực tế đã xác nhận (từ `newman-report.html`, đã nhóm)

> Mỗi nhóm tuân theo mẫu `templates/bug-report-template.md`

#### [BUG][FR-05] SQL Injection qua tham số tìm kiếm — trả về toàn bộ bảng
**Found by Test Case:** TC_FR05_025  
**Requirement Related:** FR-05  
**Severity / Priority:** Critical / P0  
**Steps:** `GET /api/products?search=' OR '1'='1`  
**Expected:** Mảng rỗng  
**Actual:** Trả về toàn bộ bảng (1,42KB) do `LIKE '%${searchQuery}%'`  
**Evidence:** [ẢNH: Screenshot response lỗi của TC_FR05_025]

#### [BUG][FR-05] XSS và ký tự đặc biệt trả về 500 thay vì JSON
**Found by:** TC_FR05_027 (`<script>`), TC_FR05_042 (`<>&"'`)  
**Expected:** 200 + JSON đã mã hóa  
**Actual:** 500 `text/html` (2 lỗi trong report)  
**Evidence:** [ẢNH: Screenshot TC_FR05_027 — 500 HTML]

#### [BUG][FR-05] HTTP Verb Tampering
**Found by:** TC_FR05_EXT_005 `POST /api/products`  
**Expected:** 404/405  
**Actual:** 200/500 (1 lỗi)  
**Evidence:** [ẢNH: Screenshot TC_FR05_EXT_005]

### Báo cáo lỗi (tổng hợp BUG: trong file)
- Đếm dòng `BUG:` trong FR05: **1** (TC_FR05_025) — đã xác nhận qua request thực tế như trên, các lỗi XSS 500 cũng đã xác nhận qua report (2 lỗi), tổng **3 nhóm** thực tế.

---

## 3. FR-11: Xem Lịch Sử Đơn Hàng

### Tạo sinh
- Ban đầu **48 chính + 5 mở rộng = 53**, bao phủ phân vùng, giá trị biên, bảo mật IDOR, lược đồ cho `GET /api/orders/my-orders` và `GET /api/orders/:id`

### Kiểm tra
- **Trước kiểm tra:** 48 chính
- **Sau kiểm tra:** 58 chính (sau khi bổ sung 10 mới) — **HỢP LỆ 36 (62,1%), KHÔNG HỢP LỆ 22 (37,9%)**
- **Lỗi phạm vi phát hiện:** 22 trường hợp bị nhầm từ **FR-10 Máy trạng thái đơn hàng**:
  - 9 trường hợp chuyển trạng thái quản trị `PUT /api/admin/orders/:id/status`: `TC_FR11_022,023,024,025,026,027,028,029,030`
  - 13 trường hợp hủy đơn (trigger chuyển trạng thái): `TC_FR11_014,015,016,017,018,019,020,036,038,044,045` và `EXT_001,EXT_004`
  - Đã đổi nhãn thành `KHÔNG HỢP LỆ` với lý do tương ứng, giữ lại dòng gốc.
- Đã cập nhật tiêu đề `Các Endpoint API` bỏ `PUT /api/orders/:id/cancel`, chỉ giữ `GET` (đúng FR-11 chỉ xem).

### Mở rộng
- Bổ sung **10 trường hợp mới (049-058)** đúng phạm vi chỉ xem: bản dịch tiếng Việt trạng thái, phân trang `page/limit`, định dạng `created_at`, XSS lưu trữ `shipping_address`, thời gian phản hồi, `Cache-Control/ETag`, sắp xếp ổn định, Unicode/emoji, định dạng `total_amount`, tiêu đề CORS.

### Thực thi
- Đăng nhập trước bằng `POST /api/login` với `test@eshop.com / Test1234!` để lấy `authToken`, sau đó chạy 36 hợp lệ với `Authorization: Bearer {{authToken}}` và `X-Student-Id` tự thêm. **Thực tế từ `newman-report.html`:** 124 yêu cầu, 41 yêu cầu FR-11 (1 đăng nhập +36 hợp lệ +4 mở rộng hợp lệ), trong đó IDOR và JWT vẫn lỗi như báo cáo.

### Báo cáo lỗi thực tế đã xác nhận
- **IDOR — Xem chi tiết đơn hàng người khác:** TC_FR11_035,012,042,EXT_003 — `GET /api/orders/:id` với ID của người khác trả về 200 với dữ liệu thay vì 404 (4 lỗi trong report) — [ẢNH: Screenshot TC_FR11_035]
- **JWT không kiểm tra đúng:** TC_FR11_032,033,039,EXT_002,EXT_005 — token sai/hết hạn/bị sửa/none trả về 401 thay vì 403 hoặc 200 thay vì 403 (5 lỗi) — [ẢNH: Screenshot TC_FR11_032]
- Đếm dòng `BUG:` trong FR11: **6** dòng gốc, qua report xác nhận **2 nhóm** thực tế như trên (do 22 trường hợp hủy/chuyển đã loại).

### Báo cáo lỗi (tổng hợp cũ)
- Đếm dòng `BUG:`/`LỖI:` trong FR11: **6** (chủ yếu IDOR khi `GET /api/orders/:id` không kiểm tra sở hữu — TC_FR11_035, EXT_003). Các trường hợp hủy đơn đã loại nên không tính vào lỗi FR-11.

---

## 4. FR-17: Quản Lý Mã Giảm Giá (CRUD)

### Tạo sinh
- Ban đầu **61 chính + 5 mở rộng = 66**, bao phủ tạo/danh sách/xóa mã, áp dụng mã, chuyển vòng đời, bảo mật, lược đồ

### Kiểm tra
- **Trước kiểm tra:** 61 chính
- **Sau kiểm tra:** 66 tổng — **HỢP LỆ 41 (62,1%), KHÔNG HỢP LỆ 25 (37,9%)**
- **Lỗi phạm vi phát hiện:** 25 trường hợp `POST /api/apply-coupon` bị nhầm vào FR-17 (vốn là **FR-09 Áp dụng mã lúc thanh toán**): `TC_FR17_024-036,038,039,046,048,049,057,058,059,061` và `EXT_001,003,004` — đã đổi nhãn `KHÔNG HỢP LỆ` với lý do `Ngoài phạm vi — endpoint POST /api/apply-coupon thuộc FR-09, không phải FR-17 (CRUD)`, giữ lại dòng gốc.
- Đã cập nhật tiêu đề bỏ `POST /api/apply-coupon`, chỉ giữ `POST /api/admin/coupons, GET /api/coupons, DELETE /api/admin/coupons/:id`.
- Tài khoản quản trị dùng để kiểm thử: `insertUser.run('Admin User', 'admin@eshop.com', 'Admin123!', 'admin')` — đăng nhập `POST /api/login` để lấy `adminToken`, mọi yêu cầu quản trị dùng `Authorization: Bearer {{adminToken}}`.

### Mở rộng
- Không cần bổ sung vì sau khi loại 25, vẫn còn **41 hợp lệ** (chỉ CRUD) — đã đạt ≥35. Giữ lại 5 mở rộng (trong đó 3 hợp lệ là EXT_002,005).

### Thực thi
- Đăng nhập quản trị đầu bộ sưu tập FR-17 để lấy `adminToken`, sau đó chạy 41 hợp lệ. **Thực tế từ `newman-report.html`:** 42 yêu cầu FR-17 (1 đăng nhập +41 hợp lệ), trong đó các trường hợp tạo mã với giá trị biên âm/vượt 100% vẫn lỗi.

### Báo cáo lỗi thực tế đã xác nhận
- **Tạo mã không kiểm tra giá trị:** TC_FR17_005 (discount âm), 008 (vượt 100%), 010 (min âm), 015,016,017 (expired/type sai) — `POST /api/admin/coupons` với giá trị không hợp lệ vẫn trả về 200 `Coupon created` thay vì 400, hoặc 500 do `SQLITE_CONSTRAINT` khi mã trùng (12 dòng BUG, 6 lỗi trong report) — [ẢNH: Screenshot TC_FR17_005]
- **Mass Assignment và mã quá dài:** TC_FR17_EXT_002 (chèn `is_active`), EXT_005 (1000+ ký tự) — trả về 500 `text/html` thay vì 200 JSON (2 lỗi) — [ẢNH: Screenshot TC_FR17_EXT_002]

### Báo cáo lỗi (tổng hợp cũ)
- Đếm dòng `BUG:` trong FR17: **12** (giá trị âm, min_order âm, type không hợp lệ, vượt 100%, v.v. — các TC 005,008,010,015,016,017,042,043...). Các lỗi áp dụng mã đã loại nên không tính.

---

## 5. Tại Sao Trí Tuệ Nhân Tạo Ban Đầu Tạo Lộn Phạm Vi?

Trí tuệ nhân tạo đọc chung `api_specification.md` nên nhầm các endpoint liền kề nhau về thực thể nhưng khác nhóm yêu cầu. Ví dụ `/api/products` (FR-05 liệt kê) và `/api/products/:id` (FR-06 chi tiết) nằm cạnh nhau trong mục 3.1 và 3.2, có cùng tiền tố và cùng bảng `products`, nên bị gộp nhầm vào một nhóm. Tương tự, `/api/orders/my-orders` (FR-11 chỉ xem) và `/api/orders/:id/cancel` hay `/api/admin/orders/:id/status` (FR-10 chuyển trạng thái) cùng thực thể `orders` và cùng trạng thái `pending/confirmed...` nên bị nhầm là cùng nhóm. Với mã giảm giá, `/api/admin/coupons` (FR-17 CRUD) và `/api/apply-coupon` (FR-09 áp dụng) cùng thực thể `coupons` và cùng các trường `code, discount_value` nên bị gộp. Trí tuệ nhân tạo ưu tiên gom theo thực thể thay vì theo ranh giới nhóm yêu cầu đã chọn, dẫn đến 10 + 22 + 25 trường hợp ngoài phạm vi. Việc kiểm tra thủ công theo spec FR đã giúp phát hiện và chuyển nhãn thành không hợp lệ mà vẫn giữ lại dòng gốc làm bằng chứng.

---

## 6. Báo Cáo Tích Hợp Vào Quy Trình Tự Động

**Tập tin quy trình:** `.github/workflows/api-tests.yml` (chạy trong thư mục `application`)

**Cấu hình:** Chạy trên `ubuntu-latest` với Node.js LTS, khi đẩy lên nhánh `HW06-23127459` hoặc yêu cầu kéo.

**Các bước:**
1. **Checkout code** — tải mã nguồn
2. **Cài Node.js LTS** — kèm bộ nhớ đệm `npm` cho `application/backend`
3. **Cài dependencies** — `npm ci` trong `application/backend`
4. **Khởi động hậu phương** — `npm run dev` ở nền, ghi `backend.log`
5. **Đợi máy chủ** — `wait-on http://localhost:3000/api/products` 60 giây, dự phòng vòng lặp `curl`
6. **Cài Newman** — `newman` và `newman-reporter-htmlextra`
7. **Chạy kiểm thử** — `npx newman run application/postman/EShop_API_Tests.postman_collection.json -e application/postman/EShop_23127459.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export newman-report.html --bail` — cờ `--bail` đảm bảo thoát khác 0 khi có lỗi, quy trình sẽ đỏ
8. **Tải báo cáo** — `actions/upload-artifact` lưu `newman-report.html` 7 ngày
9. **Tóm tắt** — in kích thước báo cáo

**Vị trí tập tin trong kho:**
```
application/postman/EShop_API_Tests.postman_collection.json
application/postman/EShop_23127459.postman_environment.json
.github/workflows/api-tests.yml
```

**Cách tạo lần chạy lỗi minh họa (không làm trực tiếp, chỉ hướng dẫn):** Sửa một trường hợp hợp lệ bất kỳ, ví dụ `TC_FR05_001` đổi kỳ vọng từ 200 thành 201, đẩy commit thứ hai — quy trình sẽ báo 1 lỗi, hiển thị đỏ.

---

## 7. Phê Bình Trí Tuệ Nhân Tạo (200–300 từ)

Trí tuệ nhân tạo đã tạo nhanh bộ khung 152 trường hợp vượt yêu cầu, bao phủ tốt phân vùng, giá trị biên và lược đồ, nhưng lại **thiên lệch theo thực thể thay vì theo ranh giới nhóm yêu cầu**. Nó gộp nhầm 47 trường hợp ngoài phạm vi (10 FR-06, 22 FR-10, 25 FR-09) chỉ vì các endpoint nằm cạnh nhau trong tài liệu đặc tả và chia sẻ cùng tên bảng. Ví dụ, nó không phân biệt được `GET /api/products` (liệt kê) với `GET /api/products/:id` (chi tiết) dù đặc tả ghi rõ FR-05 chỉ liệt kê & tìm kiếm. Tương tự, nó xem việc hủy đơn hay áp dụng mã là một phần của xem lịch sử hay quản lý mã, trong khi đó là các máy trạng thái riêng.

Trí tuệ nhân tạo cũng **thiếu nhạy cảm với ngữ cảnh xác thực**: nó tạo các trường hợp FR-17 mà không nêu rõ cần `adminToken` từ `insertUser.run`, và tạo các kiểm tra bảo mật chung chung thay vì kiểm tra vai trò cụ thể. Ngoài ra, nó bỏ sót các kiểm tra tinh vi như cắt khoảng trắng, ký tự đại diện `%`/`_`, hay tiêu đề `CORS`/`Cache-Control` — những trường hợp sau này phải bổ sung thủ công để đủ 35.

Bài học rút ra là phải **coi trí tuệ nhân tạo như người soạn thảo ban đầu, không phải người kiểm định cuối cùng**. Cần đối chiếu từng endpoint với nhóm yêu cầu đã chọn, giữ lại dòng gốc làm bằng chứng khi đổi nhãn, và bổ sung thủ công các giá trị biên và tiêu đề mà mô hình thường bỏ qua. Sự kết hợp giữa tốc độ của máy và sự tỉ mỉ của người mới cho ra bộ kiểm thử vừa đủ số lượng vừa đúng phạm vi.

---

## 8. Ảnh Chụp Minh Chứng

![Bộ sưu tập Postman FR-05](image.png)
*Hình 1: Bộ sưu tập Postman FR-05 — yêu cầu TC_FR05_001 `GET {{baseUrl}}/api/products` trả về 200 OK, 3/3 kiểm tra đạt*

![Kết quả Collection Runner](image1.png)
*Hình 2: Collection Runner — 367 kiểm tra, 312 đạt, 55 lỗi, thời gian 11s, trung bình 6ms (tương ứng `newman-report.html` 365 assertions, 311 đạt, 54 lỗi)*

[ẢNH: Newman/HTML report chi tiết - xem `newman-report.html` đính kèm]
[ẢNH: GitHub Actions pipeline PASS/FAIL - xem Actions tab]

## 9. Nhật Ký Commit Git

[ĐỂ TRỐNG - TÔI TỰ LÀM RIÊNG]

```bash
git log --oneline --all
```
