# Test Case: TC_ST_FR10_03

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `pending` |
| **Sự kiện** | Admin cố gắng giao hàng (chuyển sang `shipping` trực tiếp) |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đã được tạo và đang ở trạng thái `pending` (chưa được xác nhận).
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `pending`.
4. Admin cố gắng bấm nút **"Giao hàng"** hoặc chọn hành động "Chuyển sang Shipping" (nếu có).
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `pending`)
- **Hành động**: Giao hàng (Ship Order) — cố gắng chuyển trực tiếp từ `pending` sang `shipping`
- **Actor**: Admin

## Kết quả mong đợi

- ❌ Yêu cầu giao hàng bị **từ chối** (HTTP 400/409 Bad Request hoặc Conflict).
- ❌ Trạng thái đơn hàng **giữ nguyên** `pending` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Không thể giao hàng khi đơn hàng chưa được xác nhận."
  - "Đơn hàng phải ở trạng thái 'Confirmed' trước khi có thể giao hàng."
  - "Invalid transition: pending → shipping không được phép."

## Ghi chú

- Đây là một **invalid transition** (1-switch coverage).
- Theo State Machine, quy trình đúng phải là: `pending` → `confirmed` → `shipping` → `delivered`.
- Admin không được phép bỏ qua bước xác nhận (`confirmed`).
