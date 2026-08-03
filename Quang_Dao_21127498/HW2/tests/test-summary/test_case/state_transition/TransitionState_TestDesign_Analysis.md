# Test Design Analysis: State Transition Testing
## FR-10 (Order State Machine) — EShop Hệ thống

**Ngày tạo**: 2026-07-06  
**Phiên bản**: 1.0  
**Kỹ thuật thiết kế**: State Transition Testing  
**Phạm vi**: Hệ thống EShop — Quản lý Trạng thái Đơn hàng

---

## 1. Sơ đồ Trạng thái (State Diagram)

```
                  [Admin xác nhận]              [Admin giao hàng]        [Admin hoàn tất]
   ┌──────────┐  ──────────────────►  ┌──────────────┐  ─────────────►  ┌──────────┐  ────────►  ┌──────────────┐
   │ pending  │                       │  confirmed   │                   │ shipping │            │  delivered   │
   └──────────┘                       └──────────────┘                   └──────────┘            └──────────────┘
        │                                      │
        │ [User/Admin hủy]                     │ [User/Admin hủy]
        ▼                                      ▼
   ┌──────────┐                         ┌──────────┐
   │ canceled │◄────────────────────────│ canceled │
   └──────────┘ (Final State)            └──────────┘ (Final State)
```

---

## 2. Mô tả các Trạng thái (States)

| Trạng thái | Mô tả | Loại |
|---|---|---|
| `pending` | Đơn hàng vừa được tạo, chờ Admin xác nhận | Initial State |
| `confirmed` | Admin đã xác nhận đơn hàng, chuẩn bị giao | Intermediate |
| `shipping` | Đơn hàng đang trong quá trình giao hàng | Intermediate |
| `delivered` | Đơn hàng đã giao thành công tới khách | Final State |
| `canceled` | Đơn hàng đã bị hủy (từ pending hoặc confirmed) | Final State |

---

## 3. Bảng Phân tích Transition Chi tiết

### 3.1 Transition Hợp lệ (Valid Transitions)

| # | Trạng thái hiện tại | Sự kiện / Hành động | Trạng thái kết quả | Điều kiện / Actor | Ghi chú |
|---|---|---|---|---|---|
| **T1** | `pending` | Admin xác nhận | `confirmed` | Actor: Admin | Chuyển tiếp bình thường, không có điều kiện bổ sung |
| **T2** | `pending` | User/Admin hủy | `canceled` | Actor: User hoặc Admin | User được phép hủy ở trạng thái `pending` |
| **T3** | `confirmed` | Admin giao hàng | `shipping` | Actor: Admin | Chuyển tiếp bình thường, bắt buộc phải qua `confirmed` trước |
| **T4** | `confirmed` | User/Admin hủy | `canceled` | Actor: User hoặc Admin | User được phép hủy ở trạng thái `confirmed` |
| **T5** | `shipping` | Admin hoàn tất | `delivered` | Actor: Admin | Chuyển tiếp cuối cùng, đưa đơn vào Final State |

---

### 3.2 Invalid Transitions — 0-Switch Coverage

| # | Trạng thái hiện tại | Sự kiện cố gắng | Kết quả mong đợi | Lý do Từ chối | Ghi chú |
|---|---|---|---|---|---|
| **I1** | `pending` | Admin giao hàng (→ shipping) | ❌ Từ chối | Phải xác nhận trước (pending → confirmed → shipping) | Bỏ qua bước xác nhận |
| **I2** | `pending` | Admin hoàn tất (→ delivered) | ❌ Từ chối | Phải trải qua confirmed → shipping trước | Bỏ qua quá trình xử lý |
| **I3** | `confirmed` | Admin xác nhận lại (→ confirmed) | ❌ Từ chối | Đơn hàng đã được xác nhận, không thể xác nhận lại | Hành động lặp lại không cần thiết |
| **I4** | `confirmed` | Admin hoàn tất (→ delivered) | ❌ Từ chối | Phải giao hàng trước (confirmed → shipping → delivered) | Bỏ qua bước giao hàng |
| **I5** | `shipping` | User hủy | ❌ Từ chối (403 Forbidden) | **FR-10**: User KHÔNG được phép hủy khi `shipping` | Quy tắc đặc biệt: hạn chế quyền hạn User |
| **I6** | `shipping` | Admin lùi lại (→ confirmed) | ❌ Từ chối | State Machine là một chiều, không được lùi lại | Bảo vệ toàn vẹn dữ liệu |
| **I7** | `shipping` | Admin giao hàng lại (→ shipping) | ❌ Từ chối | Đơn hàng đã ở trạng thái shipping, không thể giao lại | Hành động lặp lại không cần thiết |
| **I8** | `delivered` | Bất kỳ hành động chuyển tiếp nào | ❌ Từ chối | `delivered` là **Final State**, không thể chuyển tiếp | Bảo vệ đơn hàng đã hoàn tất |
| **I9** | `canceled` | Bất kỳ hành động chuyển tiếp nào | ❌ Từ chối | `canceled` là **Final State**, không thể chuyển tiếp | Bảo vệ đơn hàng đã hủy |
| **I10** | `shipping` | Admin hủy | ✅ Chấp nhận → `canceled` | Admin được phép hủy ở mọi trạng thái (không phải final) | **Ngoại lệ của Invalid**: Admin có quyền hạn cao hơn |

---

## 4. Ràng buộc và Quy tắc Chuyển đổi

### 4.1 Ràng buộc Final State

- **Trạng thái kết thúc**: `delivered` và `canceled`
- **Ràng buộc**: Không được phép chuyển từ Final State sang bất kỳ trạng thái nào khác
- **Lý do**: Bảo vệ tính toàn vẹn của dữ liệu; đơn hàng đã hoàn tất không thể thay đổi

### 4.2 Ràng buộc Quyền hạn (Role-based)

| Trạng thái | User được hủy? | Admin được hủy? | Ghi chú |
|---|---|---|---|
| `pending` | ✅ Được | ✅ Được | User có quyền hủy ở trạng thái này |
| `confirmed` | ✅ Được | ✅ Được | User có quyền hủy ở trạng thái này |
| `shipping` | ❌ **KHÔNG được** | ✅ Được | **FR-10 quy định**: User bị hạn chế; Admin vẫn được |
| `delivered` | ❌ KHÔNG được | ❌ KHÔNG được | Final State, không ai được hủy |
| `canceled` | ❌ KHÔNG được | ❌ KHÔNG được | Final State, không ai được thao tác |

### 4.3 Quy tắc Hành động của Admin

- Admin có thể thực hiện **tất cả** các transition hợp lệ: pending → confirmed → shipping → delivered
- Admin có thể hủy đơn hàng ở **bất kỳ trạng thái nào (trừ final states)**: pending, confirmed, shipping
- Admin **KHÔNG thể**:
  - Lùi lại trạng thái (ví dụ: shipping → confirmed)
  - Bỏ qua bước (ví dụ: pending → shipped, pending → delivered)
  - Chuyển từ Final State sang trạng thái khác

---

## 5. Coverage Analysis

### 5.1 0-Switch Coverage (Valid Transitions)

Kiểm tra các transition hợp lệ từ trạng thái này sang trạng thái khác:

- ✅ pending → confirmed (T1)
- ✅ confirmed → shipping (T3)
- ✅ shipping → delivered (T5)
- ✅ pending → canceled (T2)
- ✅ confirmed → canceled (T4)

**Tổng**: 5 valid transitions

### 5.2 1-Switch Coverage (Invalid Transitions)

Kiểm tra các transition không hợp lệ mà hệ thống phải từ chối:

- ❌ pending → shipping (I1)
- ❌ pending → delivered (I2)
- ❌ confirmed → confirmed (I3)
- ❌ confirmed → delivered (I4)
- ❌ shipping → confirmed (I6)
- ❌ shipping → shipping (I7)
- ❌ delivered → * (I8)
- ❌ canceled → * (I9)

**Tổng**: 8 invalid transitions cần từ chối

### 5.3 Permission Coverage (Quyền hạn)

- ✅ User hủy ở pending/confirmed
- ❌ User hủy ở shipping (phải từ chối)
- ✅ Admin hủy ở bất kỳ trạng thái nào (trừ final)

**Tổng**: 3 kiểm tra quyền hạn đặc biệt

**Tổng cộng Coverage**: 5 + 8 + 3 = **16 test scenario** (nhưng được gộp lại 15 test case)

---

## 6. Các Test Case Liên quan

Các test case chi tiết được sinh ra từ bảng phân tích này:

| TC ID | Transition | Loại | File |
|---|---|---|---|
| TC_ST_FR10_01 | pending → confirmed | ✅ Valid | TC_ST_FR10_01.md |
| TC_ST_FR10_02 | pending → canceled | ✅ Valid | TC_ST_FR10_02.md |
| TC_ST_FR10_03 | pending → shipping | ❌ Invalid (I1) | TC_ST_FR10_03.md |
| TC_ST_FR10_04 | pending → delivered | ❌ Invalid (I2) | TC_ST_FR10_04.md |
| TC_ST_FR10_05 | confirmed → shipping | ✅ Valid | TC_ST_FR10_05.md |
| TC_ST_FR10_06 | confirmed → canceled | ✅ Valid | TC_ST_FR10_06.md |
| TC_ST_FR10_07 | confirmed → confirmed | ❌ Invalid (I3) | TC_ST_FR10_07.md |
| TC_ST_FR10_08 | confirmed → delivered | ❌ Invalid (I4) | TC_ST_FR10_08.md |
| TC_ST_FR10_09 | shipping → delivered | ✅ Valid | TC_ST_FR10_09.md |
| TC_ST_FR10_10 | shipping → canceled (User) | ❌ Invalid (I5 - Permission) | TC_ST_FR10_10.md |
| TC_ST_FR10_11 | shipping → canceled (Admin) | ✅ Valid | TC_ST_FR10_11.md |
| TC_ST_FR10_12 | shipping → confirmed | ❌ Invalid (I6) | TC_ST_FR10_12.md |
| TC_ST_FR10_13 | shipping → shipping | ❌ Invalid (I7) | TC_ST_FR10_13.md |
| TC_ST_FR10_14 | delivered → * | ❌ Invalid (I8 - Final State) | TC_ST_FR10_14.md |
| TC_ST_FR10_15 | canceled → * | ❌ Invalid (I9 - Final State) | TC_ST_FR10_15.md |

---

## 7. Chiến lược Thực thi Test

### 7.1 Thứ tự thực thi khuyến nghị

1. **Bước 1**: Thực thi các Valid Transitions (T1-T5) — xác minh State Machine hoạt động đúng
2. **Bước 2**: Thực thi các Invalid Transitions (I1-I9) — xác minh hệ thống từ chối các transition sai
3. **Bước 3**: Kiểm tra Permission — xác minh User/Admin có quyền hạn đúng

### 7.2 Tiêu chí Thành công

- ✅ Tất cả 5 valid transitions được chấp nhận
- ✅ Tất cả 10 invalid transitions bị từ chối với thông báo lỗi phù hợp
- ✅ Quyền hạn User/Admin được kiểm soát chính xác
- ✅ Không có lỗi dữ liệu hoặc inconsistency sau các transition
- ✅ Dashboard Admin tính lại doanh thu sau khi có `delivered` orders

---

## 8. Tài liệu Tham khảo

- **FR-10** (README.md): Order State Machine Specification
- **FR-11** (README.md): Lịch sử đơn hàng (User)
- **FR-18** (README.md): Quản lý đơn hàng (Admin)
- **UC-10** (EShop_UseCases.md): Hủy đơn hàng (User)
- **UC-18** (EShop_UseCases.md): Quản lý trạng thái đơn hàng (Admin)

---

**Phiên bản**: 1.0 | **Ngày**: 2026-07-06 | **Trạng thái**: ✅ Hoàn tất
