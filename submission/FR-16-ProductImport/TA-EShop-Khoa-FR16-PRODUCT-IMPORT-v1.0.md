# Test Analysis — FR-16: Import Sản phẩm từ CSV (Use Case Testing)

---

## 1. Test Analysis Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TA-ESHOP-KHOA-FR16-v1.0 |
| **Tính năng** | FR-16: Import Sản phẩm từ CSV |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-07-06 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Completed |

---

## 2. Introduction

Tài liệu này thực hiện bước **Phân tích ca sử dụng (Use Case Testing Analysis)** cho tính năng **FR-16: Import Sản phẩm từ CSV** trên hệ thống EShop.

Mục tiêu là mô tả rõ cấu trúc Ca sử dụng (Use Case), các kịch bản tương tác giữa tác nhân Admin và hệ thống (luồng chính, luồng phụ, luồng ngoại lệ), từ đó thiết kế bộ ca kiểm thử (Use Case Test Cases) tương ứng nhằm bảo đảm tính toàn vẹn và nghiệp vụ nguyên tử (atomic/all-or-nothing rollback) của việc import sản phẩm.

### Tài liệu tham chiếu:
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Mã nguồn Backend: [application/backend/server.js](file:///c:/Users/ADMIN/OneDrive%20-%20CONG%20TY%20TNHH%20BIGIN-SGIM00458/Documents/GitHub/Group06_HW2_Testing/application/backend/server.js) (dòng 199 - 241)

---

## 3. Use Case Specification: Import Sản phẩm từ CSV

### 3.1 Metadata & Mô tả

* **Tên Use Case:** Import Sản phẩm từ CSV (Bulk Import Products)
* **Tác nhân (Actor):** Admin (Quản trị viên)
* **Mô tả:** Admin tải lên một tệp CSV chứa danh sách sản phẩm để thêm hàng loạt sản phẩm vào hệ thống EShop cùng lúc.
* **Điều kiện tiên quyết (Preconditions):**
  * Admin đã đăng nhập hệ thống và có Token JWT hợp lệ.
  * Quyền hạn trong token phải là `role = 'admin'`.
* **Điều kiện kết thúc (Postconditions):**
  * **Thành công (Success):** Toàn bộ sản phẩm hợp lệ trong file CSV được thêm vào cơ sở dữ liệu. Giỏ hàng hoặc danh mục không bị ảnh hưởng. Trả về thông báo thành công.
  * **Thất bại (Failure/Rollback):** Nếu có bất kỳ dòng nào lỗi, cơ sở dữ liệu không thay đổi (hủy bỏ mọi sản phẩm đã chèn trước đó trong file), và hiển thị thông báo lỗi chi tiết.

---

### 3.2 Luồng xử lý (Flow of Events)

#### A. Luồng chính (Main Success Scenario)
1. Admin truy cập trang Quản lý Sản phẩm trên Web Admin.
2. Admin bấm chọn tệp tin từ máy tính.
3. Admin chọn tệp tin CSV hợp lệ có đuôi `.csv`.
4. Hệ thống phân tích file CSV (Frontend parse CSV sang JSON Array).
5. Admin bấm "Import".
6. Frontend gửi request `POST /api/admin/import-products` kèm danh sách sản phẩm.
7. Backend kiểm tra quyền Admin, mở một Giao dịch (Transaction) CSDL.
8. Backend validate dữ liệu từng sản phẩm (Tên không rỗng, giá là số dương, category_id tồn tại).
9. Backend thực hiện chèn dữ liệu vào bảng `products`.
10. Hệ thống commit giao dịch CSDL sau khi tất cả các dòng đều hợp lệ.
11. Hệ thống hiển thị báo cáo thành công: "Import hoàn tất: X/X sản phẩm được thêm".

#### B. Các luồng thay thế & Luồng ngoại lệ (Alternative & Exception Flows)

* **Alternative Flow 1 (RFC 4180 Compliance):**
  * Tại bước 3, file CSV chứa các giá trị mô tả (`description`) có dấu phẩy nhưng được bọc trong dấu nháy kép (ví dụ: `"Sản phẩm tốt, chất lượng cao"`). Hệ thống vẫn phân tích đúng cột và chèn thành công.

* **Exception Flow 1 (Lỗi định dạng file):**
  * Tại bước 3, Admin chọn file không phải đuôi `.csv` (ví dụ: `.xlsx`, `.txt`).
  * Hệ thống (Client) từ chối file, hiển thị thông báo lỗi: "Chỉ chấp nhận file định dạng .csv". Quy trình kết thúc.

* **Exception Flow 2 (File CSV trống/Sai cấu trúc header):**
  * Tại bước 4, hệ thống phát hiện dòng đầu tiên (header) không đúng định dạng `name,price,description,imageUrl,category_id` hoặc file không có sản phẩm nào.
  * Hệ thống từ chối import, hiển thị thông báo lỗi cấu trúc file. Quy trình kết thúc.

* **Exception Flow 3 (Dữ liệu dòng bị thiếu trường bắt buộc):**
  * Tại bước 8, Backend phát hiện một hoặc nhiều dòng bị thiếu trường `name` (rỗng).
  * Backend dừng chèn, thực hiện **Rollback** giao dịch CSDL (không lưu bất kỳ sản phẩm nào từ file CSV này).
  * Backend trả về lỗi 400 Bad Request kèm báo cáo lỗi chi tiết: chỉ rõ dòng nào bị thiếu tên. Quy trình kết thúc.

* **Exception Flow 4 (Giá sản phẩm không hợp lệ):**
  * Tại bước 8, Backend phát hiện một dòng sản phẩm có cột `price` $\le$ 0 hoặc không phải kiểu số.
  * Backend dừng chèn, thực hiện **Rollback** giao dịch CSDL.
  * Backend trả về lỗi 400 Bad Request kèm thông báo lỗi chi tiết ở dòng tương ứng. Quy trình kết thúc.

* **Exception Flow 5 (Quyền truy cập không hợp lệ):**
  * Tại bước 6, request gửi lên Backend không có token hoặc token của người dùng thường (`role = 'user'`).
  * Backend từ chối xử lý, trả về lỗi HTTP 401 Unauthorized hoặc 403 Forbidden. Quy trình kết thúc.

---

## 4. Thiết kế Ca kiểm thử (Use Case Test Cases)

Để bao phủ tất cả các kịch bản của Use Case, các ca kiểm thử sau được thiết kế dưới kỹ thuật Use Case Testing:

| Mã Test Case | Kịch bản kiểm thử (Scenario / Flow Covered) | Dữ liệu đầu vào mong đợi | Kết quả mong đợi |
|---|---|---|---|
| **TC-IMPORT-001** | Luồng chính - Import thành công | File CSV hợp lệ có 3 dòng sản phẩm hợp lệ. | HTTP 200 OK. Hiển thị báo cáo 3/3 sản phẩm được thêm thành công. CSDL lưu đúng 3 sản phẩm. |
| **TC-IMPORT-002** | Exception Flow 1 - Định dạng đuôi file sai | Chọn file `products.xlsx` hoặc `products.txt`. | Hệ thống báo lỗi định dạng ngay tại client, không cho phép tải lên. |
| **TC-IMPORT-003** | Exception Flow 2 - Sai Header/Cấu trúc file | File CSV có dòng header: `product_name,product_price,desc`. | Hệ thống báo lỗi sai cấu trúc header file CSV. |
| **TC-IMPORT-004** | Exception Flow 3 - Thiếu tên sản phẩm (Rollback) | File CSV gồm 3 dòng: dòng 1 và 3 hợp lệ, dòng 2 có `name` bị để trống. | HTTP 400 Bad Request. Báo cáo lỗi chỉ rõ hàng số 3 (dòng 2 dữ liệu) thiếu tên sản phẩm. **Đặc biệt**: Toàn bộ dữ liệu của dòng 1 và 3 không được phép lưu vào CSDL (Rollback thành công). |
| **TC-IMPORT-005** | Exception Flow 4 - Giá không dương (Rollback) | File CSV gồm 3 dòng: dòng 1 và 2 hợp lệ, dòng 3 có `price = -5000` hoặc `price = 0`. | HTTP 400 Bad Request. Báo cáo lỗi dòng số 4 có giá không hợp lệ. Thực hiện Rollback sạch DB, không chèn dòng 1 và 2. |
| **TC-IMPORT-006** | Exception Flow 5 - Quyền hạn không đúng | Gửi API import từ tài khoản thường (`role = 'user'`). | HTTP 403 Forbidden hoặc 401 Unauthorized. Không thay đổi CSDL. |
| **TC-IMPORT-007** | Alternative Flow 1 - Bọc mô tả trong dấu nháy kép (RFC 4180) | Cột mô tả của sản phẩm chứa dấu phẩy: `"Màu đỏ, size L"`. | Phân tích thành công cột mô tả đúng giá trị. Thêm sản phẩm thành công vào DB. |
| **TC-IMPORT-008** | Exception Flow 2 - File CSV trống | File CSV chỉ có dòng Header, không có dòng dữ liệu sản phẩm nào. | Client hoặc Backend báo lỗi "Không có dữ liệu để import" (HTTP 400). |

---

## 5. Giải thích Phân tích bằng tiếng Việt

Dưới đây là các điểm quan trọng rút ra từ quá trình phân tích ca sử dụng đối với chức năng FR-16 (Import Sản phẩm):

1. **Lỗ hổng logic nghiêm trọng ở Backend (Báo cáo Bug tiềm năng)**:
   - Theo đặc tả: *Nếu có lỗi ở bất kỳ dòng nào, toàn bộ import phải được rollback (giao dịch nguyên tử — all-or-nothing).*
   - Tuy nhiên, khi kiểm tra mã nguồn `application/backend/server.js`, API `/api/admin/import-products` thực thi chèn trực tiếp các dòng sản phẩm bằng `stmt.run()` trong vòng lặp `rows.forEach`. Hệ thống **chưa hề sử dụng cơ chế Transaction (`BEGIN TRANSACTION` / `ROLLBACK`)** của SQLite.
   - Do đó, khi một dòng bị lỗi, các dòng trước đó vẫn được chèn thành công vào database. Đây là một lỗi nghiêm trọng vi phạm đặc tả nghiệp vụ nguyên tử của FR-16.

2. **Cơ chế kiểm soát phân quyền (Access Control)**:
   - Tính năng import này chỉ dành riêng cho Admin. Vì vậy, các test case phải đảm bảo kiểm tra kiểm soát Token JWT và phân quyền `role = 'admin'` để tránh việc rò rỉ quyền cho người dùng thường thực hiện thêm sản phẩm hàng loạt (hủy hoại kho hàng).

3. **Xử lý đặc thù file CSV (RFC 4180)**:
   - Rất nhiều trường hợp mô tả sản phẩm hoặc tên sản phẩm chứa dấu phẩy (ví dụ: `"áo thun, màu đỏ"`). Kỹ thuật kiểm thử ca sử dụng phải thiết kế trường hợp dữ liệu được bọc nháy kép để kiểm tra tính tuân thủ tiêu chuẩn parse CSV của hệ thống, tránh lỗi lệch cột dữ liệu.
