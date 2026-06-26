# Test Analysis — FR-19: Quản lý Người dùng (Domain Testing)

---

## 1. Test Analysis Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TA-ESHOP-KHOA-FR19-v1.0 |
| **Tính năng** | FR-19: Quản lý Người dùng (User Management) |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-06-27 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Completed |

---

## 2. Introduction

Tài liệu này thực hiện bước **Phân tích miền (Domain Testing Analysis)** cho tính năng **FR-19: Quản lý Người dùng (Admin)** trên hệ thống EShop (bao gồm cả các API phía Backend và giao diện điều hướng Web Admin).

Mục tiêu là xác định rõ ràng các lớp tương đương hợp lệ/không hợp lệ (Equivalence Partitioning) và phân tích các giá trị biên (Boundary Value Analysis) cho các biến/tham số đầu vào của API lấy danh sách người dùng (`GET /api/admin/users`), API xóa người dùng (`DELETE /api/admin/users/:id`), và các ràng buộc bảo mật về vai trò (Role), tự hủy tài khoản (Self-deletion), cùng các ràng buộc hiển thị an toàn trên giao diện Web Admin.

### Tài liệu tham chiếu:
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Kế hoạch kiểm thử: [tests/test-plans/TP-EShop-Khoa-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-plans/TP-EShop-Khoa-v1.0.md)

---

## 3. Domain Testing Analysis

Dưới đây là phân tích chi tiết và bảng miền trị (Domain Table) cho từng biến/trường đầu vào và ràng buộc nghiệp vụ liên quan của tính năng FR-19.

### 3.1 Variable: id (Mã người dùng cần xóa trong URL)

```
Variable: id
Type: Integer
Specification: Mã định danh của tài khoản người dùng cần xóa, truyền dưới dạng path parameter trong URL của API "DELETE /api/admin/users/:id". Phải là số nguyên dương và tồn tại trong CSDL.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid ID | Valid | 1 ≤ id ≤ MAX_INT | on: 1 / off: 0 | `MAX_INT` assumed (e.g. 2147483647). ID must exist in DB. |
| P2 — Non-existent ID | Invalid | id ≥ 1 | N/A | ID is valid format but does not exist in DB (e.g. 999999). |
| P3 — Zero | Invalid | id = 0 | off: 0 | |
| P4 — Negative ID | Invalid | id < 0 | off: -1 | |
| P5 — Wrong type | Invalid | non-integer / string / null / undefined | N/A | (assumed) e.g. `"abc"`, `1.5`, `null`, `undefined` |

---

### 3.2 Variable: Authorization Header (Xác thực tài khoản Admin)

```
Variable: Authorization
Type: String
Specification: Yêu cầu Header: "Authorization: Bearer <token>" chứa JWT Token hợp lệ của Admin.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid Token | Valid | JWT Token hợp lệ | N/A | Token đúng định dạng, còn hạn và chữ ký hợp lệ. |
| P2 — Missing Token | Invalid | Không truyền Header `Authorization` | N/A | Trả về HTTP 401 Unauthorized. |
| P3 — Invalid Format | Invalid | Token sai định dạng (không bắt đầu bằng Bearer) | N/A | (assumed) e.g. `"Bearer"`, `"Token <token>"` |
| P4 — Expired / Corrupted | Invalid | Token hết hạn hoặc chữ ký không hợp lệ | N/A | Trả về HTTP 401 Unauthorized. |

---

### 3.3 Variable: role (Quyền hạn của tài khoản trong Token)

```
Variable: role
Type: String (Enum)
Specification: Quyết định quyền hạn thực hiện các tác vụ của Admin (Xem danh sách, Xóa người dùng).
- Cả hai API "GET /api/admin/users" và "DELETE /api/admin/users/:id" yêu cầu tài khoản phải có role = 'admin'.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Admin Role | Valid | role = "admin" | N/A | Được quyền truy cập các API Admin (HTTP 200 OK / 200 OK). |
| P2 — User Role | Invalid | role = "user" | N/A | Bị chặn truy cập các API Admin (HTTP 403 Forbidden). |
| P3 — Invalid/Unknown Role | Invalid | role ∉ {"admin", "user"} | N/A | (assumed) e.g. `"guest"`, `"moderator"` |
| P4 — Missing Role | Invalid | role = null / undefined | N/A | (assumed) |

---

### 3.4 Variable: self_deletion (Hành vi tự xóa tài khoản đang đăng nhập)

```
Variable: self_deletion
Type: Boolean / Relation (Logical Constraint)
Specification: Admin không được phép xóa chính tài khoản mà mình đang sử dụng để đăng nhập và thực hiện request xóa.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Delete other user | Valid | token_user_id ≠ target_user_id | N/A | Admin thực hiện xóa tài khoản của người dùng khác (HTTP 200 OK). |
| P2 — Delete self | Invalid | token_user_id = target_user_id | N/A | Admin tự xóa tài khoản của chính mình (HTTP 400 Bad Request). |

---

### 3.5 Variable: target_user_is_self (Trạng thái hiển thị hành động Xóa trên Web Admin)

```
Variable: target_user_is_self
Type: Boolean (Logical UI Flag)
Specification: Xác định trạng thái và tính tương tác của nút "Xóa" tương ứng với từng tài khoản trong danh sách hiển thị trên Web Admin UI.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Other user | Valid | target_user_id ≠ current_admin_id | N/A | Nút "Xóa" hiển thị bình thường, có màu đỏ (nguy hiểm - FR-21) và cho phép bấm để kích hoạt confirmation dialog (assumed). |
| P2 — Current admin | Invalid | target_user_id = current_admin_id | N/A | Nút "Xóa" bị ẩn (hidden) hoặc vô hiệu hóa (disabled - non-interactive) trên dòng của chính Admin đang đăng nhập. |

---

## 4. Giải thích Phân tích bằng tiếng Việt

Dưới đây là tóm tắt các điểm quan trọng rút ra từ quá trình phân tích miền cho tính năng FR-19 (Quản lý Người dùng):

1. **Tổng hợp số lớp tương đương (Partitions):**
   - **id (Mã người dùng cần xóa):** Gồm 1 lớp hợp lệ (số nguyên dương đại diện cho một người dùng tồn tại thực tế trong DB) và 4 lớp không hợp lệ (ID không tồn tại, ID bằng 0, ID âm, sai kiểu dữ liệu như chuỗi ký tự hoặc số thực).
   - **Authorization Header & role (Xác thực và phân quyền):** Xác định quyền hạn truy cập các endpoint quản lý admin (`/api/admin/users`). Chỉ có token hợp lệ với vai trò `admin` (P1) mới được phép thực thi. Người dùng thông thường (`role = 'user'`) sẽ bị từ chối truy cập (HTTP 403 Forbidden).
   - **self_deletion (Ràng buộc tự xóa):** Đây là ràng buộc logic quan trọng nhất của API xóa người dùng. Ngăn chặn triệt để hành động tự hủy tài khoản bằng cách đối chiếu thông tin người thực hiện (`token_user_id`) với đối tượng bị xóa (`target_user_id`).
   - **target_user_is_self (Giao diện Web Admin):** Chuyển đổi ràng buộc nghiệp vụ của backend lên UI nhằm nâng cao trải nghiệm người dùng, vô hiệu hóa hoặc ẩn nút xóa đối với dòng thông tin của chính admin đó.

2. **Các giá trị biên quan trọng cần chú ý:**
   - **Biên của `id`:** Biên dưới là **1** (on: 1 - hợp lệ, off: 0 - không hợp lệ).
   - **Biên logic tự xóa (`self_deletion`):** Điểm nhạy cảm nhất là khi `token_user_id = target_user_id`. Biên này đóng hoàn toàn nhằm bảo vệ phiên làm việc của Admin hiện tại không bị gián đoạn hoặc làm mất tài khoản quản trị chính thức duy nhất.
   - **Ràng buộc hiển thị màu sắc và xác nhận:** Nút xóa người dùng phải có màu đỏ (dangerous action per FR-21). Mặc dù đặc tả không bắt buộc confirmation dialog cho tính năng xóa người dùng, việc thiết kế một popup/dialog xác nhận là cần thiết (assumed) trước khi gửi yêu cầu `DELETE` lên hệ thống.

3. **Lưu ý đặc biệt (Giám sát đầu ra của API GET):**
   - Phân tích an toàn thông tin (Security Testing): Mặc dù không trực tiếp là tham số đầu vào, cấu trúc phản hồi của API `GET /api/admin/users` cần phải được giám sát để đảm bảo không trả về trường `password` (dù là plaintext hay hash) để tuân thủ đặc tả an toàn thông tin của hệ thống.
   - Các giả định về độ lớn của ID (`MAX_INT`) và việc vô hiệu hóa nút xóa trên UI là các giả định thiết kế kiểm thử tiêu chuẩn nhằm đảm bảo kiểm thử bao phủ toàn diện cả tầng giao diện và tầng dịch vụ.
