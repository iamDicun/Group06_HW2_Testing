# Test Analysis — FR-04: Quản lý hồ sơ cá nhân (Domain Testing)

---

## 1. Test Analysis Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TA-ESHOP-KHOA-FR04-v1.0 |
| **Tính năng** | FR-04: Quản lý hồ sơ cá nhân (Profile Management) |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-06-27 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Completed |

---

## 2. Introduction

Tài liệu này thực hiện bước **Phân tích miền (Domain Testing Analysis)** cho tính năng **FR-04: Quản lý hồ sơ cá nhân** trên hệ thống EShop (bao gồm cả giao diện Web và Mobile). 

Mục tiêu là xác định rõ ràng các lớp tương đương hợp lệ/không hợp lệ (Equivalence Partitioning) và phân tích các giá trị biên (Boundary Value Analysis) cho tất cả các trường dữ liệu đầu vào của API cập nhật hồ sơ (`PUT /api/users/me`) và các ràng buộc bảo mật liên quan.

### Tài liệu tham chiếu:
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Kế hoạch kiểm thử: [tests/test-plans/TP-EShop-Khoa-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-plans/TP-EShop-Khoa-v1.0.md)

---

## 3. Domain Testing Analysis

Dưới đây là phân tích chi tiết và bảng miền trị (Domain Table) cho từng biến/trường đầu vào của tính năng FR-04.

### 3.1 Variable: name (Họ Tên)

```
Variable: name
Type: String
Specification: Bắt buộc nhập, cho phép cập nhật Họ Tên. (Đặc tả không nêu rõ giới hạn độ dài nên áp dụng giới hạn mặc định: 1 - 255 ký tự).
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid length | Valid | 1 ≤ length ≤ 255 | on: 1, 255 / off: 0, 256 | |
| P2 — Empty | Invalid | length = 0 | off: 0 | `""` hoặc chỉ chứa khoảng trắng (assumed) |
| P3 — Null / missing | Invalid | null / undefined / omitted | N/A | Trường `name` không được truyền trong payload JSON |
| P4 — Too long | Invalid | length > 255 | off: 256 | (assumed) |
| P5 — Contains HTML/Script tags | Invalid | Chứa các thẻ như `<script>`, `<html>` | N/A | (assumed) Kiểm thử chống XSS (SEC-04) |

---

### 3.2 Variable: phone (Số điện thoại)

```
Variable: phone
Type: String
Specification: Bắt đầu bằng số "0", từ 10–11 chữ số.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid length 10 | Valid | length = 10 AND starts with '0' AND contains only digits | on: 10 / off: 9, 11 | Ví dụ: `"0912345678"` |
| P2 — Valid length 11 | Valid | length = 11 AND starts with '0' AND contains only digits | on: 11 / off: 10, 12 | Ví dụ: `"01234567890"` |
| P3 — Too short | Invalid | length < 10 AND contains only digits | off: 9 | Ví dụ: `"091234567"` |
| P4 — Too long | Invalid | length > 11 AND contains only digits | off: 12 | Ví dụ: `"091234567890"` |
| P5 — Does not start with '0' | Invalid | starts with ≠ '0' | N/A | Ví dụ: `"1912345678"` |
| P6 — Contains non-digits | Invalid | Chứa chữ cái, khoảng trắng hoặc ký tự đặc biệt | N/A | Ví dụ: `"0912a45678"`, `"0912-345-678"` |
| P7 — Empty / Null / Missing | Invalid | length = 0 hoặc null hoặc không truyền | N/A | (assumed) Giả định Số điện thoại là bắt buộc khi cập nhật |

---

### 3.3 Variable: shipping_address (Địa chỉ giao hàng mặc định)

```
Variable: shipping_address
Type: String
Specification: Cho phép cập nhật Địa chỉ giao hàng mặc định. (Đặc tả không nêu rõ giới hạn độ dài nên áp dụng giới hạn mặc định: 1 - 500 ký tự).
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid length | Valid | 1 ≤ length ≤ 500 | on: 1, 500 / off: 0, 501 | |
| P2 — Empty | Invalid | length = 0 | off: 0 | `""` hoặc chỉ chứa khoảng trắng (assumed) |
| P3 — Null / missing | Invalid | null / undefined / omitted | N/A | Trường `shipping_address` không được truyền trong payload JSON |
| P4 — Too long | Invalid | length > 500 | off: 501 | (assumed) |
| P5 — Contains HTML/Script tags | Invalid | Chứa các thẻ như `<script>`, `<html>` | N/A | (assumed) Kiểm thử chống XSS (SEC-04) |

---

### 3.4 Variable: email (Ràng buộc không cho phép thay đổi)

```
Variable: email
Type: String
Specification: Email không được phép thay đổi qua giao diện.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Exclude from payload | Valid | Không truyền trường `email` trong JSON | N/A | Hành vi cập nhật bình thường |
| P2 — Keep same email | Valid | Truyền trường `email` nhưng giá trị khớp với email hiện tại | N/A | |
| P3 — Modify email | Invalid | Truyền trường `email` có giá trị khác với email hiện tại | N/A | API phải bỏ qua trường này hoặc trả về lỗi (HTTP 400) |

---

### 3.5 Variable: role (Quyền hạn - Chống leo thang đặc quyền)

```
Variable: role
Type: String
Specification: Người dùng không thể tự thay đổi thuộc tính role (SEC-06).
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Exclude from payload | Valid | Không truyền trường `role` trong JSON | N/A | Hành vi cập nhật bình thường |
| P2 — Keep same role | Valid | Truyền trường `role` khớp với role hiện tại | N/A | |
| P3 — Elevate role | Invalid | Người dùng (role = 'user') gửi payload chứa `"role": "admin"` | N/A | Phải bị API bỏ qua hoặc từ chối (HTTP 400/403) |

---

### 3.6 Variable: Authorization Header (Xác thực người dùng)

```
Variable: Authorization
Type: String
Specification: Yêu cầu Header: "Authorization: Bearer <token>".
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid Token | Valid | JWT Token hợp lệ của user đang đăng nhập | N/A | Cho phép thực hiện API |
| P2 — Missing Token | Invalid | Không truyền Header `Authorization` | N/A | Trả về HTTP 401 Unauthorized |
| P3 — Invalid Token | Invalid | Token sai định dạng, hết hạn hoặc signature không hợp lệ | N/A | Trả về HTTP 401 Unauthorized |

---

## 4. Giải thích Phân tích bằng tiếng Việt

Dưới đây là tóm tắt các điểm quan trọng rút ra từ quá trình phân tích miền cho tính năng FR-04:

1. **Tổng hợp số lớp tương đương (Partitions):**
   - **name (Họ Tên):** Gồm 1 lớp hợp lệ (độ dài 1 - 255 ký tự) và 4 lớp không hợp lệ (bỏ trống, quá dài, null/không truyền, chứa mã độc HTML/Script để kiểm tra lỗ hổng XSS).
   - **phone (Số điện thoại):** Có 2 lớp hợp lệ tương ứng với độ dài 10 chữ số (đầu số 10 số mới) và 11 chữ số (đầu số 11 số cũ) bắt đầu bằng `0`. Có 5 lớp không hợp lệ (quá ngắn < 10, quá dài > 11, bắt đầu bằng số khác 0, chứa ký tự không phải số, và null/bỏ trống).
   - **shipping_address (Địa chỉ):** Gồm 1 lớp hợp lệ (độ dài 1 - 500 ký tự) và 4 lớp không hợp lệ tương tự trường `name`.
   - **email & role:** Đây là các ràng buộc bất biến (immutable/read-only). Domain testing tập trung vào phân hoạch hợp lệ (không đổi) và phân hoạch không hợp lệ (người dùng cố tình gửi email mới hoặc cố leo thang quyền lên `admin`).
   - **Authorization Header:** Phân hoạch xác thực cơ bản để kiểm tra phân quyền đầu vào của API.

2. **Các giá trị biên quan trọng cần chú ý:**
   - **Độ dài Số điện thoại:** Biên dưới là **10** (on: 10 chữ số - hợp lệ, off: 9 chữ số - không hợp lệ). Biên trên là **11** (on: 11 chữ số - hợp lệ, off: 12 chữ số - không hợp lệ). Cần đặc biệt lưu ý kiểm tra số bắt đầu bằng `0`.
   - **Độ dài Họ Tên:** Biên dưới là **1** (on: 1 ký tự, off: 0 ký tự/rỗng). Biên trên là **255** (on: 255 ký tự, off: 256 ký tự).
   - **Độ dài Địa chỉ:** Biên dưới là **1** (on: 1 ký tự, off: 0 ký tự/rỗng). Biên trên là **500** (on: 500 ký tự, off: 501 ký tự).

3. **Lưu ý đặc biệt:**
   - Các giới hạn độ dài của `name` (255) và `shipping_address` (500) là các ràng buộc giả định hợp lý (assumed) theo chuẩn công nghiệp (thường ánh xạ vào kiểu VARCHAR trong database), do tài liệu đặc tả của EShop không ghi rõ giới hạn trên của hai trường này.
   - Kiểm thử bảo mật (Security testing) được lồng ghép vào phân tích miền thông qua việc kiểm tra việc xử lý thẻ HTML/Script (XSS) ở các trường string, cũng như kiểm tra cơ chế chặn sửa đổi `role` và `email` từ phía server khi client gửi payload bất hợp pháp.
