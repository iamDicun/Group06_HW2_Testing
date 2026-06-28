# BÁO CÁO BÀI TẬP VỀ NHÀ HW02: DOMAIN TESTING & BOUNDARY VALUE ANALYSIS

**Môn học:** Kiểm thử phần mềm  
**Hệ thống kiểm thử (SUT):** [EShop](https://github.com/ttbhanh/eshop-sut)  
**Nhóm:** 06  
**Họ và tên:** Nguyễn Anh Khoa  
**MSSV:** 23127391  

---

## TỔNG QUAN PHẠM VI KIỂM THỬ
Báo cáo này trình bày chi tiết việc áp dụng hai kỹ thuật thiết kế blackbox testing: **Phân hoạch tương đương (EP)** và **Phân tích giá trị biên (BVA)** để thiết kế kịch bản kiểm thử cho 4 phân hệ chức năng được giao bao gồm:
1. **FR-04: Quản lý hồ sơ cá nhân (Web/API)**
2. **FR-10: Trạng thái Đơn hàng (Order State Machine)**
3. **FR-19: Quản lý Người dùng (Admin User Management)**
4. **Mobile App: Quản lý hồ sơ cá nhân (FR-04 trên Mobile)**

---

## YÊU CẦU 1: DOMAIN TESTING

### 1.1 Khái quát Phương pháp & Quy trình áp dụng với AI
Kỹ thuật Phân hoạch tương đương (EP) được áp dụng nhằm chia miền giá trị đầu vào của các biến thành các phân hoạch tương đương. Các giá trị trong cùng một phân hoạch được giả định là có hành vi xử lý giống nhau bởi hệ thống. Do đó, ta chỉ cần chọn một giá trị đại diện từ mỗi phân hoạch để thiết kế ca kiểm thử, giúp tối ưu hóa số lượng test case mà vẫn đảm bảo độ bao phủ.
* **Quy trình thực hiện cùng AI:**
  1. AI hỗ trợ đọc tài liệu đặc tả yêu cầu (SRS) và đặc tả API để xác định danh sách các biến/tham số đầu vào.
  2. Xác định các phân hoạch hợp lệ (Valid Partitions) - nơi hệ thống xử lý thành công.
  3. Xác định các phân hoạch không hợp lệ (Invalid Partitions) - nơi hệ thống phát hiện lỗi và từ chối xử lý hoặc báo lỗi phù hợp.
  4. Lồng ghép các phân hoạch an toàn thông tin (chống leo thang quyền, chống tấn công XSS qua dữ liệu nhập).
  5. Xây dựng bảng miền trị (Domain Table) chi tiết cho từng biến.

---

### 1.2 Phân tích miền cho FR-04: Quản lý hồ sơ cá nhân (Web/API)
API cập nhật thông tin cá nhân được thực hiện qua phương thức `PUT /api/users/me` với payload chứa thông tin cập nhật.

#### Bảng miền trị (Domain Table) - FR-04 (Web/API)

| Tham số (Variable) | Phân hoạch (Partition) | Loại phân hoạch (Class Type) | Điều kiện / Giá trị đại diện | Ca kiểm thử tương ứng |
| :--- | :--- | :--- | :--- | :--- |
| **name** (Họ tên) | P1 — Độ dài hợp lệ | Valid | $1 \le \text{length} \le 255$<br>Ví dụ: `"Nguyễn Văn A"` | TC-PROFILE-001 |
| | P2 — Để rỗng | Invalid | $\text{length} = 0$<br>Ví dụ: `""` | TC-PROFILE-002 |
| | P3 — Không truyền trường | Invalid | Trường `name` không tồn tại trong JSON payload | TC-PROFILE-012 |
| | P4 — Độ dài quá giới hạn | Invalid | $\text{length} > 255$<br>Ví dụ: Chuỗi 256 ký tự | TC-PROFILE-004 |
| | P5 — Chứa mã độc XSS | Invalid | Chứa thẻ HTML/Script<br>Ví dụ: `<script>alert(1)</script>` | TC-PROFILE-005 |
| **phone** (Số điện thoại) | P1 — Độ dài 10 số, bắt đầu bằng 0 | Valid | $\text{length} = 10$, bắt đầu bằng `'0'`, chỉ chứa số<br>Ví dụ: `"0912345678"` | TC-PROFILE-006 |
| | P2 — Độ dài 11 số, bắt đầu bằng 0 | Valid | $\text{length} = 11$, bắt đầu bằng `'0'`, chỉ chứa số<br>Ví dụ: `"01234567890"` | TC-PROFILE-007 |
| | P3 — Độ dài quá ngắn | Invalid | $\text{length} < 10$, chỉ chứa số<br>Ví dụ: `"091234567"` | TC-PROFILE-008 |
| | P4 — Độ dài quá dài | Invalid | $\text{length} > 11$, chỉ chứa số<br>Ví dụ: `"091234567890"` | TC-PROFILE-009 |
| | P5 — Không bắt đầu bằng 0 | Invalid | Bắt đầu bằng số khác `'0'`<br>Ví dụ: `"1912345678"` | TC-PROFILE-010 |
| | P6 — Chứa ký tự chữ/đặc biệt | Invalid | Chứa ký tự không phải số<br>Ví dụ: `"0912a45678"` | TC-PROFILE-011 |
| | P7 — Để rỗng / Null | Invalid | $\text{length} = 0$ hoặc `null` | TC-PROFILE-012 |
| **shipping_address** (Địa chỉ) | P1 — Độ dài hợp lệ | Valid | $1 \le \text{length} \le 500$<br>Ví dụ: `"123 Nguyễn Huệ, Quận 1"` | TC-PROFILE-001 |
| | P2 — Để rỗng | Invalid | $\text{length} = 0$<br>Ví dụ: `""` | TC-PROFILE-013 |
| | P3 — Không truyền trường | Invalid | Trường `shipping_address` không có trong JSON payload | TC-PROFILE-012 |
| | P4 — Độ dài quá giới hạn | Invalid | $\text{length} > 500$<br>Ví dụ: Chuỗi 501 ký tự | TC-PROFILE-015 |
| | P5 — Chứa mã độc XSS | Invalid | Chứa thẻ HTML/Script<br>Ví dụ: `<script>alert(1)</script>` | TC-PROFILE-016 |
| **email** (Chặn sửa) | P1 — Không truyền / Giữ nguyên | Valid | Không truyền hoặc truyền giá trị khớp email hiện tại | TC-PROFILE-001 |
| | P2 — Thay đổi email | Invalid | Gửi email mới trong JSON payload<br>Ví dụ: `"new_email@eshop.com"` | TC-PROFILE-017 |
| **role** (Chặn sửa) | P1 — Không truyền / Giữ nguyên | Valid | Không truyền hoặc truyền giá trị khớp role hiện tại | TC-PROFILE-001 |
| | P2 — Nâng quyền | Invalid | Gửi `"role": "admin"` từ tài khoản user thường | TC-PROFILE-018 |
| **Authorization** (Xác thực) | P1 — Token hợp lệ | Valid | JWT Token hợp lệ của user đang đăng nhập | TC-PROFILE-001 |
| | P2 — Thiếu Token | Invalid | Không gửi Header `Authorization` | TC-PROFILE-019 |
| | P3 — Token không hợp lệ | Invalid | Token sai chữ ký, hết hạn hoặc sai định dạng | TC-PROFILE-020 |

---

### 1.3 Phân tích miền cho FR-10: Trạng thái Đơn hàng (Order State Machine)
Tính năng này được kiểm thử qua API Admin `PUT /api/admin/orders/:id/status` (để cập nhật trạng thái đơn hàng bất kỳ) và API User `PUT /api/orders/:id/cancel` (để hủy đơn hàng chính chủ).

#### Bảng miền trị (Domain Table) - FR-10 (Order State)

| Biến / Trạng thái | Phân hoạch (Partition) | Loại phân hoạch (Class Type) | Điều kiện / Mô tả | Ca kiểm thử tương ứng |
| :--- | :--- | :--- | :--- | :--- |
| **id** (Mã đơn hàng) | P1 — ID hợp lệ | Valid | $1 \le \text{id} \le \text{MAX\_INT}$, tồn tại thực tế trong DB | TC-ORDERSTATE-001 |
| | P2 — ID không tồn tại | Invalid | $\text{id} \ge 1$ nhưng không có trong DB (ví dụ: `999999`) | TC-ORDERSTATE-003 |
| | P3 — ID bằng 0 | Invalid | $\text{id} = 0$ | TC-ORDERSTATE-004 |
| | P4 — ID số âm | Invalid | $\text{id} < 0$ (ví dụ: `-5`) | TC-ORDERSTATE-005 |
| | P5 — Sai kiểu dữ liệu | Invalid | Kiểu chuỗi, số thực, null (ví dụ: `"abc"`, `1.5`) | TC-ORDERSTATE-006 |
| **status** (Trạng thái mới gửi lên) | P1 — Giá trị Enum hợp lệ | Valid | $\text{status} \in \{\text{"pending"}, \text{"confirmed"}, \text{"shipping"}, \text{"delivered"}, \text{"canceled"}\}$ | TC-ORDERSTATE-001 |
| | P2 — Chuỗi không hợp lệ | Invalid | Trạng thái lạ không thuộc Enum (ví dụ: `"processing"`) | TC-ORDERSTATE-007 |
| | P3 — Để trống / Null | Invalid | $\text{status} = ""$ hoặc `null` hoặc không truyền | TC-ORDERSTATE-008 |
| **current_status** (Trạng thái hiện tại trong DB) | P1 — Trạng thái `pending` | Valid | Cho phép Admin xác nhận (`confirmed`) hoặc User/Admin hủy (`canceled`) | TC-ORDERSTATE-001, TC-ORDERSTATE-011 |
| | P2 — Trạng thái `confirmed` | Valid | Cho phép Admin giao hàng (`shipping`) hoặc User/Admin hủy (`canceled`) | TC-ORDERSTATE-002, TC-ORDERSTATE-013 |
| | P3 — Trạng thái `shipping` | Valid | Chỉ cho phép Admin hoàn tất (`delivered`). Không ai được phép hủy lúc này. | TC-ORDERSTATE-010, TC-ORDERSTATE-015 |
| | P4 — Trạng thái kết thúc `delivered` | Invalid | Đơn hàng đã giao thành công. Chặn mọi thay đổi trạng thái đi tiếp. | TC-ORDERSTATE-016 |
| | P5 — Trạng thái kết thúc `canceled` | Invalid | Đơn hàng đã hủy. Chặn mọi thay đổi trạng thái đi tiếp. | TC-ORDERSTATE-018 |
| **role** (Quyền hạn từ JWT Token) | P1 — Vai trò Admin | Valid | `role = "admin"` thực hiện API Admin cập nhật trạng thái | TC-ORDERSTATE-001 |
| | P2 — Vai trò User thường | Invalid / Valid | Từ chối ở API Admin (HTTP 403) nhưng cho phép gọi API hủy đơn chính chủ | TC-ORDERSTATE-023, TC-ORDERSTATE-025 |
| **order_ownership** (Quan hệ sở hữu) | P1 — Hủy đơn chính chủ | Valid | Tài khoản gửi request hủy đơn trùng với chủ đơn hàng trong DB | TC-ORDERSTATE-025 |
| | P2 — Hủy đơn người khác | Invalid | Tài khoản gửi request hủy đơn KHÁC chủ đơn hàng trong DB | TC-ORDERSTATE-026 |

---

### 1.4 Phân tích miền cho FR-19: Quản lý Người dùng (Admin)
Admin thực hiện xem danh sách người dùng (`GET /api/admin/users`) và xóa người dùng (`DELETE /api/admin/users/:id`).

#### Bảng miền trị (Domain Table) - FR-19 (User Management)

| Biến / Điều kiện | Phân hoạch (Partition) | Loại phân hoạch (Class Type) | Điều kiện / Mô tả | Ca kiểm thử tương ứng |
| :--- | :--- | :--- | :--- | :--- |
| **id** (Mã người dùng cần xóa) | P1 — ID hợp lệ | Valid | $1 \le \text{id} \le \text{MAX\_INT}$, tồn tại người dùng khác | TC-USERMGMT-001 |
| | P2 — ID không tồn tại | Invalid | $\text{id} \ge 1$ nhưng không có trong DB | TC-USERMGMT-005 |
| | P3 — ID bằng 0 | Invalid | $\text{id} = 0$ | TC-USERMGMT-006 |
| | P4 — ID số âm | Invalid | $\text{id} < 0$ | TC-USERMGMT-007 |
| | P5 — Sai kiểu dữ liệu | Invalid | Kiểu chuỗi, số thực, null | TC-USERMGMT-008 |
| **role** (Quyền Admin) | P1 — Vai trò Admin | Valid | `role = "admin"`. Cho phép thực thi API. | TC-USERMGMT-001 |
| | P2 — Vai trò User thường | Invalid | `role = "user"`. Từ chối truy cập (HTTP 403 Forbidden). | TC-USERMGMT-013 |
| **self_deletion** (Logic tự xóa) | P1 — Xóa người khác | Valid | $\text{token\_user\_id} \neq \text{target\_user\_id}$ | TC-USERMGMT-001 |
| | P2 — Tự xóa chính mình | Invalid | $\text{token\_user\_id} = \text{target\_user\_id}$ (từ chối xóa) | TC-USERMGMT-010 |
| **target_user_is_self** (Giao diện UI) | P1 — Đối tượng khác | Valid | Nút "Xóa" hiển thị bình thường có màu đỏ, bấm được | TC-USERMGMT-003 |
| | P2 — Chính Admin đang đăng nhập | Invalid | Nút "Xóa" bị ẩn hoặc vô hiệu hóa (disabled) | TC-USERMGMT-011 |

---

### 1.5 Phân tích miền cho Mobile App: Quản lý hồ sơ cá nhân
Phân tích các thuộc tính và hành vi đặc thù trên môi trường di động của FR-04.

#### Bảng miền trị (Domain Table) - Mobile Profile

| Biến / Tham số di động | Phân hoạch (Partition) | Loại phân hoạch (Class Type) | Điều kiện / Hành vi trên Mobile | Ca kiểm thử tương ứng |
| :--- | :--- | :--- | :--- | :--- |
| **phone_input_type** (Bàn phím) | P1 — Bàn phím số chuyên biệt | Valid | Prop `keyboardType` là `"phone-pad"` hoặc `"numeric"` | TC-MOBILE-001 |
| | P2 — Bàn phím mặc định | Invalid | Prop `keyboardType` bị thiếu hoặc là `"default"` | TC-MOBILE-002 |
| **phone_value_client** (Bypass Clipboard) | P1 — Nhập chữ từ clipboard | Invalid | Copy chuỗi chứa chữ cái (ví dụ: `"0912abc345"`) rồi paste | TC-MOBILE-008 |
| **address_input_multiline** | P1 — Đa dòng (multiline) | Valid | Prop `multiline={true}`. Cho phép xuống dòng bằng nút Enter | TC-MOBILE-010 |
| | P2 — Một dòng | Invalid | Prop `multiline` là `false` hoặc thiếu | TC-MOBILE-010 |
| **base_url_lan** (IP Backend) | P1 — IP LAN cùng subnet | Valid | Thiết bị chung WiFi mạng nội bộ PC (ví dụ: `192.168.1.5:3000`) | TC-MOBILE-011 |
| | P2 — Localhost IP | Invalid | Thiết bị trỏ tới `localhost` hoặc `127.0.0.1` (báo lỗi kết nối) | TC-MOBILE-013 |
| | P3 — Tunnel Ngrok URL | Valid | Sử dụng domain Ngrok (ví dụ: `https://xxxx.ngrok-free.app`) | TC-MOBILE-012 |
| **network_connectivity_state** | P1 — Mạng trực tuyến ổn định | Valid | Gửi request thành công, nhận phản hồi bình thường | TC-MOBILE-016 |
| | P2 — Mạng ngoại tuyến | Invalid | Báo lỗi ngay lập tức mà không gửi request, hiển thị alert Offline | TC-MOBILE-017 |
| | P3 — Mạng yếu chập chờn | Invalid | Request chờ phản hồi vượt quá mốc timeout biên | TC-MOBILE-018 |
| **keyboard_viewport_adjust** | P1 — Co giãn thích ứng | Valid | Viewport tự đẩy lên khi bàn phím ảo mở (KeyboardAvoidingView) | TC-MOBILE-019 |
| | P2 — Bị che lấp | Invalid | TextInput và nút bấm bị đè khuất, không tương tác được | TC-MOBILE-020 |

---

## YÊU CẦU 2: BOUNDARY VALUE ANALYSIS

### 2.1 Khái quát Phương pháp & Quy trình áp dụng với AI
Kỹ thuật Phân tích giá trị biên (BVA) tập trung vào kiểm thử các giá trị ở ranh giới của các phân hoạch tương đương, do đây là nơi lập trình viên dễ mắc lỗi nhất (lỗi "off-by-one", ví dụ dùng `<` thay vì `<=`).
Áp dụng kỹ thuật kiểm thử biên 2 điểm cho mỗi ranh giới:
*   **Giá trị On (On-point):** Nằm trực tiếp trên đường biên.
*   **Giá trị Off (Off-point):** Nằm sát đường biên nhưng ở phía đối diện của phân hoạch (phân hoạch không hợp lệ nếu On hợp lệ, và ngược lại).

---

### 2.2 Phân tích giá trị biên cho FR-04: Quản lý hồ sơ cá nhân (Web/API)

#### 1. Biên độ dài của trường Họ tên (`name`):
Ràng buộc: Bắt buộc, độ dài từ 1 đến 255 ký tự.
*   **Biên dưới (1 ký tự):**
    *   **On-point (1 ký tự):** `"A"` $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (0 ký tự/Rỗng):** `""` $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   **Biên trên (255 ký tự):**
    *   **On-point (255 ký tự):** Chuỗi ký tự có độ dài đúng 255 $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (256 ký tự):** Chuỗi ký tự có độ dài đúng 256 $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   *Ca kiểm thử tương ứng:* TC-PROFILE-002, TC-PROFILE-003, TC-PROFILE-004.

#### 2. Biên độ dài của trường Số điện thoại (`phone`):
Ràng buộc: Độ dài 10 đến 11 ký tự số.
*   **Biên dưới (10 ký tự):**
    *   **On-point (10 ký tự):** `"0912345678"` $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (9 ký tự):** `"091234567"` $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   **Biên trên (11 ký tự):**
    *   **On-point (11 ký tự):** `"01234567890"` $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (12 ký tự):** `"012345678901"` $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   *Ca kiểm thử tương ứng:* TC-PROFILE-006, TC-PROFILE-007, TC-PROFILE-008, TC-PROFILE-009.

#### 3. Biên độ dài của trường Địa chỉ giao hàng (`shipping_address`):
Ràng buộc: Bắt buộc, độ dài từ 1 đến 500 ký tự.
*   **Biên dưới (1 ký tự):**
    *   **On-point (1 ký tự):** `"B"` $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (0 ký tự/Rỗng):** `""` $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   **Biên trên (500 ký tự):**
    *   **On-point (500 ký tự):** Chuỗi ký tự có độ dài đúng 500 $\rightarrow$ Hợp lệ (thành công).
    *   **Off-point (501 ký tự):** Chuỗi ký tự có độ dài đúng 501 $\rightarrow$ Không hợp lệ (bị chặn/báo lỗi).
*   *Ca kiểm thử tương ứng:* TC-PROFILE-013, TC-PROFILE-014, TC-PROFILE-015.

---

### 2.3 Phân tích giá trị biên cho FR-10: Trạng thái Đơn hàng (Order State Machine)

#### 1. Biên định danh đơn hàng (`id`):
*   **Biên dưới (ID = 1):**
    *   **On-point (id = 1):** Hợp lệ (đơn hàng đầu tiên).
    *   **Off-point (id = 0):** Không hợp lệ (báo lỗi HTTP 400).
*   *Ca kiểm thử tương ứng:* TC-ORDERSTATE-001, TC-ORDERSTATE-004.

#### 2. Biên logic chuyển đổi trạng thái đơn hàng (State Boundaries):
*   **Biên chặn hủy khi đang giao hàng (`shipping`):**
    *   **Tại trạng thái `confirmed`:** User và Admin có thể hủy đơn $\rightarrow$ Chuyển đổi trạng thái sang `canceled` thành công.
    *   **Tại trạng thái `shipping` (Biên chặn):** API cancel bị chặn hoàn toàn đối với User thường $\rightarrow$ Trả về lỗi phân quyền (HTTP 403/400).
*   **Biên đóng (Final States - `delivered` và `canceled`):**
    *   Một khi đã rơi vào `delivered` hoặc `canceled`, các trạng thái này đóng hoàn toàn. Mọi cố gắng gửi request thay đổi sang trạng thái mới (kể cả cập nhật trùng lặp hoặc quay ngược quy trình) đều bị từ chối $\rightarrow$ Trả về lỗi nghiệp vụ (HTTP 400).
*   *Ca kiểm thử tương ứng:* TC-ORDERSTATE-010, TC-ORDERSTATE-015, TC-ORDERSTATE-016, TC-ORDERSTATE-018.

---

### 2.4 Phân tích giá trị biên cho FR-19: Quản lý Người dùng (Admin)

#### 1. Biên định danh người dùng (`id`):
*   **Biên dưới (ID = 1):**
    *   **On-point (id = 1):** Hợp lệ (người dùng tồn tại thực tế).
    *   **Off-point (id = 0):** Không hợp lệ (báo lỗi HTTP 400).
*   *Ca kiểm thử tương ứng:* TC-USERMGMT-001, TC-USERMGMT-006.

#### 2. Biên logic tự xóa (`self_deletion`):
*   **Ranh giới đối chiếu ID:** Ngăn chặn Admin tự xóa chính tài khoản đang đăng nhập.
    *   **On-point (ID trùng - $\text{token\_user\_id} = \text{target\_user\_id}$):** Không hợp lệ $\rightarrow$ Server từ chối xử lý và trả về HTTP 400 Bad Request.
    *   **Off-point (ID khác - $\text{token\_user\_id} \ne \text{target\_user\_id}$):** Hợp lệ $\rightarrow$ Server thực hiện xóa thành công người dùng kia và trả về HTTP 200 OK.
*   *Ca kiểm thử tương ứng:* TC-USERMGMT-001, TC-USERMGMT-010.

---

### 2.5 Phân tích giá trị biên cho Mobile App: Quản lý hồ sơ cá nhân

#### 1. Biên chặn ký tự nhập tại Client (`phone_value_client`):
*   Thiết bị di động có thuộc tính `maxLength={11}` trên Input số điện thoại để giới hạn độ dài gõ trực tiếp của người dùng.
    *   **On-point (11 ký tự):** Gõ ký tự số thứ 11 thành công.
    *   **Off-point (Ký tự thứ 12):** TextInput chặn hoàn toàn, không cho gõ thêm hoặc hiển thị bất cứ ký tự số thứ 12 nào trên màn hình.
*   *Ca kiểm thử tương ứng:* TC-MOBILE-004.

#### 2. Biên thời gian phản hồi mạng (Timeout Boundary):
*   Ứng dụng di động cài đặt cấu hình timeout tối đa là **10.000 ms (10 giây)** để tránh trạng thái chờ vô hạn khi mạng chập chờn.
    *   **Phản hồi $\le$ 9.999 ms:** Đăng ký cập nhật thành công, loading đóng, hiển thị thông báo thành công.
    *   **Phản hồi $\ge$ 10.000 ms (On-point):** Hủy request kết nối, dừng loading indicator và hiển thị thông báo lỗi: *"Kết nối tới máy chủ thất bại (Request Timeout)"*.
*   *Ca kiểm thử tương ứng:* TC-MOBILE-018.

---

## YÊU CẦU 3: AI GAP ANALYSIS 

Dù đã các skill cho từng bước trong quá trình kiểm thử, AI vẫn mắc một số sai lầm như đặt tên file chưa phù hợp, tạo các test case dư thừa không thuộc domain testing như UI/UX và Security. 

---

## YÊU CẦU 4: BUG REPORTING 
Đối với các file markdown bug report, vui lòng kiểm tra ở thư mục tests/test-reports
![alt text](image.png)
