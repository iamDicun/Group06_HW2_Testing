# Test Case: TC_ST_FR10_02

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Hợp lệ (Valid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `pending` |
| **Sự kiện** | User/Admin hủy đơn hàng |
| **Trạng thái kết quả** | `canceled` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (User hoặc Admin) đã đăng nhập.
3. Đơn hàng đã được tạo và đang ở trạng thái `pending`.
4. Người dùng có quyền truy cập hủy đơn hàng (User được phép hủy ở trạng thái `pending`).

## Các bước thực hiện

1. Người dùng đăng nhập vào hệ thống.
2. Người dùng truy cập **Lịch sử đơn hàng** hoặc **Admin Quản lý Đơn hàng**.
3. Người dùng tìm kiếm/chọn đơn hàng có trạng thái `pending`.
4. Người dùng bấm nút **"Hủy đơn hàng"**.
5. Hệ thống có thể yêu cầu xác nhận ("Bạn có chắc chắn muốn hủy đơn hàng này không?").
6. Người dùng xác nhận hủy.
7. Hệ thống xử lý yêu cầu.
8. Người dùng quan sát kết quả trạng thái đơn hàng.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `pending`)
- **Hành động**: Hủy đơn hàng (Cancel Order)
- **Actor**: User hoặc Admin

## Kết quả mong đợi

- ✅ Yêu cầu hủy được chấp nhận (HTTP 200 hoặc tương đương).
- ✅ Trạng thái đơn hàng thay đổi từ `pending` → `canceled`.
- ✅ Giao diện cập nhật trạng thái thành `canceled` (tiếng Việt: "Đã hủy").
- ✅ Có thông báo thành công (ví dụ: "Hủy đơn hàng thành công").
- ✅ Lịch sử hoặc timeline đơn hàng ghi nhận sự kiện chuyển đổi trạng thái.

## Ghi chú

- Đây là một **valid transition** trong State Machine của FR-10.
- User được phép hủy đơn hàng khi nó đang ở trạng thái `pending`.
- `canceled` là **Final State** — không thể chuyển tiếp sang trạng thái khác.
