# Test Case: TC_ST_FR10_01

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Hợp lệ (Valid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `pending` |
| **Sự kiện** | Admin xác nhận đơn hàng |
| **Trạng thái kết quả** | `confirmed` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin (`admin@eshop.com`).
3. Đơn hàng đã được tạo và đang ở trạng thái `pending`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống với tài khoản Admin.
2. Admin truy cập trang **Quản lý Đơn hàng** (Admin Panel).
3. Admin tìm kiếm/chọn đơn hàng có trạng thái `pending`.
4. Admin bấm nút **"Xác nhận"** hoặc chọn hành động "Xác nhận đơn hàng".
5. Hệ thống xử lý yêu cầu.
6. Admin quan sát kết quả trạng thái đơn hàng.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `pending`)
- **Hành động**: Xác nhận (Confirm Order)
- **Actor**: Admin (role = 'admin')

## Kết quả mong đợi

- ✅ Yêu cầu xác nhận được chấp nhận (HTTP 200 hoặc tương đương).
- ✅ Trạng thái đơn hàng thay đổi từ `pending` → `confirmed`.
- ✅ Giao diện cập nhật trạng thái thành `confirmed` (tiếng Việt: "Đã xác nhận").
- ✅ Có thông báo thành công (ví dụ: toast notification "Xác nhận đơn hàng thành công").
- ✅ Lịch sử hoặc timeline đơn hàng ghi nhận sự kiện chuyển đổi trạng thái.

## Ghi chú

- Đây là một **valid transition** trong State Machine của FR-10.
- `pending` → `confirmed` là bước đầu tiên của quy trình xử lý đơn hàng.
- Quá trình này chỉ được Admin thực hiện.
