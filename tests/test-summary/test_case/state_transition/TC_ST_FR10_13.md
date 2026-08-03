# Test Case: TC_ST_FR10_13

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `shipping` |
| **Sự kiện** | Admin cố gắng giao hàng lại (chuyển sang `shipping`) |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đang ở trạng thái `shipping`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `shipping`.
4. Admin cố gắng bấm nút **"Giao hàng"** hoặc chọn hành động "Chuyển sang Shipping" lần nữa.
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `shipping`)
- **Hành động**: Giao hàng (Ship Order) — cố gắng giao hàng lại
- **Actor**: Admin

## Kết quả mong đợi

- ❌ Yêu cầu giao hàng bị **từ chối** (HTTP 400 Bad Request hoặc tương đương).
- ❌ Trạng thái đơn hàng **giữ nguyên** `shipping` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Đơn hàng đã được giao hàng, không thể giao lại."
  - "Invalid transition: shipping → shipping không được phép."
  - "Đơn hàng hiện tại đã ở trạng thái giao hàng."

## Ghi chú

- Đây là một **invalid transition** (1-switch coverage).
- Nút "Giao hàng" có thể bị ẩn hoặc vô hiệu hóa khi đơn hàng đã ở trạng thái `shipping`.
- Các hành động lặp lại không cần thiết không nên được cho phép.
