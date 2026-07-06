# Test Case: TC_ST_FR10_09

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Hợp lệ (Valid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `shipping` |
| **Sự kiện** | Admin hoàn tất đơn hàng |
| **Trạng thái kết quả** | `delivered` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đã được xác nhận, giao hàng và đang ở trạng thái `shipping`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `shipping`.
4. Admin bấm nút **"Hoàn tất"** hoặc chọn hành động "Chuyển sang Delivered".
5. Hệ thống xử lý yêu cầu.
6. Admin quan sát kết quả trạng thái đơn hàng.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `shipping`)
- **Hành động**: Hoàn tất (Mark as Delivered)
- **Actor**: Admin (role = 'admin')

## Kết quả mong đợi

- ✅ Yêu cầu hoàn tất được chấp nhận (HTTP 200 hoặc tương đương).
- ✅ Trạng thái đơn hàng thay đổi từ `shipping` → `delivered`.
- ✅ Giao diện cập nhật trạng thái thành `delivered` (tiếng Việt: "Đã giao hàng").
- ✅ Có thông báo thành công (ví dụ: "Hoàn tất đơn hàng thành công").
- ✅ Lịch sử hoặc timeline đơn hàng ghi nhận sự kiện chuyển đổi trạng thái.
- ✅ Dashboard Admin tính lại doanh thu (chỉ đơn hàng có status `delivered` được tính).

## Ghi chú

- Đây là một **valid transition** trong State Machine của FR-10.
- `shipping` → `delivered` là bước cuối cùng trong quy trình xử lý đơn hàng.
- `delivered` là **Final State** — không thể chuyển tiếp sang trạng thái khác.
- Khi đơn hàng chuyển sang `delivered`, nó sẽ được tính vào tổng doanh thu của hệ thống (FR-13).
