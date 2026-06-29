# Thiết kế Kiểm thử: FR-09 — Mã Giảm Giá (Coupon)

Tài liệu này trình bày chi tiết quá trình thiết kế kiểm thử cho chức năng **Mã Giảm Giá (FR-09)** của hệ thống EShop. Tài liệu được thiết kế sử dụng kỹ thuật **Bảng Quyết Định (Decision Table)** để bao phủ các tổ hợp logic phức tạp và kết hợp với **Phân tích Giá trị Biên (Boundary Value Analysis - BVA)** để làm giàu dữ liệu kiểm thử.

---

## 1. Phân tích Yêu cầu & Xác định Biên (FR-09)

Hệ thống EShop áp dụng mã giảm giá tại bước Checkout dựa trên **5 điều kiện nghiệp vụ** sau (tất cả phải thỏa mãn - phép `AND` logic):

1. **C1 (Mã tồn tại & hoạt động):** Mã giảm giá có trong CSDL và thuộc tính `is_active = 1`.
2. **C2 (Còn hạn sử dụng):** Ngày hiện tại phải trước ngày hết hạn `expired_at` (tức là `ngày_hiện_tại < expired_at`).
3. **C3 (Đủ ngưỡng đơn hàng):** Tổng giá trị đơn hàng phải lớn hơn hoặc bằng ngưỡng tối thiểu (`total_amount >= min_order_amount`).
4. **C4 (Đã đăng nhập):** Người dùng phải có JWT Token hợp lệ.
5. **C5 (Chưa dùng hết lượt):** Số lần người dùng đã sử dụng mã này phải nhỏ hơn giới hạn của mã (`lượt_đã_dùng < max_uses_per_user`).

### Các giá trị biên cần lưu ý (BVA):
- **Đối với C2 (Thời gian):**
  - Cận biên hợp lệ: `ngày_hiện_tại = expired_at - 1 ngày` hoặc `expired_at - 1 giây`.
  - Cận biên không hợp lệ: `ngày_hiện_tại = expired_at` hoặc `expired_at + 1 giây`.
- **Đối với C3 (Tổng đơn hàng):**
  - Cận biên không hợp lệ tối đa: `total_amount = min_order_amount - 1` (ví dụ: `299,999 ₫` cho ngưỡng `300,000 ₫`).
  - Cận biên hợp lệ tối thiểu: `total_amount = min_order_amount` (ví dụ: `300,000 ₫` cho ngưỡng `300,000 ₫`).
  - Cận biên hợp lệ: `total_amount = min_order_amount + 1` (ví dụ: `300,001 ₫` cho ngưỡng `300,000 ₫`).
- **Đối với C5 (Lượt sử dụng):**
  - Hợp lệ: `lượt_đã_dùng = max_uses_per_user - 1` (được dùng nốt lần cuối).
  - Không hợp lệ: `lượt_đã_dùng = max_uses_per_user` (đã hết lượt).

---

## 2. Thiết kế Bảng Quyết Định (Decision Table)

### 2.1 File đặc tả logic đầu vào (`coupon_spec.json`)

Chúng ta bổ sung thêm điều kiện **C6 (Loại mã giảm giá: percent hoặc fixed)** để phân tách công thức tính giảm giá tương ứng thành các hành động độc lập.

```json
{
  "title": "FR-09: Áp dụng mã giảm giá (Coupon)",
  "conditions": [
    { "id": "C1", "name": "Mã tồn tại và đang hoạt động", "values": ["T", "F"] },
    { "id": "C2", "name": "Còn hạn sử dụng (ngày hiện tại trước expired_at)", "values": ["T", "F"], "interaction_risk": true },
    { "id": "C3", "name": "Đủ ngưỡng đơn hàng (tổng đơn hàng >= min_order_amount)", "values": ["T", "F"], "interaction_risk": true },
    { "id": "C4", "name": "Đã đăng nhập (JWT Token hợp lệ)", "values": ["T", "F"] },
    { "id": "C5", "name": "Chưa dùng hết lượt (số lần dùng < max_uses_per_user)", "values": ["T", "F"], "interaction_risk": true },
    { "id": "C6", "name": "Loại mã giảm giá", "values": ["percent", "fixed"] }
  ],
  "actions": [
    { "id": "A1", "name": "Áp dụng giảm giá phần trăm (percent)" },
    { "id": "A2", "name": "Áp dụng giảm giá cố định (fixed)" },
    { "id": "A3", "name": "Từ chối áp dụng và không giảm giá" }
  ],
  "logic": [
    {
      "when": { "C1": "T", "C2": "T", "C3": "T", "C4": "T", "C5": "T", "C6": "percent" },
      "then": ["A1"]
    },
    {
      "when": { "C1": "T", "C2": "T", "C3": "T", "C4": "T", "C5": "T", "C6": "fixed" },
      "then": ["A2"]
    },
    {
      "when": {},
      "then": ["A3"]
    }
  ]
}
```

### 2.2 Bảng Quyết Định Rút Gọn (Collapsed Decision Table)

Sử dụng thuật toán rút gọn (collapse) để giảm bớt số lượng trường hợp trùng kết quả hành động nhưng vẫn đảm bảo tính đúng đắn logic:

| # | C1 | C2 | C3 | C4 | C5 | C6 | A1 (Giảm %) | A2 (Giảm Cố định) | A3 (Từ chối) |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:-----------:|:-----------------:|:------------:|
| **1** | T | T | T | T | T | percent | ✔ | | |
| **2** | T | T | T | T | T | fixed | | ✔ | |
| **3** | F | T | T | T | T | — | | | ✔ |
| **4** | — | F | T | T | T | — | | | ✔ |
| **5** | — | — | F | T | T | — | | | ✔ |
| **6** | — | — | — | F | T | — | | | ✔ |
| **7** | — | — | — | — | F | — | | | ✔ |

*Chú giải:* `—` ký hiệu Don't-Care (không ảnh hưởng).

### 2.3 Đánh giá rủi ro rút gọn quá mức (Collapse Risk Analysis)

- **Số rule bảng đầy đủ:** 64 → **Số rule rút gọn:** 7 (ẩn đi 57 tổ hợp).
- **Tỉ lệ rút gọn (Collapse Ratio):** 9.14×.
- **Mật độ ô "—" (Don't-care density):** 36%.
- **Mức độ rủi ro tổng thể:** **CAO**
- **Lý do cảnh báo:**
  - Các điều kiện mang tính chất rủi ro tương tác/biên cao như **C2 (Còn hạn sử dụng)** và **C3 (Đủ ngưỡng đơn hàng)** bị ẩn đi dưới dạng `—` tại các rule lỗi 4, 5, 6, 7.
  - Một số rule gánh tỷ lệ tổ hợp quá lớn (Rule 7 đại diện cho 50% số tổ hợp của bảng đầy đủ). Do đó, cần kết hợp kiểm thử thêm **Pairwise** để bắt các lỗi tương tác giữa các điều kiện này.

### 2.4 Bảng Pairwise (All-Pairs) để mở rộng có kiểm soát

Để bắt lỗi tương tác 2 chiều giữa các biến đầu vào mà không cần chạy toàn bộ 64 test case, ta áp dụng thuật toán Pairwise ra bộ **10 test case** tối ưu sau:

| # | C1 | C2 | C3 | C4 | C5 | C6 | Hành động mong đợi |
|---|:--:|:--:|:--:|:--:|:--:|:------:|:-------------------|
| 1 | T | T | T | T | T | percent| A1 (Áp dụng giảm %) |
| 2 | T | F | F | F | F | fixed | A3 (Từ chối) |
| 3 | T | T | F | T | F | percent| A3 (Từ chối) |
| 4 | T | T | T | F | T | fixed | A3 (Từ chối) |
| 5 | T | T | T | T | F | fixed | A3 (Từ chối) |
| 6 | F | T | F | T | T | percent| A3 (Từ chối) |
| 7 | F | T | T | F | T | percent| A3 (Từ chối) |
| 8 | F | F | T | T | T | percent| A3 (Từ chối) |
| 9 | F | T | T | T | F | percent| A3 (Từ chối) |
| 10| F | T | T | T | T | fixed | A3 (Từ chối) |

---

## 3. Danh sách Test Case Chi Tiết (Đã Làm Giàu Ngữ Nghĩa & BVA)

Từ bảng quyết định rút gọn ở trên, ta xây dựng bộ 7 test case chi tiết tích hợp dữ liệu kiểm thử thực tế từ CSDL mẫu của EShop.

### TC_COUPON001 — Áp dụng thành công mã giảm giá phần trăm (percent)
- **Truy vết:** Rule `R1` (bảng rút gọn)
- **Mức ưu tiên:** Trung bình
- **Tiền điều kiện:**
  - Người dùng đăng nhập thành công vào tài khoản Khách hàng (ví dụ: `test@eshop.com` / `Test1234!`). Có JWT Token hợp lệ gửi kèm theo Header `Authorization: Bearer <token>`.
  - Giỏ hàng hiện tại đang có sản phẩm với tổng trị giá thỏa mãn ngưỡng đơn hàng tối thiểu của mã.
  - Người dùng hiện tại chưa sử dụng mã giảm giá này lần nào (`max_uses_per_user = 1`).
- **Dữ liệu / Input cụ thể (Áp dụng BVA):**
  - Mã giảm giá: `"SAVE10"` (Hoạt động, loại percent 10%, hạn dùng 2099-12-31, min_order_amount = 300,000 ₫).
  - Tổng đơn hàng (`total_amount`): `300,000` ₫ (Biên dưới tối thiểu hợp lệ).
  - ID người dùng (`user_id`): `1`
- **Các bước thực hiện:**
  1. Đăng nhập hệ thống và trích xuất JWT Token.
  2. Gửi request `POST /api/apply-coupon` với body JSON:
     ```json
     {
       "code": "SAVE10",
       "total_amount": 300000,
       "user_id": 1
     }
     ```
  3. Kiểm tra mã phản hồi HTTP và dữ liệu JSON nhận được.
- **Kết quả mong đợi (Theo Đặc tả):**
  - HTTP Status Code: `200 OK`
  - Body JSON chứa:
    - `success`: `true`
    - `discount_amount`: `30,000` ₫ (tức `300,000 * 10 / 100`)
    - `final_amount`: `270,000` ₫ (tức `300,000 - 30,000`)
- **⚠️ Hành vi thực tế trên SUT (Báo cáo lỗi):**
  - **Lỗi 1 (Tính sai công thức):** SUT tính sai số tiền giảm giá do công thức trong `server.js` viết lỗi thành `total_amount * (1 - coupon.discount_value)`. Với `discount_value = 10`, số tiền giảm bị tính âm: `300,000 * (1 - 10) = -2,700,000` ₫, dẫn đến `final_amount = 3,000,000` ₫ (tăng gấp 10 lần đơn hàng).
  - **Lỗi 2 (Sai lệch biên C3):** SUT sẽ từ chối áp dụng mã giảm giá này và báo lỗi *"Đơn hàng chưa đủ giá trị tối thiểu..."* vì code backend dùng dấu `>` thay vì `>=` (`total_amount > min_order_amount`). Do đó tại đúng biên `300,000` ₫ đơn hàng bị từ chối.

---

### TC_COUPON002 — Áp dụng thành công mã giảm giá cố định (fixed)
- **Truy vết:** Rule `R2` (bảng rút gọn)
- **Mức ưu tiên:** Trung bình
- **Tiền điều kiện:**
  - Người dùng đăng nhập tài khoản Khách hàng hợp lệ và có JWT Token.
  - Tổng tiền giỏ hàng >= ngưỡng tối thiểu của mã.
  - Người dùng chưa sử dụng mã này lần nào.
- **Dữ liệu / Input cụ thể (Áp dụng BVA):**
  - Mã giảm giá: `"BIGBUY"` (Hoạt động, loại fixed 50,000 ₫, hạn dùng 2099-12-31, min_order_amount = 500,000 ₫).
  - Tổng đơn hàng (`total_amount`): `500,001` ₫ (Thiết lập giá trị cận trên của biên để vượt qua lỗi dấu `>` của SUT nhằm kiểm chứng logic tính toán loại fixed).
  - ID người dùng (`user_id`): `1`
- **Các bước thực hiện:**
  1. Đăng nhập và trích xuất JWT Token.
  2. Gửi request `POST /api/apply-coupon` với body JSON:
     ```json
     {
       "code": "BIGBUY",
       "total_amount": 500001,
       "user_id": 1
     }
     ```
  3. Kiểm tra mã phản hồi HTTP và dữ liệu JSON nhận được.
- **Kết quả mong đợi (Theo Đặc tả):**
  - HTTP Status Code: `200 OK`
  - Body JSON chứa:
    - `success`: `true`
    - `discount_amount`: `50,000` ₫
    - `final_amount`: `450,001` ₫ (tức `500,001 - 50,000`)
- **Hành vi thực tế trên SUT:**
  - Áp dụng thành công và tính đúng số tiền đối với loại fixed. Tuy nhiên, nếu gửi giá trị bằng đúng biên `500,000` ₫, hệ thống sẽ trả về lỗi `400 Bad Request` do lỗi so sánh `>` như đã nêu ở TC_COUPON001.

---

### TC_COUPON003 — Từ chối áp dụng khi mã không tồn tại hoặc đã bị vô hiệu hóa
- **Truy vết:** Rule `R3` (bảng rút gọn)
- **Mức ưu tiên:** Cao
- **Tiền điều kiện:**
  - Người dùng đã đăng nhập, giỏ hàng có tổng tiền hợp lệ.
- **Dữ liệu / Input cụ thể:**
  - Mã giảm giá: `"INVALID99"` (Không tồn tại trong hệ thống) hoặc mã `"OFF30"` (Có tồn tại nhưng thuộc tính `is_active = 0`).
  - Tổng đơn hàng (`total_amount`): `300,000` ₫
  - ID người dùng (`user_id`): `1`
- **Các bước thực hiện:**
  1. Đăng nhập.
  2. Gửi request `POST /api/apply-coupon` với `code: "INVALID99"`.
- **Kết quả mong đợi:**
  - HTTP Status Code: `404 Not Found`
  - Body JSON trả về:
    ```json
    { "error": "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" }
    ```
- **Hành vi thực tế trên SUT:**
  - Hoạt động đúng đặc tả.

---

### TC_COUPON004 — Từ chối áp dụng khi mã giảm giá đã hết hạn sử dụng
- **Truy vết:** Rule `R4` (bảng rút gọn)
- **Mức ưu tiên:** Cao
- **Tiền điều kiện:**
  - Người dùng đã đăng nhập, giỏ hàng có tổng tiền hợp lệ.
- **Dữ liệu / Input cụ thể (Áp dụng BVA):**
  - Mã giảm giá: `"EXPIRED"` (Hạn dùng: `2020-01-01`, min_order_amount = 100,000 ₫).
  - Tổng đơn hàng (`total_amount`): `200,000` ₫ (Đảm bảo đủ ngưỡng để kiểm tra riêng rẽ điều kiện thời hạn sử dụng).
  - ID người dùng (`user_id`): `1`
- **Các bước thực hiện:**
  1. Đăng nhập.
  2. Gửi request `POST /api/apply-coupon` với `code: "EXPIRED"`.
- **Kết quả mong đợi:**
  - HTTP Status Code: `400 Bad Request`
  - Body JSON trả về:
    ```json
    { "error": "Mã giảm giá đã hết hạn" }
    ```
- **Hành vi thực tế trên SUT:**
  - Hoạt động đúng đặc tả.

---

### TC_COUPON005 — Từ chối áp dụng khi chưa đủ ngưỡng đơn hàng tối thiểu
- **Truy vết:** Rule `R5` (bảng rút gọn)
- **Mức ưu tiên:** Cao
- **Tiền điều kiện:**
  - Người dùng đã đăng nhập.
- **Dữ liệu / Input cụ thể (Áp dụng BVA):**
  - Mã giảm giá: `"SAVE10"` (Ngưỡng tối thiểu: `300,000` ₫).
  - Tổng đơn hàng (`total_amount`): `299,999` ₫ (Giá trị biên lỗi lớn nhất).
  - ID người dùng (`user_id`): `1`
- **Các bước thực hiện:**
  1. Đăng nhập.
  2. Gửi request `POST /api/apply-coupon` với body JSON chứa `code: "SAVE10"` và `total_amount: 299999`.
- **Kết quả mong đợi:**
  - HTTP Status Code: `400 Bad Request`
  - Body JSON trả về:
    ```json
    { "error": "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này" }
    ```
- **Hành vi thực tế trên SUT:**
  - Hoạt động đúng đặc tả.

---

### TC_COUPON006 — Từ chối áp dụng khi người dùng chưa đăng nhập (Bản chất logic & Bảo mật)
- **Truy vết:** Rule `R6` (bảng rút gọn)
- **Mức ưu tiên:** Cao
- **Tiền điều kiện:**
  - Người dùng là khách vãng lai (Guest), chưa thực hiện đăng nhập vào hệ thống hoặc không gửi JWT Token trong header.
- **Dữ liệu / Input cụ thể:**
  - Mã giảm giá: `"SAVE10"` (Có yêu cầu max_uses_per_user = 1).
  - Tổng đơn hàng (`total_amount`): `500,000` ₫.
  - ID người dùng (`user_id`): Không gửi hoặc gửi `null`.
- **Các bước thực hiện:**
  1. Không đăng nhập (không gửi Token).
  2. Gửi request `POST /api/apply-coupon` với `code: "SAVE10"` và `total_amount: 500000`.
- **Kết quả mong đợi:**
  - HTTP Status Code: `401 Unauthorized` hoặc `403 Forbidden`.
  - Không cho phép tính toán giảm giá.
- **⚠️ Hành vi thực tế trên SUT (Lỗi bảo mật nghiêm trọng):**
  - API `POST /api/apply-coupon` của backend EShop **không áp dụng middleware `authenticateToken`**.
  - Khi không truyền `user_id` hoặc JWT Token, backend sẽ bỏ qua bước truy vấn bảng `coupon_usage` và **vẫn trả về kết quả áp dụng giảm giá thành công** (trả về Status 200 kèm số tiền giảm giá). Điều này cho phép khách vãng lai lạm dụng mã giảm giá không giới hạn số lần sử dụng.

---

### TC_COUPON007 — Từ chối áp dụng khi người dùng đã dùng hết lượt cho phép
- **Truy vết:** Rule `R7` (bảng rút gọn)
- **Mức ưu tiên:** Cao
- **Tiền điều kiện:**
  - Người dùng đã đăng nhập.
  - Người dùng đã thực hiện checkout thành công đơn hàng sử dụng mã giảm giá này trước đó (ví dụ: đã dùng mã `SAVE10` đúng 1 lần - đạt giới hạn tối đa `max_uses_per_user = 1`).
- **Dữ liệu / Input cụ thể:**
  - Mã giảm giá: `"SAVE10"` (max_uses_per_user = 1).
  - Tổng đơn hàng (`total_amount`): `500,000` ₫.
  - ID người dùng (`user_id`): `1` (User này đã tồn tại bản ghi trong bảng `coupon_usage` tương ứng với mã `SAVE10`).
- **Các bước thực hiện:**
  1. Đăng nhập tài khoản user 1.
  2. Gửi request `POST /api/apply-coupon` để áp dụng lại mã `"SAVE10"`.
- **Kết quả mong đợi:**
  - HTTP Status Code: `400 Bad Request`
  - Body JSON trả về:
    ```json
    { "error": "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)" }
    ```
- **Hành vi thực tế trên SUT:**
  - Hoạt động đúng đặc tả (nếu truyền đúng `user_id` hợp lệ).

---

## 4. Tổng hợp các lỗi logic & bảo mật phát hiện trên SUT (FR-09)

Trong quá trình phân tích mã nguồn backend (`server.js`) đối chiếu với tài liệu thiết kế kiểm thử bảng quyết định này, 3 lỗi nghiêm trọng sau đã được phát hiện:

1. **Lỗi Công thức Giảm giá Phần trăm (Percent Discount Calculation Bug):**
   - **Vị trí code:** `server.js` dòng 399-401.
   - **Chi tiết:** Backend tính `discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))`.
   - **Tác hại:** Với `discount_value = 10` (được seed trong DB), tiền giảm giá bị tính thành `total * (-9)`, khiến tiền thanh toán cuối cùng tăng lên gấp 10 lần thay vì được giảm 10%.
   - **Khắc phục đề xuất:** Sửa thành `discount_amount = Math.floor(total_amount * coupon.discount_value / 100)`.

2. **Lỗi Sai lệch Biên Đơn hàng Tối thiểu (Min Order Amount Boundary Bug):**
   - **Vị trí code:** `server.js` dòng 379.
   - **Chi tiết:** Backend kiểm tra `if (total_amount > coupon.min_order_amount)` thay vì `>=`.
   - **Tác hại:** Người dùng mua hàng đạt đúng giá trị tối thiểu của mã giảm giá (ví dụ: đúng `300,000 ₫` đối với mã `SAVE10`) sẽ bị từ chối áp dụng mã một cách vô lý.
   - **Khắc phục đề xuất:** Sửa thành `if (total_amount >= coupon.min_order_amount)`.

3. **Lỗi Bỏ qua Xác thực & Lạm dụng Mã giảm giá (Authentication Bypass & Coupon Abuse Vulnerability):**
   - **Vị trí code:** `server.js` dòng 363.
   - **Chi tiết:** API `/api/apply-coupon` không sử dụng middleware `authenticateToken`. Hơn nữa, nhánh kiểm tra lượt sử dụng (`user_id`) chỉ được thực hiện nếu client tự ý truyền `user_id` lên.
   - **Tác hại:** Khách vãng lai chưa đăng nhập (hoặc bất kỳ client nào cố ý không truyền tham số `user_id`) vẫn có thể áp dụng mã giảm giá thành công mà không bị giới hạn số lần sử dụng.
   - **Khắc phục đề xuất:** Thêm middleware `authenticateToken` vào API và lấy `user_id` trực tiếp từ token giải mã (`req.user.id`) thay vì nhận từ request body của client.
