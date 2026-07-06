# Phân tích Decision Table: FR-12 - Kiểm soát truy cập (Access Control)

Tài liệu này thực hiện phân tích Decision Table và thiết kế bộ test case cho yêu cầu **FR-12: Kiểm soát truy cập (Access Control)** dựa trên đặc tả hệ thống EShop.

---

## 1. Phân tích Yêu cầu FR-12

Theo đặc tả của hệ thống EShop:
- **Phân hệ Admin** chỉ dành cho tài khoản có `role = 'admin'`.
- **Tất cả các API Admin** (`/api/admin/*`) và **các API có tính ảnh hưởng dữ liệu** (`POST/PUT/DELETE` đối với `/api/products`, `/api/categories`, `/api/coupons`) đều phải yêu cầu:
  1. Token JWT hợp lệ.
  2. `role = 'admin'` trong Token.

### Xác định các Điều kiện (Conditions)
- **C1**: URL/API yêu cầu thuộc nhóm được bảo vệ (Protected API).
  - *T (True)*: Yêu cầu là API Admin (`/api/admin/*`) hoặc phương thức thay đổi dữ liệu (`POST/PUT/DELETE`) của `/api/products`, `/api/categories`, `/api/coupons`.
  - *F (False)*: Yêu cầu là các API công khai hoặc API khác (ví dụ: `GET /api/products`, `GET /api/categories`, v.v.).
- **C2**: Token JWT hợp lệ và tồn tại.
  - *T (True)*: Header `Authorization` chứa JWT token hợp lệ, còn hạn và chữ ký đúng.
  - *F (False)*: Không gửi kèm token (thiếu header) hoặc token không hợp lệ (hết hạn, sai cấu trúc, sai chữ ký).
- **C3**: Vai trò (`role`) trong payload của Token là `'admin'`.
  - *T (True)*: Thuộc tính `role` giải mã từ token là `'admin'`.
  - *F (False)*: Thuộc tính `role` giải mã từ token là `'user'` hoặc các giá trị khác.

### Xác định các Hành động (Actions)
- **A1**: Cho phép truy cập (Allow Access - Trả về dữ liệu nghiệp vụ / thực thi tác vụ).
- **A2**: Từ chối truy cập với lỗi `401 Unauthorized` (Thiếu hoặc sai Token).
- **A3**: Từ chối truy cập với lỗi `403 Forbidden` (Sai vai trò / không đủ quyền).

---

## 2. Bảng Quyết Định Đầy Đủ (Full Decision Table)

Với 3 điều kiện nhị phân, ta có $2^3 = 8$ tổ hợp logic:

| Ký hiệu | Điều kiện / Hành động | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | API thuộc nhóm được bảo vệ | T | T | T | T | F | F | F | F |
| **C2** | Token JWT hợp lệ | T | T | F | F | T | T | F | F |
| **C3** | Role trong Token là 'admin' | T | F | T | F | T | F | T | F |
| | **Hành động (Actions)** | | | | | | | | |
| **A1** | Cho phép truy cập (Allow) | ✔ | | | | ✔ | ✔ | ✔ | ✔ |
| **A2** | Từ chối với lỗi 401 | | | ✔ | ✔ | | | | |
| **A3** | Từ chối với lỗi 403 | | ✔ | | | | | | |

---

## 3. Bảng Quyết Định Rút Gọn (Collapsed Decision Table)

Bằng cách áp dụng luật rút gọn các ô Don't-care (`—`):
- **Rule 3 & Rule 4**: Khi `C1 = T` và `C2 = F`, vai trò `C3` không thể giải mã hoặc không có ý nghĩa -> Gộp thành **Rule 3** với `C3 = —`.
- **Rule 5, 6, 7 & 8**: Khi `C1 = F` (API công khai), hệ thống không áp dụng Access Control của FR-12 -> Gộp thành **Rule 4** với `C2 = —` và `C3 = —`.

Bảng quyết định rút gọn thu được:

| Ký hiệu | Điều kiện / Hành động | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **C1** | API thuộc nhóm được bảo vệ | T | T | T | F |
| **C2** | Token JWT hợp lệ | T | T | F | — |
| **C3** | Role trong Token là 'admin' | T | F | — | — |
| | **Hành động (Actions)** | | | | |
| **A1** | Cho phép truy cập (Allow) | ✔ | | | ✔ |
| **A2** | Từ chối với lỗi 401 | | | ✔ | |
| **A3** | Từ chối với lỗi 403 | | ✔ | | |

### Giải thích các Luật (Rules)
- **Rule 1 (Ứng với R1)**: Truy cập API được bảo vệ với Token hợp lệ và Role là `'admin'` -> Cho phép thực thi.
- **Rule 2 (Ứng với R2)**: Truy cập API được bảo vệ với Token hợp lệ nhưng Role không phải `'admin'` -> Trả về lỗi `403 Forbidden`.
- **Rule 3 (Ứng với R3, R4)**: Truy cập API được bảo vệ nhưng Token không hợp lệ hoặc không có -> Trả về lỗi `401 Unauthorized`.
- **Rule 4 (Ứng với R5, R6, R7, R8)**: Truy cập API không được bảo vệ (public) -> Cho phép thực thi bình thường mà không cần kiểm tra xác thực.

---

## 4. Đánh giá Rủi ro Rút gọn (Reduction Risk Assessment)

- **Số lượng Rule**: Bảng đầy đủ có 8 rules -> Bảng rút gọn còn 4 rules.
- **Tỉ lệ rút gọn**: **2.0×**.
- **Mật độ ô Don't-care (`—`)**: $3 / 12 \approx 25\%$ (Nằm ở ngưỡng an toàn lý thuyết).
- **Mức độ rủi ro tổng thể**: **THẤP**.
- **Lưu ý kiểm thử**:
  - Đối với **Rule 4** (`C1 = F`): Cần kiểm thử chắc chắn các API công khai không vô tình bị chặn bởi Access Control và ngược lại, các API nhạy cảm không bị phân loại nhầm thành API công khai.
  - Đối với **Rule 3** (`C2 = F`): Cần kiểm thử cả 2 trường hợp: Token sai định dạng/hết hạn và hoàn toàn không truyền Token.

---

## 5. Danh sách Ca kiểm thử (Test Cases Mapping)

Dựa trên bảng quyết định rút gọn, ta thiết lập bộ test case nhằm bao phủ toàn bộ các Rule và làm giàu ngữ nghĩa bằng các endpoint cụ thể:

| Mã Test Case | Rule | Tiêu đề Test Case | API Thử nghiệm | Input (Token/Role) | Kết quả mong đợi | Mức ưu tiên |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-ACCESS-001** | Rule 1 | Truy cập API Admin với token admin hợp lệ | `GET /api/admin/dashboard` | Token Admin hợp lệ | `200 OK` (Cho phép) | Cao |
| **TC-ACCESS-002** | Rule 1 | Cập nhật sản phẩm với token admin hợp lệ | `POST /api/products` | Token Admin hợp lệ | `201 Created` / Cho phép | Cao |
| **TC-ACCESS-003** | Rule 2 | Truy cập API Admin với token user (không phải admin) | `GET /api/admin/dashboard` | Token User hợp lệ | `403 Forbidden` | Cao |
| **TC-ACCESS-004** | Rule 2 | Tạo danh mục mới với token user (không phải admin) | `POST /api/categories` | Token User hợp lệ | `403 Forbidden` | Cao |
| **TC-ACCESS-005** | Rule 3 | Truy cập API được bảo vệ với token hết hạn / sai chữ ký | `POST /api/coupons` | Token không hợp lệ | `401 Unauthorized` | Cao |
| **TC-ACCESS-006** | Rule 3 | Truy cập API được bảo vệ mà không gửi kèm Token | `DELETE /api/products/1` | Không gửi Token | `401 Unauthorized` | Cao |
| **TC-ACCESS-007** | Rule 4 | Xem danh sách sản phẩm (API công khai) không cần Token | `GET /api/products` | Không gửi Token | `200 OK` (Cho phép) | Trung bình |
| **TC-ACCESS-008** | Rule 4 | Xem danh sách danh mục (API công khai) không cần Token | `GET /api/categories` | Không gửi Token | `200 OK` (Cho phép) | Trung bình |
