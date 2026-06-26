# Test Analysis — FR-10: Trạng thái Đơn hàng (Domain Testing)

---

## 1. Test Analysis Identifier

| Trường | Giá trị |
|---|---|
| **Document ID** | TA-ESHOP-KHOA-FR10-v1.0 |
| **Tính năng** | FR-10: Trạng thái Đơn hàng (Order State Machine) |
| **Hệ thống** | EShop (E-commerce System) |
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 2026-06-27 |
| **Tác giả** | Khoa (Group 06) |
| **Trạng thái** | Completed |

---

## 2. Introduction

Tài liệu này thực hiện bước **Phân tích miền (Domain Testing Analysis)** cho tính năng **FR-10: Trạng thái Đơn hàng (Order State Machine)** trên hệ thống EShop.

Mục tiêu là xác định rõ ràng các lớp tương đương hợp lệ/không hợp lệ (Equivalence Partitioning) và phân tích các giá trị biên (Boundary Value Analysis) cho tất cả các trường dữ liệu đầu vào của các API cập nhật trạng thái đơn hàng (`PUT /api/admin/orders/:id/status`) và API hủy đơn hàng (`PUT /api/orders/:id/cancel`), kết hợp các ràng buộc nghiệp vụ về vòng đời đơn hàng, phân quyền (Role) và sở hữu (Ownership).

### Tài liệu tham chiếu:
- Đặc tả yêu cầu hệ thống: [docs/README.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/README.md)
- Đặc tả API: [docs/api_specification.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/docs/api_specification.md)
- Kế hoạch kiểm thử: [tests/test-plans/TP-EShop-Khoa-v1.0.md](file:///e:/Users/Admin/Documents/GitHub/Group06_HW2_Testing/tests/test-plans/TP-EShop-Khoa-v1.0.md)

---

## 3. Domain Testing Analysis

Dưới đây là phân tích chi tiết và bảng miền trị (Domain Table) cho từng biến/trường đầu vào và trạng thái nghiệp vụ liên quan của tính năng FR-10.

### 3.1 Variable: id (Mã đơn hàng trong URL)

```
Variable: id
Type: Integer
Specification: Mã định danh của đơn hàng trên URL path. Phải là số nguyên dương và có tồn tại trong CSDL.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid ID | Valid | 1 ≤ id ≤ MAX_INT | on: 1 / off: 0 | `MAX_INT` assumed (e.g. 2147483647). ID must exist in DB. |
| P2 — Non-existent ID | Invalid | id ≥ 1 | N/A | ID is valid format but does not exist in DB (e.g. 999999). |
| P3 — Zero | Invalid | id = 0 | off: 0 | |
| P4 — Negative ID | Invalid | id < 0 | off: -1 | |
| P5 — Wrong type | Invalid | non-integer / string / null / undefined | N/A | (assumed) e.g. `"abc"`, `1.5`, `null`, `undefined` |

---

### 3.2 Variable: status (Trạng thái cập nhật mới trong body của API Admin)

```
Variable: status
Type: String (Enum)
Specification: Trạng thái mong muốn để cập nhật cho đơn hàng trong API Admin "PUT /api/admin/orders/:id/status".
Các giá trị hợp lệ: "pending", "confirmed", "shipping", "delivered", "canceled".
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid Enum values | Valid | status ∈ {"pending", "confirmed", "shipping", "delivered", "canceled"} | N/A | |
| P2 — Invalid String | Invalid | status ∉ {"pending", "confirmed", "shipping", "delivered", "canceled"} | N/A | (assumed) e.g. `"processing"`, `"completed"`, `"failed"`, `"unknown"` |
| P3 — Empty | Invalid | status = "" | N/A | (assumed) |
| P4 — Null / missing | Invalid | null / undefined / omitted | N/A | Trường `status` không được truyền hoặc bằng null |
| P5 — Wrong type | Invalid | non-string | N/A | (assumed) e.g. `123`, `true`, `[]`, `{}` |

---

### 3.3 Variable: current_status (Trạng thái hiện tại của đơn hàng trong DB - State Variable)

```
Variable: current_status
Type: String (Enum)
Specification: Trạng thái hiện tại của đơn hàng lưu trong CSDL trước khi thực hiện chuyển đổi. 
Quyết định tính hợp lệ của việc chuyển đổi sang trạng thái mới (State Transition Rule).
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — State 'pending' | Valid | current_status = "pending" | N/A | Cho phép chuyển sang: `confirmed` (bởi Admin) hoặc `canceled` (bởi User/Admin). |
| P2 — State 'confirmed' | Valid | current_status = "confirmed" | N/A | Cho phép chuyển sang: `shipping` (bởi Admin) hoặc `canceled` (bởi User/Admin). |
| P3 — State 'shipping' | Valid | current_status = "shipping" | N/A | Cho phép chuyển sang: `delivered` (bởi Admin). User & Admin không được hủy lúc này. |
| P4 — Final State 'delivered' | Invalid | current_status = "delivered" | N/A | Trạng thái kết thúc. Không được phép chuyển sang bất kỳ trạng thái nào khác. |
| P5 — Final State 'canceled' | Invalid | current_status = "canceled" | N/A | Trạng thái kết thúc. Không được phép chuyển sang bất kỳ trạng thái nào khác. |
| P6 — Invalid/Unknown State | Invalid | current_status ∉ {"pending", "confirmed", "shipping", "delivered", "canceled"} | N/A | (assumed) Trạng thái trong DB bị sai lệch dữ liệu. |

---

### 3.4 Variable: Authorization Header (Xác thực người dùng)

```
Variable: Authorization
Type: String
Specification: Yêu cầu Header: "Authorization: Bearer <token>".
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Valid Token | Valid | JWT Token hợp lệ của user đang đăng nhập | N/A | Token đúng định dạng, còn hạn và chữ ký hợp lệ. |
| P2 — Missing Token | Invalid | Không truyền Header `Authorization` | N/A | Trả về HTTP 401 Unauthorized |
| P3 — Invalid Format | Invalid | Token sai định dạng (không bắt đầu bằng Bearer) | N/A | (assumed) e.g. `"Bearer"`, `"Token <token>"` |
| P4 — Expired / Corrupted | Invalid | Token hết hạn hoặc chữ ký không hợp lệ | N/A | Trả về HTTP 401 Unauthorized |

---

### 3.5 Variable: role (Quyền hạn của tài khoản trong Token)

```
Variable: role
Type: String (Enum)
Specification: Quyết định quyền hạn thực hiện các API cập nhật trạng thái đơn hàng.
- API Admin "PUT /api/admin/orders/:id/status" yêu cầu role = 'admin'.
- API Hủy đơn "PUT /api/orders/:id/cancel" cho phép cả role = 'user' và role = 'admin'.
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Admin Role | Valid | role = "admin" | N/A | Hợp lệ cho cả API Admin và API Hủy đơn. |
| P2 — User Role | Valid | role = "user" | N/A | Hợp lệ cho API Hủy đơn (nếu sở hữu). Không hợp lệ cho API Admin. |
| P3 — Invalid Role | Invalid | role ∉ {"admin", "user"} | N/A | (assumed) e.g. `"guest"`, `"moderator"` |
| P4 — Missing Role | Invalid | role = null / undefined | N/A | (assumed) |

---

### 3.6 Variable: order_ownership (Mối quan hệ sở hữu đơn hàng khi User gọi API hủy đơn)

```
Variable: order_ownership
Type: Boolean / Relation
Specification: Người dùng chỉ được hủy đơn hàng của chính mình (chỉ áp dụng đối với API "PUT /api/orders/:id/cancel").
```

| Partition | Class Type | Range / Condition | Boundary Points | Notes |
|-----------|------------|-------------------|-----------------|-------|
| P1 — Owner | Valid | token_user_id = order_user_id | N/A | Người dùng bình thường hủy đơn hàng của chính mình. |
| P2 — Not Owner | Invalid | token_user_id ≠ order_user_id | N/A | Người dùng bình thường cố tình hủy đơn hàng của người khác (HTTP 403/400). |
| P3 — Admin override | Valid | role = "admin" | N/A | Admin được phép hủy bất kỳ đơn hàng nào của người khác mà không bị chặn bởi mối quan hệ sở hữu. |

---

## 4. Giải thích Phân tích bằng tiếng Việt

Dưới đây là tóm tắt các điểm quan trọng rút ra từ quá trình phân tích miền cho tính năng FR-10 (Trạng thái Đơn hàng):

1. **Tổng hợp số lớp tương đương (Partitions):**
   - **id (Mã đơn hàng):** Gồm 1 lớp hợp lệ (số nguyên dương tồn tại trong DB) và 4 lớp không hợp lệ (số nguyên dương nhưng không tồn tại, số 0, số âm, sai kiểu dữ liệu như chữ cái hay số thực).
   - **status (Trạng thái gửi lên):** Gồm 1 lớp hợp lệ chứa 5 giá trị trạng thái cho phép (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`) và 4 lớp không hợp lệ (trạng thái lạ, chuỗi rỗng, không truyền/null, sai kiểu dữ liệu).
   - **current_status (Trạng thái hiện tại trong DB):** Gồm 3 lớp hợp lệ tương ứng với các trạng thái cho phép chuyển đổi tiếp theo (`pending`, `confirmed`, `shipping`) và 3 lớp không hợp lệ / bị chặn (các trạng thái kết thúc `delivered`, `canceled` không thể đi tiếp, hoặc trạng thái lạ bị lỗi dữ liệu).
   - **Authorization Header & role:** Xác định các lớp tương đương cho xác thực token (hợp lệ, thiếu, sai định dạng, hết hạn) và phân quyền (Admin được cập nhật mọi trạng thái, User chỉ được gọi API hủy và bị chặn truy cập API Admin).
   - **order_ownership (Sở hữu đơn hàng):** Xác định sự ràng buộc giữa người dùng gửi yêu cầu và người sở hữu đơn hàng. Chỉ cho phép chính chủ (Owner) hoặc Admin thực hiện hủy đơn.

2. **Các giá trị biên quan trọng cần chú ý:**
   - **Biên của `id`:** Biên dưới là **1** (on: 1 - hợp lệ, off: 0 - không hợp lệ).
   - **Biên chuyển đổi trạng thái (State Transition Boundaries):**
     - Đơn hàng ở trạng thái `pending` và `confirmed` có thể chuyển sang `canceled` (bởi cả User và Admin).
     - Đơn hàng ở trạng thái `shipping` chỉ được phép chuyển sang `delivered` (bởi Admin). **Biên chặn**: Không được chuyển từ `shipping` sang `canceled` (cả User và Admin đều bị chặn theo quy tắc của sơ đồ chuyển đổi trạng thái và test plan).
     - Trạng thái kết thúc `delivered` và `canceled` là các biên đóng hoàn toàn (Final States). Mọi cố gắng chuyển đổi từ 2 trạng thái này đi sang bất kỳ trạng thái nào khác (kể cả quay ngược lại hay cập nhật chính nó) đều là không hợp lệ và phải bị từ chối.
     - Các trường hợp nhảy bước (ví dụ `pending` -> `shipping` không qua `confirmed`) hoặc đi ngược quy trình (ví dụ `confirmed` -> `pending`) đều là các biên vi phạm quy trình nghiệp vụ cần được API Admin kiểm soát và báo lỗi HTTP 400.

3. **Lưu ý đặc biệt (Giả định miền giá trị):**
   - Ràng buộc về ID đơn hàng (`id`) và kiểu dữ liệu lạ (`wrong type`) là các giả định chuẩn (assumed) nhằm nâng cao tính toàn vẹn dữ liệu cho API.
   - Cơ chế bypass quyền sở hữu của Admin đối với API hủy đơn hàng (`order_ownership` - P3) là giả định nghiệp vụ hợp lý: Admin có thể xử lý hủy đơn hàng giúp người dùng qua hệ thống quản trị, miễn là đơn hàng đó chưa chuyển sang trạng thái `shipping`.
   - Vấn đề bảo mật (Security testing) được kết hợp chặt chẽ trong phân tích miền thông qua việc xác thực token JWT, đối khớp vai trò (`role`) và quyền sở hữu đơn hàng (`owner`) để ngăn chặn việc người dùng bình thường can thiệp vào đơn hàng của người khác hoặc tự nâng quyền cập nhật trạng thái đơn hàng của mình.
