# Test Case: TC_ST_FR10_11

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Hợp lệ (Valid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `shipping` |
| **Sự kiện** | Admin hủy đơn hàng |
| **Trạng thái kết quả** | `canceled` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đang ở trạng thái `shipping`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `shipping`.
4. Admin bấm nút **"Hủy đơn hàng"** hoặc chọn hành động "Hủy".
5. Hệ thống có thể yêu cầu xác nhận ("Bạn có chắc chắn muốn hủy đơn hàng này không?").
6. Admin xác nhận hủy.
7. Hệ thống xử lý yêu cầu.
8. Admin quan sát kết quả trạng thái đơn hàng.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `shipping`)
- **Hành động**: Hủy đơn hàng (Cancel Order)
- **Actor**: Admin (role = 'admin')

## Kết quả mong đợi

- ✅ Yêu cầu hủy được chấp nhận (HTTP 200 hoặc tương đương).
- ✅ Trạng thái đơn hàng thay đổi từ `shipping` → `canceled`.
- ✅ Giao diện cập nhật trạng thái thành `canceled` (tiếng Việt: "Đã hủy").
- ✅ Có thông báo thành công (ví dụ: "Hủy đơn hàng thành công").
- ✅ Lịch sử hoặc timeline đơn hàng ghi nhận sự kiện chuyển đổi trạng thái.

## Ghi chú

- Đây là một **valid transition** trong State Machine của FR-10.
- Admin được phép hủy đơn hàng ở **mọi trạng thái không phải final** (tức: pending, confirmed, shipping).
- `canceled` là **Final State** — không thể chuyển tiếp sang trạng thái khác.
- Không giống User, Admin không bị hạn chế quyền hạn hủy ở trạng thái `shipping`.
