# Test Case: TC_ST_FR10_07

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `confirmed` |
| **Sự kiện** | Admin cố gắng xác nhận lại đơn hàng (confirmed → confirmed) |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đã được xác nhận và đang ở trạng thái `confirmed`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `confirmed`.
4. Admin cố gắng bấm nút **"Xác nhận"** hoặc chọn hành động "Xác nhận đơn hàng" một lần nữa.
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `confirmed`)
- **Hành động**: Xác nhận (Confirm Order) — cố gắng xác nhận lại
- **Actor**: Admin

## Kết quả mong đợi

- ❌ Yêu cầu xác nhận bị **từ chối** (HTTP 400 Bad Request hoặc tương đương).
- ❌ Trạng thái đơn hàng **giữ nguyên** `confirmed` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Đơn hàng đã được xác nhận trước đó, không thể xác nhận lại."
  - "Invalid transition: confirmed → confirmed không được phép."
  - "Đơn hàng hiện tại đã ở trạng thái xác nhận."

## Ghi chú

- Đây là một **invalid transition** (1-switch coverage).
- Nút "Xác nhận" có thể bị ẩn hoặc vô hiệu hóa khi đơn hàng đã ở trạng thái `confirmed`.
- Hệ thống không nên cho phép các hành động lặp lại không cần thiết.
