# Test Analysis — FR-04: Quản lý hồ sơ cá nhân (Mobile App - Domain Testing)

---

## 1. Test Analysis Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TA-ESHOP-KHOA-FR04-MOBILE-v1.0 |
| **Tính năng** | Mobile App - Hồ sơ cá nhân (FR-04 trên Mobile) |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-06-27 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Completed |

---

## 2. Introduction

Tài liệu này thực hiện bước **Phân tích miền (Domain Testing Analysis)** chuyên biệt cho tính năng **Hồ sơ cá nhân (FR-04) trên ứng dụng di động Mobile App** (React Native + Expo Go).

Mục tiêu là phân tích các lớp tương đương (Equivalence Partitioning) và các giá trị biên (Boundary Value Analysis) đối với các biến đầu vào đặc thù của giao diện Mobile (bàn phím số, responsive layout khi mở bàn phím ảo) cùng các biến cấu hình kết nối mạng (IP LAN, trạng thái ngoại tuyến Offline Mode).

### Tài liệu tham chiếu:
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Kế hoạch kiểm thử: [tests/test-plans/TP-EShop-Khoa-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-plans/TP-EShop-Khoa-v1.0.md)
- Phân tích miền tổng quát (Web & API): [tests/test-analysis/TA-EShop-Khoa-FR04-PROFILE-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-analysis/TA-EShop-Khoa-FR04-PROFILE-v1.0.md)

---

## 3. Domain Testing Analysis (Mobile Specific)

Dưới đây là phân tích chi tiết và bảng miền trị (Domain Table) cho từng biến/trường đầu vào và trạng thái nghiệp vụ di động của FR-04.

### 3.1 Variable: phone_input_type (Cấu hình Bàn phím cho trường Số điện thoại)

```
Variable: phone_input_type
Type: String (Enum / Prop)
Specification: Kiểm tra ràng buộc mở bàn phím số (Numeric Keyboard) đối với trường nhập số điện thoại trên di động.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Numeric Keyboard | Valid | prop `keyboardType` ∈ {"phone-pad", "numeric"} | N/A | Bàn phím số mở ra khi focus, hỗ trợ người dùng nhập nhanh số và ngăn các phím chữ. |
| P2 — Alphanumeric Keyboard | Invalid | prop `keyboardType` is undefined hoặc ∈ {"default", "email-address", "ascii-capable"} | N/A | Bàn phím chữ cái mặc định mở ra, cho phép gõ ký tự chữ, không đúng trải nghiệm mobile. |

---

### 3.2 Variable: phone_value_client (Giá trị Số điện thoại nhập ở Client Mobile)

```
Variable: phone_value_client
Type: String
Specification: Bắt đầu bằng số "0", từ 10–11 chữ số. Kiểm tra cơ chế validation trước khi gửi API (Client-side validation) và giới hạn ký tự nhập tối đa.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid length 10 | Valid | length = 10 AND starts with '0' AND contains only digits | on: 10 / off: 9, 11 | Ví dụ: `"0912345678"` |
| P2 — Valid length 11 | Valid | length = 11 AND starts with '0' AND contains only digits | on: 11 / off: 10, 12 | Ví dụ: `"01234567890"` |
| P3 — Too short | Invalid | length < 10 AND contains only digits | off: 9 | Ví dụ: `"091234567"`. Nút "Lưu" hiển thị lỗi validation. |
| P4 — Too long | Invalid | length > 11 AND contains only digits | off: 12 | Ví dụ: `"091234567890"`. (TextInput có thuộc tính `maxLength={11}` để chặn gõ quá 11 ký tự - assumed). |
| P5 — Does not start with '0' | Invalid | starts with ≠ '0' | N/A | Ví dụ: `"1912345678"`. Báo lỗi định dạng ở client. |
| P6 — Contains non-digits | Invalid | Chứa chữ cái, khoảng trắng hoặc ký tự đặc biệt | N/A | Ví dụ: `"0912a45678"`, `"0912 345 678"`. (Bàn phím chặn gõ nhưng cần kiểm tra khi paste từ clipboard). |
| P7 — Empty / Null | Invalid | length = 0 | off: 0 | Giả định SĐT là bắt buộc. Hiển thị lỗi rỗng. |

---

### 3.3 Variable: address_input_multiline (Cấu hình nhập Địa chỉ giao hàng)

```
Variable: address_input_multiline
Type: Boolean / Prop
Specification: TextInput của Địa chỉ phải hỗ trợ nhập nhiều dòng và scrollable để xem địa chỉ dài thuận tiện.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Multiline Enabled | Valid | prop `multiline={true}` | N/A | Cho phép xuống dòng bằng phím Enter/Return trên bàn phím ảo. |
| P2 — Singleline Only | Invalid | prop `multiline={false}` (hoặc mặc định) | N/A | Địa chỉ bị kéo dài sang một dòng duy nhất, khó chỉnh sửa địa chỉ chi tiết. |

---

### 3.4 Variable: base_url_lan (Cấu hình IP LAN kết nối Backend API)

```
Variable: base_url_lan
Type: String (URL)
Specification: Khả năng kết nối và gửi yêu cầu API thông qua IP LAN của máy chủ từ thiết bị di động (React Native).
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid Same LAN IP | Valid | IP thuộc cùng dải mạng con (subnet) của Server và Mobile (ví dụ: `http://192.168.1.5:3000`) | N/A | Kết nối thành công tới API Backend. |
| P2 — Localhost IP | Invalid | IP dạng loopback (`http://localhost:3000` hoặc `http://127.0.0.1:3000`) | N/A | Thất bại trên thiết bị di động thật (do trỏ về chính thiết bị). |
| P3 — Public Tunnel URL | Valid | URL tạo bởi công cụ tunnel (ví dụ: `https://xxxx.ngrok-free.app`) | N/A | Kết nối thành công trên cả LAN và WAN (assumed). |
| P4 — Different Subnet IP | Invalid | IP thuộc dải mạng con khác (ví dụ: host là `10.0.0.5`, mobile là `192.168.1.10`) | N/A | Kết nối timeout (Request Timeout). |
| P5 — Missing Protocol/Port | Invalid | Thiếu giao thức `http://` hoặc thiếu port `3000` | N/A | Ví dụ: `192.168.1.5`. App không thể phân tách URL và báo lỗi. |

---

### 3.5 Variable: network_connectivity_state (Trạng thái mạng trên thiết bị di động)

```
Variable: network_connectivity_state
Type: State (Enum)
Specification: Xử lý các tình huống mất kết nối mạng đột ngột (Offline mode) hoặc mạng yếu khi cập nhật thông tin trên Mobile.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Online (Stable) | Valid | Thiết bị kết nối mạng ổn định (ping tới server < 500ms) | N/A | Gửi yêu cầu cập nhật profile thành công, hiển thị toast thông báo thành công. |
| P2 — Offline | Invalid | Thiết bị ngắt kết nối hoàn toàn (tắt WiFi, tắt data di động, chế độ máy bay) | N/A | Client tự phát hiện thông qua NetInfo, chặn gửi request, hiển thị toast cảnh báo: "Không có kết nối mạng". |
| P3 — Flaky Network / Timeout | Invalid | Thiết bị kết nối yếu, gói tin bị mất mát, Server phản hồi chậm > 10000ms | on: 10000ms / off: 9999ms | Thiết bị hiển thị loading indicator; sau 10 giây (timeout boundary) hủy request và thông báo: "Kết nối máy chủ thất bại". |

---

### 3.6 Variable: keyboard_viewport_adjust (UI Responsive khi mở bàn phím ảo)

```
Variable: keyboard_viewport_adjust
Type: State (Enum / Layout)
Specification: Kiểm tra tính responsive của giao diện nhập liệu khi bàn phím ảo xuất hiện, đảm bảo không che mất input đang focus hoặc nút Submit.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Adaptive Layout | Valid | Sử dụng `KeyboardAvoidingView` kết hợp `ScrollView` | N/A | Viewport tự co giãn hoặc đẩy lên phía trên khi bàn phím xuất hiện. Người dùng có thể kéo cuộn để điền tất cả các trường và bấm nút "Cập nhật". |
| P2 — Static Layout (Obscured) | Invalid | View bình thường tĩnh (Static View) | N/A | Bàn phím ảo đè lên các ô TextInput ở cuối màn hình và nút "Lưu thay đổi". Người dùng không thể tương tác hay gửi form. |

---

## 4. Giải thích Phân tích bằng tiếng Việt

Dưới đây là tóm tắt các điểm quan trọng rút ra từ quá trình phân tích miền cho tính năng FR-04 trên Mobile App:

1. **Tổng hợp số lớp tương đương (Partitions):**
   - **phone_input_type (Cấu hình Bàn phím):** Có 1 lớp hợp lệ sử dụng loại bàn phím số chuyên biệt (`phone-pad` hoặc `numeric`) và 1 lớp không hợp lệ (mở bàn phím chữ cái mặc định).
   - **phone_value_client (Giá trị Số điện thoại):** Tương tự như backend nhưng được ràng buộc thêm ở Client: 2 lớp hợp lệ (10 và 11 chữ số bắt đầu bằng `0`), và 5 lớp không hợp lệ (quá ngắn, quá dài, không bắt đầu bằng `0`, chứa ký tự chữ cái/đặc biệt, và bỏ trống).
   - **address_input_multiline (Địa chỉ multiline):** Có 1 lớp hợp lệ cho phép viết nhiều dòng và 1 lớp không hợp lệ khóa cố định 1 dòng.
   - **base_url_lan (Cấu hình IP LAN):** Gồm 2 lớp hợp lệ (IP LAN cùng lớp mạng hoặc URL Tunnel Ngrok) và 3 lớp không hợp lệ (localhost, khác subnet, hoặc URL sai định dạng/thiếu port).
   - **network_connectivity_state (Trạng thái mạng):** Gồm 1 lớp hợp lệ (mạng trực tuyến ổn định) và 2 lớp không hợp lệ (ngoại tuyến hoàn toàn, mạng chập chờn vượt quá thời gian timeout 10 giây).
   - **keyboard_viewport_adjust (Responsive UI):** Gồm 1 lớp hợp lệ (bố cục co giãn thích ứng với bàn phím ảo) và 1 lớp không hợp lệ (giao diện bị che lấp không thể cuộn).

2. **Các giá trị biên quan trọng cần chú ý:**
   - **Biên độ dài số điện thoại:** Biên dưới là **10** chữ số, biên trên là **11** chữ số. Ở client di động, ta cần cấu hình `maxLength={11}` trên TextInput để triệt tiêu các trường hợp trên biên trên ở bước nhập liệu.
   - **Biên thời gian phản hồi mạng (Timeout Boundary):** Đặt mốc biên **10.000 ms (10 giây)** để đóng kết nối và xử lý lỗi chập chờn. Việc kiểm thử biên này giúp đảm bảo ứng dụng không rơi vào trạng thái chờ vô hạn (infinite loading).
   - **Biên định dạng URL:** Phân tích kỹ biên cấu trúc của `base_url` để tránh việc cấu hình nhầm địa chỉ localhost trên thiết bị thật, điều mà kiểm thử viên thường mắc phải khi chuyển từ giả lập sang máy thật.

3. **Lưu ý đặc biệt cho kiểm thử di động:**
   - **Ngăn chặn Bypass ở Clipboard:** Mặc dù `keyboardType="phone-pad"` sẽ loại bỏ bàn phím ký tự chữ cái trên thiết bị di động, người dùng vẫn có thể copy một chuỗi chứa chữ cái (ví dụ: `"0912abc345"`) từ ứng dụng khác và paste vào TextInput. Kiểm thử viên cần kiểm tra xem hàm validate ở client (Regex/Check) có lọc sạch hoặc báo lỗi trường hợp paste này hay không.
   - **Tương thích Kích thước Bàn phím:** Kích thước bàn phím ảo khác nhau giữa hệ điều hành (Android vs iOS) và cấu hình bàn phím của người dùng (bàn phím thu nhỏ, bàn phím số mở rộng). Ứng dụng React Native cần sử dụng `KeyboardAvoidingView` đúng cấu hình (`behavior={Platform.OS === 'ios' ? 'padding' : 'height'}`) để hiển thị chính xác trên cả hai nền tảng.
