# Test Case: TC_ST_FR10_10

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `shipping` |
| **Sự kiện** | User cố gắng hủy đơn hàng |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) — User KHÔNG được phép hủy ở trạng thái `shipping` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (User) đã đăng nhập với tài khoản thường.
3. Đơn hàng của user đang ở trạng thái `shipping`.
4. User không có quyền admin (role ≠ 'admin').

## Các bước thực hiện

1. User đăng nhập vào hệ thống.
2. User truy cập **Lịch sử đơn hàng**.
3. User tìm kiếm/chọn đơn hàng ở trạng thái `shipping` (đang giao hàng).
4. User cố gắng bấm nút **"Hủy đơn hàng"** (nếu nút này vẫn hiển thị).
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `shipping`, thuộc về user hiện tại)
- **Hành động**: Hủy đơn hàng (Cancel Order)
- **Actor**: User thường (role ≠ 'admin')

## Kết quả mong đợi

- ❌ Yêu cầu hủy bị **từ chối** (HTTP 400/403 Forbidden hoặc tương đương).
- ❌ Trạng thái đơn hàng **giữ nguyên** `shipping` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Không thể hủy đơn hàng khi đơn hàng đang được giao."
  - "Vui lòng liên hệ hỗ trợ khách hàng để hủy đơn hàng đang giao."
  - "User không được phép hủy đơn hàng ở trạng thái 'shipping'."
- ✅ Nút "Hủy đơn hàng" nên bị **ẩn hoặc vô hiệu hóa** khi đơn hàng ở trạng thái `shipping` (tốt nhất).

## Ghi chú

- Đây là một **invalid transition** (1-switch coverage) — **quy tắc đặc biệt của FR-10**.
- Theo FR-10: "Khi đơn hàng đã ở trạng thái `shipping`, **User không được phép tự hủy** — chỉ Admin mới có thể thao tác."
- Điều này là **hạn chế quyền hạn** của User tại một trạng thái cụ thể.
- Admin vẫn được phép hủy đơn hàng ở trạng thái `shipping` (xem TC_ST_FR10_11).
